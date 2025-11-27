import { describe, test, expect } from 'vitest';
import { CompletionSuggester } from '../../src';

const getInstance = () => new CompletionSuggester('my_suggester');

describe('CompletionSuggester', () => {
    describe('prefix method', () => {
        test('prefix is set', () => {
            const value = getInstance().prefix('nir').toJSON();
            const expected = {
                my_suggester: {
                    prefix: 'nir',
                    completion: {}
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets skipDuplicates', () => {
            const value = getInstance().skipDuplicates(true).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        skip_duplicates: true
                    }
                }
            });
        });

        test('sets fuzzy with boolean', () => {
            const value = getInstance().fuzzy(true).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: true
                    }
                }
            });
        });

        test('sets fuzziness', () => {
            const value = getInstance().fuzziness(2).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: { fuzziness: 2 }
                    }
                }
            });
        });

        test('sets transpositions', () => {
            const value = getInstance().transpositions(true).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: { transpositions: true }
                    }
                }
            });
        });

        test('sets minLength', () => {
            const value = getInstance().minLength(2).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: { min_length: 2 }
                    }
                }
            });
        });

        test('sets prefixLength', () => {
            const value = getInstance().prefixLength(2).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: { prefix_length: 2 }
                    }
                }
            });
        });

        test('sets unicodeAware', () => {
            const value = getInstance().unicodeAware(true).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        fuzzy: { unicode_aware: true }
                    }
                }
            });
        });

        test('sets regex flags', () => {
            const value = getInstance().flags('ANYSTRING').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        regex: { flags: 'ANYSTRING' }
                    }
                }
            });
        });

        test('sets maxDeterminizedStates', () => {
            const value = getInstance().maxDeterminizedStates(5000).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        regex: { max_determinized_states: 5000 }
                    }
                }
            });
        });

        test('sets contexts', () => {
            const value = getInstance()
                .contexts('location', { lat: 43.662, lon: -79.38 })
                .toJSON();
            expect(value).toEqual({
                my_suggester: {
                    completion: {
                        contexts: {
                            location: { lat: 43.662, lon: -79.38 }
                        }
                    }
                }
            });
        });
    });

    describe('regex method', () => {
        test('regex is set', () => {
            const value = getInstance().regex('nir').toJSON();
            const expected = {
                my_suggester: {
                    regex: 'nir',
                    completion: {}
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('multiple options', () => {
        test('multiple contexts can be set', () => {
            const value = getInstance()
                .contexts('location', { lat: 43.662, lon: -79.38 })
                .contexts('place_type', ['cafe', 'restaurants'])
                .toJSON();
            const expected = {
                my_suggester: {
                    completion: {
                        contexts: {
                            location: { lat: 43.662, lon: -79.38 },
                            place_type: ['cafe', 'restaurants']
                        }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('multiple fuzzy options can be set', () => {
            const value = getInstance()
                .fuzziness(2)
                .transpositions(true)
                .toJSON();
            const expected = {
                my_suggester: {
                    completion: {
                        fuzzy: {
                            fuzziness: 2,
                            transpositions: true
                        }
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
