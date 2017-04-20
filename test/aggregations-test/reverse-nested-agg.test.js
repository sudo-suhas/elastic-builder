import test from 'ava';
import { ReverseNestedAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new ReverseNestedAggregation('my_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'reverse_nested');

test(setsAggType, ReverseNestedAggregation, 'reverse_nested');
test(illegalCall, ReverseNestedAggregation, 'field');
test(illegalCall, ReverseNestedAggregation, 'script');
test(aggPropIsSet, 'path', { param: 'reverse_nested_path' });

test('constructor sets arguments', t => {
    const myAgg = getInstance('reverse_nested_path').toJSON();
    const expected = {
        my_agg: {
            reverse_nested: {
                path: 'reverse_nested_path'
            }
        }
    };
    t.deepEqual(myAgg, expected);
});
