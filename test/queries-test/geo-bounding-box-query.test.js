import { describe, test, expect } from 'vitest';
import { GeoBoundingBoxQuery, GeoPoint } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = () => new GeoBoundingBoxQuery('my_field');
const pt1 = new GeoPoint().lat(40.73).lon(-74.1);
const pt2 = new GeoPoint().lat(40.1).lon(-71.12);

describe('GeoBoundingBoxQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('topLeft()', () => {
                const instance = getInstance();
                expect(() => instance.topLeft(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('bottomRight()', () => {
                const instance = getInstance();
                expect(() => instance.bottomRight(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('topRight()', () => {
                const instance = getInstance();
                expect(() => instance.topRight(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });

            test('bottomLeft()', () => {
                const instance = getInstance();
                expect(() => instance.bottomLeft(value)).toThrow(
                    new TypeError('Argument must be an instance of GeoPoint')
                );
            });
        });
    });

    describe('type() validation', () => {
        test.each([
            { name: 'accepts valid value: memory', value: 'memory' },
            {
                name: 'accepts valid value: MEMORY (case-insensitive)',
                value: 'MEMORY'
            },
            { name: 'accepts valid value: indexed', value: 'indexed' },
            {
                name: 'accepts valid value: INDEXED (case-insensitive)',
                value: 'INDEXED'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().type(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_type' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().type(value)).toThrow(
                new Error(
                    "The 'type' parameter should be one of 'memory' or 'indexed'"
                )
            );
        });
    });

    describe('field options', () => {
        test('sets top_left option', () => {
            const result = getInstance().topLeft(pt1).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        top_left: recursiveToJSON(pt1.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets bottom_right option', () => {
            const result = getInstance().bottomRight(pt2).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        bottom_right: recursiveToJSON(pt2.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets top_right option', () => {
            const result = getInstance().topRight(pt1).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        top_right: recursiveToJSON(pt1.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets bottom_left option', () => {
            const result = getInstance().bottomLeft(pt2).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        bottom_left: recursiveToJSON(pt2.toJSON())
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets top option', () => {
            const result = getInstance().top(40.73).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        top: 40.73
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets left option', () => {
            const result = getInstance().left(-74.1).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        left: -74.1
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets bottom option', () => {
            const result = getInstance().bottom(40.1).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        bottom: 40.1
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets right option', () => {
            const result = getInstance().right(-71.12).toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {
                        right: -71.12
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('query options', () => {
        test('sets type option', () => {
            const result = getInstance().type('indexed').toJSON();
            const expected = {
                geo_bounding_box: {
                    my_field: {},
                    type: 'indexed'
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
