import { describe, test, expect } from 'vitest';
import { MaxBucketAggregation } from '../../src';

describe('MaxBucketAggregation', () => {
    test('sets type as max_bucket', () => {
        const value = new MaxBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { max_bucket: {} }
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = new MaxBucketAggregation(
                'my_agg',
                'my_buckets_path'
            ).toJSON();
            const expected = {
                my_agg: {
                    max_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
