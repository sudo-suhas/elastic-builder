import { describe, test, expect } from 'vitest';
import { SpanMultiTermQuery, spanMultiTermQuery, PrefixQuery } from '../../src';

const qry = new PrefixQuery('user', 'ki');

describe('SpanMultiTermQuery', () => {
    describe('parameter type validation', () => {
        test('checks MultiTermQueryBase class for match', () => {
            const instance = new SpanMultiTermQuery();
            expect(() => instance.match(null)).toThrow(
                new TypeError(
                    'Argument must be an instance of MultiTermQueryBase'
                )
            );
            expect(() => instance.match(Object.create(null))).toThrow(
                new TypeError(
                    'Argument must be an instance of MultiTermQueryBase'
                )
            );
        });
    });

    describe('options', () => {
        test('sets match option', () => {
            const result = spanMultiTermQuery().match(qry).toJSON();
            const expected = {
                span_multi: {
                    match: { prefix: { user: 'ki' } }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets query', () => {
            const value = new SpanMultiTermQuery(qry).toJSON();
            const expected = {
                span_multi: {
                    match: { prefix: { user: 'ki' } }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
