import test from 'ava';
import { BoolQuery, boolQuery, TermQuery, MatchQuery } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(boolQuery, nameExpectStrategy('bool'));

const instance = boolQuery();

const termQryA = new TermQuery('user', 'kimchy');
const termQryB = new TermQuery('user', 'clint');
const matchQryA = new MatchQuery('message', 'this is a test');
const matchQryB = new MatchQuery('message', 'this is also a test');

/**
 * Macro for testing it throws when any item of array is not an instance of `Query`
 *
 * @param {*} t
 * @param {string} clause
 */
function checksArrayItems(t, clause) {
    t.notThrows(() => new BoolQuery()[clause]([termQryA, matchQryA]));
    const err = t.throws(() => new BoolQuery()[clause]([termQryA, {}]), TypeError);
    t.is(err.message, 'Argument must be an instance of Query');
}

checksArrayItems.title = (ignore, clause) => `checks array items for ${clause}`;

test(illegalParamType, instance, 'must', 'Query');
test(illegalParamType, instance, 'filter', 'Query');
test(illegalParamType, instance, 'mustNot', 'Query');
test(illegalParamType, instance, 'should', 'Query');
test(setsOption, 'must', { param: termQryA });
test(setsOption, 'filter', { param: termQryA });
test(setsOption, 'mustNot', { param: termQryA });
test(setsOption, 'should', { param: matchQryA });
test('sets must option(arr)', setsOption, 'must', {
    param: [termQryA, termQryB],
    spread: false
});
test('sets must option(arr)', setsOption, 'filter', {
    param: [termQryA, termQryB],
    spread: false
});
test('sets must option(arr)', setsOption, 'mustNot', {
    param: [termQryA, termQryB],
    spread: false
});
test('sets must option(arr)', setsOption, 'should', {
    param: [matchQryA, matchQryB],
    spread: false
});
test(setsOption, 'disableCoord', { param: true });
test(setsOption, 'minimumShouldMatch', { param: 1 });
test(setsOption, 'adjustPureNegative', { param: true });
test(checksArrayItems, 'must');
test(checksArrayItems, 'filter');
test(checksArrayItems, 'mustNot');
test(checksArrayItems, 'should');
