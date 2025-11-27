import { describe, test, expect } from 'vitest';
import { IdsQuery, idsQuery } from '../../src';

describe('IdsQuery', () => {
    describe('parameter type validation', () => {
        test('checks Array class for values', () => {
            const instance = new IdsQuery();
            expect(() => instance.values(null)).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
            expect(() => instance.values(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
        });
    });

    describe('options', () => {
        test('sets type option', () => {
            const result = idsQuery().type('my_type').toJSON();
            const expected = {
                ids: {
                    type: 'my_type'
                }
            };
            expect(result).toEqual(expected);
        });

        describe.each([
            {
                name: 'sets values option',
                values: ['1', '4', '100'],
                expected: {
                    ids: {
                        values: ['1', '4', '100']
                    }
                }
            }
        ])('$name', ({ values, expected }) => {
            test('values()', () => {
                const result = idsQuery().values(values).toJSON();
                expect(result).toEqual(expected);
            });

            test('ids()', () => {
                const result = idsQuery().ids(values).toJSON();
                expect(result).toEqual(expected);
            });
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const value = new IdsQuery('my_type', ['1', '4', '100']).toJSON();
            const expected = {
                ids: {
                    type: 'my_type',
                    values: ['1', '4', '100']
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
