import { describe, test, expect } from 'vitest';
import { MinAggregation } from '../../src';

describe('MinAggregation', () => {
    test('sets type as min', () => {
        const value = new MinAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { min: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new MinAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    min: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
