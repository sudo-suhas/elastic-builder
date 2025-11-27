import { describe, test, expect } from 'vitest';
import { SpanNotQuery, spanNotQuery, SpanTermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const qry = new SpanTermQuery('text.stems', 'fox');

describe('SpanNotQuery', () => {
    describe('parameter type validation', () => {
        test('checks SpanQueryBase class for include', () => {
            const instance = new SpanNotQuery();
            expect(() => instance.include(null)).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
            expect(() => instance.include(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
        });

        test('checks SpanQueryBase class for exclude', () => {
            const instance = new SpanNotQuery();
            expect(() => instance.exclude(null)).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
            expect(() => instance.exclude(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
        });
    });

    describe('options', () => {
        test('sets include option', () => {
            const result = spanNotQuery().include(qry).toJSON();
            const expected = {
                span_not: {
                    include: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets exclude option', () => {
            const result = spanNotQuery().exclude(qry).toJSON();
            const expected = {
                span_not: {
                    exclude: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets pre option', () => {
            const result = spanNotQuery().pre(10).toJSON();
            const expected = {
                span_not: {
                    pre: 10
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets post option', () => {
            const result = spanNotQuery().post(10).toJSON();
            const expected = {
                span_not: {
                    post: 10
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets dist option', () => {
            const result = spanNotQuery().dist(10).toJSON();
            const expected = {
                span_not: {
                    dist: 10
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
