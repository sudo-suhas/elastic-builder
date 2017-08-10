import test from 'ava';
import { SpanMultiTermQuery, spanMultiTermQuery, PrefixQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    spanMultiTermQuery,
    nameExpectStrategy('span_multi')
);

const qry = new PrefixQuery('user', 'ki');

test(illegalParamType, new SpanMultiTermQuery(), 'match', 'MultiTermQueryBase');
test(setsOption, 'match', { param: qry });

test('constructor sets query', t => {
    const value = new SpanMultiTermQuery(qry).toJSON();
    const expected = {
        span_multi: {
            match: { prefix: { user: 'ki' } }
        }
    };
    t.deepEqual(value, expected);
});
