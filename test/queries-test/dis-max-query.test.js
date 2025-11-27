import { describe, test, expect } from 'vitest';
import { DisMaxQuery, disMaxQuery, TermQuery, MatchQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const termQry = new TermQuery('user', 'kimchy');
const matchQry = new MatchQuery('message', 'this is a test');

describe('DisMaxQuery', () => {
    describe('parameter type validation', () => {
        test('checks Query class for queries', () => {
            const instance = disMaxQuery();
            expect(() => instance.queries(null)).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
            expect(() => instance.queries(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });
    });

    describe('array item validation', () => {
        test('checks array items', () => {
            expect(() =>
                new DisMaxQuery().queries([termQry, matchQry])
            ).not.toThrow();
            expect(() => new DisMaxQuery().queries([termQry, {}])).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });
    });

    describe('options', () => {
        test('sets tie_breaker option', () => {
            const result = disMaxQuery().tieBreaker(1.42).toJSON();
            const expected = {
                dis_max: {
                    tie_breaker: 1.42
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets queries option', () => {
            const result = disMaxQuery().queries(termQry).toJSON();
            const expected = {
                dis_max: {
                    queries: [recursiveToJSON(termQry.toJSON())]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets queries option(arr)', () => {
            const result = disMaxQuery().queries([termQry, matchQry]).toJSON();
            const expected = {
                dis_max: {
                    queries: [
                        recursiveToJSON(termQry.toJSON()),
                        recursiveToJSON(matchQry.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
