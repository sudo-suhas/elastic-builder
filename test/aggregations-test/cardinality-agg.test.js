import { describe, test, expect } from 'vitest';
import { CardinalityAggregation } from '../../src';

const getInstance = field => new CardinalityAggregation('my_agg', field);

describe('CardinalityAggregation', () => {
    test('sets type as cardinality', () => {
        const value = new CardinalityAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { cardinality: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new CardinalityAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in CardinalityAggregation')
        );
    });

    describe('options', () => {
        test('sets precisionThreshold', () => {
            const value = getInstance('my_field')
                .precisionThreshold(5000)
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    cardinality: {
                        field: 'my_field',
                        precision_threshold: 5000
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = {
                my_agg: {
                    cardinality: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
