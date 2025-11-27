import { describe, test, expect } from 'vitest';
import { GlobalAggregation } from '../../src';

describe('GlobalAggregation', () => {
    test('sets type as global', () => {
        const value = new GlobalAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { global: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new GlobalAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in GlobalAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GlobalAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GlobalAggregation')
        );
    });
});
