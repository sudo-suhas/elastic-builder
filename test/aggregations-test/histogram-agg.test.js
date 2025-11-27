import { describe, test, expect } from 'vitest';
import { HistogramAggregation } from '../../src';

describe('HistogramAggregation', () => {
    test('sets type as histogram', () => {
        const value = new HistogramAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { histogram: {} }
        });
    });

    test('constructor sets arguments', () => {
        const value = new HistogramAggregation(
            'my_agg',
            'my_field',
            10
        ).toJSON();
        const expected = {
            my_agg: {
                histogram: {
                    field: 'my_field',
                    interval: 10
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
