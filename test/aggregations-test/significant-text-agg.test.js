import { describe, test, expect } from 'vitest';
import { SignificantTextAggregation } from '../../src';

const getInstance = (...args) =>
    new SignificantTextAggregation('my_agg', ...args);

describe('SignificantTextAggregation', () => {
    test('sets type as significant_text', () => {
        const value = new SignificantTextAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { significant_text: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new SignificantTextAggregation(
                'my_agg',
                'my_field'
            ).toJSON();
            const expected = {
                my_agg: {
                    significant_text: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets filterDuplicateText', () => {
            const value = getInstance().filterDuplicateText(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    significant_text: {
                        filter_duplicate_text: true
                    }
                }
            });
        });

        test('sets sourceFields', () => {
            const value = getInstance()
                .sourceFields(['content', 'title'])
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    significant_text: {
                        source_fields: ['content', 'title']
                    }
                }
            });
        });
    });

    test('script cannot be set', () => {
        expect(() => new SignificantTextAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in SignificantTextAggregation')
        );
    });

    test('missing cannot be set', () => {
        expect(() =>
            new SignificantTextAggregation('my_agg').missing()
        ).toThrow(
            new Error('missing is not supported in SignificantTextAggregation')
        );
    });

    test('executionHint cannot be set', () => {
        expect(() =>
            new SignificantTextAggregation('my_agg').executionHint()
        ).toThrow(
            new Error(
                'executionHint is not supported in SignificantTextAggregation'
            )
        );
    });
});
