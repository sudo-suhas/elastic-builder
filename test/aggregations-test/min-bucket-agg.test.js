import test from 'ava';
import { MinBucketAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, MinBucketAggregation, 'min_bucket');

test('constructor sets buckets_path', t => {
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
    t.deepEqual(value, expected);
});
