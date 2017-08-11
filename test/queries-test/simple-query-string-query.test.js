import test from 'ava';
import { SimpleQueryStringQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new SimpleQueryStringQuery();

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('simple_query_string')
);

test(setsOption, 'flags', { param: 'PREFIX|PHRASE' });
