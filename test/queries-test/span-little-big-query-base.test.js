import { describe, test, expect } from 'vitest';
import { SpanLittleBigQueryBase } from '../../src/queries/span-queries';
import { SpanTermQuery } from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const getInstance = () => new SpanLittleBigQueryBase('my_qry_type');
const qry = new SpanTermQuery('text.stems', 'fox');

describe('SpanLittleBigQueryBase', () => {
    describe('parameter type validation', () => {
        test('checks SpanQueryBase class for little', () => {
            const instance = getInstance();
            expect(() => instance.little(null)).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
            expect(() => instance.little(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
        });

        test('checks SpanQueryBase class for big', () => {
            const instance = getInstance();
            expect(() => instance.big(null)).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
            expect(() => instance.big(Object.create(null))).toThrow(
                new TypeError('Argument must be an instance of SpanQueryBase')
            );
        });
    });

    describe('options', () => {
        test('sets little option', () => {
            const result = getInstance().little(qry).toJSON();
            const expected = {
                my_qry_type: {
                    little: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets big option', () => {
            const result = getInstance().big(qry).toJSON();
            const expected = {
                my_qry_type: {
                    big: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
