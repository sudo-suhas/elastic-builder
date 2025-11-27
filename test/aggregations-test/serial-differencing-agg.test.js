import { describe, test, expect } from 'vitest';
import { SerialDifferencingAggregation } from '../../src';

const getInstance = bucketsPath =>
    new SerialDifferencingAggregation('my_agg', bucketsPath);

describe('SerialDifferencingAggregation', () => {
    test('sets type as serial_diff', () => {
        const value = new SerialDifferencingAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { serial_diff: {} }
        });
    });

    describe('options', () => {
        test('sets lag', () => {
            const value = getInstance('my_buckets_path').lag(2).toJSON();
            expect(value).toEqual({
                my_agg: {
                    serial_diff: {
                        buckets_path: 'my_buckets_path',
                        lag: 2
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
                    serial_diff: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
