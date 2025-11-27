import { describe, test, expect } from 'vitest';
import { AutoDateHistogramAggregation } from '../../src';

describe('AutoDateHistogramAggregation', () => {
    test('sets type as auto_date_histogram', () => {
        const value = new AutoDateHistogramAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { auto_date_histogram: {} }
        });
    });

    describe('constructor', () => {
        test('sets arguments', () => {
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
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets buckets', () => {
            const value = new AutoDateHistogramAggregation('by_day', 'date', 10)
                .buckets(20)
                .toJSON();
            const expected = {
                by_day: {
                    auto_date_histogram: {
                        field: 'date',
                        buckets: 20
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets format', () => {
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
            expect(value).toEqual(expected);
        });

        test('sets minimumInterval', () => {
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
            expect(value).toEqual(expected);
        });

        test('sets timeZone', () => {
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
            expect(value).toEqual(expected);
        });

        test('sets missing', () => {
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
            expect(value).toEqual(expected);
        });
    });
});
