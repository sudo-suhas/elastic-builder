import test from 'ava';
import { DateRangeAggregation } from '../../src';

const getInstance = (...args) =>
    new DateRangeAggregation('my_agg', ...args).range({ to: 'now-10M/M' });

test('sets type as date_range', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_agg: {
            date_range: {
                ranges: [{ to: 'now-10M/M' }]
            }
        }
    };
    t.deepEqual(value, expected);
});

test('constructor sets arguments', t => {
    const value = getInstance('date').toJSON(),
        expected = {
            my_agg: {
                date_range: {
                    field: 'date',
                    ranges: [{ to: 'now-10M/M' }]
                }
            }
        };
    t.deepEqual(value, expected);
});

test('time_zone is set', t => {
    const value = getInstance().timeZone('CET').toJSON();
    const expected = {
        my_agg: {
            date_range: {
                time_zone: 'CET',
                ranges: [{ to: 'now-10M/M' }]
            }
        }
    };
    t.deepEqual(value, expected);
});
