import { describe, test, expect } from 'vitest';
import { MultiMatchQuery } from '../../src';

const getInstance = (fields, queryStr) => new MultiMatchQuery(fields, queryStr);

describe('MultiMatchQuery', () => {
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
                /The 'behavior' parameter should be one of 'all' or 'none'/
            );
        });
    });

    describe('type() validation', () => {
        test.each([
            { name: 'accepts valid value: best_fields', value: 'best_fields' },
            {
                name: 'accepts valid value: BEST_FIELDS (case-insensitive)',
                value: 'BEST_FIELDS'
            },
            { name: 'accepts valid value: most_fields', value: 'most_fields' },
            {
                name: 'accepts valid value: MOST_FIELDS (case-insensitive)',
                value: 'MOST_FIELDS'
            },
            {
                name: 'accepts valid value: cross_fields',
                value: 'cross_fields'
            },
            {
                name: 'accepts valid value: CROSS_FIELDS (case-insensitive)',
                value: 'CROSS_FIELDS'
            },
            { name: 'accepts valid value: phrase', value: 'phrase' },
            {
                name: 'accepts valid value: PHRASE (case-insensitive)',
                value: 'PHRASE'
            },
            {
                name: 'accepts valid value: phrase_prefix',
                value: 'phrase_prefix'
            },
            {
                name: 'accepts valid value: PHRASE_PREFIX (case-insensitive)',
                value: 'PHRASE_PREFIX'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().type(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_type' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().type(value)).toThrow(
                /The 'type' parameter should be one of/
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
        test('sets field option', () => {
            const result = getInstance().field('my_field').toJSON();
            const expected = {
                multi_match: {
                    fields: ['my_field']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fields option', () => {
            const result = getInstance()
                .fields(['my_field_a', 'my_field_b'])
                .toJSON();
            const expected = {
                multi_match: {
                    fields: ['my_field_a', 'my_field_b']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets type option', () => {
            const result = getInstance().type('best_fields').toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    type: 'best_fields'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets tie_breaker option', () => {
            const result = getInstance().tieBreaker(0.3).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    tie_breaker: 0.3
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets operator option', () => {
            const result = getInstance().operator('and').toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    operator: 'and'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets lenient option', () => {
            const result = getInstance().lenient(true).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    lenient: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets slop option', () => {
            const result = getInstance().slop(2).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    slop: 2
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzziness option', () => {
            const result = getInstance().fuzziness('AUTO').toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    fuzziness: 'AUTO'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets prefix_length option', () => {
            const result = getInstance().prefixLength(5).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    prefix_length: 5
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_expansions option', () => {
            const result = getInstance().maxExpansions(3).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    max_expansions: 3
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets rewrite option', () => {
            const result = getInstance().rewrite('constant_score').toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    rewrite: 'constant_score'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzzy_rewrite option', () => {
            const result = getInstance()
                .fuzzyRewrite('constant_score_boolean')
                .toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    fuzzy_rewrite: 'constant_score_boolean'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets zero_terms_query option', () => {
            const result = getInstance().zeroTermsQuery('all').toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    zero_terms_query: 'all'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets cutoff_frequency option', () => {
            const result = getInstance().cutoffFrequency(10).toJSON();
            const expected = {
                multi_match: {
                    fields: [],
                    cutoff_frequency: 10
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments with string field', () => {
            const valueA = getInstance('my_field', 'query str').toJSON();
            const valueB = getInstance()
                .field('my_field')
                .query('query str')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                multi_match: {
                    fields: ['my_field'],
                    query: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('constructor sets arguments with array fields', () => {
            const valueA = getInstance(
                ['my_field_a', 'my_field_b'],
                'query str'
            ).toJSON();
            const valueB = getInstance()
                .fields(['my_field_a', 'my_field_b'])
                .query('query str')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const valueC = getInstance()
                .field('my_field_a')
                .field('my_field_b')
                .query('query str')
                .toJSON();
            expect(valueA).toEqual(valueC);

            const expected = {
                multi_match: {
                    fields: ['my_field_a', 'my_field_b'],
                    query: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
