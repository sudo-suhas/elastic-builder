import test from 'ava';
import { NestedAggregation } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) => new NestedAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'nested'));

test(setsAggType, NestedAggregation, 'nested');
test(illegalCall, NestedAggregation, 'field', 'my_agg');
test(illegalCall, NestedAggregation, 'script', 'my_agg');
test(setsOption, 'path', { param: 'nested_path' });

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
