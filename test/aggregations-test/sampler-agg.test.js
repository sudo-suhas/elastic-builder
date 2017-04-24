import test from 'ava';
import { SamplerAggregation } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) => new SamplerAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'sampler'));

test(setsAggType, SamplerAggregation, 'sampler');
test(illegalCall, SamplerAggregation, 'field');
test(illegalCall, SamplerAggregation, 'script');
test(setsOption, 'shardSize', { param: 200 });
