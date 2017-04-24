import test from 'ava';
import { ExtendedStatsBucketAggregation } from '../../src';
import { setsAggType, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = bucketsPath => new ExtendedStatsBucketAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_agg', 'extended_stats_bucket')
);

test(setsAggType, ExtendedStatsBucketAggregation, 'extended_stats_bucket');
test(setsOption, 'sigma', { param: 3 });

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
