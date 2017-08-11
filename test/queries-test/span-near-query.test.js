import test from 'ava';
import { SpanNearQuery, spanNearQuery, SpanTermQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    spanNearQuery,
    nameExpectStrategy('span_near')
);

const qry1 = new SpanTermQuery('field', 'value1');
const qry2 = new SpanTermQuery('field', 'value2');

test(illegalParamType, new SpanNearQuery(), 'clauses', 'Array');
test(setsOption, 'clauses', { param: [qry1, qry2], spread: false });
test(setsOption, 'slop', { param: 2 });
test(setsOption, 'inOrder', { param: true });

test('checks clauses type', t => {
    const err = t.throws(() => new SpanNearQuery().clauses([qry1, {}]));
    t.is(err.message, 'Argument must be an instance of SpanQueryBase');
});
