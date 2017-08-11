import test from 'ava';
import { AvgBucketAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, AvgBucketAggregation, 'avg_bucket');

test('constructor sets buckets_path', t => {
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
    t.deepEqual(value, expected);
});
