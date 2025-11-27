import { describe, test, expect } from 'vitest';
import { NestedAggregation } from '../../src';

const getInstance = (...args) => new NestedAggregation('my_agg', ...args);

describe('NestedAggregation', () => {
    test('sets type as nested', () => {
        const value = new NestedAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { nested: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new NestedAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in NestedAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new NestedAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in NestedAggregation')
        );
    });

    describe('options', () => {
        test('sets path', () => {
            const value = getInstance().path('nested_path').toJSON();
            expect(value).toEqual({
                my_agg: {
                    nested: {
                        path: 'nested_path'
                    }
                }
            });
        });
    });

    test('constructor sets arguments', () => {
        const value = getInstance('nested_path').toJSON();
        const expected = {
            my_agg: {
                nested: {
                    path: 'nested_path'
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
