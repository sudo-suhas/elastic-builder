import { describe, test, expect } from 'vitest';
import { MovingAverageAggregation } from '../../src';

const getInstance = bucketsPath =>
    new MovingAverageAggregation('my_agg', bucketsPath);

describe('MovingAverageAggregation', () => {
    test('sets type as moving_avg', () => {
        const value = new MovingAverageAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { moving_avg: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new MovingAverageAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in MovingAverageAggregation')
        );
    });

    describe('model() validation', () => {
        test.each([
            { name: 'accepts valid value: ewma', value: 'ewma' },
            {
                name: 'accepts valid value: EWMA (case-insensitive)',
                value: 'EWMA'
            },
            { name: 'accepts valid value: holt', value: 'holt' },
            {
                name: 'accepts valid value: HOLT (case-insensitive)',
                value: 'HOLT'
            },
            {
                name: 'accepts valid value: holt_winters',
                value: 'holt_winters'
            },
            {
                name: 'accepts valid value: HOLT_WINTERS (case-insensitive)',
                value: 'HOLT_WINTERS'
            },
            { name: 'accepts valid value: linear', value: 'linear' },
            {
                name: 'accepts valid value: LINEAR (case-insensitive)',
                value: 'LINEAR'
            },
            { name: 'accepts valid value: simple', value: 'simple' },
            {
                name: 'accepts valid value: SIMPLE (case-insensitive)',
                value: 'SIMPLE'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().model(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_model' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().model(value)).toThrow(
                new Error(
                    "The 'model' parameter should be one of 'ewma', 'holt', 'holt_winters', 'linear', 'simple'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets model', () => {
            const value = getInstance().model('simple').toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_avg: {
                        model: 'simple'
                    }
                }
            });
        });

        test('sets window', () => {
            const value = getInstance().window(7).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_avg: {
                        window: 7
                    }
                }
            });
        });

        test('sets minimize', () => {
            const value = getInstance().minimize(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_avg: {
                        minimize: true
                    }
                }
            });
        });

        test('sets settings', () => {
            const value = getInstance().settings({ alpha: 0.8 }).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_avg: {
                        settings: { alpha: 0.8 }
                    }
                }
            });
        });

        test('sets predict', () => {
            const value = getInstance().predict(10).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_avg: {
                        predict: 10
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
                    moving_avg: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
