import test from 'ava';
import { RangeAggregation } from '../../src';

test('sets type as range', t => {
    const myAgg = new RangeAggregation('my_agg', 'my_field').range({ from: 10, to: 20 }).toJSON();
    const expected = {
        my_agg: {
            range: {
                field: 'my_field',
                ranges: [{ from: 10, to: 20 }]
            }
        }
    };
    t.deepEqual(myAgg, expected);
});
