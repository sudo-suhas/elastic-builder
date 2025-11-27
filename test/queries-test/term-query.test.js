import { describe, test, expect } from 'vitest';
import { TermQuery } from '../../src';

describe('TermQuery', () => {
    describe('all in one', () => {
        test('all in one', () => {
            const valueA = new TermQuery('user', 'kimchy');
            const valueB = new TermQuery();

            expect(() => valueB.toJSON()).toThrow(
                new Error('Value is required for term level query!')
            );

            valueB.field('user').value('kimchy');
            expect(valueA.toJSON()).toEqual(valueB.toJSON());

            let expected = {
                term: { user: 'kimchy' }
            };
            expect(valueA.toJSON()).toEqual(expected);

            valueA.boost(2);
            expected = {
                term: { user: { value: 'kimchy', boost: 2 } }
            };
            expect(valueA.toJSON()).toEqual(expected);
        });
    });

    describe('caseInsensitive', () => {
        test('test caseInsensitive: default', () => {
            const valueA = new TermQuery('my_field', 'my-value')
                .caseInsensitive()
                .toJSON();

            const expected = {
                term: {
                    my_field: {
                        value: 'my-value',
                        case_insensitive: true
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('test caseInsensitive: false', () => {
            const valueA = new TermQuery('my_field', 'my-value')
                .caseInsensitive(false)
                .toJSON();

            const expected = {
                term: {
                    my_field: {
                        value: 'my-value',
                        case_insensitive: false
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });

        test('test caseInsensitive: true', () => {
            const valueA = new TermQuery('my_field', 'my-value')
                .caseInsensitive(true)
                .toJSON();

            const expected = {
                term: {
                    my_field: {
                        value: 'my-value',
                        case_insensitive: true
                    }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
