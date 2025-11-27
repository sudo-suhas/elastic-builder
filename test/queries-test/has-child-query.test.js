import { describe, test, expect } from 'vitest';
import { HasChildQuery, hasChildQuery, TermQuery } from '../../src';

const qry = new TermQuery('user', 'kimchy');

describe('HasChildQuery', () => {
    describe('options', () => {
        describe.each([
            {
                name: 'sets type option',
                type: 'blog_tag',
                expected: {
                    has_child: {
                        type: 'blog_tag'
                    }
                }
            }
        ])('$name', ({ type, expected }) => {
            test('type()', () => {
                const result = hasChildQuery().type(type).toJSON();
                expect(result).toEqual(expected);
            });

            test('childType()', () => {
                const result = hasChildQuery().childType(type).toJSON();
                expect(result).toEqual(expected);
            });
        });

        test('sets min_children option', () => {
            const result = hasChildQuery().minChildren(2).toJSON();
            const expected = {
                has_child: {
                    min_children: 2
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_children option', () => {
            const result = hasChildQuery().maxChildren(10).toJSON();
            const expected = {
                has_child: {
                    max_children: 10
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new HasChildQuery(qry, 'my_type').toJSON();
            const valueB = new HasChildQuery()
                .childType('my_type')
                .query(qry)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                has_child: {
                    query: { term: { user: 'kimchy' } },
                    type: 'my_type'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
