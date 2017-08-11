import test from 'ava';
import { ReverseNestedAggregation } from '../../src';
import {
    setsAggType,
    illegalCall,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (...args) =>
    new ReverseNestedAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'reverse_nested')
);

test(setsAggType, ReverseNestedAggregation, 'reverse_nested');
test(illegalCall, ReverseNestedAggregation, 'field', 'my_agg');
test(illegalCall, ReverseNestedAggregation, 'script', 'my_agg');
test(setsOption, 'path', { param: 'reverse_nested_path' });

test('constructor sets arguments', t => {
    const value = getInstance('reverse_nested_path').toJSON();
    const expected = {
        my_agg: {
            reverse_nested: {
                path: 'reverse_nested_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
