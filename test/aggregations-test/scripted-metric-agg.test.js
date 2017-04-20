import test from 'ava';
import { ScriptedMetricAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = () => new ScriptedMetricAggregation('my_agg');

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'scripted_metric');

test(setsAggType, ScriptedMetricAggregation, 'scripted_metric');
test(illegalCall, ScriptedMetricAggregation, 'field');
test(illegalCall, ScriptedMetricAggregation, 'script');
test(illegalCall, ScriptedMetricAggregation, 'missing');
test(aggPropIsSet, 'initScript', { param: 'params._agg.transactions = []' });
test(aggPropIsSet, 'mapScript', {
    param: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)"
});
test(aggPropIsSet, 'combineScript', {
    param: 'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit'
});
test(aggPropIsSet, 'reduceScript', {
    param: 'double profit = 0; for (a in params._aggs) { profit += a } return profit'
});
// Apparently if you specify script parameters then you must specify "_agg": {}.
test(aggPropIsSet, 'params', { param: { field: 'amount', _agg: {} } });
