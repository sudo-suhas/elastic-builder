import { describe, test, expect } from 'vitest';
import { MaxAggregation } from '../../src';

describe('MaxAggregation', () => {
    test('sets type as max', () => {
        const value = new MaxAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { max: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new MaxAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    max: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
