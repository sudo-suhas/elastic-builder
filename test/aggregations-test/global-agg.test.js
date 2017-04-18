import test from 'ava';
import { GlobalAggregation } from '../../src';
import { illegalCall, setsAggType } from '../_macros';

test(setsAggType, GlobalAggregation, 'global');
test(illegalCall, GlobalAggregation, 'field');
test(illegalCall, GlobalAggregation, 'script');
