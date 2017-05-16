import test from 'ava';
import { ScoreFunction } from '../../src/queries/compound-queries/score-functions';
import { BoolQuery, TermQuery } from '../../src';
import { illegalParamType, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new ScoreFunction('my_score_func');

const expectStrategy = (keyName, propValue) => ({
    my_score_func: {},
    [keyName]: propValue
});

const setsOption = makeSetsOptionMacro(getInstance, expectStrategy);

test(illegalParamType, getInstance(), 'filter', 'Query');
test(setsOption, 'filter', {
    param: new BoolQuery()
        .filter(new TermQuery('user', 'Idan'))
        .filter(new TermQuery('level', 'INFO'))
});
test(setsOption, 'weight', { param: 10 });
