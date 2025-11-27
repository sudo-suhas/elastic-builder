import { describe, test, expect } from 'vitest';
import { GeoHexGridAggregation } from '../../src';

const getInstance = () => new GeoHexGridAggregation('my_geo_agg');

describe('GeoHexGridAggregation', () => {
    test('sets type as geohex_grid', () => {
        const value = new GeoHexGridAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { geohex_grid: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new GeoHexGridAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoHexGridAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GeoHexGridAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GeoHexGridAggregation')
        );
    });

    describe('options', () => {
        test('sets precision', () => {
            const value = getInstance().precision(8).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohex_grid: {
                        precision: 8
                    }
                }
            });
        });

        test('sets size', () => {
            const value = getInstance().size(10000).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohex_grid: {
                        size: 10000
                    }
                }
            });
        });

        test('sets shardSize', () => {
            const value = getInstance().shardSize(3).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geohex_grid: {
                        shard_size: 3
                    }
                }
            });
        });
    });

    describe('precision() validation', () => {
        test.each([
            { name: 'throws for value below minimum (-1)', value: -1 },
            { name: 'throws for value above maximum (16)', value: 16 },
            { name: 'throws for null value', value: null },
            { name: 'throws for undefined value', value: undefined }
        ])('$name', ({ value }) => {
            expect(() => getInstance().precision(value)).toThrow(
                new Error('`precision` can only be value from 0 to 15.')
            );
        });
    });
});
