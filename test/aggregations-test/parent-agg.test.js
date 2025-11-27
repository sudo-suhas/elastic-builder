import { describe, test, expect } from 'vitest';
import { ParentAggregation } from '../../src';

describe('ParentAggregation', () => {
    test('sets type as parent', () => {
        const value = new ParentAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { parent: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new ParentAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in ParentAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new ParentAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in ParentAggregation')
        );
    });

    test('constructor sets type', () => {
        const value = new ParentAggregation('to_questions', 'answer').toJSON();
        const expected = {
            to_questions: {
                parent: {
                    type: 'answer'
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('type is set', () => {
        const value = new ParentAggregation('to_questions')
            .type('answer')
            .toJSON();
        const expected = {
            to_questions: {
                parent: {
                    type: 'answer'
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
