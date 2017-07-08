import test from 'ava';
import { SerialDifferencingAggregation } from '../../src';
import { setsAggType, nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = bucketsPath => new SerialDifferencingAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'serial_diff')
);

test(setsAggType, SerialDifferencingAggregation, 'serial_diff');
test(setsOption, 'lag', { param: 2 });

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
