import test from 'ava';
import { MatchPhraseQueryBase } from '../../src/queries/full-text-queries';
import { illegalCall, nameFieldExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new MatchPhraseQueryBase('my_qry_type', '', 'my_field', 'query str');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('my_qry_type', { query: 'query str' })
);

test(illegalCall, MatchPhraseQueryBase, 'minimumShouldMatch');
test(setsOption, 'slop', { param: 2 });
