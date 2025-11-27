import { describe, test, expect } from 'vitest';
import { SamplerAggregation } from '../../src';

const getInstance = (...args) => new SamplerAggregation('my_agg', ...args);

describe('SamplerAggregation', () => {
    test('sets type as sampler', () => {
        const value = new SamplerAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { sampler: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new SamplerAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in SamplerAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new SamplerAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in SamplerAggregation')
        );
    });

    describe('options', () => {
        test('sets shardSize', () => {
            const value = getInstance().shardSize(200).toJSON();
            expect(value).toEqual({
                my_agg: {
                    sampler: {
                        shard_size: 200
                    }
                }
            });
        });
    });
});
