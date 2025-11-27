import { describe, test, expect } from 'vitest';
import { SumAggregation } from '../../src';

describe('SumAggregation', () => {
    test('sets type as sum', () => {
        const value = new SumAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { sum: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new SumAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    sum: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
