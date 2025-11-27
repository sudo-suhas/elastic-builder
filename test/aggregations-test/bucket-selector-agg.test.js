import { describe, test, expect } from 'vitest';
import { BucketSelectorAggregation, Script } from '../../src';

const getInstance = bucketsPath =>
    new BucketSelectorAggregation('my_agg', bucketsPath);

describe('BucketSelectorAggregation', () => {
    test('sets type as bucket_selector', () => {
        const value = new BucketSelectorAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { bucket_selector: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new BucketSelectorAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in BucketSelectorAggregation')
        );
    });

    describe('options', () => {
        test('sets script with string', () => {
            const value = getInstance()
                .script('params.my_var1 / params.my_var2')
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    bucket_selector: {
                        script: 'params.my_var1 / params.my_var2'
                    }
                }
            });
        });

        test('sets script with Script instance', () => {
            const scriptInstance = new Script(
                'inline',
                'params.my_var1 / params.my_var2'
            );
            const value = getInstance().script(scriptInstance).toJSON();
            const expected = {
                my_agg: {
                    bucket_selector: {
                        script: scriptInstance.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    test('constructor sets buckets_path', () => {
        const value = getInstance({
            my_var1: 'the_sum',
            my_var2: 'the_value_count'
        }).toJSON();
        const expected = {
            my_agg: {
                bucket_selector: {
                    buckets_path: {
                        my_var1: 'the_sum',
                        my_var2: 'the_value_count'
                    }
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
