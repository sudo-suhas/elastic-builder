import test from 'ava';
import { SignificantTermsAggregation, TermQuery, Script } from '../../src';
import { setsAggType, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new SignificantTermsAggregation('my_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'significant_terms');

const script = new Script().lang('groovy').file('calculate-score').params({ my_modifier: 2 });

test(setsAggType, SignificantTermsAggregation, 'significant_terms');
test(illegalParamType, getInstance(), 'scriptHeuristic', 'Script');
test(illegalParamType, getInstance(), 'backgroundFilter', 'Query');
test(aggPropIsSet, 'jlh', void 0, {});
test(aggPropIsSet, 'mutualInformation', void 0, {
    include_negatives: true,
    background_is_superset: true
});
test(aggPropIsSet, 'mutualInformation', [true, false], {
    include_negatives: true,
    background_is_superset: false
});
test(aggPropIsSet, 'chiSquare', void 0, {
    include_negatives: true,
    background_is_superset: true
});
test(aggPropIsSet, 'chiSquare', [true, false], {
    include_negatives: true,
    background_is_superset: false
});
test(aggPropIsSet, 'gnd', void 0, {
    background_is_superset: true
});
test(aggPropIsSet, 'gnd', false, {
    background_is_superset: false
});
test(aggPropIsSet, 'percentage', void 0, {});
test(aggPropIsSet, 'scriptHeuristic', script, { script });
test(aggPropIsSet, 'backgroundFilter', new TermQuery('user', 'kimchy'));
