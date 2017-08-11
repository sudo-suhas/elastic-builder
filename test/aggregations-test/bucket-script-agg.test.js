import test from 'ava';
import { BucketScriptAggregation, Script } from '../../src';
import {
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = bucketsPath =>
    new BucketScriptAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'bucket_script')
);

test(setsAggType, BucketScriptAggregation, 'bucket_script');
test(setsOption, 'script', { param: 'params.my_var1 / params.my_var2' });
test(setsOption, 'script', {
    param: new Script('inline', 'params.my_var1 / params.my_var2')
});

test('constructor sets buckets_path', t => {
    const value = getInstance({
        my_var1: 'the_sum',
        my_var2: 'the_value_count'
    }).toJSON();
    const expected = {
        my_agg: {
            bucket_script: {
                buckets_path: { my_var1: 'the_sum', my_var2: 'the_value_count' }
            }
        }
    };
    t.deepEqual(value, expected);
});
