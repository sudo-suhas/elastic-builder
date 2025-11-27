import { describe, test, expect } from 'vitest';
import { MovingFunctionAggregation } from '../../src';

const getInstance = (bucketsPath, window, script) =>
    new MovingFunctionAggregation('my_agg', bucketsPath, window, script);

describe('MovingFunctionAggregation', () => {
    test('sets type as moving_fn', () => {
        const value = new MovingFunctionAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { moving_fn: {} }
        });
    });

    describe('options', () => {
        test('sets format', () => {
            const value = getInstance().format('####.00').toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_fn: {
                        format: '####.00'
                    }
                }
            });
        });

        test('sets window', () => {
            const value = getInstance().window(7).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_fn: {
                        window: 7
                    }
                }
            });
        });

        test('sets shift', () => {
            const value = getInstance().shift(0).toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_fn: {
                        shift: 0
                    }
                }
            });
        });

        test('sets script', () => {
            const value = getInstance()
                .script('MovingFunctions.unweightedAvg(values)')
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    moving_fn: {
                        script: 'MovingFunctions.unweightedAvg(values)'
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = getInstance(
                'my_buckets_path',
                10,
                'MovingFunctions.unweightedAvg(values)'
            ).toJSON();
            const expected = {
                my_agg: {
                    moving_fn: {
                        buckets_path: 'my_buckets_path',
                        window: 10,
                        script: 'MovingFunctions.unweightedAvg(values)'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
