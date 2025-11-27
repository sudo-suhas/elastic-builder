import { describe, test, expect } from 'vitest';
import { TermSuggester } from '../../src';

const getInstance = () => new TermSuggester('my_suggester');

describe('TermSuggester', () => {
    describe('sort() validation', () => {
        test.each([
            { name: 'accepts valid value: score', value: 'score' },
            {
                name: 'accepts valid value: SCORE (case-insensitive)',
                value: 'SCORE'
            },
            { name: 'accepts valid value: frequency', value: 'frequency' },
            {
                name: 'accepts valid value: FREQUENCY (case-insensitive)',
                value: 'FREQUENCY'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().sort(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_sort' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().sort(value)).toThrow(
                new Error(
                    "The 'sort' parameter should be one of 'score' or 'frequency'"
                )
            );
        });
    });

    describe('suggestMode() validation', () => {
        test.each([
            { name: 'accepts valid value: missing', value: 'missing' },
            {
                name: 'accepts valid value: MISSING (case-insensitive)',
                value: 'MISSING'
            },
            { name: 'accepts valid value: popular', value: 'popular' },
            {
                name: 'accepts valid value: POPULAR (case-insensitive)',
                value: 'POPULAR'
            },
            { name: 'accepts valid value: always', value: 'always' },
            {
                name: 'accepts valid value: ALWAYS (case-insensitive)',
                value: 'ALWAYS'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().suggestMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_suggest_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().suggestMode(value)).toThrow(
                new Error(
                    "The 'suggest_mode' parameter should be one of 'always', 'missing', 'popular'"
                )
            );
        });
    });

    describe('stringDistance() validation', () => {
        test.each([
            { name: 'accepts valid value: internal', value: 'internal' },
            {
                name: 'accepts valid value: INTERNAL (case-insensitive)',
                value: 'INTERNAL'
            },
            {
                name: 'accepts valid value: damerau_levenshtein',
                value: 'damerau_levenshtein'
            },
            {
                name: 'accepts valid value: DAMERAU_LEVENSHTEIN (case-insensitive)',
                value: 'DAMERAU_LEVENSHTEIN'
            },
            { name: 'accepts valid value: levenstein', value: 'levenstein' },
            {
                name: 'accepts valid value: LEVENSTEIN (case-insensitive)',
                value: 'LEVENSTEIN'
            },
            { name: 'accepts valid value: jarowinkler', value: 'jarowinkler' },
            {
                name: 'accepts valid value: JAROWINKLER (case-insensitive)',
                value: 'JAROWINKLER'
            },
            { name: 'accepts valid value: ngram', value: 'ngram' },
            {
                name: 'accepts valid value: NGRAM (case-insensitive)',
                value: 'NGRAM'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().stringDistance(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_string_distance'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().stringDistance(value)).toThrow(
                new Error(
                    "The 'string_distance' parameter should be one of 'damerau_levenshtein', 'internal', 'jarowinkler', 'levenstein', 'ngram'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets sort', () => {
            const value = getInstance().sort('score').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        sort: 'score'
                    }
                }
            });
        });

        test('sets suggestMode', () => {
            const value = getInstance().suggestMode('always').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        suggest_mode: 'always'
                    }
                }
            });
        });

        test('sets maxEdits', () => {
            const value = getInstance().maxEdits(3).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        max_edits: 3
                    }
                }
            });
        });

        test('sets prefixLength', () => {
            const value = getInstance().prefixLength(3).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        prefix_length: 3
                    }
                }
            });
        });

        test('sets minWordLength', () => {
            const value = getInstance().minWordLength(5).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        min_word_length: 5
                    }
                }
            });
        });

        test('sets maxInspections', () => {
            const value = getInstance().maxInspections(4).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        max_inspections: 4
                    }
                }
            });
        });

        test('sets minDocFreq', () => {
            const value = getInstance().minDocFreq(0.4).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        min_doc_freq: 0.4
                    }
                }
            });
        });

        test('sets maxTermFreq', () => {
            const value = getInstance().maxTermFreq(1).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        max_term_freq: 1
                    }
                }
            });
        });

        test('sets stringDistance', () => {
            const value = getInstance()
                .stringDistance('damerau_levenshtein')
                .toJSON();
            expect(value).toEqual({
                my_suggester: {
                    term: {
                        string_distance: 'damerau_levenshtein'
                    }
                }
            });
        });
    });
});
