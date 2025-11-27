import { describe, test, expect } from 'vitest';
import { Script } from '../../../src';
import {
    TermsValuesSource,
    ValuesSourceBase
} from '../../../src/aggregations/bucket-aggregations/composite-agg-values-sources';

const getInstance = field => new TermsValuesSource('my_val_src', field);

describe('TermsValuesSource', () => {
    test('base class type cannot be empty', () => {
        expect(() => new ValuesSourceBase()).toThrow(
            new Error('ValuesSourceBase `valueSrcType` cannot be empty')
        );
    });

    test('constructor sets arguments', () => {
        const value = getInstance('my_field').toJSON();
        const expected = {
            my_val_src: {
                terms: { field: 'my_field' }
            }
        };
        expect(value).toEqual(expected);
    });

    test('sets type as terms', () => {
        const value = new TermsValuesSource('my_val_src').toJSON();
        expect(value).toEqual({
            my_val_src: { terms: {} }
        });
    });

    describe('order() validation', () => {
        test.each([
            { name: 'accepts valid value: asc', value: 'asc' },
            {
                name: 'accepts valid value: ASC (case-insensitive)',
                value: 'ASC'
            },
            { name: 'accepts valid value: desc', value: 'desc' },
            {
                name: 'accepts valid value: DESC (case-insensitive)',
                value: 'DESC'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().order(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_order' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().order(value)).toThrow(
                new Error(
                    "The 'order' parameter should be one of 'asc' or 'desc'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets missing', () => {
            const value = getInstance().missing(42).toJSON();
            expect(value).toEqual({
                my_val_src: {
                    terms: {
                        missing: 42
                    }
                }
            });
        });

        test('sets missingBucket', () => {
            const value = getInstance().missingBucket(true).toJSON();
            expect(value).toEqual({
                my_val_src: {
                    terms: {
                        missing_bucket: true
                    }
                }
            });
        });

        test('sets field', () => {
            const value = getInstance().field('my_field').toJSON();
            expect(value).toEqual({
                my_val_src: {
                    terms: {
                        field: 'my_field'
                    }
                }
            });
        });

        test('sets script', () => {
            const scriptInstance = new Script()
                .lang('groovy')
                .file('calculate-score')
                .params({ my_modifier: 2 });
            const value = getInstance().script(scriptInstance).toJSON();
            const expected = {
                my_val_src: {
                    terms: {
                        script: scriptInstance.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets valueType', () => {
            const value = getInstance().valueType('date').toJSON();
            expect(value).toEqual({
                my_val_src: {
                    terms: {
                        value_type: 'date'
                    }
                }
            });
        });
    });
});
