import test from 'ava';
import { SpanFirstQuery, spanFirstQuery, SpanTermQuery } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(spanFirstQuery, nameExpectStrategy('span_first'));

const qry = new SpanTermQuery('text.stems', 'fox');

test(illegalParamType, new SpanFirstQuery(), 'match', 'SpanQueryBase');
test(setsOption, 'match', { param: qry });
test(setsOption, 'end', { param: 10 });

test('constructor sets query', t => {
    const valueA = new SpanFirstQuery(qry).toJSON();
    const valueB = new SpanFirstQuery().match(qry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        span_first: {
            match: { span_term: { 'text.stems': 'fox' } }
        }
    };
    t.deepEqual(valueA, expected);
});
