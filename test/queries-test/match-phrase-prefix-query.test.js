import test from 'ava';
import { MatchPhrasePrefixQuery } from '../../src';
import { fullTextQryExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new MatchPhrasePrefixQuery('my_field', 'query str');

const setsOption = makeSetsOptionMacro(
    getInstance,
    fullTextQryExpectStrategy('match_phrase_prefix')
);

test(setsOption, 'maxExpansions', { param: 50 });
