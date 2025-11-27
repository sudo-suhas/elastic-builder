import { describe, test, expect } from 'vitest';
import { MatrixStatsAggregation } from '../../src';

const getInstance = fields => new MatrixStatsAggregation('my_agg', fields);

describe('MatrixStatsAggregation', () => {
    test('sets type as matrix_stats', () => {
        const value = new MatrixStatsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { matrix_stats: {} }
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
            test('fields()', () => {
                expect(() => getInstance().fields(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets fields', () => {
            const value = getInstance().fields(['fieldA', 'fieldB']).toJSON();
            expect(value).toEqual({
                my_agg: {
                    matrix_stats: {
                        fields: ['fieldA', 'fieldB']
                    }
                }
            });
        });

        test('sets mode', () => {
            const value = getInstance().mode('avg').toJSON();
            expect(value).toEqual({
                my_agg: {
                    matrix_stats: {
                        mode: 'avg'
                    }
                }
            });
        });

        test('sets missing', () => {
            const value = getInstance().missing({ income: 50000 }).toJSON();
            expect(value).toEqual({
                my_agg: {
                    matrix_stats: {
                        missing: { income: 50000 }
                    }
                }
            });
        });
    });

    test('constructor sets arguments', () => {
        const valueA = getInstance(['fieldA', 'fieldB']).toJSON();
        const valueB = getInstance().fields(['fieldA', 'fieldB']).toJSON();
        expect(valueA).toEqual(valueB);

        const expected = {
            my_agg: {
                matrix_stats: {
                    fields: ['fieldA', 'fieldB']
                }
            }
        };
        expect(valueA).toEqual(expected);
    });
});
