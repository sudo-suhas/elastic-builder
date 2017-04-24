import test from 'ava';
import { ScriptScoreFunction, scriptScoreFunction, Script } from '../../src';
import { illegalParamType, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(scriptScoreFunction, nameExpectStrategy('script_score'));

const scoreScript = new Script('inline', 'Math.log10(doc.likes.value + 2)');

test(illegalParamType, scriptScoreFunction(), 'script', 'Script');
test(setsOption, 'script', { param: scoreScript });

test('constructor sets script', t => {
    const value = new ScriptScoreFunction(scoreScript).toJSON();
    const expected = new ScriptScoreFunction().script(scoreScript).toJSON();
    t.deepEqual(value, expected);
});
