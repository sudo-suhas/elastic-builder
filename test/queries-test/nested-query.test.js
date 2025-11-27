import { describe, test, expect } from 'vitest';
import { NestedQuery, nestedQuery, TermQuery } from '../../src';

const qry = new TermQuery('user', 'kimchy');

describe('NestedQuery', () => {
    describe('options', () => {
        test('sets path option', () => {
            const result = nestedQuery().path('obj1').toJSON();
            const expected = {
                nested: {
                    path: 'obj1'
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new NestedQuery(qry, 'obj1').toJSON();
            const valueB = new NestedQuery().path('obj1').query(qry).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                nested: {
                    query: { term: { user: 'kimchy' } },
                    path: 'obj1'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
