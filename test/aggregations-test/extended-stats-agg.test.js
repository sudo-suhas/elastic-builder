import { describe, test, expect } from 'vitest';
import { ExtendedStatsAggregation } from '../../src';

const getInstance = field => new ExtendedStatsAggregation('my_agg', field);

describe('ExtendedStatsAggregation', () => {
    test('sets type as extended_stats', () => {
        const value = new ExtendedStatsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { extended_stats: {} }
        });
    });

    describe('options', () => {
        test('sets sigma', () => {
            const value = getInstance('my_field').sigma(3).toJSON();
            expect(value).toEqual({
                my_agg: {
                    extended_stats: {
                        field: 'my_field',
                        sigma: 3
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const valueA = getInstance('my_field').toJSON();
            const valueB = getInstance().field('my_field').toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_agg: {
                    extended_stats: {
                        field: 'my_field'
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
