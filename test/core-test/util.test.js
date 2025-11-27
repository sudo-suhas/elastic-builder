import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { util } from '../../src/core';

describe('util', () => {
    describe('checkType', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('does not throw for valid instance', () => {
            class TestClass {}
            const instance = new TestClass();
            expect(() => util.checkType(instance, TestClass)).not.toThrow();
        });

        test('throws TypeError for null value', () => {
            class TestClass {}
            expect(() => util.checkType(null, TestClass)).toThrow(
                new TypeError('Argument must be an instance of TestClass')
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                'Was expecting instance of TestClass but got null!'
            );
        });

        test('throws TypeError for undefined value', () => {
            class TestClass {}
            expect(() => util.checkType(undefined, TestClass)).toThrow(
                new TypeError('Argument must be an instance of TestClass')
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                'Was expecting instance of TestClass but got undefined!'
            );
        });

        test('throws TypeError for wrong instance type', () => {
            class TestClass {}
            class OtherClass {}
            const instance = new OtherClass();
            expect(() => util.checkType(instance, TestClass)).toThrow(
                new TypeError('Argument must be an instance of TestClass')
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('throws TypeError for primitive value', () => {
            class TestClass {}
            expect(() => util.checkType('string', TestClass)).toThrow(
                new TypeError('Argument must be an instance of TestClass')
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('constructorWrapper', () => {
        test('creates wrapper function for class constructor', () => {
            class TestClass {
                constructor(arg1, arg2) {
                    this.arg1 = arg1;
                    this.arg2 = arg2;
                }
            }

            const wrapper = util.constructorWrapper(TestClass);
            const instance = wrapper('value1', 'value2');

            expect(instance).toBeInstanceOf(TestClass);
            expect(instance.arg1).toBe('value1');
            expect(instance.arg2).toBe('value2');
        });

        test('wrapper works with no arguments', () => {
            class TestClass {
                constructor() {
                    this.initialized = true;
                }
            }

            const wrapper = util.constructorWrapper(TestClass);
            const instance = wrapper();

            expect(instance).toBeInstanceOf(TestClass);
            expect(instance.initialized).toBe(true);
        });
    });

    describe('firstDigitPos', () => {
        test.each([
            { name: 'returns -1 for empty string', input: '', expected: -1 },
            {
                name: 'returns -1 for string with no digits',
                input: 'no-digits-in-string',
                expected: -1
            },
            {
                name: 'returns 0 for string starting with digit',
                input: '123abc',
                expected: 0
            },
            {
                name: 'returns correct index for digit in middle',
                input: 'abc123def',
                expected: 3
            },
            {
                name: 'returns correct index for digit at end',
                input: 'abc1',
                expected: 3
            },
            {
                name: 'finds first digit when multiple digits present',
                input: 'field_name_1_test_2',
                expected: 11
            }
        ])('$name', ({ input, expected }) => {
            expect(util.firstDigitPos(input)).toBe(expected);
        });
    });

    describe('invalidParam', () => {
        let consoleLogSpy;
        let consoleWarnSpy;

        beforeEach(() => {
            consoleLogSpy = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});
            consoleWarnSpy = vi
                .spyOn(console, 'warn')
                .mockImplementation(() => {});
        });

        afterEach(() => {
            consoleLogSpy.mockRestore();
            consoleWarnSpy.mockRestore();
        });

        test('creates error function with string valid values', () => {
            const errorFn = util.invalidParam(
                'http://example.com',
                'testParam',
                'value1, value2'
            );

            expect(() => errorFn('invalidValue')).toThrow(
                new Error(
                    "The 'testParam' parameter should be one of value1, value2"
                )
            );
            expect(consoleLogSpy).toHaveBeenCalledWith(
                'See http://example.com'
            );
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                "Got 'testParam' - 'invalidValue'"
            );
        });

        test('creates error function with non-string valid values', () => {
            const validValues = new Set(['value1', 'value2']);
            const errorFn = util.invalidParam(
                'http://example.com',
                'testParam',
                validValues
            );

            expect(() => errorFn('invalidValue')).toThrow(
                expect.objectContaining({
                    message: expect.stringContaining(
                        "The 'testParam' parameter should be one of"
                    )
                })
            );
        });

        test('supports custom reference URL', () => {
            const errorFn = util.invalidParam(
                'http://default.com',
                'testParam',
                'value1'
            );

            expect(() =>
                errorFn('invalidValue', 'http://custom.com')
            ).toThrow();
            expect(consoleLogSpy).toHaveBeenCalledWith('See http://custom.com');
        });

        test('handles null reference URL', () => {
            const errorFn = util.invalidParam(null, 'testParam', 'value1');

            expect(() => errorFn('invalidValue')).toThrow(
                new Error("The 'testParam' parameter should be one of value1")
            );
            expect(consoleLogSpy).not.toHaveBeenCalled();
        });
    });

    describe('setDefault', () => {
        test('sets default value when key does not exist', () => {
            const obj = { existing: 'value' };
            const result = util.setDefault(obj, 'newKey', 'newValue');

            expect(result).toBe(true);
            expect(obj.newKey).toBe('newValue');
        });

        test('does not set value when key already exists', () => {
            const obj = { existing: 'originalValue' };
            const result = util.setDefault(obj, 'existing', 'newValue');

            expect(result).toBe(false);
            expect(obj.existing).toBe('originalValue');
        });

        test('sets default for undefined value', () => {
            const obj = { existing: undefined };
            const result = util.setDefault(obj, 'existing', 'newValue');

            expect(result).toBe(false);
            expect(obj.existing).toBe(undefined);
        });

        test('sets default for null value', () => {
            const obj = { existing: null };
            const result = util.setDefault(obj, 'existing', 'newValue');

            expect(result).toBe(false);
            expect(obj.existing).toBe(null);
        });
    });
});
