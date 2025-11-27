import { describe, test, expect } from 'vitest';
import { ScriptScoreFunction, scriptScoreFunction, Script } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const scoreScript = new Script('inline', 'Math.log10(doc.likes.value + 2)');

describe('ScriptScoreFunction', () => {
    describe('options', () => {
        test('sets script option', () => {
            const result = scriptScoreFunction().script(scoreScript).toJSON();
            const expected = {
                script_score: {
                    script: recursiveToJSON(scoreScript.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets script with Script object', () => {
            const valueA = new ScriptScoreFunction(scoreScript).toJSON();
            const valueB = new ScriptScoreFunction()
                .script(scoreScript)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                script_score: {
                    script: {
                        inline: 'Math.log10(doc.likes.value + 2)'
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('constructor sets script with string', () => {
            const valueA = new ScriptScoreFunction(
                "_score * doc['view_count'].value"
            ).toJSON();
            const valueB = new ScriptScoreFunction()
                .script("_score * doc['view_count'].value")
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                script_score: {
                    script: "_score * doc['view_count'].value"
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
