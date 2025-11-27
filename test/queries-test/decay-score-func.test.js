import { describe, test, expect } from 'vitest';
import { DecayScoreFunction } from '../../src';

const getInstance = (mode, field = 'my_field') =>
    new DecayScoreFunction(mode, field);

describe('DecayScoreFunction', () => {
    describe('mode() validation', () => {
        test.each([
            { name: 'accepts valid value: linear', value: 'linear' },
            {
                name: 'accepts valid value: LINEAR (case-insensitive)',
                value: 'LINEAR'
            },
            { name: 'accepts valid value: exp', value: 'exp' },
            {
                name: 'accepts valid value: EXP (case-insensitive)',
                value: 'EXP'
            },
            { name: 'accepts valid value: gauss', value: 'gauss' },
            {
                name: 'accepts valid value: GAUSS (case-insensitive)',
                value: 'GAUSS'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().mode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().mode(value)).toThrow(
                new Error(
                    "The 'mode' parameter should be one of 'linear', 'exp' or 'gauss'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets origin option', () => {
            const result = getInstance().origin('now-1h').toJSON();
            const expected = {
                gauss: { my_field: { origin: 'now-1h' } }
            };
            expect(result).toEqual(expected);
        });

        test('sets scale option', () => {
            const result = getInstance().scale('10d').toJSON();
            const expected = {
                gauss: { my_field: { scale: '10d' } }
            };
            expect(result).toEqual(expected);
        });

        test('sets offset option', () => {
            const result = getInstance().offset('5d').toJSON();
            const expected = {
                gauss: { my_field: { offset: '5d' } }
            };
            expect(result).toEqual(expected);
        });

        test('sets decay option', () => {
            const result = getInstance().decay(0.6).toJSON();
            const expected = {
                gauss: { my_field: { decay: 0.6 } }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('mode methods', () => {
        test('sets linear mode', () => {
            const value = getInstance().linear().toJSON();
            const expected = { linear: { my_field: {} } };
            expect(value).toEqual(expected);
        });

        test('sets exp mode', () => {
            const value = getInstance().exp().toJSON();
            const expected = { exp: { my_field: {} } };
            expect(value).toEqual(expected);
        });

        test('sets gauss mode', () => {
            const value = getInstance().gauss().toJSON();
            const expected = { gauss: { my_field: {} } };
            expect(value).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('create with gauss mode', () => {
            const value = getInstance('gauss').toJSON();
            const expected = { gauss: { my_field: {} } };
            expect(value).toEqual(expected);
        });

        test('create with linear mode', () => {
            const value = getInstance('linear').toJSON();
            const expected = { linear: { my_field: {} } };
            expect(value).toEqual(expected);
        });

        test('create with exp mode', () => {
            const value = getInstance('exp').toJSON();
            const expected = { exp: { my_field: {} } };
            expect(value).toEqual(expected);
        });
    });

    describe('field', () => {
        test('sets field', () => {
            const value = new DecayScoreFunction().field('my_field').toJSON();
            const expected = { gauss: { my_field: {} } };
            expect(value).toEqual(expected);
        });
    });
});
