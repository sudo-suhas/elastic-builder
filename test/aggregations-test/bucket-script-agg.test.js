import { describe, test, expect } from 'vitest';
import { BucketScriptAggregation, Script } from '../../src';

const getInstance = bucketsPath =>
    new BucketScriptAggregation('my_agg', bucketsPath);

describe('BucketScriptAggregation', () => {
    test('sets type as bucket_script', () => {
        const value = new BucketScriptAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { bucket_script: {} }
        });
    });

    describe('options', () => {
        test('sets script with string', () => {
            const value = getInstance()
                .script('params.my_var1 / params.my_var2')
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    bucket_script: {
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
                    bucket_script: {
                        script: scriptInstance.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('sets buckets_path', () => {
            const value = getInstance({
                my_var1: 'the_sum',
                my_var2: 'the_value_count'
            }).toJSON();
            const expected = {
                my_agg: {
                    bucket_script: {
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
});
