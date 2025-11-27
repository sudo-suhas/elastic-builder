import { describe, test, expect } from 'vitest';
import { BoostingQuery, boostingQuery, MatchQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const matchQryA = new MatchQuery('message', 'this is a test');
const matchQryB = new MatchQuery('message', 'this is also a test');

describe('BoostingQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('positive()', () => {
                const instance = boostingQuery();
                expect(() => instance.positive(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('negative()', () => {
                const instance = boostingQuery();
                expect(() => instance.negative(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('options', () => {
        test('sets positive option', () => {
            const result = boostingQuery().positive(matchQryA).toJSON();
            const expected = {
                boosting: {
                    positive: recursiveToJSON(matchQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets negative option', () => {
            const result = boostingQuery().negative(matchQryA).toJSON();
            const expected = {
                boosting: {
                    negative: recursiveToJSON(matchQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets negative_boost option', () => {
            const result = boostingQuery().negativeBoost(0.4).toJSON();
            const expected = {
                boosting: {
                    negative_boost: 0.4
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new BoostingQuery(
                matchQryA,
                matchQryB,
                0.4
            ).toJSON();
            const valueB = new BoostingQuery()
                .positive(matchQryA)
                .negative(matchQryB)
                .negativeBoost(0.4)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                boosting: {
                    positive: {
                        match: { message: 'this is a test' }
                    },
                    negative: {
                        match: { message: 'this is also a test' }
                    },
                    negative_boost: 0.4
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
