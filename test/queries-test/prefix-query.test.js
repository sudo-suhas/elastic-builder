import { describe, test, expect } from 'vitest';
import { PrefixQuery } from '../../src';

const getInstance = () => new PrefixQuery('my_field', 'my-value');

describe('PrefixQuery', () => {
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

    describe('options', () => {
        test('sets rewrite option', () => {
            const result = getInstance().rewrite('constant_score').toJSON();
            const expected = {
                prefix: {
                    my_field: {
                        value: 'my-value',
                        rewrite: 'constant_score'
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = getInstance().toJSON();
            const valueB = new PrefixQuery()
                .field('my_field')
                .value('my-value')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                prefix: {
                    my_field: 'my-value'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
