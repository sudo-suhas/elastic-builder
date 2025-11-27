import { describe, test, expect } from 'vitest';
import { PercentileRanksAggregation } from '../../src';

const getInstance = (field, values) =>
    new PercentileRanksAggregation('my_agg', field, values);

describe('PercentileRanksAggregation', () => {
    test('sets type as percentile_ranks', () => {
        const value = new PercentileRanksAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { percentile_ranks: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new PercentileRanksAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in PercentileRanksAggregation')
        );
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('values()', () => {
                expect(() => getInstance().values(value)).toThrow(
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
                    percentile_ranks: {
                        keyed: true
                    }
                }
            });
        });

        test('sets values', () => {
            const value = getInstance().values([15, 30]).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentile_ranks: {
                        values: [15, 30]
                    }
                }
            });
        });

        test('sets tdigest', () => {
            const value = getInstance().tdigest(200).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentile_ranks: {
                        tdigest: { compression: 200 }
                    }
                }
            });
        });

        test('sets hdr', () => {
            const value = getInstance().hdr(3).toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentile_ranks: {
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

    test('constructor sets arguments', () => {
        const valueA = getInstance('my_field', [15, 30]).toJSON();
        const valueB = getInstance()
            .field('my_field')
            .values([15, 30])
            .toJSON();
        expect(valueA).toEqual(valueB);

        const expected = {
            my_agg: {
                percentile_ranks: {
                    field: 'my_field',
                    values: [15, 30]
                }
            }
        };
        expect(valueA).toEqual(expected);
    });
});
