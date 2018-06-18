import test from 'ava';
import { CompositeAggregation } from '../../src';
import {
    illegalParamType,
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new CompositeAggregation('my_cmpt_agg');

const dateHistoValSrc = CompositeAggregation.dateHistogramValuesSource(
    'date',
    'timestamp',
    '1d'
);
const termsValSrc = CompositeAggregation.termsValuesSource(
    'product',
    'product'
);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_cmpt_agg', 'composite', { sources: [] })
);

test(setsAggType, CompositeAggregation, 'composite', { sources: [] });
test(illegalParamType, getInstance(), 'sources', 'ValuesSourceBase');

test(setsOption, 'sources', {
    param: [dateHistoValSrc, termsValSrc],
    paramValue: [dateHistoValSrc, termsValSrc]
});
test(setsOption, 'size', { param: 2 });
test(setsOption, 'after', {
    param: { date: 1494288000000, product: 'mad max' }
});
