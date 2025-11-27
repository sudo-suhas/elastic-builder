import { describe, test, expect } from 'vitest';
import { QueryStringQuery } from '../../src';

const getInstance = queryStr => new QueryStringQuery(queryStr);

describe('QueryStringQuery', () => {
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
        test('sets default_field option', () => {
            const result = getInstance().defaultField('my_field').toJSON();
            const expected = {
                query_string: {
                    default_field: 'my_field'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets allow_leading_wildcard option', () => {
            const result = getInstance().allowLeadingWildcard(true).toJSON();
            const expected = {
                query_string: {
                    allow_leading_wildcard: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets enable_position_increments option', () => {
            const result = getInstance()
                .enablePositionIncrements(true)
                .toJSON();
            const expected = {
                query_string: {
                    enable_position_increments: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzzy_max_expansions option', () => {
            const result = getInstance().fuzzyMaxExpansions(50).toJSON();
            const expected = {
                query_string: {
                    fuzzy_max_expansions: 50
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzziness option', () => {
            const result = getInstance().fuzziness('AUTO').toJSON();
            const expected = {
                query_string: {
                    fuzziness: 'AUTO'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets fuzzy_prefix_length option', () => {
            const result = getInstance().fuzzyPrefixLength(5).toJSON();
            const expected = {
                query_string: {
                    fuzzy_prefix_length: 5
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets rewrite option', () => {
            const result = getInstance().rewrite('constant_score').toJSON();
            const expected = {
                query_string: {
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
                query_string: {
                    fuzzy_rewrite: 'constant_score_boolean'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets phrase_slop option', () => {
            const result = getInstance().phraseSlop(2).toJSON();
            const expected = {
                query_string: {
                    phrase_slop: 2
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets auto_generate_phrase_queries option', () => {
            const result = getInstance()
                .autoGeneratePhraseQueries(true)
                .toJSON();
            const expected = {
                query_string: {
                    auto_generate_phrase_queries: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_determinized_states option', () => {
            const result = getInstance().maxDeterminizedStates(10500).toJSON();
            const expected = {
                query_string: {
                    max_determinized_states: 10500
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets time_zone option', () => {
            const result = getInstance().timeZone('+0530').toJSON();
            const expected = {
                query_string: {
                    time_zone: '+0530'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets split_on_whitespace option', () => {
            const result = getInstance().splitOnWhitespace(true).toJSON();
            const expected = {
                query_string: {
                    split_on_whitespace: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets use_dis_max option', () => {
            const result = getInstance().useDisMax(true).toJSON();
            const expected = {
                query_string: {
                    use_dis_max: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets tie_breaker option', () => {
            const result = getInstance().tieBreaker(0.3).toJSON();
            const expected = {
                query_string: {
                    tie_breaker: 0.3
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets quote_analyzer option', () => {
            const result = getInstance().quoteAnalyzer('my_analyzer').toJSON();
            const expected = {
                query_string: {
                    quote_analyzer: 'my_analyzer'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets escape option', () => {
            const result = getInstance().escape(true).toJSON();
            const expected = {
                query_string: {
                    escape: true
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
