import test from 'ava';
import {
    MatchQuery,
    Script,
    ScriptScoreQuery,
    scriptScoreQuery
} from '../../src';
import {
    illegalParamType,
    makeSetsOptionMacro,
    nameExpectStrategy
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    scriptScoreQuery,
    nameExpectStrategy('script_score')
);

const query = new MatchQuery('message', 'elasticsearch');

const lang = 'painless';
const source =
    "decayNumericLinear(params.origin, params.scale, params.offset, params.decay, doc['dval'].value)";
const params = { origin: 20, scale: 10, decay: 0.5, offset: 0 };
const script = new Script()
    .lang(lang)
    .source(source)
    .params(params);

const instance = new ScriptScoreQuery();

test(illegalParamType, instance, 'query', 'Query');
test(illegalParamType, instance, 'script', 'Script');

test(setsOption, 'query', { param: query });
test(setsOption, 'script', { param: script });
test(setsOption, 'minScore', { param: 9.999 });
