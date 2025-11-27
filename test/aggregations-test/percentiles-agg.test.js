import { describe, test, expect } from 'vitest';
import { PercentilesAggregation } from '../../src';

const getInstance = field => new PercentilesAggregation('my_agg', field);

describe('PercentilesAggregation', () => {
    test('sets type as percentiles', () => {
        const value = new PercentilesAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { percentiles: {} }
        });
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('percents()', () => {
                expect(() => getInstance().percents(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets keyed', () => {
            const value = getInstance().keyed(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentiles: {
                        keyed: true
                    }
                }
            });
        });

        test('sets percents', () => {
            const value = getInstance().percents([95, 99, 99.9]).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentiles: {
                        percents: [95, 99, 99.9]
                    }
                }
            });
        });

        test('sets tdigest', () => {
            const value = getInstance().tdigest(200).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentiles: {
                        tdigest: { compression: 200 }
                    }
                }
            });
        });

        test('sets hdr', () => {
            const value = getInstance().hdr(3).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentiles: {
                        hdr: { number_of_significant_value_digits: 3 }
                    }
                }
            });
        });
    });

    test('compression same as tdigest', () => {
        expect(getInstance().tdigest(3).toJSON()).toEqual(
            getInstance().compression(3).toJSON()
        );
    });

    test('constructor sets field', () => {
        const valueA = getInstance('my_field').toJSON();
        const valueB = getInstance().field('my_field').toJSON();
        expect(valueA).toEqual(valueB);

        const expected = {
            my_agg: {
                percentiles: {
                    field: 'my_field'
                }
            }
        };
        expect(valueA).toEqual(expected);
    });
});
