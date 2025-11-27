import { describe, test, expect } from 'vitest';
import { RegexpQuery } from '../../src';

const getInstance = () => new RegexpQuery('my_field', 'my-value');

describe('RegexpQuery', () => {
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
        test('sets flags option', () => {
            const result = getInstance().flags('PREFIX|PHRASE').toJSON();
            const expected = {
                regexp: {
                    my_field: {
                        value: 'my-value',
                        flags: 'PREFIX|PHRASE'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets case_insensitive option', () => {
            const result = getInstance().caseInsensitive(true).toJSON();
            const expected = {
                regexp: {
                    my_field: {
                        value: 'my-value',
                        case_insensitive: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_determinized_states option', () => {
            const result = getInstance().maxDeterminizedStates(10500).toJSON();
            const expected = {
                regexp: {
                    my_field: {
                        value: 'my-value',
                        max_determinized_states: 10500
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets rewrite option', () => {
            const result = getInstance().rewrite('constant_score').toJSON();
            const expected = {
                regexp: {
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
            const valueB = new RegexpQuery()
                .field('my_field')
                .value('my-value')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                regexp: {
                    my_field: 'my-value'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
