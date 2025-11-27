import { describe, test, expect } from 'vitest';
import { SpanNearQuery, spanNearQuery, SpanTermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const qry1 = new SpanTermQuery('field', 'value1');
const qry2 = new SpanTermQuery('field', 'value2');

describe('SpanNearQuery', () => {
    describe('parameter type validation', () => {
        test('checks Array class for clauses', () => {
            const instance = new SpanNearQuery();
            expect(() => instance.clauses(null)).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
            expect(() => instance.clauses(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of Array')
            );
        });
    });

    describe('options', () => {
        test('sets clauses option', () => {
            const result = spanNearQuery().clauses([qry1, qry2]).toJSON();
            const expected = {
                span_near: {
                    clauses: [
                        recursiveToJSON(qry1.toJSON()),
                        recursiveToJSON(qry2.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets slop option', () => {
            const result = spanNearQuery().slop(2).toJSON();
            const expected = {
                span_near: {
                    slop: 2
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets in_order option', () => {
            const result = spanNearQuery().inOrder(true).toJSON();
            const expected = {
                span_near: {
                    in_order: true
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('validation', () => {
        test('checks clauses type', () => {
            expect(() => new SpanNearQuery().clauses([qry1, {}])).toThrow(
                'Argument must be an instance of SpanQueryBase'
            );
        });
    });
});
