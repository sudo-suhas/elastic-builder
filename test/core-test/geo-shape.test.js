import { describe, test, expect } from 'vitest';
import { GeoShape, geoShape } from '../../src';

describe('GeoShape', () => {
    describe('parameter validation', () => {
        test.each([
            {
                name: 'coordinates() throws TypeError for null parameter',
                value: null
            },
            {
                name: 'coordinates() throws TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            expect(() => new GeoShape().coordinates(value)).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
        });
    });

    describe('type() validation', () => {
        test.each([
            { name: 'accepts valid type: point', value: 'point' },
            {
                name: 'accepts valid type: POINT (case-insensitive)',
                value: 'POINT'
            },
            { name: 'accepts valid type: linestring', value: 'linestring' },
            {
                name: 'accepts valid type: LINESTRING (case-insensitive)',
                value: 'LINESTRING'
            },
            { name: 'accepts valid type: polygon', value: 'polygon' },
            {
                name: 'accepts valid type: POLYGON (case-insensitive)',
                value: 'POLYGON'
            },
            { name: 'accepts valid type: multipoint', value: 'multipoint' },
            {
                name: 'accepts valid type: MULTIPOINT (case-insensitive)',
                value: 'MULTIPOINT'
            },
            {
                name: 'accepts valid type: multilinestring',
                value: 'multilinestring'
            },
            {
                name: 'accepts valid type: MULTILINESTRING (case-insensitive)',
                value: 'MULTILINESTRING'
            },
            { name: 'accepts valid type: multipolygon', value: 'multipolygon' },
            {
                name: 'accepts valid type: MULTIPOLYGON (case-insensitive)',
                value: 'MULTIPOLYGON'
            },
            {
                name: 'accepts valid type: geometrycollection',
                value: 'geometrycollection'
            },
            {
                name: 'accepts valid type: GEOMETRYCOLLECTION (case-insensitive)',
                value: 'GEOMETRYCOLLECTION'
            },
            { name: 'accepts valid type: envelope', value: 'envelope' },
            {
                name: 'accepts valid type: ENVELOPE (case-insensitive)',
                value: 'ENVELOPE'
            },
            { name: 'accepts valid type: circle', value: 'circle' },
            {
                name: 'accepts valid type: CIRCLE (case-insensitive)',
                value: 'CIRCLE'
            }
        ])('$name', ({ value }) => {
            expect(() => geoShape().type(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null type', value: null },
            { name: 'throws for invalid type', value: 'invalid_type' }
        ])('$name', ({ value }) => {
            expect(() => geoShape().type(value)).toThrow(
                /The 'type' parameter should be one of/
            );
        });
    });

    describe('constructor', () => {
        test('sets arguments', () => {
            let value = new GeoShape('multipoint', [
                [102.0, 2.0],
                [103.0, 2.0]
            ]).toJSON();
            const expected = {
                type: 'multipoint',
                coordinates: [
                    [102.0, 2.0],
                    [103.0, 2.0]
                ]
            };
            expect(value).toEqual(expected);

            value = new GeoShape('multipoint')
                .coordinates([
                    [102.0, 2.0],
                    [103.0, 2.0]
                ])
                .toJSON();
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets type and coordinates', () => {
            const value = new GeoShape()
                .type('envelope')
                .coordinates([
                    [-45.0, 45.0],
                    [45.0, -45.0]
                ])
                .toJSON();
            const expected = {
                type: 'envelope',
                coordinates: [
                    [-45.0, 45.0],
                    [45.0, -45.0]
                ]
            };
            expect(value).toEqual(expected);
        });

        test('sets radius', () => {
            const value = new GeoShape()
                .type('circle')
                .coordinates([-45.0, 45.0])
                .radius('100m')
                .toJSON();
            const expected = {
                type: 'circle',
                coordinates: [-45.0, 45.0],
                radius: '100m'
            };
            expect(value).toEqual(expected);
        });
    });

    describe('toJSON', () => {
        test('throws when both type and coordinates are missing', () => {
            expect(() => new GeoShape().toJSON()).toThrow(
                'For all types, both the inner `type` and `coordinates` fields are required.'
            );
        });

        test('throws when coordinates is missing', () => {
            expect(() => new GeoShape().type('point').toJSON()).toThrow(
                'For all types, both the inner `type` and `coordinates` fields are required.'
            );
        });

        test('throws when type is missing', () => {
            expect(() =>
                new GeoShape().coordinates([-45.0, 45.0]).toJSON()
            ).toThrow(
                'For all types, both the inner `type` and `coordinates` fields are required.'
            );
        });
    });
});
