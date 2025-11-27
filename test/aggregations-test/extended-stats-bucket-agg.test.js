import { describe, test, expect } from 'vitest';
import { ExtendedStatsBucketAggregation } from '../../src';

const getInstance = bucketsPath =>
    new ExtendedStatsBucketAggregation('my_agg', bucketsPath);

describe('ExtendedStatsBucketAggregation', () => {
    test('sets type as extended_stats_bucket', () => {
        const value = new ExtendedStatsBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { extended_stats_bucket: {} }
        });
    });

    describe('options', () => {
        test('sets sigma', () => {
            const value = getInstance('my_buckets_path').sigma(3).toJSON();
            expect(value).toEqual({
                my_agg: {
                    extended_stats_bucket: {
                        buckets_path: 'my_buckets_path',
                        sigma: 3
                    }
                }
            });
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
                    extended_stats_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
