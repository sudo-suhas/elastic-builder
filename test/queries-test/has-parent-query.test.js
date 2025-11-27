import { describe, test, expect } from 'vitest';
import { HasParentQuery, hasParentQuery, TermQuery } from '../../src';

const qry = new TermQuery('user', 'kimchy');

describe('HasParentQuery', () => {
    describe('illegal method call', () => {
        test('score_mode cannot be set', () => {
            expect(() => new HasParentQuery().scoreMode()).toThrow(
                new Error('scoreMode is not supported in HasParentQuery')
            );
        });
    });

    describe('options', () => {
        describe.each([
            {
                name: 'sets parent_type option',
                type: 'blog',
                expected: {
                    has_parent: {
                        parent_type: 'blog'
                    }
                }
            }
        ])('$name', ({ type, expected }) => {
            test('type()', () => {
                const result = hasParentQuery().type(type).toJSON();
                expect(result).toEqual(expected);
            });

            test('parentType()', () => {
                const result = hasParentQuery().parentType(type).toJSON();
                expect(result).toEqual(expected);
            });
        });

        test('sets score option', () => {
            const result = hasParentQuery().score(true).toJSON();
            const expected = {
                has_parent: {
                    score: true
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new HasParentQuery(qry, 'my_type').toJSON();
            const valueB = new HasParentQuery()
                .parentType('my_type')
                .query(qry)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                has_parent: {
                    query: { term: { user: 'kimchy' } },
                    parent_type: 'my_type'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
