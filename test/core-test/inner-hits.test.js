import test from 'ava';
import { InnerHits, innerHits, Sort, Script, Highlight } from '../../src';
import { illegalParamType, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(innerHits);

const sortChannel = new Sort('channel', 'desc');
const sortCategories = new Sort('categories', 'desc');

const scriptA = new Script('inline', "doc['my_field_name'].value * 2").lang(
    'painless'
);
const scriptB = new Script('inline', "doc['my_field_name'].value * factor")
    .lang('painless')
    .params({ factor: 2.0 });

test(illegalParamType, new InnerHits(), 'sort', 'Sort');
test(illegalParamType, new InnerHits(), 'highlight', 'Highlight');
test(setsOption, 'from', { param: 10 });
test(setsOption, 'size', { param: 10 });
test(setsOption, 'sort', {
    param: sortChannel,
    propValue: [sortChannel]
});
test(setsOption, 'sorts', {
    param: [sortChannel, sortCategories],
    spread: false,
    keyName: 'sort'
});
test(setsOption, 'version', { param: true });
test(setsOption, 'explain', { param: true });
test(setsOption, 'highlight', {
    param: new Highlight(['content']).type('plain', 'content')
});
test('sets source(str) option', setsOption, 'source', {
    param: 'obj.*',
    keyName: '_source'
});
test('sets source(bool) option', setsOption, 'source', {
    param: false,
    keyName: '_source'
});
test('sets source(arr) option', setsOption, 'source', {
    param: ['obj1.*', 'obj2.*'],
    spread: false,
    keyName: '_source'
});
test('sets source(obj) option', setsOption, 'source', {
    param: {
        includes: ['obj1.*', 'obj2.*'],
        excludes: ['*.description']
    },
    keyName: '_source'
});
test(setsOption, 'storedFields', { param: ['comments.text'], spread: false });
test(setsOption, 'scriptField', {
    param: ['test1', scriptA],
    propValue: { test1: { script: scriptA } },
    keyName: 'script_fields'
});
test(setsOption, 'scriptFields', {
    param: {
        test1: scriptA,
        test2: scriptB
    },
    propValue: {
        test1: { script: scriptA },
        test2: { script: scriptB }
    }
});
test(setsOption, 'docvalueFields', {
    param: ['test1', 'test2'],
    spread: false
});

test('constructor sets name', t => {
    const value = new InnerHits('my_inner_hits').toJSON();
    const expected = {
        name: 'my_inner_hits'
    };
    t.deepEqual(value, expected);
});
