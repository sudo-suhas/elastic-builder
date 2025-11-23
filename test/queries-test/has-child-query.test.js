import test from 'ava';
import { HasChildQuery, hasChildQuery, TermQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(
    hasChildQuery,
    nameExpectStrategy('has_child')
);

const qry = new TermQuery('user', 'kimchy');

test(setsOption, 'type', { param: 'blog_tag' });
test(setsOption, 'childType', { param: 'blog_tag', keyName: 'type' });
test(setsOption, 'minChildren', { param: 2 });
test(setsOption, 'maxChildren', { param: 10 });

test('constructor sets argumetns', t => {
    const valueA = new HasChildQuery(qry, 'my_type').toJSON();
    const valueB = new HasChildQuery().childType('my_type').query(qry).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        has_child: {
            query: { term: { user: 'kimchy' } },
            type: 'my_type'
        }
    };
    t.deepEqual(valueA, expected);
});
