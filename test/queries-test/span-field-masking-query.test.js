import { describe, test, expect } from 'vitest';
import {
    SpanFieldMaskingQuery,
    spanFieldMaskingQuery,
    SpanTermQuery
} from '../../src';
import { recursiveToJSON } from '../testutil/index.js';

const qry = new SpanTermQuery('text.stems', 'fox');

describe('SpanFieldMaskingQuery', () => {
    describe('options', () => {
        test('sets query option', () => {
            const result = spanFieldMaskingQuery().query(qry).toJSON();
            const expected = {
                field_masking_span: {
                    query: recursiveToJSON(qry.toJSON())
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets field option', () => {
            const result = spanFieldMaskingQuery().field('text').toJSON();
            const expected = {
                field_masking_span: {
                    field: 'text'
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new SpanFieldMaskingQuery('text', qry).toJSON();
            const valueB = new SpanFieldMaskingQuery()
                .field('text')
                .query(qry)
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                field_masking_span: {
                    query: { span_term: { 'text.stems': 'fox' } },
                    field: 'text'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
