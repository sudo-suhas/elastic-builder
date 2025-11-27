import { describe, test, expect } from 'vitest';
import { GeoQueryBase } from '../../src/queries/geo-queries';

const getInstance = (field = 'my_field') =>
    new GeoQueryBase('my_qry_type', field);

describe('GeoQueryBase', () => {
    describe('validationMethod() validation', () => {
        test.each([
            {
                name: 'accepts valid value: IGNORE_MALFORMED',
                value: 'IGNORE_MALFORMED'
            },
            {
                name: 'accepts valid value: ignore_malformed (case-insensitive)',
                value: 'ignore_malformed'
            },
            { name: 'accepts valid value: COERCE', value: 'COERCE' },
            {
                name: 'accepts valid value: coerce (case-insensitive)',
                value: 'coerce'
            },
            { name: 'accepts valid value: STRICT', value: 'STRICT' },
            {
                name: 'accepts valid value: strict (case-insensitive)',
                value: 'strict'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().validationMethod(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_validation_method'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().validationMethod(value)).toThrow(
                new Error(
                    "The 'validation_method' parameter should be one of 'IGNORE_MALFORMED', 'COERCE' or 'STRICT'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets validation_method option', () => {
            const result = getInstance().validationMethod('COERCE').toJSON();
            const expected = {
                my_qry_type: {
                    my_field: {},
                    validation_method: 'COERCE'
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets field', () => {
            const valueA = new GeoQueryBase('my_qry_type', 'my_field').toJSON();
            const valueB = new GeoQueryBase('my_qry_type')
                .field('my_field')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_qry_type: {
                    my_field: {}
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
