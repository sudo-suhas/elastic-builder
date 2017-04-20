import test from 'ava';
import { AvgAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, AvgAggregation, 'avg');

test('constructor sets field', t => {
    const value = new AvgAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            avg: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
