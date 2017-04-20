import test from 'ava';
import { SerialDifferencingAggregation } from '../../src';
import { setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath => new SerialDifferencingAggregation('my_agg', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'serial_diff');

test(setsAggType, SerialDifferencingAggregation, 'serial_diff');
test(aggPropIsSet, 'lag', { param: 2 });

test('constructor sets buckets_path', t => {
    const value = getInstance('my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            serial_diff: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
