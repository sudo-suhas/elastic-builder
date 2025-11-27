import { describe, test, expect } from 'vitest';
import { FullTextQueryBase } from '../../src/queries/full-text-queries';

const getInstance = queryString =>
    new FullTextQueryBase('my_qry_type', queryString);

describe('FullTextQueryBase', () => {
    describe('options', () => {
        test('sets analyzer option', () => {
            const result = getInstance().analyzer('snowball').toJSON();
            const expected = {
                my_qry_type: {
                    analyzer: 'snowball'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets minimum_should_match option', () => {
            const result = getInstance().minimumShouldMatch(2).toJSON();
            const expected = {
                my_qry_type: {
                    minimum_should_match: 2
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets query option', () => {
            const result = getInstance().query('query str').toJSON();
            const expected = {
                my_qry_type: {
                    query: 'query str'
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets query str', () => {
            const valueA = getInstance('query str').toJSON();
            const valueB = getInstance().query('query str').toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_qry_type: {
                    query: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
