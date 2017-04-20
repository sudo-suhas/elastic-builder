import test from 'ava';
import { SignificantTermsAggregation, TermQuery, Script } from '../../src';
import { setsAggType, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new SignificantTermsAggregation('my_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'significant_terms');

const script = new Script().lang('groovy').file('calculate-score').params({ my_modifier: 2 });

test(setsAggType, SignificantTermsAggregation, 'significant_terms');
test(illegalParamType, getInstance(), 'scriptHeuristic', 'Script');
test(illegalParamType, getInstance(), 'backgroundFilter', 'Query');
test(aggPropIsSet, 'jlh', { propValue: {} });
test(aggPropIsSet, 'mutualInformation', {
    propValue: { include_negatives: true, background_is_superset: true }
});
test(aggPropIsSet, 'mutualInformation', {
    param: [true, false],
    propValue: { include_negatives: true, background_is_superset: false }
});
test(aggPropIsSet, 'chiSquare', {
    propValue: { include_negatives: true, background_is_superset: true }
});
test(aggPropIsSet, 'chiSquare', {
    param: [true, false],
    propValue: { include_negatives: true, background_is_superset: false }
});
test(aggPropIsSet, 'gnd', { propValue: { background_is_superset: true } });
test(aggPropIsSet, 'gnd', {
    param: false,
    propValue: { background_is_superset: false }
});
test(aggPropIsSet, 'percentage', { propValue: {} });
test(aggPropIsSet, 'scriptHeuristic', { param: script, propValue: { script } });
test(aggPropIsSet, 'backgroundFilter', { param: new TermQuery('user', 'kimchy') });
