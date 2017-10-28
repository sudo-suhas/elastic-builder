import test from 'ava';
import { ParentIdQuery, parentIdQuery } from '../../src';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(
    parentIdQuery,
    nameExpectStrategy('parent_id')
);

test(setsOption, 'type', { param: 'blog_tag' });
test(setsOption, 'id', { param: '1' });
test(setsOption, 'ignoreUnmapped', { param: true });

test('constructor sets argumetns', t => {
    const valueA = new ParentIdQuery('blog_tag', '1').toJSON();
    const valueB = new ParentIdQuery()
        .type('blog_tag')
        .id('1')
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        parent_id: {
            type: 'blog_tag',
            id: '1'
        }
    };
    t.deepEqual(valueA, expected);
});
