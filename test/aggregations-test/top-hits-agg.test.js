import test from 'ava';
import { TopHitsAggregation, Sort, Highlight, Script } from '../../src';
import {
    setsAggType,
    illegalCall,
    illegalParamType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new TopHitsAggregation('my_agg');

const setsOption = makeSetsOptionMacro(getInstance, nameTypeExpectStrategy('my_agg', 'top_hits'));

const sortChannel = new Sort('channel', 'desc');
const sortCategories = new Sort('categories', 'desc');

const scriptA = new Script('inline', "doc['my_field_name'].value * 2").lang('painless');
const scriptB = new Script('inline', "doc['my_field_name'].value * factor")
    .lang('painless')
    .params({ factor: 2.0 });

test(setsAggType, TopHitsAggregation, 'top_hits');
test(illegalCall, TopHitsAggregation, 'field', 'my_agg');
test(illegalCall, TopHitsAggregation, 'script', 'my_agg');
test(illegalCall, TopHitsAggregation, 'missing', 'my_agg');
test(illegalCall, TopHitsAggregation, 'format', 'my_agg');
test(illegalParamType, getInstance(), 'sort', 'Sort');
test(illegalParamType, getInstance(), 'highlight', 'Highlight');
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
test(setsOption, 'trackScores', { param: true });
test(setsOption, 'version', { param: true });
test(setsOption, 'explain', { param: true });
test(setsOption, 'highlight', { param: new Highlight(['content']).type('plain', 'content') });
test(setsOption, 'source', { param: 'obj.*', keyName: '_source' });
test(setsOption, 'source', { param: false, keyName: '_source' });
test(setsOption, 'source', { param: ['obj1.*', 'obj2.*'], spread: false, keyName: '_source' });
test(setsOption, 'source', {
    param: {
        includes: ['obj1.*', 'obj2.*'],
        excludes: ['*.description']
    },
    keyName: '_source'
});
test('sets stored_fields(str) option', setsOption, 'storedFields', { param: '_none_' });
test('sets stored_fields(arr) option', setsOption, 'storedFields', {
    param: ['user', 'postDate'],
    spread: false
});
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
test(setsOption, 'docvalueFields', { param: ['test1', 'test2'], spread: false });
