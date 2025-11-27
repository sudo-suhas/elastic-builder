import { describe, test, expect } from 'vitest';
import { PhraseSuggester, DirectGenerator } from '../../src';

const getInstance = () => new PhraseSuggester('my_suggester');

const dirGenA = new DirectGenerator('title.trigram').suggestMode('always');
const dirGenB = new DirectGenerator('title.reverse')
    .suggestMode('always')
    .preFilter('reverse')
    .postFilter('reverse');

describe('PhraseSuggester', () => {
    describe('smoothing() validation', () => {
        test.each([
            {
                name: 'accepts valid value: stupid_backoff',
                value: 'stupid_backoff'
            },
            {
                name: 'accepts valid value: STUPID_BACKOFF (case-insensitive)',
                value: 'STUPID_BACKOFF'
            },
            { name: 'accepts valid value: laplace', value: 'laplace' },
            {
                name: 'accepts valid value: LAPLACE (case-insensitive)',
                value: 'LAPLACE'
            },
            {
                name: 'accepts valid value: linear_interpolation',
                value: 'linear_interpolation'
            },
            {
                name: 'accepts valid value: LINEAR_INTERPOLATION (case-insensitive)',
                value: 'LINEAR_INTERPOLATION'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().smoothing(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_smoothing' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().smoothing(value)).toThrow(
                new Error(
                    "The 'smoothing' parameter should be one of 'laplace', 'linear_interpolation', 'stupid_backoff'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets gramSize', () => {
            const value = getInstance().gramSize(1).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        gram_size: 1
                    }
                }
            });
        });

        test('sets realWordErrorLikelihood', () => {
            const value = getInstance().realWordErrorLikelihood(0.9).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        real_word_error_likelihood: 0.9
                    }
                }
            });
        });

        test('sets confidence', () => {
            const value = getInstance().confidence(0).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        confidence: 0
                    }
                }
            });
        });

        test('sets maxErrors', () => {
            const value = getInstance().maxErrors(10).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        max_errors: 10
                    }
                }
            });
        });

        test('sets separator', () => {
            const value = getInstance().separator('|').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        separator: '|'
                    }
                }
            });
        });

        test('sets highlight', () => {
            const value = getInstance().highlight('<em>', '</em>').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        highlight: {
                            pre_tag: '<em>',
                            post_tag: '</em>'
                        }
                    }
                }
            });
        });

        test('sets collate', () => {
            const value = getInstance()
                .collate({
                    query: {
                        inline: {
                            match: { '{{field_name}}': '{{suggestion}}' }
                        }
                    },
                    params: { field_name: 'title' },
                    prune: true
                })
                .toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        collate: {
                            query: {
                                inline: {
                                    match: {
                                        '{{field_name}}': '{{suggestion}}'
                                    }
                                }
                            },
                            params: { field_name: 'title' },
                            prune: true
                        }
                    }
                }
            });
        });

        test('sets smoothing', () => {
            const value = getInstance().smoothing('stupid_backoff').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        smoothing: 'stupid_backoff'
                    }
                }
            });
        });

        test('sets directGenerator with single generator', () => {
            const value = getInstance().directGenerator(dirGenA).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        direct_generator: [
                            {
                                field: 'title.trigram',
                                suggest_mode: 'always'
                            }
                        ]
                    }
                }
            });
        });

        test('sets directGenerator with array of generators', () => {
            const value = getInstance()
                .directGenerator([dirGenA, dirGenB])
                .toJSON();
            expect(value).toEqual({
                my_suggester: {
                    phrase: {
                        direct_generator: [
                            {
                                field: 'title.trigram',
                                suggest_mode: 'always'
                            },
                            {
                                field: 'title.reverse',
                                suggest_mode: 'always',
                                pre_filter: 'reverse',
                                post_filter: 'reverse'
                            }
                        ]
                    }
                }
            });
        });
    });
});
