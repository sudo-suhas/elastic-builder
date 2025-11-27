import { describe, test, expect } from 'vitest';
import {
    Highlight,
    highlight,
    BoolQuery,
    MatchQuery,
    MatchPhraseQuery
} from '../../src';

describe('Highlight', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('fields()', () => {
                expect(() => new Highlight().fields(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });

            test('matchedFields()', () => {
                expect(() => new Highlight().matchedFields(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });

            test('highlightQuery()', () => {
                expect(() => new Highlight().highlightQuery(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('encoder() validation', () => {
        test.each([
            { name: 'accepts valid value: default', value: 'default' },
            {
                name: 'accepts valid value: DEFAULT (case-insensitive)',
                value: 'DEFAULT'
            },
            { name: 'accepts valid value: html', value: 'html' },
            {
                name: 'accepts valid value: HTML (case-insensitive)',
                value: 'HTML'
            }
        ])('$name', ({ value }) => {
            expect(() => highlight().encoder(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_value' }
        ])('$name', ({ value }) => {
            expect(() => highlight().encoder(value)).toThrow(
                new Error(
                    "The 'encoder' parameter should be one of 'default' or 'html'"
                )
            );
        });
    });

    describe('type() validation', () => {
        test.each([
            { name: 'accepts valid value: plain', value: 'plain' },
            {
                name: 'accepts valid value: PLAIN (case-insensitive)',
                value: 'PLAIN'
            },
            { name: 'accepts valid value: postings', value: 'postings' },
            {
                name: 'accepts valid value: POSTINGS (case-insensitive)',
                value: 'POSTINGS'
            },
            { name: 'accepts valid value: unified', value: 'unified' },
            {
                name: 'accepts valid value: UNIFIED (case-insensitive)',
                value: 'UNIFIED'
            },
            { name: 'accepts valid value: fvh', value: 'fvh' },
            {
                name: 'accepts valid value: FVH (case-insensitive)',
                value: 'FVH'
            }
        ])('$name', ({ value }) => {
            expect(() => highlight().type(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_value' }
        ])('$name', ({ value }) => {
            expect(() => highlight().type(value)).toThrow(
                new Error(
                    "The 'type' parameter should be one of 'plain', 'postings', 'unified' or 'fvh'"
                )
            );
        });
    });

    describe('fragmenter() validation', () => {
        test.each([
            { name: 'accepts valid value: simple', value: 'simple' },
            {
                name: 'accepts valid value: SIMPLE (case-insensitive)',
                value: 'SIMPLE'
            },
            { name: 'accepts valid value: span', value: 'span' },
            {
                name: 'accepts valid value: SPAN (case-insensitive)',
                value: 'SPAN'
            }
        ])('$name', ({ value }) => {
            expect(() => highlight().fragmenter(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_value' }
        ])('$name', ({ value }) => {
            expect(() => highlight().fragmenter(value)).toThrow(
                new Error(
                    "The 'fragmenter' parameter should be one of 'simple' or 'span'"
                )
            );
        });
    });

    describe('preTags() option setter', () => {
        const value = ['<tag1>', '<tag2>'];

        test('sets global option', () => {
            const result = new Highlight().preTags(value).toJSON();
            expect(result).toEqual({
                fields: {},
                pre_tags: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight().preTags(value, 'my_field').toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { pre_tags: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .preTags(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { pre_tags: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .preTags(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { pre_tags: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.preTags(value, 'my_field_a');
            instance.preTags(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { pre_tags: value },
                    my_field_b: { pre_tags: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.preTags(value, 'my_field_a');
            instance.preTags(value, 'my_field_b');
            instance.preTags(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { pre_tags: value },
                    my_field_b: { pre_tags: value }
                },
                pre_tags: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .preTags(value, 'my_field')
                .preTags(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { pre_tags: value }
                },
                pre_tags: value
            });
        });

        test('sets pre_tags option with string converted to array', () => {
            const result = new Highlight().preTags('<tag1>').toJSON();
            expect(result).toEqual({
                fields: {},
                pre_tags: ['<tag1>']
            });
        });
    });

    describe('postTags() option setter', () => {
        const value = ['</tag1>', '</tag2>'];

        test('sets global option', () => {
            const result = new Highlight().postTags(value).toJSON();
            expect(result).toEqual({
                fields: {},
                post_tags: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight().postTags(value, 'my_field').toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { post_tags: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .postTags(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { post_tags: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .postTags(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { post_tags: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.postTags(value, 'my_field_a');
            instance.postTags(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { post_tags: value },
                    my_field_b: { post_tags: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.postTags(value, 'my_field_a');
            instance.postTags(value, 'my_field_b');
            instance.postTags(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { post_tags: value },
                    my_field_b: { post_tags: value }
                },
                post_tags: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .postTags(value, 'my_field')
                .postTags(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { post_tags: value }
                },
                post_tags: value
            });
        });

        test('sets post_tags option with string converted to array', () => {
            const result = new Highlight().postTags('</tag1>').toJSON();
            expect(result).toEqual({
                fields: {},
                post_tags: ['</tag1>']
            });
        });
    });

    describe('fragmentSize() option setter', () => {
        const value = 150;

        test('sets global option', () => {
            const result = new Highlight().fragmentSize(value).toJSON();
            expect(result).toEqual({
                fields: {},
                fragment_size: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .fragmentSize(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { fragment_size: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .fragmentSize(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { fragment_size: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .fragmentSize(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { fragment_size: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.fragmentSize(value, 'my_field_a');
            instance.fragmentSize(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { fragment_size: value },
                    my_field_b: { fragment_size: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.fragmentSize(value, 'my_field_a');
            instance.fragmentSize(value, 'my_field_b');
            instance.fragmentSize(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { fragment_size: value },
                    my_field_b: { fragment_size: value }
                },
                fragment_size: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .fragmentSize(value, 'my_field')
                .fragmentSize(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { fragment_size: value }
                },
                fragment_size: value
            });
        });
    });

    describe('numberOfFragments() option setter', () => {
        const value = 3;

        test('sets global option', () => {
            const result = new Highlight().numberOfFragments(value).toJSON();
            expect(result).toEqual({
                fields: {},
                number_of_fragments: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .numberOfFragments(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { number_of_fragments: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .numberOfFragments(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { number_of_fragments: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .numberOfFragments(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { number_of_fragments: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.numberOfFragments(value, 'my_field_a');
            instance.numberOfFragments(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { number_of_fragments: value },
                    my_field_b: { number_of_fragments: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.numberOfFragments(value, 'my_field_a');
            instance.numberOfFragments(value, 'my_field_b');
            instance.numberOfFragments(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { number_of_fragments: value },
                    my_field_b: { number_of_fragments: value }
                },
                number_of_fragments: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .numberOfFragments(value, 'my_field')
                .numberOfFragments(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { number_of_fragments: value }
                },
                number_of_fragments: value
            });
        });
    });

    describe('noMatchSize() option setter', () => {
        const value = 150;

        test('sets global option', () => {
            const result = new Highlight().noMatchSize(value).toJSON();
            expect(result).toEqual({
                fields: {},
                no_match_size: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .noMatchSize(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { no_match_size: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .noMatchSize(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { no_match_size: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .noMatchSize(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { no_match_size: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.noMatchSize(value, 'my_field_a');
            instance.noMatchSize(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { no_match_size: value },
                    my_field_b: { no_match_size: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.noMatchSize(value, 'my_field_a');
            instance.noMatchSize(value, 'my_field_b');
            instance.noMatchSize(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { no_match_size: value },
                    my_field_b: { no_match_size: value }
                },
                no_match_size: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .noMatchSize(value, 'my_field')
                .noMatchSize(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { no_match_size: value }
                },
                no_match_size: value
            });
        });
    });

    describe('highlightQuery() option setter', () => {
        const value = new BoolQuery()
            .must(new MatchQuery('content', 'foo bar'))
            .should(
                new MatchPhraseQuery('content', 'foo bar').slop(1).boost(10.0)
            )
            .minimumShouldMatch(0);
        const expectedValue = value.toJSON();

        test('sets global option', () => {
            const result = new Highlight().highlightQuery(value).toJSON();
            expect(result).toEqual({
                fields: {},
                highlight_query: expectedValue
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .highlightQuery(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { highlight_query: expectedValue }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .highlightQuery(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { highlight_query: expectedValue }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .highlightQuery(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { highlight_query: expectedValue },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.highlightQuery(value, 'my_field_a');
            instance.highlightQuery(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { highlight_query: expectedValue },
                    my_field_b: { highlight_query: expectedValue }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.highlightQuery(value, 'my_field_a');
            instance.highlightQuery(value, 'my_field_b');
            instance.highlightQuery(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { highlight_query: expectedValue },
                    my_field_b: { highlight_query: expectedValue }
                },
                highlight_query: expectedValue
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .highlightQuery(value, 'my_field')
                .highlightQuery(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { highlight_query: expectedValue }
                },
                highlight_query: expectedValue
            });
        });
    });

    describe('requireFieldMatch() option setter', () => {
        const value = false;

        test('sets global option', () => {
            const result = new Highlight().requireFieldMatch(value).toJSON();
            expect(result).toEqual({
                fields: {},
                require_field_match: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .requireFieldMatch(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { require_field_match: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .requireFieldMatch(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { require_field_match: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .requireFieldMatch(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { require_field_match: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.requireFieldMatch(value, 'my_field_a');
            instance.requireFieldMatch(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { require_field_match: value },
                    my_field_b: { require_field_match: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.requireFieldMatch(value, 'my_field_a');
            instance.requireFieldMatch(value, 'my_field_b');
            instance.requireFieldMatch(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { require_field_match: value },
                    my_field_b: { require_field_match: value }
                },
                require_field_match: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .requireFieldMatch(value, 'my_field')
                .requireFieldMatch(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { require_field_match: value }
                },
                require_field_match: value
            });
        });
    });

    describe('boundaryMaxScan() option setter', () => {
        const value = 25;

        test('sets global option', () => {
            const result = new Highlight().boundaryMaxScan(value).toJSON();
            expect(result).toEqual({
                fields: {},
                boundary_max_scan: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .boundaryMaxScan(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_max_scan: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .boundaryMaxScan(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_max_scan: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .boundaryMaxScan(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { boundary_max_scan: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.boundaryMaxScan(value, 'my_field_a');
            instance.boundaryMaxScan(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { boundary_max_scan: value },
                    my_field_b: { boundary_max_scan: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.boundaryMaxScan(value, 'my_field_a');
            instance.boundaryMaxScan(value, 'my_field_b');
            instance.boundaryMaxScan(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { boundary_max_scan: value },
                    my_field_b: { boundary_max_scan: value }
                },
                boundary_max_scan: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .boundaryMaxScan(value, 'my_field')
                .boundaryMaxScan(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_max_scan: value }
                },
                boundary_max_scan: value
            });
        });
    });

    describe('boundaryChars() option setter', () => {
        const value = '.,!?; \t\n';

        test('sets global option', () => {
            const result = new Highlight().boundaryChars(value).toJSON();
            expect(result).toEqual({
                fields: {},
                boundary_chars: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .boundaryChars(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_chars: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .boundaryChars(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_chars: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .boundaryChars(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { boundary_chars: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.boundaryChars(value, 'my_field_a');
            instance.boundaryChars(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { boundary_chars: value },
                    my_field_b: { boundary_chars: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.boundaryChars(value, 'my_field_a');
            instance.boundaryChars(value, 'my_field_b');
            instance.boundaryChars(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { boundary_chars: value },
                    my_field_b: { boundary_chars: value }
                },
                boundary_chars: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .boundaryChars(value, 'my_field')
                .boundaryChars(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { boundary_chars: value }
                },
                boundary_chars: value
            });
        });
    });

    describe('forceSource() option setter', () => {
        const value = true;

        test('sets global option', () => {
            const result = new Highlight().forceSource(value).toJSON();
            expect(result).toEqual({
                fields: {},
                force_source: value
            });
        });

        test('sets field-specific option when field provided', () => {
            const result = new Highlight()
                .forceSource(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { force_source: value }
                }
            });
        });

        test('sets field-specific option when field in constructor', () => {
            const result = new Highlight('my_field')
                .forceSource(value, 'my_field')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { force_source: value }
                }
            });
        });

        test('sets option for one field in multi-field highlight', () => {
            const result = new Highlight(['my_field_a', 'my_field_b'])
                .forceSource(value, 'my_field_a')
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field_a: { force_source: value },
                    my_field_b: {}
                }
            });
        });

        test('sets option for multiple fields separately', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.forceSource(value, 'my_field_a');
            instance.forceSource(value, 'my_field_b');
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { force_source: value },
                    my_field_b: { force_source: value }
                }
            });
        });

        test('sets both field-specific and global option', () => {
            const instance = new Highlight(['my_field_a', 'my_field_b']);
            instance.forceSource(value, 'my_field_a');
            instance.forceSource(value, 'my_field_b');
            instance.forceSource(value);
            expect(instance.toJSON()).toEqual({
                fields: {
                    my_field_a: { force_source: value },
                    my_field_b: { force_source: value }
                },
                force_source: value
            });
        });

        test('sets field-specific then global option', () => {
            const result = new Highlight()
                .forceSource(value, 'my_field')
                .forceSource(value)
                .toJSON();
            expect(result).toEqual({
                fields: {
                    my_field: { force_source: value }
                },
                force_source: value
            });
        });
    });

    describe('field management', () => {
        test('constructor sets single field', () => {
            const value = new Highlight('my_field').toJSON();
            expect(value).toEqual({
                fields: {
                    my_field: {}
                }
            });
        });

        test('constructor sets multiple fields', () => {
            const value = new Highlight(['my_field_a', 'my_field_b']).toJSON();
            expect(value).toEqual({
                fields: {
                    my_field_a: {},
                    my_field_b: {}
                }
            });
        });

        test('sets field', () => {
            const value = new Highlight().field('my_field').toJSON();
            expect(value).toEqual({
                fields: {
                    my_field: {}
                }
            });
        });

        test('sets multiple fields', () => {
            const value = new Highlight()
                .fields(['my_field_a', 'my_field_b'])
                .toJSON();
            expect(value).toEqual({
                fields: {
                    my_field_a: {},
                    my_field_b: {}
                }
            });
        });
    });

    describe('special methods', () => {
        test('sets tags_schema as styled', () => {
            const value = new Highlight().styledTagsSchema().toJSON();
            expect(value).toEqual({
                fields: {},
                tags_schema: 'styled'
            });
        });

        test('sets phrase_limit option', () => {
            const value = new Highlight().phraseLimit(512).toJSON();
            expect(value).toEqual({
                fields: {},
                phrase_limit: 512
            });
        });
    });

    describe('scoreOrder()', () => {
        test('sets global score order', () => {
            const value = new Highlight().scoreOrder().toJSON();
            expect(value).toEqual({
                fields: {},
                order: 'score'
            });
        });

        test('sets field-specific score order', () => {
            const value = new Highlight().scoreOrder('my_field').toJSON();
            expect(value).toEqual({
                fields: {
                    my_field: { order: 'score' }
                }
            });
        });

        test('sets score order for constructor field', () => {
            const value = new Highlight('my_field')
                .scoreOrder('my_field')
                .toJSON();
            expect(value).toEqual({
                fields: {
                    my_field: { order: 'score' }
                }
            });
        });

        test('sets score order for one field in multi-field highlight', () => {
            const value = new Highlight(['my_field_a', 'my_field_b'])
                .scoreOrder('my_field_a')
                .toJSON();
            expect(value).toEqual({
                fields: {
                    my_field_a: { order: 'score' },
                    my_field_b: {}
                }
            });
        });

        test('sets score order for multiple fields separately', () => {
            const value = new Highlight(['my_field_a', 'my_field_b']);
            value.scoreOrder('my_field_a');
            value.scoreOrder('my_field_b');
            expect(value.toJSON()).toEqual({
                fields: {
                    my_field_a: { order: 'score' },
                    my_field_b: { order: 'score' }
                }
            });
        });

        test('sets both field-specific and global score order', () => {
            const value = new Highlight(['my_field_a', 'my_field_b'])
                .scoreOrder('my_field_a')
                .scoreOrder('my_field_b')
                .scoreOrder();
            expect(value.toJSON()).toEqual({
                fields: {
                    my_field_a: { order: 'score' },
                    my_field_b: { order: 'score' }
                },
                order: 'score'
            });
        });

        test('sets field-specific then global score order', () => {
            const value = new Highlight()
                .scoreOrder('my_field')
                .scoreOrder()
                .toJSON();
            expect(value).toEqual({
                fields: {
                    my_field: { order: 'score' }
                },
                order: 'score'
            });
        });
    });

    describe('matchedFields()', () => {
        test('sets matched_fields option', () => {
            const value = new Highlight()
                .matchedFields(['content', 'content.plain'], 'content')
                .toJSON();
            expect(value).toEqual({
                fields: {
                    content: {
                        matched_fields: ['content', 'content.plain'],
                        type: 'fvh'
                    }
                }
            });
        });

        test('throws error when no field provided', () => {
            expect(() =>
                new Highlight().matchedFields(['content', 'content.plain'])
            ).toThrow(
                new Error('`matched_fields` requires field name to be passed')
            );
        });
    });
});
