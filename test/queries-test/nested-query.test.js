import test from 'ava';
import { NestedQuery, nestedQuery, TermQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(nestedQuery, nameExpectStrategy('nested'));

const qry = new TermQuery('user', 'kimchy');

test(setsOption, 'path', { param: 'obj1' });

test('constructor sets arguments', t => {
    const valueA = new NestedQuery(qry, 'obj1').toJSON();
    const valueB = new NestedQuery().path('obj1').query(qry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        nested: {
            query: { term: { user: 'kimchy' } },
            path: 'obj1'
        }
    };
    t.deepEqual(valueA, expected);
});
