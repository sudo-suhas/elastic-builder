import { describe, test, expect } from 'vitest';
import { TermsAggregationBase } from '../../src/aggregations/bucket-aggregations';

const getInstance = (...args) =>
    new TermsAggregationBase('my_agg', 'my_type', '', ...args);

describe('TermsAggregationBase', () => {
    describe('executionHint() validation', () => {
        test.each([
            { name: 'accepts valid value: map', value: 'map' },
            {
                name: 'accepts valid value: MAP (case-insensitive)',
                value: 'MAP'
            },
            {
                name: 'accepts valid value: global_ordinals',
                value: 'global_ordinals'
            },
            {
                name: 'accepts valid value: GLOBAL_ORDINALS (case-insensitive)',
                value: 'GLOBAL_ORDINALS'
            },
            {
                name: 'accepts valid value: global_ordinals_hash',
                value: 'global_ordinals_hash'
            },
            {
                name: 'accepts valid value: GLOBAL_ORDINALS_HASH (case-insensitive)',
                value: 'GLOBAL_ORDINALS_HASH'
            },
            {
                name: 'accepts valid value: global_ordinals_low_cardinality',
                value: 'global_ordinals_low_cardinality'
            },
            {
                name: 'accepts valid value: GLOBAL_ORDINALS_LOW_CARDINALITY (case-insensitive)',
                value: 'GLOBAL_ORDINALS_LOW_CARDINALITY'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().executionHint(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_execution_hint'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().executionHint(value)).toThrow(
                new Error(
                    "The 'execution_hint' parameter should be one of 'global_ordinals', 'global_ordinals_hash', 'global_ordinals_low_cardinality', 'map'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets format', () => {
            const value = getInstance().format('####.00').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        format: '####.00'
                    }
                }
            });
        });

        test('sets minDocCount', () => {
            const value = getInstance().minDocCount(5).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        min_doc_count: 5
                    }
                }
            });
        });

        test('sets shardMinDocCount', () => {
            const value = getInstance().shardMinDocCount(2).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        shard_min_doc_count: 2
                    }
                }
            });
        });

        test('sets size', () => {
            const value = getInstance().size(20).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        size: 20
                    }
                }
            });
        });

        test('sets shardSize', () => {
            const value = getInstance().shardSize(-1).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        shard_size: -1
                    }
                }
            });
        });

        test('sets missing', () => {
            const value = getInstance().missing(42).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        missing: 42
                    }
                }
            });
        });

        test('sets include', () => {
            const value = getInstance().include('.*sport.*').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        include: '.*sport.*'
                    }
                }
            });
        });

        test('sets exclude', () => {
            const value = getInstance().exclude('water_.*').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        exclude: 'water_.*'
                    }
                }
            });
        });
    });
});
