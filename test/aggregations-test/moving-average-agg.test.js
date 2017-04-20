import test from 'ava';
import { MovingAverageAggregation } from '../../src';
import { setsAggType, illegalCall, validatedCorrectly, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath => new MovingAverageAggregation('my_agg', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'moving_avg');

test(setsAggType, MovingAverageAggregation, 'moving_avg');
test(illegalCall, MovingAverageAggregation, 'format');
test(validatedCorrectly, getInstance, 'model', [
    'ewma',
    'holt',
    'holt_winters',
    'linear',
    'simple'
]);
test(aggPropIsSet, 'model', { param: 'simple' });
test(aggPropIsSet, 'window', { param: 7 });
test(aggPropIsSet, 'minimize', { param: true });
test(aggPropIsSet, 'settings', { param: { alpha: 0.8 } });
test(aggPropIsSet, 'predict', { param: 10 });

test('constructor sets buckets_path', t => {
    const value = getInstance('my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            moving_avg: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
