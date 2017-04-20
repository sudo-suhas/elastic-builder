import test from 'ava';
import { MaxAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, MaxAggregation, 'max');

test('constructor sets field', t => {
    const value = new MaxAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            max: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
