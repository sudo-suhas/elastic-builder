import test from 'ava';
import { TopHitsAggregation, Sort, Highlight, Script } from '../../src';
import { setsAggType, illegalCall, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = () => new TopHitsAggregation('my_agg');

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'top_hits');

const sortChannel = new Sort('channel', 'desc');
const sortCategories = new Sort('categories', 'desc');

const scriptA = new Script('inline', "doc['my_field_name'].value * 2").lang('painless');
const scriptB = new Script('inline', "doc['my_field_name'].value * factor")
    .lang('painless')
    .params({ factor: 2.0 });

test(setsAggType, TopHitsAggregation, 'top_hits');
test(illegalCall, TopHitsAggregation, 'field');
test(illegalCall, TopHitsAggregation, 'script');
test(illegalCall, TopHitsAggregation, 'missing');
test(illegalCall, TopHitsAggregation, 'format');
test(illegalParamType, getInstance(), 'sort', 'Sort');
test(illegalParamType, getInstance(), 'highlight', 'Highlight');
test(aggPropIsSet, 'from', { param: 10 });
test(aggPropIsSet, 'size', { param: 10 });
test(aggPropIsSet, 'sort', {
    param: sortChannel,
    propValue: [sortChannel]
});
test(aggPropIsSet, 'sorts', {
    param: [sortChannel, sortCategories],
    spread: false,
    keyName: 'sort'
});
test(aggPropIsSet, 'trackScores', { param: true });
test(aggPropIsSet, 'version', { param: true });
test(aggPropIsSet, 'explain', { param: true });
test(aggPropIsSet, 'highlight', { param: new Highlight(['content']).type('plain', 'content') });
test(aggPropIsSet, 'source', { param: 'obj.*', keyName: '_source' });
test(aggPropIsSet, 'source', { param: false, keyName: '_source' });
test(aggPropIsSet, 'source', { param: ['obj1.*', 'obj2.*'], spread: false, keyName: '_source' });
test(aggPropIsSet, 'source', {
    param: {
        includes: ['obj1.*', 'obj2.*'],
        excludes: ['*.description']
    },
    keyName: '_source'
});
test(aggPropIsSet, 'storedFields', { param: '_none_' });
test(aggPropIsSet, 'storedFields', { param: ['user', 'postDate'], spread: false });
test(aggPropIsSet, 'scriptField', {
    param: ['test1', scriptA],
    propValue: { test1: { script: scriptA } },
    keyName: 'script_fields'
});
test(aggPropIsSet, 'scriptFields', {
    param: {
        test1: scriptA,
        test2: scriptB
    },
    propValue: {
        test1: { script: scriptA },
        test2: { script: scriptB }
    }
});
test(aggPropIsSet, 'docvalueFields', { param: ['test1', 'test2'], spread: false });
