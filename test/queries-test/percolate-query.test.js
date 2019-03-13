import test from 'ava';
import { PercolateQuery, percolateQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(
    percolateQuery,
    nameExpectStrategy('percolate', { documents: [] })
);

test(setsOption, 'field', { param: 'query' });
test(setsOption, 'documentType', { param: 'doctype' });
test(setsOption, 'document', {
    param: { message: 'A new bonsai tree in the office' },
    propValue: [{ message: 'A new bonsai tree in the office' }],
    keyName: 'documents'
});
test(setsOption, 'documents', {
    param: [{ message: 'A new bonsai tree in the office' }],
    spread: false
});
test(setsOption, 'index', { param: 'my-index' });
test(setsOption, 'type', { param: 'message' });
test(setsOption, 'id', { param: '1' });
test(setsOption, 'routing', { param: 'routing' });
test(setsOption, 'preference', { param: 'preference' });
test(setsOption, 'version', { param: 1 });

test('constructor sets arguments', t => {
    const value = new PercolateQuery('query', 'doctype').toJSON();
    const expected = {
        percolate: {
            field: 'query',
            document_type: 'doctype',
            documents: []
        }
    };
    t.deepEqual(value, expected);
});

test('set document after documents', t => {
    const docA = { param: { message: 'a bonsai' } };
    const docB = { param: { message: 'another bonsai' } };
    const field = 'query';
    const docType = 'docType';
    const query = new PercolateQuery(field, docType);
    const value = query
        .document(docA)
        .documents([docB])
        .toJSON();

    const expected = {
        percolate: {
            field,
            document_type: docType,
            documents: [docA, docB]
        }
    };
    t.deepEqual(value, expected);
});
