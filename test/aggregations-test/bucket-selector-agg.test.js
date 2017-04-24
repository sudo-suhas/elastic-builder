import test from 'ava';
import { BucketSelectorAggregation, Script } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = bucketsPath => new BucketSelectorAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_agg', 'bucket_selector')
);

test(setsAggType, BucketSelectorAggregation, 'bucket_selector');
test(illegalCall, BucketSelectorAggregation, 'format');
test(setsOption, 'script', { param: 'params.my_var1 / params.my_var2' });
test(setsOption, 'script', { param: new Script('inline', 'params.my_var1 / params.my_var2') });

test('constructor sets buckets_path', t => {
    const value = getInstance({ my_var1: 'the_sum', my_var2: 'the_value_count' }).toJSON();
    const expected = {
        my_agg: {
            bucket_selector: {
                buckets_path: { my_var1: 'the_sum', my_var2: 'the_value_count' }
            }
        }
    };
    t.deepEqual(value, expected);
});
