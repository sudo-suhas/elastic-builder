import test from 'ava';
import { HasParentQuery, hasParentQuery, TermQuery } from '../../src';
import {
    illegalCall,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    hasParentQuery,
    nameExpectStrategy('has_parent')
);

const qry = new TermQuery('user', 'kimchy');

test(illegalCall, HasParentQuery, 'scoreMode');
test(setsOption, 'type', { param: 'blog', keyName: 'parent_type' });
test(setsOption, 'parentType', { param: 'blog' });
test(setsOption, 'score', { param: true });

test('constructor sets argumetns', t => {
    const valueA = new HasParentQuery(qry, 'my_type').toJSON();
    const valueB = new HasParentQuery()
        .parentType('my_type')
        .query(qry)
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        has_parent: {
            query: { term: { user: 'kimchy' } },
            parent_type: 'my_type'
        }
    };
    t.deepEqual(valueA, expected);
});
