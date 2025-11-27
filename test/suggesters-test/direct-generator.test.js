import { describe, test, expect } from 'vitest';
import { DirectGenerator } from '../../src';

const getInstance = field => new DirectGenerator(field);

describe('DirectGenerator', () => {
    describe('constructor', () => {
        test('sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = {
                field: 'my_field'
            };
            expect(value).toEqual(expected);
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
            expect(() =>
                getInstance('my_field').suggestMode(value)
            ).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_suggest_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance('my_field').suggestMode(value)).toThrow(
                new Error(
                    "The 'suggest_mode' parameter should be one of 'always', 'missing', 'popular'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets field', () => {
            const value = getInstance('my_field').field('my_field').toJSON();
            expect(value).toEqual({
                field: 'my_field'
            });
        });

        test('sets size', () => {
            const value = getInstance('my_field').size(7).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                size: 7
            });
        });

        test('sets suggestMode', () => {
            const value = getInstance('my_field')
                .suggestMode('always')
                .toJSON();
            expect(value).toEqual({
                field: 'my_field',
                suggest_mode: 'always'
            });
        });

        test('sets maxEdits', () => {
            const value = getInstance('my_field').maxEdits(3).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                max_edits: 3
            });
        });

        test('sets prefixLength', () => {
            const value = getInstance('my_field').prefixLength(3).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                prefix_length: 3
            });
        });

        test('sets minWordLength', () => {
            const value = getInstance('my_field').minWordLength(5).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                min_word_length: 5
            });
        });

        test('sets maxInspections', () => {
            const value = getInstance('my_field').maxInspections(4).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                max_inspections: 4
            });
        });

        test('sets minDocFreq', () => {
            const value = getInstance('my_field').minDocFreq(0.4).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                min_doc_freq: 0.4
            });
        });

        test('sets maxTermFreq', () => {
            const value = getInstance('my_field').maxTermFreq(1).toJSON();
            expect(value).toEqual({
                field: 'my_field',
                max_term_freq: 1
            });
        });

        test('sets preFilter', () => {
            const value = getInstance('my_field').preFilter('reverse').toJSON();
            expect(value).toEqual({
                field: 'my_field',
                pre_filter: 'reverse'
            });
        });

        test('sets postFilter', () => {
            const value = getInstance('my_field')
                .postFilter('reverse')
                .toJSON();
            expect(value).toEqual({
                field: 'my_field',
                post_filter: 'reverse'
            });
        });
    });
});
