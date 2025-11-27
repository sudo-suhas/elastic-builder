import { describe, test, expect } from 'vitest';
import RuntimeField from '../../src/core/runtime-field';

describe('RuntimeField', () => {
    describe('constructor', () => {
        test('sets arguments', () => {
            const valueA = new RuntimeField(
                'keyword',
                "emit(doc['name'].value)"
            ).toJSON();

            const expected = {
                type: 'keyword',
                script: {
                    source: "emit(doc['name'].value)"
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('throws error when type is not set', () => {
            const field = new RuntimeField();
            expect(() => field.toJSON()).toThrow(
                new Error('`type` should be set')
            );
        });

        test('throws error when script is not set', () => {
            const field = new RuntimeField('keyword');
            expect(() => field.toJSON()).toThrow(
                new Error('`script` should be set')
            );
        });
    });

    describe('type() validation', () => {
        test.each([
            { name: 'accepts valid value: boolean', value: 'boolean' },
            {
                name: 'accepts valid value: BOOLEAN (case-insensitive)',
                value: 'BOOLEAN'
            },
            { name: 'accepts valid value: composite', value: 'composite' },
            {
                name: 'accepts valid value: COMPOSITE (case-insensitive)',
                value: 'COMPOSITE'
            },
            { name: 'accepts valid value: date', value: 'date' },
            {
                name: 'accepts valid value: DATE (case-insensitive)',
                value: 'DATE'
            },
            { name: 'accepts valid value: double', value: 'double' },
            {
                name: 'accepts valid value: DOUBLE (case-insensitive)',
                value: 'DOUBLE'
            },
            { name: 'accepts valid value: geo_point', value: 'geo_point' },
            {
                name: 'accepts valid value: GEO_POINT (case-insensitive)',
                value: 'GEO_POINT'
            },
            { name: 'accepts valid value: ip', value: 'ip' },
            { name: 'accepts valid value: IP (case-insensitive)', value: 'IP' },
            { name: 'accepts valid value: keyword', value: 'keyword' },
            {
                name: 'accepts valid value: KEYWORD (case-insensitive)',
                value: 'KEYWORD'
            },
            { name: 'accepts valid value: long', value: 'long' },
            {
                name: 'accepts valid value: LONG (case-insensitive)',
                value: 'LONG'
            },
            { name: 'accepts valid value: lookup', value: 'lookup' },
            {
                name: 'accepts valid value: LOOKUP (case-insensitive)',
                value: 'LOOKUP'
            }
        ])('$name', ({ value }) => {
            expect(() =>
                new RuntimeField('keyword', "emit(doc['name'].value)").type(
                    value
                )
            ).not.toThrow();
        });

        test('throws for null value', () => {
            expect(() =>
                new RuntimeField('keyword', "emit(doc['name'].value)").type(
                    null
                )
            ).toThrow(
                expect.objectContaining({
                    name: 'TypeError',
                    message: expect.stringContaining('toLowerCase')
                })
            );
        });

        test('throws for invalid value', () => {
            expect(() =>
                new RuntimeField('keyword', "emit(doc['name'].value)").type(
                    'invalid'
                )
            ).toThrow(
                new Error(
                    '`type` must be one of boolean, composite, date, double, geo_point, ip, keyword, long, lookup'
                )
            );
        });
    });

    describe('options', () => {
        test('script method sets script source', () => {
            const fieldA = new RuntimeField('keyword');
            fieldA.script("emit(doc['name'].value)");
            const expected = {
                type: 'keyword',
                script: {
                    source: "emit(doc['name'].value)"
                }
            };
            expect(fieldA.toJSON()).toEqual(expected);
        });

        test('sets script, lang and params', () => {
            const fieldA = new RuntimeField('keyword');
            fieldA.script("emit(doc['my_field_name'].value * params.factor)");
            fieldA.lang('painless');
            fieldA.params({ factor: 2.0 });
            const expected = {
                type: 'keyword',
                script: {
                    lang: 'painless',
                    source: "emit(doc['my_field_name'].value * params.factor)",
                    params: {
                        factor: 2.0
                    }
                }
            };
            expect(fieldA.toJSON()).toEqual(expected);
        });

        test("doesn't set lang and params if script is not set", () => {
            const fieldA = new RuntimeField('keyword');
            fieldA.lang('painless');
            fieldA.params({ factor: 2.0 });
            expect(() => fieldA.toJSON()).toThrow(
                new Error('`script` should be set')
            );
        });
    });
});
