import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeoPoint } from '../../src';

describe('GeoPoint', () => {
    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('object()', () => {
                expect(() => new GeoPoint().object(value)).toThrow(
                    new TypeError('Argument must be an instance of Object')
                );
            });

            test('array()', () => {
                expect(() => new GeoPoint().array(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('representation setters', () => {
        test('sets lat lon', () => {
            const value = new GeoPoint().lat(41.12).lon(-71.34).toJSON();
            expect(value).toEqual({ lat: 41.12, lon: -71.34 });
        });

        test('sets object', () => {
            const value = new GeoPoint()
                .object({ lat: 41.12, lon: -71.34 })
                .toJSON();
            expect(value).toEqual({ lat: 41.12, lon: -71.34 });
        });

        test('sets array', () => {
            const value = new GeoPoint().array([-71.34, 41.12]).toJSON();
            expect(value).toEqual([-71.34, 41.12]);
        });

        test('sets string', () => {
            const value = new GeoPoint().string('41.12,-71.34').toJSON();
            const expected = '41.12,-71.34';
            expect(value).toBe(expected);
        });
    });

    describe('mixed representation', () => {
        test('lat then array overwrites', () => {
            const value = new GeoPoint()
                .lat(41.12)
                .array([-71.34, 41.12])
                .toJSON();
            expect(value).toEqual([-71.34, 41.12]);
        });

        test('string then lat/lon overwrites', () => {
            const value = new GeoPoint()
                .string('41.12,-71.34')
                .lat(41.12)
                .lon(-71.34)
                .toJSON();
            expect(value).toEqual({ lat: 41.12, lon: -71.34 });
        });

        test('array then object overwrites', () => {
            const value = new GeoPoint()
                .array([-71.34, 41.12])
                .object({ lat: 41.12, lon: -71.34 })
                .toJSON();
            expect(value).toEqual({ lat: 41.12, lon: -71.34 });
        });

        test('lat then string overwrites', () => {
            const value = new GeoPoint()
                .lat(41.12)
                .string('41.12,-71.34')
                .toJSON();
            expect(value).toEqual('41.12,-71.34');
        });
    });

    describe('mixed representation warnings', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('lat then array logs warnings', () => {
            const geoPoint = new GeoPoint().lat(41.12).array([-71.34, 41.12]);
            geoPoint.toJSON();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[GeoPoint] Do not mix with other representation!'
            );
            expect(spy).toHaveBeenNthCalledWith(2, '[GeoPoint] Overwriting.');
        });

        test('array then object logs warnings', () => {
            const geoPoint = new GeoPoint()
                .array([-71.34, 41.12])
                .object({ lat: 41.12, lon: -71.34 });
            geoPoint.toJSON();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[GeoPoint] Do not mix with other representation!'
            );
            expect(spy).toHaveBeenNthCalledWith(2, '[GeoPoint] Overwriting.');
        });

        test('lat then string logs warnings', () => {
            const geoPoint = new GeoPoint().lat(41.12).string('41.12,-71.34');
            geoPoint.toJSON();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[GeoPoint] Do not mix with other representation!'
            );
            expect(spy).toHaveBeenNthCalledWith(2, '[GeoPoint] Overwriting.');
        });
    });
});
