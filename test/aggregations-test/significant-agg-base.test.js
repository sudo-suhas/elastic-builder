import test from 'ava';
import { TermQuery, Script } from '../../src';
import { SignificantAggregationBase } from '../../src/aggregations/bucket-aggregations';
import {
    illegalCall,
    illegalParamType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (...args) =>
    new SignificantAggregationBase('my_agg', 'my_type', '', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'my_type')
);

const script = new Script()
    .lang('groovy')
    .file('calculate-score')
    .params({ my_modifier: 2 });

test(illegalParamType, getInstance(), 'scriptHeuristic', 'Script');
test(illegalParamType, getInstance(), 'backgroundFilter', 'Query');
test(setsOption, 'jlh', { propValue: {} });
test(setsOption, 'mutualInformation', {
    propValue: { include_negatives: true, background_is_superset: true }
});
test(setsOption, 'mutualInformation', {
    param: [true, false],
    propValue: { include_negatives: true, background_is_superset: false }
});
test(setsOption, 'chiSquare', {
    propValue: { include_negatives: true, background_is_superset: true }
});
test(setsOption, 'chiSquare', {
    param: [true, false],
    propValue: { include_negatives: true, background_is_superset: false }
});
test(setsOption, 'gnd', { propValue: { background_is_superset: true } });
test(setsOption, 'gnd', {
    param: false,
    propValue: { background_is_superset: false }
});
test(setsOption, 'percentage', { propValue: {} });
test(setsOption, 'scriptHeuristic', { param: script, propValue: { script } });
test(setsOption, 'backgroundFilter', {
    param: new TermQuery('user', 'kimchy')
});

test(illegalCall, SignificantAggregationBase, 'script', 'my_agg', 'my_type');
