import { describe, test, expect } from 'vitest';
import { QueryStringQueryBase } from '../../src/queries/full-text-queries';

const getInstance = queryStr =>
    new QueryStringQueryBase('my_qry_type', '', queryStr);

describe('QueryStringQueryBase', () => {
    describe('defaultOperator() validation', () => {
        test.each([
            { name: 'accepts valid value: and', value: 'and' },
            {
                name: 'accepts valid value: AND (case-insensitive)',
                value: 'AND'
            },
            { name: 'accepts valid value: or', value: 'or' },
            { name: 'accepts valid value: OR (case-insensitive)', value: 'OR' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().defaultOperator(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_default_operator'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().defaultOperator(value)).toThrow(
                new Error(
                    "The 'operator' parameter should be one of 'AND' or 'OR'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets field option', () => {
            const result = getInstance().field('my_field').toJSON();
            const expected = {
                my_qry_type: {
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
                my_qry_type: {
                    fields: ['my_field_a', 'my_field_b']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets default_operator option', () => {
            const result = getInstance().defaultOperator('AND').toJSON();
            const expected = {
                my_qry_type: {
                    default_operator: 'AND'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets lenient option', () => {
            const result = getInstance().lenient(true).toJSON();
            const expected = {
                my_qry_type: {
                    lenient: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets analyze_wildcard option', () => {
            const result = getInstance().analyzeWildcard(true).toJSON();
            const expected = {
                my_qry_type: {
                    analyze_wildcard: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets quote_field_suffix option', () => {
            const result = getInstance().quoteFieldSuffix('.exact').toJSON();
            const expected = {
                my_qry_type: {
                    quote_field_suffix: '.exact'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets all_fields option', () => {
            const result = getInstance().allFields(true).toJSON();
            const expected = {
                my_qry_type: {
                    all_fields: true
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('chained fields', () => {
        test('sets chained fields', () => {
            const value = getInstance()
                .field('my_field_a')
                .field('my_field_b')
                .fields(['my_field_c', 'my_field_c'])
                .query('query str')
                .toJSON();
            const expected = {
                my_qry_type: {
                    fields: [
                        'my_field_a',
                        'my_field_b',
                        'my_field_c',
                        'my_field_c'
                    ],
                    query: 'query str'
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
