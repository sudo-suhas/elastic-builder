import test from 'ava';
import { ConstantScoreQuery, constantScoreQuery, TermQuery } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(constantScoreQuery, nameExpectStrategy('constant_score'));

const termQry = new TermQuery('user', 'kimchy');

test(illegalParamType, constantScoreQuery(), 'filter', 'Query');
test(illegalParamType, constantScoreQuery(), 'query', 'Query');
test(setsOption, 'filter', { param: termQry });
test(setsOption, 'query', { param: termQry, keyName: 'filter' });

test('constructor sets filter', t => {
    const valueA = new ConstantScoreQuery(termQry).toJSON();
    const valueB = new ConstantScoreQuery().filter(termQry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        constant_score: {
            filter: { term: { user: 'kimchy' } }
        }
    };
    t.deepEqual(valueA, expected);
});
