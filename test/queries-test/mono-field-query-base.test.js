import { describe, test, expect } from 'vitest';
import { MonoFieldQueryBase } from '../../src/queries/full-text-queries';

const getInstance = (field, queryStr) =>
    new MonoFieldQueryBase('my_qry_type', field, queryStr);

describe('MonoFieldQueryBase', () => {
    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = getInstance('my_field', 'query str').toJSON();
            const valueB = getInstance()
                .field('my_field')
                .query('query str')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_qry_type: {
                    my_field: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });

    describe('validation', () => {
        test('query is required', () => {
            expect(() => getInstance().toJSON()).toThrow(
                new Error('Query string is required for full text query!')
            );
        });
    });
});
