import { describe, test, expect } from 'vitest';
import { FieldValueFactorFunction } from '../../src';

const getInstance = field => new FieldValueFactorFunction(field);

describe('FieldValueFactorFunction', () => {
    describe('modifier() validation', () => {
        test.each([
            { name: 'accepts valid value: none', value: 'none' },
            {
                name: 'accepts valid value: NONE (case-insensitive)',
                value: 'NONE'
            },
            { name: 'accepts valid value: log', value: 'log' },
            {
                name: 'accepts valid value: LOG (case-insensitive)',
                value: 'LOG'
            },
            { name: 'accepts valid value: log1p', value: 'log1p' },
            {
                name: 'accepts valid value: LOG1P (case-insensitive)',
                value: 'LOG1P'
            },
            { name: 'accepts valid value: log2p', value: 'log2p' },
            {
                name: 'accepts valid value: LOG2P (case-insensitive)',
                value: 'LOG2P'
            },
            { name: 'accepts valid value: ln', value: 'ln' },
            { name: 'accepts valid value: LN (case-insensitive)', value: 'LN' },
            { name: 'accepts valid value: ln1p', value: 'ln1p' },
            {
                name: 'accepts valid value: LN1P (case-insensitive)',
                value: 'LN1P'
            },
            { name: 'accepts valid value: ln2p', value: 'ln2p' },
            {
                name: 'accepts valid value: LN2P (case-insensitive)',
                value: 'LN2P'
            },
            { name: 'accepts valid value: square', value: 'square' },
            {
                name: 'accepts valid value: SQUARE (case-insensitive)',
                value: 'SQUARE'
            },
            { name: 'accepts valid value: sqrt', value: 'sqrt' },
            {
                name: 'accepts valid value: SQRT (case-insensitive)',
                value: 'SQRT'
            },
            { name: 'accepts valid value: reciprocal', value: 'reciprocal' },
            {
                name: 'accepts valid value: RECIPROCAL (case-insensitive)',
                value: 'RECIPROCAL'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().modifier(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_modifier' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().modifier(value)).toThrow(
                /The 'modifier' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets field option', () => {
            const result = getInstance().field('my_field').toJSON();
            const expected = {
                field_value_factor: {
                    field: 'my_field'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets factor option', () => {
            const result = getInstance().factor(1.5).toJSON();
            const expected = {
                field_value_factor: {
                    factor: 1.5
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets modifier option', () => {
            const result = getInstance().modifier('log1p').toJSON();
            const expected = {
                field_value_factor: {
                    modifier: 'log1p'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets missing option', () => {
            const result = getInstance().missing(1).toJSON();
            const expected = {
                field_value_factor: {
                    missing: 1
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = { field_value_factor: { field: 'my_field' } };
            expect(value).toEqual(expected);
        });
    });
});
