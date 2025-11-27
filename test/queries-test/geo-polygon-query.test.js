import { describe, test, expect } from 'vitest';
import { GeoPolygonQuery } from '../../src';

const getInstance = () => new GeoPolygonQuery('my_field');

describe('GeoPolygonQuery', () => {
    describe('parameter type validation', () => {
        test('checks Array class for points', () => {
            const instance = getInstance();
            expect(() => instance.points(null)).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
            expect(() => instance.points(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
        });
    });

    describe('options', () => {
        test('sets points option', () => {
            const points = [
                { lat: 40, lon: -70 },
                { lat: 30, lon: -80 },
                { lat: 20, lon: -90 }
            ];
            const result = getInstance().points(points).toJSON();
            const expected = {
                geo_polygon: {
                    my_field: {
                        points: points
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
