import { describe, test, expect } from 'vitest';
import { SignificantTermsAggregation } from '../../src';

describe('SignificantTermsAggregation', () => {
    test('sets type as significant_terms', () => {
        const value = new SignificantTermsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { significant_terms: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new SignificantTermsAggregation(
                'my_agg',
                'my_field'
            ).toJSON();
            const expected = {
                my_agg: {
                    significant_terms: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    test('script cannot be set', () => {
        expect(() =>
            new SignificantTermsAggregation('my_agg').script()
        ).toThrow(
            new Error('script is not supported in SignificantTermsAggregation')
        );
    });
});
