import test from 'ava';
import { SpanOrQuery, spanOrQuery, SpanTermQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    spanOrQuery,
    nameExpectStrategy('span_or')
);

const qry1 = new SpanTermQuery('field', 'value1');
const qry2 = new SpanTermQuery('field', 'value2');

test(illegalParamType, new SpanOrQuery(), 'clauses', 'Array');
test(setsOption, 'clauses', { param: [qry1, qry2], spread: false });

test('checks clauses type', t => {
    const err = t.throws(() => new SpanOrQuery().clauses([qry1, {}]));
    t.is(err.message, 'Argument must be an instance of SpanQueryBase');
});
