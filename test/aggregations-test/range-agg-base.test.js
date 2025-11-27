import { describe, test, expect } from 'vitest';
import { RangeAggregationBase } from '../../src/aggregations/bucket-aggregations';

const getInstance = (...args) =>
    new RangeAggregationBase('my_agg', 'my_type', ...args).range({
        from: 10,
        to: 20
    });

describe('RangeAggregationBase', () => {
    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('range()', () => {
                expect(() => getInstance().range(value)).toThrow(
                    new TypeError('Argument must be an instance of Object')
                );
            });

            test('ranges()', () => {
                expect(() => getInstance().ranges(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets format', () => {
            const value = getInstance().format('MM-yyy').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        ranges: [{ from: 10, to: 20 }],
                        format: 'MM-yyy'
                    }
                }
            });
        });

        test('sets missing', () => {
            const value = getInstance().missing('01-1970').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        ranges: [{ from: 10, to: 20 }],
                        missing: '01-1970'
                    }
                }
            });
        });

        test('sets keyed', () => {
            const value = getInstance().keyed(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        ranges: [{ from: 10, to: 20 }],
                        keyed: true
                    }
                }
            });
        });
    });

    test('empty ranges throws', () => {
        expect(() =>
            new RangeAggregationBase('my_agg', 'my_type').toJSON()
        ).toThrow(new Error('`ranges` cannot be empty.'));
    });

    describe('range() validation', () => {
        test.each([
            { name: 'throws for empty object', value: {} },
            {
                name: 'throws for object with only key property',
                value: { key: 'invalid' }
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().range(value)).toThrow(
                new Error(
                    'Invalid Range! Range must have at least one of from,to'
                )
            );
        });

        test.each([
            {
                name: 'does not throw for object with to property',
                value: { to: 50 }
            },
            {
                name: 'does not throw for object with to and key properties',
                value: { to: 50, key: 'fifty' }
            },
            {
                name: 'does not throw for object with from property',
                value: { from: 10 }
            },
            {
                name: 'does not throw for object with from and key properties',
                value: { from: 10, key: 'ten' }
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().range(value)).not.toThrow();
        });
    });

    test('ranges are set', () => {
        const valueA = getInstance()
            .range({ from: 20, to: 30 })
            .range({ from: 30, to: 40 })
            .range({ from: 40, to: 50 })
            .toJSON();
        const valueB = getInstance()
            .ranges([
                { from: 20, to: 30 },
                { from: 30, to: 40 },
                { from: 40, to: 50 }
            ])
            .toJSON();
        const expected = {
            my_agg: {
                my_type: {
                    ranges: [
                        { from: 10, to: 20 },
                        { from: 20, to: 30 },
                        { from: 30, to: 40 },
                        { from: 40, to: 50 }
                    ]
                }
            }
        };
        expect(valueA).toEqual(valueB);
        expect(valueA).toEqual(expected);
    });
});
