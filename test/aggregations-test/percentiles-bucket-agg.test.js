import { describe, test, expect } from 'vitest';
import { PercentilesBucketAggregation } from '../../src';

const getInstance = bucketsPath =>
    new PercentilesBucketAggregation('my_agg', bucketsPath);

describe('PercentilesBucketAggregation', () => {
    test('sets type as percentiles_bucket', () => {
        const value = new PercentilesBucketAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { percentiles_bucket: {} }
        });
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('percents()', () => {
                expect(() => getInstance().percents(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets percents', () => {
            const value = getInstance('my_buckets_path')
                .percents([25.0, 50.0, 75.0])
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    percentiles_bucket: {
                        buckets_path: 'my_buckets_path',
                        percents: [25.0, 50.0, 75.0]
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
                    percentiles_bucket: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
