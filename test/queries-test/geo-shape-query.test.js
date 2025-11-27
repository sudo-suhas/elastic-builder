import { describe, test, expect } from 'vitest';
import { GeoShapeQuery, GeoShape, IndexedShape } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = () => new GeoShapeQuery('my_field');

describe('GeoShapeQuery', () => {
    describe('illegal method call', () => {
        test('validation_method cannot be set', () => {
            expect(() => new GeoShapeQuery().validationMethod()).toThrow(
                new Error('validationMethod is not supported in GeoShapeQuery')
            );
        });
    });

    describe('parameter type validation', () => {
        test('checks GeoShape class for shape', () => {
            const instance = getInstance();
            expect(() => instance.shape(null)).toThrow(
                new TypeError('Argument must be an instance of GeoShape')
            );
            expect(() => instance.shape(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of GeoShape')
            );
        });

        test('checks IndexedShape class for indexedShape', () => {
            const instance = getInstance();
            expect(() => instance.indexedShape(null)).toThrow(
                new TypeError('Argument must be an instance of IndexedShape')
            );
            expect(() => instance.indexedShape(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of IndexedShape')
            );
        });
    });

    describe('relation() validation', () => {
        test.each([
            { name: 'accepts valid value: WITHIN', value: 'WITHIN' },
            {
                name: 'accepts valid value: within (case-insensitive)',
                value: 'within'
            },
            { name: 'accepts valid value: CONTAINS', value: 'CONTAINS' },
            {
                name: 'accepts valid value: contains (case-insensitive)',
                value: 'contains'
            },
            { name: 'accepts valid value: DISJOINT', value: 'DISJOINT' },
            {
                name: 'accepts valid value: disjoint (case-insensitive)',
                value: 'disjoint'
            },
            { name: 'accepts valid value: INTERSECTS', value: 'INTERSECTS' },
            {
                name: 'accepts valid value: intersects (case-insensitive)',
                value: 'intersects'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().relation(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_relation' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().relation(value)).toThrow(
                /The 'relation' parameter should be one of/
            );
        });
    });

    describe('field options', () => {
        test('sets shape option', () => {
            const shape = new GeoShape().type('envelope').coordinates([
                [13.0, 53.0],
                [14.0, 52.0]
            ]);
            const result = getInstance().shape(shape).toJSON();
            const expected = {
                geo_shape: {
                    my_field: {
                        shape: recursiveToJSON(shape.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets indexed_shape option', () => {
            const indexedShape = new IndexedShape()
                .id('DEU')
                .type('countries')
                .index('shapes')
                .path('location');
            const result = getInstance().indexedShape(indexedShape).toJSON();
            const expected = {
                geo_shape: {
                    my_field: {
                        indexed_shape: recursiveToJSON(indexedShape.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets relation option', () => {
            const result = getInstance().relation('WITHIN').toJSON();
            const expected = {
                geo_shape: {
                    my_field: {
                        relation: 'WITHIN'
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('query options', () => {
        test('sets ignore_unmapped option', () => {
            const result = getInstance().ignoreUnmapped(true).toJSON();
            const expected = {
                geo_shape: {
                    my_field: {},
                    ignore_unmapped: true
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
