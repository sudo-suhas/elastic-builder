import { describe, test, expect } from 'vitest';
import { MinBucketAggregation } from '../../src';

describe('MinBucketAggregation', () => {
    test('sets type as min_bucket', () => {
        const value = new MinBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { min_bucket: {} }
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = new MinBucketAggregation(
                'my_agg',
                'my_buckets_path'
            ).toJSON();
            const expected = {
                my_agg: {
                    min_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
