import test from 'ava';
import {
    SpanFieldMaskingQuery,
    spanFieldMaskingQuery,
    SpanTermQuery
} from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(
    spanFieldMaskingQuery,
    nameExpectStrategy('field_masking_span')
);

const qry = new SpanTermQuery('text.stems', 'fox');

test(setsOption, 'query', { param: qry });
test(setsOption, 'field', { param: 'text' });

test('constructor sets arguments', t => {
    const valueA = new SpanFieldMaskingQuery('text', qry).toJSON();
    const valueB = new SpanFieldMaskingQuery()
        .field('text')
        .query(qry)
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        field_masking_span: {
            query: { span_term: { 'text.stems': 'fox' } },
            field: 'text'
        }
    };
    t.deepEqual(valueA, expected);
});
