import test from 'ava';
import { DerivativeAggregation } from '../../src';
import { setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath => new DerivativeAggregation('my_agg', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'derivative');

test(setsAggType, DerivativeAggregation, 'derivative');
test(aggPropIsSet, 'unit', { param: 'day' });

test('constructor sets buckets_path', t => {
    const value = getInstance('my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            derivative: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
