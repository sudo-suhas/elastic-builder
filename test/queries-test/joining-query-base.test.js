import { describe, test, expect } from 'vitest';
import { JoiningQueryBase } from '../../src/queries/joining-queries';
import { TermQuery, InnerHits } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = qry => new JoiningQueryBase('my_qry_type', '', qry);
const qry = new TermQuery('user', 'kimchy');

describe('JoiningQueryBase', () => {
    describe('parameter type validation', () => {
        test('checks Query class for query', () => {
            const instance = getInstance();
            expect(() => instance.query(null)).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
            expect(() => instance.query(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Query')
            );
        });

        test('checks InnerHits class for innerHits', () => {
            const instance = getInstance();
            expect(() => instance.innerHits(null)).toThrow(
                new TypeError('Argument must be an instance of InnerHits')
            );
            expect(() => instance.innerHits(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of InnerHits')
            );
        });
    });

    describe('scoreMode() validation', () => {
        test.each([
            { name: 'accepts valid value: none', value: 'none' },
            {
                name: 'accepts valid value: NONE (case-insensitive)',
                value: 'NONE'
            },
            { name: 'accepts valid value: sum', value: 'sum' },
            {
                name: 'accepts valid value: SUM (case-insensitive)',
                value: 'SUM'
            },
            { name: 'accepts valid value: min', value: 'min' },
            {
                name: 'accepts valid value: MIN (case-insensitive)',
                value: 'MIN'
            },
            { name: 'accepts valid value: max', value: 'max' },
            {
                name: 'accepts valid value: MAX (case-insensitive)',
                value: 'MAX'
            },
            { name: 'accepts valid value: avg', value: 'avg' },
            {
                name: 'accepts valid value: AVG (case-insensitive)',
                value: 'AVG'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().scoreMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_score_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().scoreMode(value)).toThrow(
                /The 'score_mode' parameter should be one of/
            );
        });
    });

    describe('options', () => {
        test('sets query option', () => {
            const result = getInstance().query(qry).toJSON();
            const expected = {
                my_qry_type: {
                    query: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets score_mode option', () => {
            const result = getInstance().scoreMode('sum').toJSON();
            const expected = {
                my_qry_type: {
                    score_mode: 'sum'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets ignore_unmapped option', () => {
            const result = getInstance().ignoreUnmapped(true).toJSON();
            const expected = {
                my_qry_type: {
                    ignore_unmapped: true
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets inner_hits option', () => {
            const innerHits = new InnerHits('my_inner_hits');
            const result = getInstance().innerHits(innerHits).toJSON();
            const expected = {
                my_qry_type: {
                    inner_hits: recursiveToJSON(innerHits.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = getInstance(qry).toJSON();
            const valueB = getInstance().query(qry).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                my_qry_type: {
                    query: { term: { user: 'kimchy' } }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
