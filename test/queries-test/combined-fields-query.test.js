import { describe, test, expect } from 'vitest';
import { CombinedFieldsQuery } from '../../src';

const getInstance = (fields, queryStr) =>
    new CombinedFieldsQuery(fields, queryStr);

describe('CombinedFieldsQuery', () => {
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

    describe('options', () => {
        test('sets field option', () => {
            const result = getInstance().field('my_field').toJSON();
            const expected = {
                combined_fields: {
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
                combined_fields: {
                    fields: ['my_field_a', 'my_field_b']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets auto_generate_synonyms_phrase_query option', () => {
            const result = getInstance()
                .autoGenerateSynonymsPhraseQuery(true)
                .toJSON();
            const expected = {
                combined_fields: {
                    fields: [],
                    auto_generate_synonyms_phrase_query: true
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
                combined_fields: {
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
                combined_fields: {
                    fields: ['my_field_a', 'my_field_b'],
                    query: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
