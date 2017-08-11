import test from 'ava';
import { SpanNotQuery, spanNotQuery, SpanTermQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    spanNotQuery,
    nameExpectStrategy('span_not')
);

const qry = new SpanTermQuery('text.stems', 'fox');

test(illegalParamType, new SpanNotQuery(), 'include', 'SpanQueryBase');
test(illegalParamType, new SpanNotQuery(), 'exclude', 'SpanQueryBase');
test(setsOption, 'include', { param: qry });
test(setsOption, 'exclude', { param: qry });
test(setsOption, 'pre', { param: 10 });
test(setsOption, 'post', { param: 10 });
test(setsOption, 'dist', { param: 10 });
