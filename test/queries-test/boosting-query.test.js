import test from 'ava';
import { BoostingQuery, boostingQuery, MatchQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    boostingQuery,
    nameExpectStrategy('boosting')
);

const matchQryA = new MatchQuery('message', 'this is a test');
const matchQryB = new MatchQuery('message', 'this is also a test');

test(illegalParamType, boostingQuery(), 'positive', 'Query');
test(illegalParamType, boostingQuery(), 'negative', 'Query');
test(setsOption, 'positive', { param: matchQryA });
test(setsOption, 'negative', { param: matchQryA });
test(setsOption, 'negativeBoost', { param: 0.4 });

test('constructor sets arguments', t => {
    const valueA = new BoostingQuery(matchQryA, matchQryB, 0.4).toJSON();
    const valueB = new BoostingQuery()
        .positive(matchQryA)
        .negative(matchQryB)
        .negativeBoost(0.4)
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        boosting: {
            positive: {
                match: { message: 'this is a test' }
            },
            negative: {
                match: { message: 'this is also a test' }
            },
            negative_boost: 0.4
        }
    };
    t.deepEqual(valueA, expected);
});
