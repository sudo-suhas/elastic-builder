import { describe, test, expect } from 'vitest';
import { Query } from '../../src/core';

const getInstance = () => new Query('my_type');

describe('Query', () => {
    describe('options', () => {
        test('sets boost option', () => {
            const result = getInstance().boost(10).toJSON();
            const expected = {
                my_type: {
                    boost: 10
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets name option', () => {
            const result = getInstance().name('my_name').toJSON();
            const expected = {
                my_type: {
                    _name: 'my_name'
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('toJSON', () => {
        test('getDSL gets DSL', () => {
            const valueA = getInstance().boost(10).toJSON();
            const valueB = getInstance().boost(10).getDSL();
            const expected = {
                my_type: {
                    boost: 10
                }
            };

            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual(expected);
        });
    });
});
