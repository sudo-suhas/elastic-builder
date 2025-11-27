import { describe, test, expect } from 'vitest';
import { CompositeAggregation } from '../../../src';

const { DateHistogramValuesSource } = CompositeAggregation;

const getInstance = (...args) =>
    new DateHistogramValuesSource('my_val_src', ...args);

describe('DateHistogramValuesSource', () => {
    test('constructor sets arguments', () => {
        const value = getInstance('my_field', '1d').toJSON();
        const expected = {
            my_val_src: {
                date_histogram: {
                    field: 'my_field',
                    interval: '1d'
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('calendar interval is set', () => {
        const value = getInstance('field_name', 'date')
            .calendarInterval('month')
            .toJSON();
        const expected = {
            my_val_src: {
                date_histogram: {
                    field: 'field_name',
                    calendar_interval: 'month',
                    interval: 'date'
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('fixed interval is set', () => {
        const value = getInstance('field_name', 'date')
            .fixedInterval('90s')
            .toJSON();
        const expected = {
            my_val_src: {
                date_histogram: {
                    field: 'field_name',
                    fixed_interval: '90s',
                    interval: 'date'
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('sets type as date_histogram', () => {
        const value = new DateHistogramValuesSource('my_val_src').toJSON();
        expect(value).toEqual({
            my_val_src: { date_histogram: {} }
        });
    });

    describe('options', () => {
        test('sets interval', () => {
            const value = getInstance().interval(5).toJSON();
            expect(value).toEqual({
                my_val_src: {
                    date_histogram: {
                        interval: 5
                    }
                }
            });
        });

        test('sets timeZone', () => {
            const value = getInstance()
                .timeZone('America/Los_Angeles')
                .toJSON();
            expect(value).toEqual({
                my_val_src: {
                    date_histogram: {
                        time_zone: 'America/Los_Angeles'
                    }
                }
            });
        });

        test('sets format', () => {
            const value = getInstance().format('yyyy-MM-dd').toJSON();
            expect(value).toEqual({
                my_val_src: {
                    date_histogram: {
                        format: 'yyyy-MM-dd'
                    }
                }
            });
        });

        test('sets calendarInterval', () => {
            const value = getInstance().calendarInterval('month').toJSON();
            expect(value).toEqual({
                my_val_src: {
                    date_histogram: {
                        calendar_interval: 'month'
                    }
                }
            });
        });

        test('sets fixedInterval', () => {
            const value = getInstance().fixedInterval('90s').toJSON();
            expect(value).toEqual({
                my_val_src: {
                    date_histogram: {
                        fixed_interval: '90s'
                    }
                }
            });
        });
    });
});
