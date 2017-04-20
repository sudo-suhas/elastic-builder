import test from 'ava';
import { HistogramAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, HistogramAggregation, 'histogram');

test('constructor sets arguments', t => {
    const value = new HistogramAggregation('my_agg', 'my_field', 10).toJSON();
    const expected = {
        my_agg: {
            histogram: {
                field: 'my_field',
                interval: 10
            }
        }
    };
    t.deepEqual(value, expected);
});
