import { describe, test, expect } from 'vitest';
import { Suggester } from '../../src/core';

const getInstance = field => new Suggester('my_type', 'my_suggester', field);

describe('Suggester', () => {
    describe('constructor', () => {
        test('aggType cannot be empty', () => {
            expect(() => new Suggester()).toThrow(
                new Error('Suggester `suggesterType` cannot be empty')
            );
        });

        test('name cannot be empty', () => {
            expect(() => new Suggester('my_type')).toThrow(
                new Error('Suggester `name` cannot be empty')
            );
        });

        test('can be instantiated', () => {
            const value = getInstance().toJSON();
            const expected = {
                my_suggester: {
                    my_type: {}
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = {
                my_suggester: {
                    my_type: { field: 'my_field' }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets field option', () => {
            const result = getInstance().field('my_field').toJSON();
            const expected = {
                my_suggester: {
                    my_type: { field: 'my_field' }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets size option', () => {
            const result = getInstance().size(5).toJSON();
            const expected = {
                my_suggester: {
                    my_type: { size: 5 }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
