import { describe, test, expect } from 'vitest';
import { StatsBucketAggregation } from '../../src';

const getInstance = bucketsPath =>
    new StatsBucketAggregation('my_agg', bucketsPath);

describe('StatsBucketAggregation', () => {
    test('sets type as stats_bucket', () => {
        const value = new StatsBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { stats_bucket: {} }
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
                    stats_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
