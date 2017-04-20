import test from 'ava';
import { TermsAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { validatedCorrectly, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new TermsAggregationBase('my_agg', 'my_type', '', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'my_type');

test(validatedCorrectly, getInstance, 'executionHint', [
    'map',
    'global_ordinals',
    'global_ordinals_hash',
    'global_ordinals_low_cardinality'
]);
test(aggPropIsSet, 'format', { param: '####.00' });
test(aggPropIsSet, 'minDocCount', { param: 5 });
test(aggPropIsSet, 'shardMinDocCount', { param: 2 });
test(aggPropIsSet, 'size', { param: 20 });
test(aggPropIsSet, 'shardSize', { param: -1 });
test(aggPropIsSet, 'missing', { param: 42 });
test(aggPropIsSet, 'include', { param: '.*sport.*' });
test(aggPropIsSet, 'exclude', { param: 'water_.*' });
