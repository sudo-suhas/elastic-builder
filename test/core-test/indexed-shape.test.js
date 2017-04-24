import test from 'ava';
import { IndexedShape, indexedShape } from '../../src';
import { makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(indexedShape);

test('constructor sets options', t => {
    const value = new IndexedShape('DEU', 'countries').toJSON();
    const expected = {
        id: 'DEU',
        type: 'countries'
    };
    t.deepEqual(value, expected);
});

test(setsOption, 'id', { param: 'DEU' });
test(setsOption, 'type', { param: 'countries' });
test(setsOption, 'index', { param: 'shapes' });
test(setsOption, 'path', { param: 'location' });
