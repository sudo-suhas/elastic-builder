import { describe, test, expect } from 'vitest';
import { SpanFirstQuery, spanFirstQuery, SpanTermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const qry = new SpanTermQuery('text.stems', 'fox');

describe('SpanFirstQuery', () => {
    describe('parameter type validation', () => {
        test('checks SpanQueryBase class for match', () => {
            const instance = new SpanFirstQuery();
            expect(() => instance.match(null)).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
            expect(() => instance.match(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
        });
    });

    describe('options', () => {
        test('sets match option', () => {
            const result = spanFirstQuery().match(qry).toJSON();
            const expected = {
                span_first: {
                    match: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets end option', () => {
            const result = spanFirstQuery().end(10).toJSON();
            const expected = {
                span_first: {
                    end: 10
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets query', () => {
            const valueA = new SpanFirstQuery(qry).toJSON();
            const valueB = new SpanFirstQuery().match(qry).toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                span_first: {
                    match: { span_term: { 'text.stems': 'fox' } }
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
