import test from 'ava';
import { MatchPhrasePrefixQuery } from '../../src';
import { nameFieldExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new MatchPhrasePrefixQuery('my_field', 'query str');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('match_phrase_prefix', { query: 'query str' })
);

test(setsOption, 'maxExpansions', { param: 50 });
