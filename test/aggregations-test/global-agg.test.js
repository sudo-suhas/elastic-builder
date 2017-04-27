import test from 'ava';
import { GlobalAggregation } from '../../src';
import { illegalCall, setsAggType } from '../_macros';

test(setsAggType, GlobalAggregation, 'global');
test(illegalCall, GlobalAggregation, 'field', 'my_agg');
test(illegalCall, GlobalAggregation, 'script', 'my_agg');
