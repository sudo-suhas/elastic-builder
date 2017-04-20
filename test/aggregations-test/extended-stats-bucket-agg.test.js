import test from 'ava';
import { ExtendedStatsBucketAggregation } from '../../src';
import { setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath => new ExtendedStatsBucketAggregation('my_agg', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'extended_stats_bucket');

test(setsAggType, ExtendedStatsBucketAggregation, 'extended_stats_bucket');
test(aggPropIsSet, 'sigma', { param: 3 });

test('constructor sets buckets_path', t => {
    const valueA = getInstance('my_buckets_path').toJSON();
    const valueB = getInstance().bucketsPath('my_buckets_path').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            extended_stats_bucket: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(valueA, expected);
});
