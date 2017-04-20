import test from 'ava';
import { SumAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, SumAggregation, 'sum');

test('constructor sets field', t => {
    const value = new SumAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            sum: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
