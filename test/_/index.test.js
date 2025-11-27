import { describe, test, expect } from 'vitest';
import * as _ from '../../src/_';

describe('Type-checking utilities', () => {
    describe('isNil', () => {
        const truthyCases = [
            { name: 'returns true for null', value: null },
            { name: 'returns true for undefined', value: undefined }
        ];

        truthyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isNil(tc.value)).toBe(true);
            });
        });

        const falsyCases = [
            { name: 'returns false for empty string', value: '' },
            { name: 'returns false for string', value: 'hello' },
            { name: 'returns false for number zero', value: 0 },
            { name: 'returns false for number', value: 42 },
            { name: 'returns false for empty object', value: {} },
            { name: 'returns false for object', value: { key: 'value' } },
            { name: 'returns false for empty array', value: [] },
            { name: 'returns false for array', value: [1, 2, 3] },
            { name: 'returns false for boolean false', value: false }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isNil(tc.value)).toBe(false);
            });
        });
    });

    describe('isString', () => {
        const truthyCases = [
            { name: 'returns true for empty string', value: '' },
            { name: 'returns true for string', value: 'hello' }
        ];

        truthyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isString(tc.value)).toBe(true);
            });
        });

        const falsyCases = [
            { name: 'returns false for number', value: 42 },
            { name: 'returns false for object', value: {} },
            { name: 'returns false for null', value: null },
            { name: 'returns false for undefined', value: undefined },
            { name: 'returns false for array', value: [] },
            { name: 'returns false for boolean', value: true }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isString(tc.value)).toBe(false);
            });
        });
    });

    describe('isObject', () => {
        const truthyCases = [
            { name: 'returns true for object', value: { key: 'value' } },
            { name: 'returns true for empty object', value: {} }
        ];

        truthyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isObject(tc.value)).toBe(true);
            });
        });

        const falsyCases = [
            { name: 'returns false for array', value: [] },
            { name: 'returns false for null', value: null },
            { name: 'returns false for undefined', value: undefined },
            { name: 'returns false for string', value: 'string' },
            { name: 'returns false for number', value: 42 },
            { name: 'returns false for boolean', value: true },
            { name: 'returns false for function', value: () => {} }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isObject(tc.value)).toBe(false);
            });
        });
    });
});

describe('Object manipulation utilities', () => {
    describe('has', () => {
        test('returns true for own property', () => {
            const obj = { key: 'value' };
            expect(_.has(obj, 'key')).toBe(true);
        });

        test('returns true for hasOwnProperty key', () => {
            const obj = { hasOwnProperty: 'custom' };
            expect(_.has(obj, 'hasOwnProperty')).toBe(true);
        });

        const falsyCases = [
            {
                name: 'returns false for inherited property',
                obj: Object.create({ inherited: 'value' }),
                prop: 'inherited'
            },
            {
                name: 'returns false for missing property',
                obj: { key: 'value' },
                prop: 'missing'
            },
            { name: 'returns false for null object', obj: null, prop: 'key' },
            {
                name: 'returns false for undefined object',
                obj: undefined,
                prop: 'key'
            }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.has(tc.obj, tc.prop)).toBe(false);
            });
        });
    });

    describe('hasIn', () => {
        const truthyCases = [
            {
                name: 'returns true for own property',
                obj: { key: 'value' },
                prop: 'key'
            },
            {
                name: 'returns true for inherited property',
                obj: Object.create({ inherited: 'value' }),
                prop: 'inherited'
            },
            {
                name: 'returns true for prototype chain property',
                obj: {},
                prop: 'toString'
            }
        ];

        truthyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.hasIn(tc.obj, tc.prop)).toBe(true);
            });
        });

        const falsyCases = [
            {
                name: 'returns false for missing property',
                obj: { key: 'value' },
                prop: 'missing'
            },
            { name: 'returns false for null object', obj: null, prop: 'key' },
            {
                name: 'returns false for undefined object',
                obj: undefined,
                prop: 'key'
            }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.hasIn(tc.obj, tc.prop)).toBe(false);
            });
        });
    });

    describe('omit', () => {
        const testCases = [
            {
                name: 'creates new object excluding single key',
                obj: { a: 1, b: 2, c: 3 },
                keys: ['b'],
                expected: { a: 1, c: 3 }
            },
            {
                name: 'creates new object excluding multiple keys',
                obj: { a: 1, b: 2, c: 3, d: 4 },
                keys: ['b', 'd'],
                expected: { a: 1, c: 3 }
            },
            {
                name: 'returns object with all keys when empty array provided',
                obj: { a: 1, b: 2 },
                keys: [],
                expected: { a: 1, b: 2 }
            },
            {
                name: 'ignores non-existent keys',
                obj: { a: 1, b: 2 },
                keys: ['c', 'd'],
                expected: { a: 1, b: 2 }
            },
            {
                name: 'returns empty object for empty source object',
                obj: {},
                keys: ['a', 'b'],
                expected: {}
            },
            {
                name: 'returns empty object for null',
                obj: null,
                keys: ['a'],
                expected: {}
            },
            {
                name: 'returns empty object for undefined',
                obj: undefined,
                keys: ['a'],
                expected: {}
            }
        ];

        testCases.forEach(tc => {
            test(tc.name, () => {
                const result = _.omit(tc.obj, tc.keys);
                expect(result).toEqual(tc.expected);
            });
        });

        test('does not include inherited properties', () => {
            const parent = { inherited: 'value' };
            const obj = Object.create(parent);
            obj.own = 'ownValue';
            const result = _.omit(obj, []);
            expect(result).toEqual({ own: 'ownValue' });
        });
    });
});

describe('Collection utilities', () => {
    describe('isEmpty', () => {
        const truthyCases = [
            { name: 'returns true for null', value: null },
            { name: 'returns true for undefined', value: undefined },
            { name: 'returns true for empty string', value: '' },
            { name: 'returns true for empty array', value: [] },
            { name: 'returns true for empty object', value: {} }
        ];

        truthyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isEmpty(tc.value)).toBe(true);
            });
        });

        const falsyCases = [
            { name: 'returns false for non-empty string', value: 'hello' },
            { name: 'returns false for non-empty array', value: [1, 2, 3] },
            {
                name: 'returns false for non-empty object',
                value: { key: 'value' }
            },
            { name: 'returns false for number', value: 42 },
            { name: 'returns false for number zero', value: 0 },
            { name: 'returns false for boolean true', value: true },
            { name: 'returns false for boolean false', value: false }
        ];

        falsyCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.isEmpty(tc.value)).toBe(false);
            });
        });
    });

    describe('head', () => {
        const testCases = [
            {
                name: 'returns first element of array',
                input: [1, 2, 3],
                expected: 1
            },
            {
                name: 'returns first element of string array',
                input: ['a', 'b', 'c'],
                expected: 'a'
            },
            {
                name: 'returns undefined for empty array',
                input: [],
                expected: undefined
            },
            {
                name: 'returns undefined for null',
                input: null,
                expected: undefined
            },
            {
                name: 'returns undefined for undefined',
                input: undefined,
                expected: undefined
            },
            {
                name: 'returns only element for single-element array',
                input: [42],
                expected: 42
            }
        ];

        testCases.forEach(tc => {
            test(tc.name, () => {
                expect(_.head(tc.input)).toBe(tc.expected);
            });
        });

        test('works with array of objects', () => {
            const arr = [{ id: 1 }, { id: 2 }];
            expect(_.head(arr)).toEqual({ id: 1 });
        });
    });
});
