import test from 'ava';
import { DiversifiedSamplerAggregation } from '../../src';
import { makeAggPropIsSetMacro, validatedCorrectly, setsAggType } from '../_macros';

const getInstance = () => new DiversifiedSamplerAggregation('my_samples', 'my_field');

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_samples', 'diversified_sampler', {
    field: 'my_field'
});

test(setsAggType, DiversifiedSamplerAggregation, 'diversified_sampler');
test(aggPropIsSet, 'shardSize', { param: 200 });
test(aggPropIsSet, 'maxDocsPerValue', { param: 3 });
test(aggPropIsSet, 'executionHint', { param: 'map' });
test(validatedCorrectly, getInstance, 'executionHint', [
    'map',
    'global_ordinals',
    'global_ordinals_hash',
    'global_ordinals_low_cardinality'
]);

test('constructor sets arguments', t => {
    const myAgg = getInstance().toJSON();
    const expected = {
        my_samples: {
            diversified_sampler: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(myAgg, expected);
});
