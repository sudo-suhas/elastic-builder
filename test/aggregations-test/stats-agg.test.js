import { describe, test, expect } from 'vitest';
import { StatsAggregation } from '../../src';

describe('StatsAggregation', () => {
    test('sets type as stats', () => {
        const value = new StatsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { stats: {} }
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = new StatsAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    stats: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
