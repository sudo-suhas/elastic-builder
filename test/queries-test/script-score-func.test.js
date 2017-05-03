import test from 'ava';
import { ScriptScoreFunction, scriptScoreFunction, Script } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(scriptScoreFunction, nameExpectStrategy('script_score'));

const scoreScript = new Script('inline', 'Math.log10(doc.likes.value + 2)');

test(setsOption, 'script', { param: scoreScript });

test('constructor sets script', t => {
    let valueA = new ScriptScoreFunction(scoreScript).toJSON();
    let valueB = new ScriptScoreFunction().script(scoreScript).toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        script_score: {
            script: {
                inline: 'Math.log10(doc.likes.value + 2)'
            }
        }
    };
    t.deepEqual(valueA, expected);

    valueA = new ScriptScoreFunction("_score * doc['view_count'].value").toJSON();
    valueB = new ScriptScoreFunction().script("_score * doc['view_count'].value").toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        script_score: {
            script: "_score * doc['view_count'].value"
        }
    };
    t.deepEqual(valueA, expected);
});
