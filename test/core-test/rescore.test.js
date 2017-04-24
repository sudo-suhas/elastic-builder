import test from 'ava';
import { Rescore, rescore, MatchPhraseQuery } from '../../src';
import { illegalParamType, validatedCorrectly, makeSetsOptionMacro } from '../_macros';

const rescoreExpectStrategy = (keyName, propValue) => ({ query: { [keyName]: propValue } });

const setsRescoreOption = makeSetsOptionMacro(rescore, rescoreExpectStrategy);

const rescoreQry = new MatchPhraseQuery('message', 'the quick brown');

test(illegalParamType, new Rescore(), 'rescoreQuery', 'Query');
test(validatedCorrectly, rescore, 'scoreMode', ['total', 'multiply', 'avg', 'max', 'min']);
test(setsRescoreOption, 'rescoreQuery', { param: rescoreQry });
test(setsRescoreOption, 'queryWeight', { param: 0.7 });
test(setsRescoreOption, 'rescoreQueryWeight', { param: 1.7 });

test('constructor sets arguments', t => {
    const valueA = new Rescore(50, rescoreQry).toJSON();
    const valueB = new Rescore().windowSize(50).rescoreQuery(rescoreQry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        query: {
            rescore_query: {
                match_phrase: { message: 'the quick brown' }
            }
        },
        window_size: 50
    };
    t.deepEqual(valueA, expected);
});

test('sets window_size option', t => {
    const value = new Rescore().windowSize(50).toJSON();
    const expected = {
        query: {},
        window_size: 50
    };
    t.deepEqual(value, expected);
});
