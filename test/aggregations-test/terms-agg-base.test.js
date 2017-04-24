import test from 'ava';
import { TermsAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { validatedCorrectly, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) => new TermsAggregationBase('my_agg', 'my_type', '', ...args);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'my_type'));

test(validatedCorrectly, getInstance, 'executionHint', [
    'map',
    'global_ordinals',
    'global_ordinals_hash',
    'global_ordinals_low_cardinality'
]);
test(setsOption, 'format', { param: '####.00' });
test(setsOption, 'minDocCount', { param: 5 });
test(setsOption, 'shardMinDocCount', { param: 2 });
test(setsOption, 'size', { param: 20 });
test(setsOption, 'shardSize', { param: -1 });
test(setsOption, 'missing', { param: 42 });
test(setsOption, 'include', { param: '.*sport.*' });
test(setsOption, 'exclude', { param: 'water_.*' });
