import { describe, test, expect } from 'vitest';
import * as esb from '../src';

describe('recipes', () => {
    describe('missingQuery', () => {
        test('exports alias', () => {
            expect(esb.recipes.missingQuery).toBe(esb.cookMissingQuery);
        });

        test('creates BoolQuery with must_not exists filter', () => {
            const value = esb.recipes.missingQuery('my_field');
            expect(value.constructor.name).toBe('BoolQuery');

            const expected = {
                bool: {
                    must_not: { exists: { field: 'my_field' } }
                }
            };
            expect(value.toJSON()).toEqual(expected);
        });
    });

    // Table-driven test for parameter validation across recipes
    describe('parameter validation', () => {
        const recipes = [
            { name: 'randomSortQuery', method: 'randomSortQuery' },
            { name: 'filterQuery', method: 'filterQuery' }
        ];

        recipes.forEach(recipe => {
            describe(recipe.name, () => {
                test('throws TypeError for null query parameter', () => {
                    expect(() => esb.recipes[recipe.method](null)).toThrow(
                        TypeError
                    );
                    expect(() => esb.recipes[recipe.method](null)).toThrow(
                        'Argument must be an instance of Query'
                    );
                });

                test('throws TypeError for invalid query parameter type', () => {
                    const invalidParam = Object.create(null);
                    expect(() =>
                        esb.recipes[recipe.method](invalidParam)
                    ).toThrow(TypeError);
                    expect(() =>
                        esb.recipes[recipe.method](invalidParam)
                    ).toThrow('Argument must be an instance of Query');
                });
            });
        });
    });

    describe('randomSortQuery', () => {
        test('exports alias', () => {
            expect(esb.recipes.randomSortQuery).toBe(esb.cookRandomSortQuery);
        });

        test('creates FunctionScoreQuery with random_score function', () => {
            const value = esb.recipes.randomSortQuery();
            expect(value.constructor.name).toBe('FunctionScoreQuery');

            const expected = {
                function_score: {
                    query: {
                        match_all: {}
                    },
                    functions: [{ random_score: {} }]
                }
            };
            expect(value.toJSON()).toEqual(expected);
        });

        test('creates FunctionScoreQuery with custom query and seed', () => {
            const seed = Date.now();
            const value = esb.recipes
                .randomSortQuery(new esb.RangeQuery('age').gte(10), seed)
                .toJSON();

            const expected = {
                function_score: {
                    query: {
                        range: { age: { gte: 10 } }
                    },
                    functions: [{ random_score: { seed } }]
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('filterQuery', () => {
        test('exports alias', () => {
            expect(esb.recipes.filterQuery).toBe(esb.cookFilterQuery);
        });

        test('creates BoolQuery with filter clause', () => {
            const qry = new esb.TermQuery('status', 'active');
            const value = esb.recipes.filterQuery(qry);
            expect(value.constructor.name).toBe('BoolQuery');

            const expected = {
                bool: {
                    filter: {
                        term: { status: 'active' }
                    }
                }
            };
            expect(value.toJSON()).toEqual(expected);
        });

        test('creates BoolQuery with match_all query when includeMatchAll is true', () => {
            const qry = new esb.TermQuery('status', 'active');
            const value = esb.recipes.filterQuery(qry, true).toJSON();

            const expected = {
                bool: {
                    must: { match_all: {} },
                    filter: {
                        term: { status: 'active' }
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
