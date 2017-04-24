import test from 'ava';
import { DerivativeAggregation } from '../../src';
import { setsAggType, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = bucketsPath => new DerivativeAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'derivative'));

test(setsAggType, DerivativeAggregation, 'derivative');
test(setsOption, 'unit', { param: 'day' });

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
