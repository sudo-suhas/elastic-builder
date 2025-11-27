import { describe, test, expect } from 'vitest';
import { AvgBucketAggregation } from '../../src';

describe('AvgBucketAggregation', () => {
    test('sets type as avg_bucket', () => {
        const value = new AvgBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { avg_bucket: {} }
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = new AvgBucketAggregation(
                'my_agg',
                'my_buckets_path'
            ).toJSON();
            const expected = {
                my_agg: {
                    avg_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
