import test from 'ava';
import { MatchPhraseQueryBase } from '../../src/queries/full-text-queries';
import { illegalCall, fullTextQryExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new MatchPhraseQueryBase('my_qry_type', '', 'my_field', 'query str');

const setsOption = makeSetsOptionMacro(getInstance, fullTextQryExpectStrategy('my_qry_type'));

test(illegalCall, MatchPhraseQueryBase, 'minimumShouldMatch');
test(setsOption, 'slop', { param: 2 });
