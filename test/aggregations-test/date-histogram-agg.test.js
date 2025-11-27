import { describe, test, expect } from 'vitest';
import { DateHistogramAggregation } from '../../src';

describe('DateHistogramAggregation', () => {
    test('sets type as date_histogram', () => {
        const value = new DateHistogramAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { date_histogram: {} }
        });
    });

    describe('constructor', () => {
        test('sets optional arguments', () => {
            const value = new DateHistogramAggregation(
                    'sale_date',
                    'date',
                    'year'
                ).toJSON(),
                expected = {
                    sale_date: {
                        date_histogram: {
                            field: 'date',
                            interval: 'year'
                        }
                    }
                };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('time zone is set', () => {
            const value = new DateHistogramAggregation('by_day', 'date', 'day')
                .timeZone('-01:00')
                .toJSON();
            const expected = {
                by_day: {
                    date_histogram: {
                        field: 'date',
                        interval: 'day',
                        time_zone: '-01:00'
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('calendar interval is set', () => {
            const value = new DateHistogramAggregation('by_day', 'date')
                .calendarInterval('month')
                .toJSON();
            const expected = {
                by_day: {
                    date_histogram: {
                        field: 'date',
                        calendar_interval: 'month'
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('fixed interval is set', () => {
            const value = new DateHistogramAggregation('by_day', 'date')
                .fixedInterval('90s')
                .toJSON();
            const expected = {
                by_day: {
                    date_histogram: {
                        field: 'date',
                        fixed_interval: '90s'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
