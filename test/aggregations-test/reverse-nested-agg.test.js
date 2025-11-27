import { describe, test, expect } from 'vitest';
import { ReverseNestedAggregation } from '../../src';

const getInstance = (...args) =>
    new ReverseNestedAggregation('my_agg', ...args);

describe('ReverseNestedAggregation', () => {
    test('sets type as reverse_nested', () => {
        const value = new ReverseNestedAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { reverse_nested: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new ReverseNestedAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in ReverseNestedAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new ReverseNestedAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in ReverseNestedAggregation')
        );
    });

    describe('options', () => {
        test('sets path', () => {
            const value = getInstance().path('reverse_nested_path').toJSON();
            expect(value).toEqual({
                my_agg: {
                    reverse_nested: {
                        path: 'reverse_nested_path'
                    }
                }
            });
        });
    });

    test('constructor sets arguments', () => {
        const value = getInstance('reverse_nested_path').toJSON();
        const expected = {
            my_agg: {
                reverse_nested: {
                    path: 'reverse_nested_path'
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
