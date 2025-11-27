import { describe, test, expect } from 'vitest';
import { DiversifiedSamplerAggregation } from '../../src';

const getInstance = () =>
    new DiversifiedSamplerAggregation('my_samples', 'my_field');

describe('DiversifiedSamplerAggregation', () => {
    test('sets type as diversified_sampler', () => {
        const value = new DiversifiedSamplerAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { diversified_sampler: {} }
        });
    });

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
        test('sets shardSize', () => {
            const value = getInstance().shardSize(200).toJSON();
            expect(value).toEqual({
                my_samples: {
                    diversified_sampler: {
                        field: 'my_field',
                        shard_size: 200
                    }
                }
            });
        });

        test('sets maxDocsPerValue', () => {
            const value = getInstance().maxDocsPerValue(3).toJSON();
            expect(value).toEqual({
                my_samples: {
                    diversified_sampler: {
                        field: 'my_field',
                        max_docs_per_value: 3
                    }
                }
            });
        });

        test('sets executionHint', () => {
            const value = getInstance().executionHint('map').toJSON();
            expect(value).toEqual({
                my_samples: {
                    diversified_sampler: {
                        field: 'my_field',
                        execution_hint: 'map'
                    }
                }
            });
        });
    });

    test('constructor sets arguments', () => {
        const value = getInstance().toJSON();
        const expected = {
            my_samples: {
                diversified_sampler: {
                    field: 'my_field'
                }
            }
        };
        expect(value).toEqual(expected);
    });
});
