import test from 'ava';
import { MovingFunctionAggregation } from '../../src';
import {
    setsAggType,
    illegalCall,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (bucketsPath, window, script) =>
    new MovingFunctionAggregation('my_agg', bucketsPath, window, script);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'moving_fn')
);

test(setsAggType, MovingFunctionAggregation, 'moving_fn');
test(illegalCall, MovingFunctionAggregation, 'format', 'my_agg');
test(setsOption, 'window', { param: 7 });
test(setsOption, 'shift', { param: 0 });
test(setsOption, 'script', { param: 'MovingFunctions.unweightedAvg(values)' });

test('constructor sets buckets_path', t => {
    const value = getInstance(
        'my_buckets_path',
        10,
        'MovingFunctions.unweightedAvg(values)'
    ).toJSON();
    const expected = {
        my_agg: {
            moving_fn: {
                buckets_path: 'my_buckets_path',
                window: 10,
                script: 'MovingFunctions.unweightedAvg(values)'
            }
        }
    };
    t.deepEqual(value, expected);
});
