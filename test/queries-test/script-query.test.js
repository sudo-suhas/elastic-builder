import { describe, test, expect } from 'vitest';
import { ScriptQuery, scriptQuery, Script } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const script = new Script()
    .lang('groovy')
    .file('calculate-score')
    .params({ my_modifier: 2 });

describe('ScriptQuery', () => {
    describe('parameter type validation', () => {
        test('checks Script class for script', () => {
            const instance = new ScriptQuery();
            expect(() => instance.script(null)).toThrow(
                new TypeError('Argument must be an instance of Script')
            );
            expect(() => instance.script(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Script')
            );
        });
    });

    describe('options', () => {
        test('sets script option', () => {
            const result = scriptQuery().script(script).toJSON();
            const expected = {
                script: {
                    script: recursiveToJSON(script.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets script', () => {
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
            expect(value).toEqual(expected);
        });
    });
});
