import { describe, test, expect } from 'vitest';
import {
    FunctionScoreQuery,
    functionScoreQuery,
    TermQuery,
    ScriptScoreFunction,
    RandomScoreFunction,
    Script
} from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const termQry = new TermQuery('user', 'kimchy');
const scriptScoreFunc = new ScriptScoreFunction(
    new Script('inline', 'Math.log10(doc.likes.value + 2)')
);
const randScoreFunc = new RandomScoreFunction();

describe('FunctionScoreQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('query()', () => {
                expect(() => functionScoreQuery().query(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('function()', () => {
                expect(() => functionScoreQuery().function(value)).toThrow(
                    new TypeError(
                        'Argument must be an instance of ScoreFunction'
                    )
                );
            });

            test('functions()', () => {
                expect(() => functionScoreQuery().functions(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('array item validation', () => {
        test('checks array items', () => {
            expect(() =>
                new FunctionScoreQuery().functions([
                    scriptScoreFunc,
                    randScoreFunc
                ])
            ).not.toThrow();
            expect(() =>
                new FunctionScoreQuery().functions([scriptScoreFunc, {}])
            ).toThrow(
                new TypeError('Argument must be an instance of ScoreFunction')
            );
        });
    });

    describe('scoreMode() validation', () => {
        test.each([
            { name: 'accepts valid value: multiply', value: 'multiply' },
            {
                name: 'accepts valid value: MULTIPLY (case-insensitive)',
                value: 'MULTIPLY'
            },
            { name: 'accepts valid value: sum', value: 'sum' },
            {
                name: 'accepts valid value: SUM (case-insensitive)',
                value: 'SUM'
            },
            { name: 'accepts valid value: first', value: 'first' },
            {
                name: 'accepts valid value: FIRST (case-insensitive)',
                value: 'FIRST'
            },
            { name: 'accepts valid value: min', value: 'min' },
            {
                name: 'accepts valid value: MIN (case-insensitive)',
                value: 'MIN'
            },
            { name: 'accepts valid value: max', value: 'max' },
            {
                name: 'accepts valid value: MAX (case-insensitive)',
                value: 'MAX'
            },
            { name: 'accepts valid value: avg', value: 'avg' },
            {
                name: 'accepts valid value: AVG (case-insensitive)',
                value: 'AVG'
            }
        ])('$name', ({ value }) => {
            expect(() => functionScoreQuery().scoreMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_score_mode' }
        ])('$name', ({ value }) => {
            expect(() => functionScoreQuery().scoreMode(value)).toThrow(
                /The 'score_mode' parameter should be one of/
            );
        });
    });

    describe('boostMode() validation', () => {
        test.each([
            { name: 'accepts valid value: multiply', value: 'multiply' },
            {
                name: 'accepts valid value: MULTIPLY (case-insensitive)',
                value: 'MULTIPLY'
            },
            { name: 'accepts valid value: replace', value: 'replace' },
            {
                name: 'accepts valid value: REPLACE (case-insensitive)',
                value: 'REPLACE'
            },
            { name: 'accepts valid value: sum', value: 'sum' },
            {
                name: 'accepts valid value: SUM (case-insensitive)',
                value: 'SUM'
            },
            { name: 'accepts valid value: avg', value: 'avg' },
            {
                name: 'accepts valid value: AVG (case-insensitive)',
                value: 'AVG'
            },
            { name: 'accepts valid value: max', value: 'max' },
            {
                name: 'accepts valid value: MAX (case-insensitive)',
                value: 'MAX'
            },
            { name: 'accepts valid value: min', value: 'min' },
            {
                name: 'accepts valid value: MIN (case-insensitive)',
                value: 'MIN'
            }
        ])('$name', ({ value }) => {
            expect(() => functionScoreQuery().boostMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_boost_mode' }
        ])('$name', ({ value }) => {
            expect(() => functionScoreQuery().boostMode(value)).toThrow(
                /The 'boost_mode' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets query option', () => {
            const result = functionScoreQuery().query(termQry).toJSON();
            const expected = {
                function_score: {
                    functions: [],
                    query: recursiveToJSON(termQry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets score_mode option', () => {
            const result = functionScoreQuery().scoreMode('multiply').toJSON();
            const expected = {
                function_score: {
                    functions: [],
                    score_mode: 'multiply'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets boost_mode option', () => {
            const result = functionScoreQuery().boostMode('multiply').toJSON();
            const expected = {
                function_score: {
                    functions: [],
                    boost_mode: 'multiply'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_boost option', () => {
            const result = functionScoreQuery().maxBoost(999.9).toJSON();
            const expected = {
                function_score: {
                    functions: [],
                    max_boost: 999.9
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets min_score option', () => {
            const result = functionScoreQuery().minScore(9.999).toJSON();
            const expected = {
                function_score: {
                    functions: [],
                    min_score: 9.999
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets functions option', () => {
            const result = functionScoreQuery()
                .functions([scriptScoreFunc, randScoreFunc])
                .toJSON();
            const expected = {
                function_score: {
                    functions: [
                        recursiveToJSON(scriptScoreFunc.toJSON()),
                        recursiveToJSON(randScoreFunc.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
