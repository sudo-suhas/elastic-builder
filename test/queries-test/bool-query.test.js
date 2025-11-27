import { describe, test, expect } from 'vitest';
import { BoolQuery, boolQuery, TermQuery, MatchQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const termQryA = new TermQuery('user', 'kimchy');
const termQryB = new TermQuery('user', 'clint');
const matchQryA = new MatchQuery('message', 'this is a test');
const matchQryB = new MatchQuery('message', 'this is also a test');

describe('BoolQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('must()', () => {
                expect(() => boolQuery().must(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('filter()', () => {
                expect(() => boolQuery().filter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('mustNot()', () => {
                expect(() => boolQuery().mustNot(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('should()', () => {
                expect(() => boolQuery().should(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('array item validation', () => {
        test('must() accepts valid array', () => {
            expect(() =>
                new BoolQuery().must([termQryA, matchQryA])
            ).not.toThrow();
        });

        test('must() throws for array with invalid item', () => {
            expect(() => new BoolQuery().must([termQryA, {}])).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });

        test('filter() accepts valid array', () => {
            expect(() =>
                new BoolQuery().filter([termQryA, matchQryA])
            ).not.toThrow();
        });

        test('filter() throws for array with invalid item', () => {
            expect(() => new BoolQuery().filter([termQryA, {}])).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });

        test('mustNot() accepts valid array', () => {
            expect(() =>
                new BoolQuery().mustNot([termQryA, matchQryA])
            ).not.toThrow();
        });

        test('mustNot() throws for array with invalid item', () => {
            expect(() => new BoolQuery().mustNot([termQryA, {}])).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });

        test('should() accepts valid array', () => {
            expect(() =>
                new BoolQuery().should([matchQryA, matchQryB])
            ).not.toThrow();
        });

        test('should() throws for array with invalid item', () => {
            expect(() => new BoolQuery().should([matchQryA, {}])).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });
    });

    describe('single query options', () => {
        test('sets must option', () => {
            const result = boolQuery().must(termQryA).toJSON();
            const expected = {
                bool: {
                    must: recursiveToJSON(termQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets filter option', () => {
            const result = boolQuery().filter(termQryA).toJSON();
            const expected = {
                bool: {
                    filter: recursiveToJSON(termQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets must_not option', () => {
            const result = boolQuery().mustNot(termQryA).toJSON();
            const expected = {
                bool: {
                    must_not: recursiveToJSON(termQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets should option', () => {
            const result = boolQuery().should(matchQryA).toJSON();
            const expected = {
                bool: {
                    should: recursiveToJSON(matchQryA.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('array query options', () => {
        test('sets must option(arr)', () => {
            const result = boolQuery().must([termQryA, termQryB]).toJSON();
            const expected = {
                bool: {
                    must: [
                        recursiveToJSON(termQryA.toJSON()),
                        recursiveToJSON(termQryB.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets filter option(arr)', () => {
            const result = boolQuery().filter([termQryA, termQryB]).toJSON();
            const expected = {
                bool: {
                    filter: [
                        recursiveToJSON(termQryA.toJSON()),
                        recursiveToJSON(termQryB.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets must_not option(arr)', () => {
            const result = boolQuery().mustNot([termQryA, termQryB]).toJSON();
            const expected = {
                bool: {
                    must_not: [
                        recursiveToJSON(termQryA.toJSON()),
                        recursiveToJSON(termQryB.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets should option(arr)', () => {
            const result = boolQuery().should([matchQryA, matchQryB]).toJSON();
            const expected = {
                bool: {
                    should: [
                        recursiveToJSON(matchQryA.toJSON()),
                        recursiveToJSON(matchQryB.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('boolean options', () => {
        test('sets disable_coord option', () => {
            const result = boolQuery().disableCoord(true).toJSON();
            const expected = { bool: { disable_coord: true } };
            expect(result).toEqual(expected);
        });

        test('sets minimum_should_match option', () => {
            const result = boolQuery().minimumShouldMatch(1).toJSON();
            const expected = { bool: { minimum_should_match: 1 } };
            expect(result).toEqual(expected);
        });

        test('sets adjust_pure_negative option', () => {
            const result = boolQuery().adjustPureNegative(true).toJSON();
            const expected = { bool: { adjust_pure_negative: true } };
            expect(result).toEqual(expected);
        });
    });
});
