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
test(aggPropIsSet, 'format', '####.00');
test(aggPropIsSet, 'minDocCount', 5);
test(aggPropIsSet, 'shardMinDocCount', 2);
test(aggPropIsSet, 'size', 20);
test(aggPropIsSet, 'shardSize', -1);
test(aggPropIsSet, 'missing', 42);
test(aggPropIsSet, 'include', '.*sport.*');
test(aggPropIsSet, 'exclude', 'water_.*');
