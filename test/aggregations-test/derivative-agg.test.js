import { describe, test, expect } from 'vitest';
import { DerivativeAggregation } from '../../src';

const getInstance = bucketsPath =>
    new DerivativeAggregation('my_agg', bucketsPath);

describe('DerivativeAggregation', () => {
    test('sets type as derivative', () => {
        const value = new DerivativeAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { derivative: {} }
        });
    });

    describe('options', () => {
        test('sets unit', () => {
            const value = getInstance('my_buckets_path').unit('day').toJSON();
            expect(value).toEqual({
                my_agg: {
                    derivative: {
                        buckets_path: 'my_buckets_path',
                        unit: 'day'
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = getInstance('my_buckets_path').toJSON();
            const expected = {
                my_agg: {
                    derivative: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
