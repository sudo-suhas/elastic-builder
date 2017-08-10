import test from 'ava';
import { SpanLittleBigQueryBase } from '../../src/queries/span-queries';
import { SpanTermQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new SpanLittleBigQueryBase('my_qry_type');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('my_qry_type')
);

const qry = new SpanTermQuery('text.stems', 'fox');

test(illegalParamType, getInstance(), 'little', 'SpanQueryBase');
test(illegalParamType, getInstance(), 'big', 'SpanQueryBase');
test(setsOption, 'little', { param: qry });
test(setsOption, 'big', { param: qry });
