import { describe, test, expect } from 'vitest';
import { DateRangeAggregation } from '../../src';

const getInstance = (...args) =>
    new DateRangeAggregation('my_agg', ...args).range({ to: 'now-10M/M' });

describe('DateRangeAggregation', () => {
    test('sets type as date_range', () => {
        const value = getInstance().toJSON();
        const expected = {
            my_agg: {
                date_range: {
                    ranges: [{ to: 'now-10M/M' }]
                }
            }
        };
        expect(value).toEqual(expected);
    });

    describe('constructor', () => {
        test('sets arguments', () => {
            const value = getInstance('date').toJSON(),
                expected = {
                    my_agg: {
                        date_range: {
                            field: 'date',
                            ranges: [{ to: 'now-10M/M' }]
                        }
                    }
                };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('time zone is set', () => {
            const value = getInstance().timeZone('CET').toJSON();
            const expected = {
                my_agg: {
                    date_range: {
                        time_zone: 'CET',
                        ranges: [{ to: 'now-10M/M' }]
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
