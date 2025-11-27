import { describe, test, expect } from 'vitest';
import { GeoHashGridAggregation } from '../../src';

const getInstance = () => new GeoHashGridAggregation('my_geo_agg');

describe('GeoHashGridAggregation', () => {
    test('sets type as geohash_grid', () => {
        const value = new GeoHashGridAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { geohash_grid: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new GeoHashGridAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoHashGridAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GeoHashGridAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GeoHashGridAggregation')
        );
    });

    describe('options', () => {
        test('sets precision', () => {
            const value = getInstance().precision(8).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohash_grid: {
                        precision: 8
                    }
                }
            });
        });

        test('sets size', () => {
            const value = getInstance().size(10000).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohash_grid: {
                        size: 10000
                    }
                }
            });
        });

        test('sets shardSize', () => {
            const value = getInstance().shardSize(3).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohash_grid: {
                        shard_size: 3
                    }
                }
            });
        });
    });

    describe('precision() validation', () => {
        test.each([
            { name: 'throws for value below minimum (0)', value: 0 },
            { name: 'throws for value above maximum (13)', value: 13 },
            { name: 'throws for null value', value: null },
            { name: 'throws for undefined value', value: undefined }
        ])('$name', ({ value }) => {
            expect(() => getInstance().precision(value)).toThrow(
                new Error('`precision` can only be value from 1 to 12.')
            );
        });
    });
});
