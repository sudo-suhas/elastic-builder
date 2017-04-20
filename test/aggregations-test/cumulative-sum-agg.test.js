import test from 'ava';
import { CumulativeSumAggregation } from '../../src';
import { setsAggType, illegalCall } from '../_macros';

test(setsAggType, CumulativeSumAggregation, 'cumulative_sum');
test(illegalCall, CumulativeSumAggregation, 'gapPolicy');

test('constructor sets buckets_path', t => {
    const value = new CumulativeSumAggregation('my_agg', 'my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            cumulative_sum: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
