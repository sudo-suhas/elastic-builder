import { describe, test, expect } from 'vitest';
import { GeoTileGridAggregation, GeoPoint } from '../../src';

const getInstance = () => new GeoTileGridAggregation('my_geo_agg');

const pt1 = new GeoPoint().lat(40.73).lon(-74.1);
const pt2 = new GeoPoint().lat(40.1).lon(-71.12);

describe('GeoTileGridAggregation', () => {
    test('sets type as geotile_grid', () => {
        const value = new GeoTileGridAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { geotile_grid: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new GeoTileGridAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoTileGridAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GeoTileGridAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GeoTileGridAggregation')
        );
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('topLeft()', () => {
                expect(() => getInstance().topLeft(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('bottomRight()', () => {
                expect(() => getInstance().bottomRight(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('topRight()', () => {
                expect(() => getInstance().topRight(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('bottomLeft()', () => {
                expect(() => getInstance().bottomLeft(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });
        });
    });

    describe('options', () => {
        test('sets precision', () => {
            const value = getInstance().precision(8).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        precision: 8
                    }
                }
            });
        });

        test('sets size', () => {
            const value = getInstance().size(10000).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        size: 10000
                    }
                }
            });
        });

        test('sets shardSize', () => {
            const value = getInstance().shardSize(3).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        shard_size: 3
                    }
                }
            });
        });
    });

    describe('bounds options', () => {
        test('sets topLeft', () => {
            const value = getInstance().topLeft(pt1).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            top_left: { lat: 40.73, lon: -74.1 }
                        }
                    }
                }
            });
        });

        test('sets bottomRight', () => {
            const value = getInstance().bottomRight(pt2).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            bottom_right: { lat: 40.1, lon: -71.12 }
                        }
                    }
                }
            });
        });

        test('sets topRight', () => {
            const value = getInstance().topRight(pt1).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            top_right: { lat: 40.73, lon: -74.1 }
                        }
                    }
                }
            });
        });

        test('sets bottomLeft', () => {
            const value = getInstance().bottomLeft(pt2).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            bottom_left: { lat: 40.1, lon: -71.12 }
                        }
                    }
                }
            });
        });

        test('sets top', () => {
            const value = getInstance().top(40.73).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            top: 40.73
                        }
                    }
                }
            });
        });

        test('sets left', () => {
            const value = getInstance().left(-74.1).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            left: -74.1
                        }
                    }
                }
            });
        });

        test('sets bottom', () => {
            const value = getInstance().bottom(40.1).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            bottom: 40.1
                        }
                    }
                }
            });
        });

        test('sets right', () => {
            const value = getInstance().right(-71.12).toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geotile_grid: {
                        bounds: {
                            right: -71.12
                        }
                    }
                }
            });
        });
    });

    describe('precision() validation', () => {
        test.each([
            { name: 'throws for value below minimum (-1)', value: -1 },
            { name: 'throws for value above maximum (30)', value: 30 },
            { name: 'throws for null value', value: null },
            { name: 'throws for undefined value', value: undefined }
        ])('$name', ({ value }) => {
            expect(() => getInstance().precision(value)).toThrow(
                new Error('`precision` can only be value from 0 to 29.')
            );
        });
    });
});
