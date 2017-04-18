import test from 'ava';
import { SamplerAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new SamplerAggregation('my_agg', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'sampler');

test(setsAggType, SamplerAggregation, 'sampler');
test(illegalCall, SamplerAggregation, 'field');
test(illegalCall, SamplerAggregation, 'script');
test(aggPropIsSet, 'shardSize', 200);
