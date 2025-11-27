import { describe, test, expect } from 'vitest';
import { ChildrenAggregation } from '../../src';

describe('ChildrenAggregation', () => {
    test('sets type as children', () => {
        const value = new ChildrenAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { children: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new ChildrenAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in ChildrenAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new ChildrenAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in ChildrenAggregation')
        );
    });

    test('type is set', () => {
        const value = new ChildrenAggregation('to_answers')
            .type('answer')
            .toJSON();
        const expected = {
            to_answers: {
                children: {
                    type: 'answer'
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
