import { describe, test, expect } from 'vitest';
import { SumBucketAggregation } from '../../src';

const getInstance = bucketsPath =>
    new SumBucketAggregation('my_agg', bucketsPath);

describe('SumBucketAggregation', () => {
    test('sets type as sum_bucket', () => {
        const value = new SumBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { sum_bucket: {} }
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const valueA = getInstance('my_buckets_path').toJSON();
            const valueB = getInstance()
                .bucketsPath('my_buckets_path')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_agg: {
                    sum_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
