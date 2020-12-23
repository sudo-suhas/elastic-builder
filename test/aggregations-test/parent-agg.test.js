import test from 'ava';
import { ParentAggregation } from '../../src';
import { illegalCall, setsAggType } from '../_macros';

test(setsAggType, ParentAggregation, 'parent');
test(illegalCall, ParentAggregation, 'field', 'my_agg');
test(illegalCall, ParentAggregation, 'script', 'my_agg');

test('constructor sets type', t => {
    const value = new ParentAggregation('to_questions', 'answer').toJSON();
    const expected = {
        to_questions: {
            parent: {
                type: 'answer'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('type is set', t => {
    const value = new ParentAggregation('to_questions').type('answer').toJSON();
    const expected = {
        to_questions: {
            parent: {
                type: 'answer'
            }
        }
    };
    t.deepEqual(value, expected);
});
