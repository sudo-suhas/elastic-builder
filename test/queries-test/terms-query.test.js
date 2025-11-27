import { describe, test, expect } from 'vitest';
import { TermsQuery } from '../../src';

const getInstance = () => new TermsQuery('my_field');

describe('TermsQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('values()', () => {
                expect(() => getInstance().values(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });

            test('termsLookup()', () => {
                expect(() => getInstance().termsLookup(value)).toThrow(
                    new TypeError('Argument must be an instance of Object')
                );
            });
        });
    });

    describe('options', () => {
        test('sets value option', () => {
            const result = getInstance().value('my-value').toJSON();
            const expected = {
                terms: {
                    my_field: ['my-value']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets values option', () => {
            const result = getInstance()
                .values(['my-value-1', 'my-value-2'])
                .toJSON();
            const expected = {
                terms: {
                    my_field: ['my-value-1', 'my-value-2']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets termsLookup option', () => {
            const lookup = {
                index: 'users',
                type: 'user',
                id: '2',
                path: 'followers'
            };
            const result = getInstance().termsLookup(lookup).toJSON();
            const expected = {
                terms: {
                    my_field: lookup
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets type option', () => {
            const result = getInstance().type('user').toJSON();
            const expected = {
                terms: {
                    my_field: { type: 'user' }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets index option', () => {
            const result = getInstance().index('users').toJSON();
            const expected = {
                terms: {
                    my_field: { index: 'users' }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets id option', () => {
            const result = getInstance().id('2').toJSON();
            const expected = {
                terms: {
                    my_field: { id: '2' }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets path option', () => {
            const result = getInstance().path('followers').toJSON();
            const expected = {
                terms: {
                    my_field: { path: 'followers' }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets routing option', () => {
            const result = getInstance().routing('my_routing').toJSON();
            const expected = {
                terms: {
                    my_field: { routing: 'my_routing' }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments with single value', () => {
            const valueA = new TermsQuery('my_field', 'my-value').toJSON();
            const valueB = new TermsQuery()
                .field('my_field')
                .value('my-value')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = { terms: { my_field: ['my-value'] } };
            expect(valueA).toEqual(expected);
        });

        test('constructor sets arguments with array values', () => {
            const valueA = new TermsQuery('my_field', [
                'my-value-1',
                'my-value-2'
            ]).toJSON();
            const valueB = new TermsQuery()
                .field('my_field')
                .values(['my-value-1', 'my-value-2'])
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                terms: { my_field: ['my-value-1', 'my-value-2'] }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
