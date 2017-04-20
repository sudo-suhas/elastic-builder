import test from 'ava';
import { MaxBucketAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, MaxBucketAggregation, 'max_bucket');

test('constructor sets buckets_path', t => {
    const value = new MaxBucketAggregation('my_agg', 'my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            max_bucket: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
