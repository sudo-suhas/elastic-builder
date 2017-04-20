import test from 'ava';
import { MinAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, MinAggregation, 'min');

test('constructor sets field', t => {
    const value = new MinAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            min: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
