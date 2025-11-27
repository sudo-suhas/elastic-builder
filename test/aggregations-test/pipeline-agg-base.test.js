import { describe, test, expect } from 'vitest';
import { PipelineAggregationBase } from '../../src/aggregations/pipeline-aggregations';

const getInstance = bucketsPath =>
    new PipelineAggregationBase('my_agg', 'my_type', '', bucketsPath);

describe('PipelineAggregationBase', () => {
    describe('gapPolicy() validation', () => {
        test.each([
            { name: 'accepts valid value: skip', value: 'skip' },
            {
                name: 'accepts valid value: SKIP (case-insensitive)',
                value: 'SKIP'
            },
            {
                name: 'accepts valid value: insert_zeros',
                value: 'insert_zeros'
            },
            {
                name: 'accepts valid value: INSERT_ZEROS (case-insensitive)',
                value: 'INSERT_ZEROS'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().gapPolicy(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_gap_policy' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().gapPolicy(value)).toThrow(
                new Error(
                    "The 'gap_policy' parameter should be one of 'skip' or 'insert_zeros'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets bucketsPath', () => {
            const value = getInstance().bucketsPath('my_buckets_path').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            });
        });

        test('sets gapPolicy', () => {
            const value = getInstance().gapPolicy('insert_zeros').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        gap_policy: 'insert_zeros'
                    }
                }
            });
        });

        test('sets format', () => {
            const value = getInstance().format('my_format').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        format: 'my_format'
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
                    my_type: {
                        buckets_path: 'my_buckets_path'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
