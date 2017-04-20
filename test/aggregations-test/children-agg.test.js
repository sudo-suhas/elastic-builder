import test from 'ava';
import { ChildrenAggregation } from '../../src';
import { illegalCall, setsAggType } from '../_macros';

test(setsAggType, ChildrenAggregation, 'children');
test(illegalCall, ChildrenAggregation, 'field');
test(illegalCall, ChildrenAggregation, 'script');

test('type is set', t => {
    const value = new ChildrenAggregation('to_answers').type('answer').toJSON();
    const expected = {
        to_answers: {
            children: {
                type: 'answer'
            }
        }
    };
    t.deepEqual(value, expected);
});
