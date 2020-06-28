import test from 'ava';
import { AutoDateHistogramAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, AutoDateHistogramAggregation, 'auto_date_histogram');

test('constructor sets optional arguments', t => {
    const value = new AutoDateHistogramAggregation(
            'sale_date',
            'date',
            10
        ).toJSON(),
        expected = {
            sale_date: {
                auto_date_histogram: {
                    field: 'date',
                    buckets: 10
                }
            }
        };
    t.deepEqual(value, expected);
});

test('format is set', t => {
    const value = new AutoDateHistogramAggregation('by_day', 'date', 10)
        .format('yyyy-MM-dd')
        .toJSON();
    const expected = {
        by_day: {
            auto_date_histogram: {
                field: 'date',
                buckets: 10,
                format: 'yyyy-MM-dd'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('minimum_interval is set', t => {
    const value = new AutoDateHistogramAggregation('by_day', 'date', 10)
        .minimumInterval('minute')
        .toJSON();
    const expected = {
        by_day: {
            auto_date_histogram: {
                field: 'date',
                buckets: 10,
                minimum_interval: 'minute'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('time_zone is set', t => {
    const value = new AutoDateHistogramAggregation('by_day', 'date', 10)
        .timeZone('-01:00')
        .toJSON();
    const expected = {
        by_day: {
            auto_date_histogram: {
                field: 'date',
                buckets: 10,
                time_zone: '-01:00'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('missing is set', t => {
    const value = new AutoDateHistogramAggregation('by_day', 'date', 10)
        .missing('2000/01/01')
        .toJSON();
    const expected = {
        by_day: {
            auto_date_histogram: {
                field: 'date',
                buckets: 10,
                missing: '2000/01/01'
            }
        }
    };
    t.deepEqual(value, expected);
});
