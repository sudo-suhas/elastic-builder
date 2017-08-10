import test from 'ava';
import { DiversifiedSamplerAggregation } from '../../src';
import {
    setsAggType,
    validatedCorrectly,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () =>
    new DiversifiedSamplerAggregation('my_samples', 'my_field');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_samples', 'diversified_sampler', {
        field: 'my_field'
    })
);

test(setsAggType, DiversifiedSamplerAggregation, 'diversified_sampler');
test(setsOption, 'shardSize', { param: 200 });
test(setsOption, 'maxDocsPerValue', { param: 3 });
test(setsOption, 'executionHint', { param: 'map' });
test(validatedCorrectly, getInstance, 'executionHint', [
    'map',
    'global_ordinals',
    'global_ordinals_hash',
    'global_ordinals_low_cardinality'
]);

test('constructor sets arguments', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_samples: {
            diversified_sampler: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
