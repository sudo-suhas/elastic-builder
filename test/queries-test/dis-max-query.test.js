import test from 'ava';
import { DisMaxQuery, disMaxQuery, TermQuery, MatchQuery } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(disMaxQuery, nameExpectStrategy('dis_max'));

const termQry = new TermQuery('user', 'kimchy');
const matchQry = new MatchQuery('message', 'this is a test');

test(illegalParamType, disMaxQuery(), 'queries', 'Query');
test(setsOption, 'tieBreaker', { param: 1.42 });
test(setsOption, 'queries', { param: termQry, propValue: [termQry] });
test('sets queries option(arr)', setsOption, 'queries', {
    param: [termQry, matchQry],
    spread: false
});

test('checks array items', t => {
    t.notThrows(() => new DisMaxQuery().queries([termQry, matchQry]));
    const err = t.throws(() => new DisMaxQuery().queries([termQry, {}]), TypeError);
    t.is(err.message, 'Argument must be an instance of Query');
});
