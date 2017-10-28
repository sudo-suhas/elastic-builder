import test from 'ava';
import { SumBucketAggregation } from '../../src';
import { setsAggType } from '../_macros';

const getInstance = bucketsPath =>
    new SumBucketAggregation('my_agg', bucketsPath);

test(setsAggType, SumBucketAggregation, 'sum_bucket');

test('constructor sets buckets_path', t => {
    const valueA = getInstance('my_buckets_path').toJSON();
    const valueB = getInstance()
        .bucketsPath('my_buckets_path')
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            sum_bucket: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(valueA, expected);
});
