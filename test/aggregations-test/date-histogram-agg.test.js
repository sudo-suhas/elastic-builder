import test from 'ava';
import { DateHistogramAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, DateHistogramAggregation, 'date_histogram');

test('constructor sets optional arguments', t => {
    const myAgg = new DateHistogramAggregation('sale_date', 'date', 'year').toJSON(),
        expected = {
            sale_date: {
                date_histogram: {
                    field: 'date',
                    interval: 'year'
                }
            }
        };
    t.deepEqual(myAgg, expected);
});

test('time_zone is set', t => {
    const myAgg = new DateHistogramAggregation('by_day', 'date', 'day').timeZone('-01:00').toJSON();
    const expected = {
        by_day: {
            date_histogram: {
                field: 'date',
                interval: 'day',
                time_zone: '-01:00'
            }
        }
    };
    t.deepEqual(myAgg, expected);
});
