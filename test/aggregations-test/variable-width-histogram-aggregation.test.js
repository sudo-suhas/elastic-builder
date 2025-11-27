import { describe, test, expect } from 'vitest';
import { VariableWidthHistogramAggregation } from '../../src';

describe('VariableWidthHistogramAggregation', () => {
    test('sets type as variable_width_histogram', () => {
        const value = new VariableWidthHistogramAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { variable_width_histogram: {} }
        });
    });

    describe('constructor', () => {
        test('sets arguments', () => {
            const value = new VariableWidthHistogramAggregation(
                    'price',
                    'lowestPrice',
                    10
                ).toJSON(),
                expected = {
                    price: {
                        variable_width_histogram: {
                            field: 'lowestPrice',
                            buckets: 10
                        }
                    }
                };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets buckets', () => {
            const value = new VariableWidthHistogramAggregation(
                'price',
                'lowestPrice',
                10
            )
                .buckets(20)
                .toJSON();
            const expected = {
                price: {
                    variable_width_histogram: {
                        field: 'lowestPrice',
                        buckets: 20
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
