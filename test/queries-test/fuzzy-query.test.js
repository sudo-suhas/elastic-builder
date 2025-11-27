import { describe, test, expect } from 'vitest';
import { FuzzyQuery } from '../../src';

const getInstance = () => new FuzzyQuery('my_field', 'my-value');

describe('FuzzyQuery', () => {
    describe('options', () => {
        test('sets fuzziness option', () => {
            const result = getInstance().fuzziness('AUTO').toJSON();
            const expected = {
                fuzzy: {
                    my_field: {
                        value: 'my-value',
                        fuzziness: 'AUTO'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets prefix_length option', () => {
            const result = getInstance().prefixLength(3).toJSON();
            const expected = {
                fuzzy: {
                    my_field: {
                        value: 'my-value',
                        prefix_length: 3
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_expansions option', () => {
            const result = getInstance().maxExpansions(25).toJSON();
            const expected = {
                fuzzy: {
                    my_field: {
                        value: 'my-value',
                        max_expansions: 25
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets transpositions option', () => {
            const result = getInstance().transpositions(true).toJSON();
            const expected = {
                fuzzy: {
                    my_field: {
                        value: 'my-value',
                        transpositions: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = getInstance().toJSON();
            const valueB = new FuzzyQuery()
                .field('my_field')
                .value('my-value')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                fuzzy: {
                    my_field: 'my-value'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
