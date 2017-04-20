import test from 'ava';
import { NestedAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new NestedAggregation('my_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'nested');

test(setsAggType, NestedAggregation, 'nested');
test(illegalCall, NestedAggregation, 'field');
test(illegalCall, NestedAggregation, 'script');
test(aggPropIsSet, 'path', { param: 'nested_path' });

test('constructor sets arguments', t => {
    const value = getInstance('nested_path').toJSON();
    const expected = {
        my_agg: {
            nested: {
                path: 'nested_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
