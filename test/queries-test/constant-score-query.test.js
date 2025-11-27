import { describe, test, expect } from 'vitest';
import { ConstantScoreQuery, constantScoreQuery, TermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const termQry = new TermQuery('user', 'kimchy');

describe('ConstantScoreQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('filter()', () => {
                const instance = constantScoreQuery();
                expect(() => instance.filter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('query()', () => {
                const instance = constantScoreQuery();
                expect(() => instance.query(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('options', () => {
        test('sets filter option', () => {
            const result = constantScoreQuery().filter(termQry).toJSON();
            const expected = {
                constant_score: {
                    filter: recursiveToJSON(termQry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets filter option via query method', () => {
            const result = constantScoreQuery().query(termQry).toJSON();
            const expected = {
                constant_score: {
                    filter: recursiveToJSON(termQry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets filter', () => {
            const valueA = new ConstantScoreQuery(termQry).toJSON();
            const valueB = new ConstantScoreQuery().filter(termQry).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                constant_score: {
                    filter: { term: { user: 'kimchy' } }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
