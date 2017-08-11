import test from 'ava';
import { SignificantTermsAggregation, TermQuery, Script } from '../../src';
import {
    setsAggType,
    illegalParamType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (...args) =>
    new SignificantTermsAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'significant_terms')
);

const script = new Script()
    .lang('groovy')
    .file('calculate-score')
    .params({ my_modifier: 2 });

test(setsAggType, SignificantTermsAggregation, 'significant_terms');
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
