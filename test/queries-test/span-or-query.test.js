import { describe, test, expect } from 'vitest';
import { SpanOrQuery, spanOrQuery, SpanTermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const qry1 = new SpanTermQuery('field', 'value1');
const qry2 = new SpanTermQuery('field', 'value2');

describe('SpanOrQuery', () => {
    describe('parameter type validation', () => {
        test('checks Array class for clauses', () => {
            const instance = new SpanOrQuery();
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
            const result = spanOrQuery().clauses([qry1, qry2]).toJSON();
            const expected = {
                span_or: {
                    clauses: [
                        recursiveToJSON(qry1.toJSON()),
                        recursiveToJSON(qry2.toJSON())
                    ]
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('validation', () => {
        test('checks clauses type', () => {
            expect(() => new SpanOrQuery().clauses([qry1, {}])).toThrow(
                'Argument must be an instance of SpanQueryBase'
            );
        });
    });
});
