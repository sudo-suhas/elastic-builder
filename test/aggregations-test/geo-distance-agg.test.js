import { describe, test, expect } from 'vitest';
import { GeoDistanceAggregation, geoPoint } from '../../src';

const getInstance = () =>
    new GeoDistanceAggregation('my_geo_agg').range({ to: 100 });

describe('GeoDistanceAggregation', () => {
    test('sets type as geo_distance', () => {
        const value = getInstance().toJSON();
        const expected = {
            my_geo_agg: {
                geo_distance: {
                    ranges: [{ to: 100 }]
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('format cannot be set', () => {
        expect(() => new GeoDistanceAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoDistanceAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GeoDistanceAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GeoDistanceAggregation')
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
            test('origin()', () => {
                expect(() => getInstance().origin(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });
        });
    });

    describe('unit() validation', () => {
        test.each([
            { name: 'accepts valid value: in', value: 'in' },
            { name: 'accepts valid value: inch', value: 'inch' },
            { name: 'accepts valid value: yd', value: 'yd' },
            { name: 'accepts valid value: yards', value: 'yards' },
            { name: 'accepts valid value: ft', value: 'ft' },
            { name: 'accepts valid value: feet', value: 'feet' },
            { name: 'accepts valid value: km', value: 'km' },
            { name: 'accepts valid value: kilometers', value: 'kilometers' },
            { name: 'accepts valid value: NM', value: 'NM' },
            { name: 'accepts valid value: nmi', value: 'nmi' },
            {
                name: 'accepts valid value: nauticalmiles',
                value: 'nauticalmiles'
            },
            { name: 'accepts valid value: mm', value: 'mm' },
            { name: 'accepts valid value: millimeters', value: 'millimeters' },
            { name: 'accepts valid value: cm', value: 'cm' },
            { name: 'accepts valid value: centimeters', value: 'centimeters' },
            { name: 'accepts valid value: mi', value: 'mi' },
            { name: 'accepts valid value: miles', value: 'miles' },
            { name: 'accepts valid value: m', value: 'm' },
            { name: 'accepts valid value: meters', value: 'meters' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().unit(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_unit' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().unit(value)).toThrow(
                new Error(
                    "The 'unit' parameter should be one of 'NM', 'centimeters', 'cm', 'feet', 'ft', 'in', 'inch', 'kilometers', 'km', 'm', 'meters', 'mi', 'miles', 'millimeters', 'mm', 'nauticalmiles', 'nmi', 'yards', 'yd'"
                )
            );
        });
    });

    describe('distanceType() validation', () => {
        test.each([
            { name: 'accepts valid value: plane', value: 'plane' },
            {
                name: 'accepts valid value: PLANE (case-insensitive)',
                value: 'PLANE'
            },
            { name: 'accepts valid value: arc', value: 'arc' },
            {
                name: 'accepts valid value: ARC (case-insensitive)',
                value: 'ARC'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().distanceType(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_distance_type' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().distanceType(value)).toThrow(
                new Error(
                    "The 'distance_type' parameter should be one of 'plane' or 'arc'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets origin', () => {
            const value = getInstance()
                .origin(geoPoint().object({ lat: 41.12, lon: -71.34 }))
                .toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geo_distance: {
                        ranges: [{ to: 100 }],
                        origin: { lat: 41.12, lon: -71.34 }
                    }
                }
            });
        });

        test('sets unit', () => {
            const value = getInstance().unit('km').toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geo_distance: {
                        ranges: [{ to: 100 }],
                        unit: 'km'
                    }
                }
            });
        });

        test('sets distanceType', () => {
            const value = getInstance().distanceType('plane').toJSON();
            expect(value).toEqual({
                my_geo_agg: {
                    geo_distance: {
                        ranges: [{ to: 100 }],
                        distance_type: 'plane'
                    }
                }
            });
        });
    });
});
