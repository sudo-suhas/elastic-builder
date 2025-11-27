import { describe, test, expect } from 'vitest';
import { CumulativeSumAggregation } from '../../src';

describe('CumulativeSumAggregation', () => {
    test('sets type as cumulative_sum', () => {
        const value = new CumulativeSumAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { cumulative_sum: {} }
        });
    });

    test('gapPolicy cannot be set', () => {
        expect(() =>
            new CumulativeSumAggregation('my_agg').gapPolicy()
        ).toThrow(
            new Error('gapPolicy is not supported in CumulativeSumAggregation')
        );
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = new CumulativeSumAggregation(
                'my_agg',
                'my_buckets_path'
            ).toJSON();
            const expected = {
                my_agg: {
                    cumulative_sum: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
