import { describe, test, expect } from 'vitest';
import { RangeAggregation } from '../../src';

describe('RangeAggregation', () => {
    test('sets type as range', () => {
        const value = new RangeAggregation('my_agg', 'my_field')
            .range({ from: 10, to: 20 })
            .toJSON();
        const expected = {
            my_agg: {
                range: {
                    field: 'my_field',
                    ranges: [{ from: 10, to: 20 }]
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
