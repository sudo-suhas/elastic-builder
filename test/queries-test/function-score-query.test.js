import test from 'ava';
import {
    FunctionScoreQuery,
    functionScoreQuery,
    TermQuery,
    ScriptScoreFunction,
    RandomScoreFunction,
    Script
} from '../../src';
import {
    illegalParamType,
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    functionScoreQuery,
    nameExpectStrategy('function_score', { functions: [] })
);

const termQry = new TermQuery('user', 'kimchy');

const scriptScoreFunc = new ScriptScoreFunction(
    new Script('inline', 'Math.log10(doc.likes.value + 2)')
);
const randScoreFunc = new RandomScoreFunction();

const instance = functionScoreQuery();

test(illegalParamType, instance, 'query', 'Query');
test(illegalParamType, instance, 'function', 'ScoreFunction');
test(illegalParamType, instance, 'functions', 'Array');
// prettier-ignore
test(validatedCorrectly, functionScoreQuery, 'scoreMode', [
    'multiply', 'sum', 'first', 'min', 'max', 'avg'
]);
// prettier-ignore
test(validatedCorrectly, functionScoreQuery, 'boostMode', [
    'multiply', 'replace', 'sum', 'avg', 'max', 'min'
]);
test(setsOption, 'query', { param: termQry });
test(setsOption, 'scoreMode', { param: 'multiply' });
test(setsOption, 'boostMode', { param: 'multiply' });
test(setsOption, 'maxBoost', { param: 999.9 });
test(setsOption, 'minScore', { param: 9.999 });
test(setsOption, 'functions', {
    param: [scriptScoreFunc, randScoreFunc],
    spread: false
});

test('checks array items', t => {
    t.notThrows(() =>
        new FunctionScoreQuery().functions([scriptScoreFunc, randScoreFunc])
    );
    const err = t.throws(
        () => new FunctionScoreQuery().functions([scriptScoreFunc, {}]),
        TypeError
    );
    t.is(err.message, 'Argument must be an instance of ScoreFunction');
});
