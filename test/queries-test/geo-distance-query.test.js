import { describe, test, expect } from 'vitest';
import { GeoDistanceQuery, GeoPoint } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = pt => new GeoDistanceQuery('my_field', pt);
const pt = new GeoPoint().lat(40.73).lon(-74.1);

describe('GeoDistanceQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('geoPoint()', () => {
                const instance = getInstance();
                expect(() => instance.geoPoint(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });
        });
    });

    describe('distanceType() validation', () => {
        test.each([
            { name: 'accepts valid value: arc', value: 'arc' },
            {
                name: 'accepts valid value: ARC (case-insensitive)',
                value: 'ARC'
            },
            { name: 'accepts valid value: plane', value: 'plane' },
            {
                name: 'accepts valid value: PLANE (case-insensitive)',
                value: 'PLANE'
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
        test('sets distance option', () => {
            const result = getInstance().distance('10m').toJSON();
            const expected = {
                geo_distance: {
                    my_field: {},
                    distance: '10m'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets distance_type option', () => {
            const result = getInstance().distanceType('arc').toJSON();
            const expected = {
                geo_distance: {
                    my_field: {},
                    distance_type: 'arc'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets geo_point option', () => {
            const result = getInstance().geoPoint(pt).toJSON();
            const expected = {
                geo_distance: {
                    my_field: recursiveToJSON(pt.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets point', () => {
            const valueA = getInstance(pt).toJSON();
            const valueB = getInstance().geoPoint(pt).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                geo_distance: {
                    my_field: { lat: 40.73, lon: -74.1 }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
