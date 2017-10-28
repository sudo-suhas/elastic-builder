import test from 'ava';
import { StatsBucketAggregation } from '../../src';
import { setsAggType } from '../_macros';

const getInstance = bucketsPath =>
    new StatsBucketAggregation('my_agg', bucketsPath);

test(setsAggType, StatsBucketAggregation, 'stats_bucket');

test('constructor sets buckets_path', t => {
    const valueA = getInstance('my_buckets_path').toJSON();
    const valueB = getInstance()
        .bucketsPath('my_buckets_path')
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            stats_bucket: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(valueA, expected);
});
