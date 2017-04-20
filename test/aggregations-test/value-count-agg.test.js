import test from 'ava';
import { ValueCountAggregation } from '../../src';
import { setsAggType, illegalCall } from '../_macros';

test(setsAggType, ValueCountAggregation, 'value_count');
test(illegalCall, ValueCountAggregation, 'format');

test('constructor sets field', t => {
    const value = new ValueCountAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            value_count: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
