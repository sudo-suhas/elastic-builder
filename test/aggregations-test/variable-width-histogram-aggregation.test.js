import test from 'ava';
import { VariableWidthHistogramAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(
    setsAggType,
    VariableWidthHistogramAggregation,
    'variable_width_histogram'
);

test('constructor sets arguments', t => {
    const value = new VariableWidthHistogramAggregation(
            'price',
            'lowestPrice',
            10
        ).toJSON(),
        expected = {
            price: {
                variable_width_histogram: { field: 'lowestPrice', buckets: 10 }
            }
        };
    t.deepEqual(value, expected);
});

test('buckets is set', t => {
    const value = new VariableWidthHistogramAggregation(
        'price',
        'lowestPrice',
        10
    )
        .buckets(20)
        .toJSON();
    const expected = {
        price: {
            variable_width_histogram: {
                field: 'lowestPrice',
                buckets: 20
            }
        }
    };
    t.deepEqual(value, expected);
});
