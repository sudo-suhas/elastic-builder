import test from 'ava';
import { PercolateQuery, percolateQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(percolateQuery, nameExpectStrategy('percolate'));

test(setsOption, 'field', { param: 'query' });
test(setsOption, 'documentType', { param: 'doctype' });
test(setsOption, 'document', { param: { message: 'A new bonsai tree in the office' } });
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
            document_type: 'doctype'
        }
    };
    t.deepEqual(value, expected);
});
