import test from 'ava';
import { MovingAverageAggregation } from '../../src';
import {
    setsAggType,
    illegalCall,
    validatedCorrectly,
    aggsExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = bucketsPath => new MovingAverageAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'moving_avg'));

test(setsAggType, MovingAverageAggregation, 'moving_avg');
test(illegalCall, MovingAverageAggregation, 'format', 'my_agg');
test(validatedCorrectly, getInstance, 'model', [
    'ewma',
    'holt',
    'holt_winters',
    'linear',
    'simple'
]);
test(setsOption, 'model', { param: 'simple' });
test(setsOption, 'window', { param: 7 });
test(setsOption, 'minimize', { param: true });
test(setsOption, 'settings', { param: { alpha: 0.8 } });
test(setsOption, 'predict', { param: 10 });

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
