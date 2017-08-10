import test from 'ava';
import { ScriptQuery, scriptQuery, Script } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    scriptQuery,
    nameExpectStrategy('script')
);

const script = new Script()
    .lang('groovy')
    .file('calculate-score')
    .params({ my_modifier: 2 });

test(illegalParamType, new ScriptQuery(), 'script', 'Script');
test(setsOption, 'script', { param: script });

test('constructor sets script', t => {
    const value = new ScriptQuery(script).toJSON();
    const expected = {
        script: {
            script: {
                file: 'calculate-score',
                lang: 'groovy',
                params: { my_modifier: 2 }
            }
        }
    };
    t.deepEqual(value, expected);
});
