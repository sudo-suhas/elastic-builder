import test from 'ava';
import { BucketScriptAggregation, Script } from '../../src';
import { setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath => new BucketScriptAggregation('my_agg', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'bucket_script');

test(setsAggType, BucketScriptAggregation, 'bucket_script');
test(aggPropIsSet, 'script', { param: 'params.my_var1 / params.my_var2' });
test(aggPropIsSet, 'script', { param: new Script('inline', 'params.my_var1 / params.my_var2') });

test('constructor sets buckets_path', t => {
    const value = getInstance({ my_var1: 'the_sum', my_var2: 'the_value_count' }).toJSON();
    const expected = {
        my_agg: {
            bucket_script: {
                buckets_path: { my_var1: 'the_sum', my_var2: 'the_value_count' }
            }
        }
    };
    t.deepEqual(value, expected);
});
