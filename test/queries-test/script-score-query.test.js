import { describe, test, expect } from 'vitest';
import {
    MatchQuery,
    Script,
    ScriptScoreQuery,
    scriptScoreQuery
} from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const query = new MatchQuery('message', 'elasticsearch');

const lang = 'painless';
const source =
    "decayNumericLinear(params.origin, params.scale, params.offset, params.decay, doc['dval'].value)";
const params = { origin: 20, scale: 10, decay: 0.5, offset: 0 };
const script = new Script().lang(lang).source(source).params(params);

describe('ScriptScoreQuery', () => {
    describe('parameter type validation', () => {
        test('checks Query class for query', () => {
            const instance = new ScriptScoreQuery();
            expect(() => instance.query(null)).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
            expect(() => instance.query(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });

        test('checks Script class for script', () => {
            const instance = new ScriptScoreQuery();
            expect(() => instance.script(null)).toThrow(
                new TypeError('Argument must be an instance of Script')
            );
            expect(() => instance.script(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Script')
            );
        });
    });

    describe('options', () => {
        test('sets query option', () => {
            const result = scriptScoreQuery().query(query).toJSON();
            const expected = {
                script_score: {
                    query: recursiveToJSON(query.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets script option', () => {
            const result = scriptScoreQuery().script(script).toJSON();
            const expected = {
                script_score: {
                    script: recursiveToJSON(script.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets min_score option', () => {
            const result = scriptScoreQuery().minScore(9.999).toJSON();
            const expected = {
                script_score: {
                    min_score: 9.999
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
