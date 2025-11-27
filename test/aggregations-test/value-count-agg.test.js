import { describe, test, expect } from 'vitest';
import { ValueCountAggregation } from '../../src';

describe('ValueCountAggregation', () => {
    test('sets type as value_count', () => {
        const value = new ValueCountAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { value_count: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new ValueCountAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in ValueCountAggregation')
        );
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new ValueCountAggregation(
                'my_agg',
                'my_field'
            ).toJSON();
            const expected = {
                my_agg: {
                    value_count: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
