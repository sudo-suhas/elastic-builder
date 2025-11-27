import { describe, test, expect } from 'vitest';
import { Rescore, rescore, MatchPhraseQuery } from '../../src';

describe('Rescore', () => {
    describe('constructor', () => {
        test('sets arguments', () => {
            const rescoreQry = new MatchPhraseQuery(
                'message',
                'the quick brown'
            );
            const valueA = new Rescore(50, rescoreQry).toJSON();
            const valueB = new Rescore()
                .windowSize(50)
                .rescoreQuery(rescoreQry)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                query: {
                    rescore_query: {
                        match_phrase: { message: 'the quick brown' }
                    }
                },
                window_size: 50
            };
            expect(valueA).toEqual(expected);
        });
    });

    describe('parameter validation', () => {
        test.each([
            {
                name: 'rescoreQuery() throws TypeError for null parameter',
                value: null
            },
            {
                name: 'rescoreQuery() throws TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            expect(() => new Rescore().rescoreQuery(value)).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });
    });

    describe('scoreMode() validation', () => {
        test.each([
            { name: 'accepts valid scoreMode: total', value: 'total' },
            {
                name: 'accepts valid scoreMode: TOTAL (case-insensitive)',
                value: 'TOTAL'
            },
            { name: 'accepts valid scoreMode: multiply', value: 'multiply' },
            {
                name: 'accepts valid scoreMode: MULTIPLY (case-insensitive)',
                value: 'MULTIPLY'
            },
            { name: 'accepts valid scoreMode: avg', value: 'avg' },
            {
                name: 'accepts valid scoreMode: AVG (case-insensitive)',
                value: 'AVG'
            },
            { name: 'accepts valid scoreMode: max', value: 'max' },
            {
                name: 'accepts valid scoreMode: MAX (case-insensitive)',
                value: 'MAX'
            },
            { name: 'accepts valid scoreMode: min', value: 'min' },
            {
                name: 'accepts valid scoreMode: MIN (case-insensitive)',
                value: 'MIN'
            }
        ])('$name', ({ value }) => {
            expect(() => rescore().scoreMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null scoreMode', value: null },
            {
                name: 'throws for invalid scoreMode',
                value: 'invalid_score_mode'
            }
        ])('$name', ({ value }) => {
            expect(() => rescore().scoreMode(value)).toThrow(
                /The 'score_mode' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets rescoreQuery option', () => {
            const rescoreQry = new MatchPhraseQuery(
                'message',
                'the quick brown'
            );
            const result = rescore().rescoreQuery(rescoreQry).toJSON();
            const expected = {
                query: { rescore_query: rescoreQry.toJSON() }
            };
            expect(result).toEqual(expected);
        });

        test('sets queryWeight option', () => {
            const result = rescore().queryWeight(0.7).toJSON();
            const expected = {
                query: { query_weight: 0.7 }
            };
            expect(result).toEqual(expected);
        });

        test('sets rescoreQueryWeight option', () => {
            const result = rescore().rescoreQueryWeight(1.7).toJSON();
            const expected = {
                query: { rescore_query_weight: 1.7 }
            };
            expect(result).toEqual(expected);
        });

        test('sets window_size option', () => {
            const value = new Rescore().windowSize(50).toJSON();
            const expected = {
                query: {},
                window_size: 50
            };
            expect(value).toEqual(expected);
        });
    });
});
