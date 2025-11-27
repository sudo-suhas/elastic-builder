import { describe, test, expect } from 'vitest';
import { MatchQuery } from '../../src';

const getInstance = () => new MatchQuery('my_field', 'query str');

describe('MatchQuery', () => {
    describe('operator() validation', () => {
        test.each([
            { name: 'accepts valid value: and', value: 'and' },
            {
                name: 'accepts valid value: AND (case-insensitive)',
                value: 'AND'
            },
            { name: 'accepts valid value: or', value: 'or' },
            { name: 'accepts valid value: OR (case-insensitive)', value: 'OR' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().operator(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_operator' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().operator(value)).toThrow(
                new Error(
                    "The 'operator' parameter should be one of 'and' or 'or'"
                )
            );
        });
    });

    describe('zeroTermsQuery() validation', () => {
        test.each([
            { name: 'accepts valid value: all', value: 'all' },
            {
                name: 'accepts valid value: ALL (case-insensitive)',
                value: 'ALL'
            },
            { name: 'accepts valid value: none', value: 'none' },
            {
                name: 'accepts valid value: NONE (case-insensitive)',
                value: 'NONE'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().zeroTermsQuery(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_zero_terms_query'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().zeroTermsQuery(value)).toThrow(
                new Error(
                    "The 'zero_terms_query' parameter should be one of 'all' or 'none'"
                )
            );
        });
    });

    describe('rewrite() validation', () => {
        test.each([
            {
                name: 'accepts valid value: constant_score',
                value: 'constant_score'
            },
            {
                name: 'accepts valid value: scoring_boolean',
                value: 'scoring_boolean'
            },
            {
                name: 'accepts valid value: constant_score_boolean',
                value: 'constant_score_boolean'
            },
            {
                name: 'accepts valid value: constant_score_filter',
                value: 'constant_score_filter'
            },
            {
                name: 'accepts valid value: top_terms_boost_23',
                value: 'top_terms_boost_23'
            },
            { name: 'accepts valid value: top_terms_15', value: 'top_terms_15' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().rewrite(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_rewrite' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().rewrite(value)).toThrow();
        });
    });

    describe('fuzzyRewrite() validation', () => {
        test.each([
            {
                name: 'accepts valid value: constant_score',
                value: 'constant_score'
            },
            {
                name: 'accepts valid value: scoring_boolean',
                value: 'scoring_boolean'
            },
            {
                name: 'accepts valid value: constant_score_boolean',
                value: 'constant_score_boolean'
            },
            {
                name: 'accepts valid value: constant_score_filter',
                value: 'constant_score_filter'
            },
            {
                name: 'accepts valid value: top_terms_boost_23',
                value: 'top_terms_boost_23'
            },
            { name: 'accepts valid value: top_terms_15', value: 'top_terms_15' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().fuzzyRewrite(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_fuzzy_rewrite' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().fuzzyRewrite(value)).toThrow();
        });
    });

    describe('options', () => {
        test('sets operator option', () => {
            const result = getInstance().operator('and').toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        operator: 'and'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets lenient option', () => {
            const result = getInstance().lenient(true).toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        lenient: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzziness option', () => {
            const result = getInstance().fuzziness('AUTO').toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        fuzziness: 'AUTO'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets prefix_length option', () => {
            const result = getInstance().prefixLength(5).toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        prefix_length: 5
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_expansions option', () => {
            const result = getInstance().maxExpansions(3).toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        max_expansions: 3
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets rewrite option', () => {
            const result = getInstance().rewrite('constant_score').toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        rewrite: 'constant_score'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzzy_rewrite option', () => {
            const result = getInstance()
                .fuzzyRewrite('constant_score_boolean')
                .toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        fuzzy_rewrite: 'constant_score_boolean'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzzy_transpositions option', () => {
            const result = getInstance().fuzzyTranspositions(true).toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        fuzzy_transpositions: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets zero_terms_query option', () => {
            const result = getInstance().zeroTermsQuery('all').toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        zero_terms_query: 'all'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets cutoff_frequency option', () => {
            const result = getInstance().cutoffFrequency(10).toJSON();
            const expected = {
                match: {
                    my_field: {
                        query: 'query str',
                        cutoff_frequency: 10
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
