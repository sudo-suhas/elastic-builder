import { describe, test, expect } from 'vitest';
import { RareTermsAggregation } from '../../src';

const getInstance = field => new RareTermsAggregation('my_agg', field);

describe('RareTermsAggregation', () => {
    test('sets type as rare_terms', () => {
        const value = new RareTermsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { rare_terms: {} }
        });
    });

    test('script cannot be set', () => {
        expect(() => new RareTermsAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in RareTermsAggregation')
        );
    });

    describe('options', () => {
        test('sets maxDocCount', () => {
            const value = getInstance('my_field').maxDocCount(42).toJSON();
            expect(value).toEqual({
                my_agg: {
                    rare_terms: {
                        field: 'my_field',
                        max_doc_count: 42
                    }
                }
            });
        });

        test('sets precision', () => {
            const value = getInstance('my_field').precision(0.001).toJSON();
            expect(value).toEqual({
                my_agg: {
                    rare_terms: {
                        field: 'my_field',
                        precision: 0.001
                    }
                }
            });
        });

        test('sets include', () => {
            const value = getInstance('my_field').include('swi*').toJSON();
            expect(value).toEqual({
                my_agg: {
                    rare_terms: {
                        field: 'my_field',
                        include: 'swi*'
                    }
                }
            });
        });

        test('sets exclude', () => {
            const value = getInstance('my_field').exclude('electro*').toJSON();
            expect(value).toEqual({
                my_agg: {
                    rare_terms: {
                        field: 'my_field',
                        exclude: 'electro*'
                    }
                }
            });
        });

        test('sets missing', () => {
            const value = getInstance('my_field').missing('N/A').toJSON();
            expect(value).toEqual({
                my_agg: {
                    rare_terms: {
                        field: 'my_field',
                        missing: 'N/A'
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('tries to construct agg name if not given', () => {
            const value = new RareTermsAggregation(null, 'myfield').toJSON();
            const expected = {
                agg_rare_terms_myfield: {
                    rare_terms: {
                        field: 'myfield'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('maxDocCount() validation', () => {
        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for undefined value', value: undefined },
            { name: 'throws for value below minimum (0)', value: 0 },
            { name: 'throws for value above maximum (101)', value: 101 }
        ])('$name', ({ value }) => {
            expect(() => getInstance().maxDocCount(value)).toThrow(
                new Error('`maxDocCount` can only be value from 1 to 100.')
            );
        });
    });

    describe('precision() validation', () => {
        test('throws for value below minimum', () => {
            expect(() => getInstance().precision(0.000001)).toThrow(
                new Error('`precision` must be greater than 0.00001.')
            );
        });
    });
});
