import { describe, test, expect } from 'vitest';
import { AvgAggregation } from '../../src';

describe('AvgAggregation', () => {
    test('sets type as avg', () => {
        const value = new AvgAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { avg: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new AvgAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    avg: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
