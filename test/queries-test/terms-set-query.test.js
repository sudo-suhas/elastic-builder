import { describe, test, expect } from 'vitest';
import { TermsSetQuery } from '../../src';

const getInstance = () => new TermsSetQuery('my_field');

describe('TermsSetQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('terms()', () => {
                expect(() => getInstance().terms(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets term option', () => {
            const result = getInstance().term('my-value').toJSON();
            const expected = {
                terms_set: {
                    my_field: {
                        terms: ['my-value']
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets terms option', () => {
            const result = getInstance()
                .terms(['my-value-1', 'my-value-2'])
                .toJSON();
            const expected = {
                terms_set: {
                    my_field: {
                        terms: ['my-value-1', 'my-value-2']
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets minimum_should_match_field option', () => {
            const result = getInstance()
                .minimumShouldMatchField('required_matches')
                .toJSON();
            const expected = {
                terms_set: {
                    my_field: {
                        terms: [],
                        minimum_should_match_field: 'required_matches'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets minimum_should_match_script option', () => {
            const script = {
                source: "Math.min(params.num_terms, doc['required_matches'].value)"
            };
            const result = getInstance()
                .minimumShouldMatchScript(script)
                .toJSON();
            const expected = {
                terms_set: {
                    my_field: {
                        terms: [],
                        minimum_should_match_script: script
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments with single term', () => {
            const valueA = new TermsSetQuery('my_field', 'my-value').toJSON();
            const valueB = new TermsSetQuery()
                .field('my_field')
                .term('my-value')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                terms_set: {
                    my_field: { terms: ['my-value'] }
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('constructor sets arguments with array terms', () => {
            const valueA = new TermsSetQuery('my_field', [
                'my-value-1',
                'my-value-2'
            ]).toJSON();
            const valueB = new TermsSetQuery()
                .field('my_field')
                .terms(['my-value-1', 'my-value-2'])
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                terms_set: {
                    my_field: {
                        terms: ['my-value-1', 'my-value-2']
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
