import test from 'ava';
import { CompositeAggregation } from '../../../src';
import {
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../../_macros';

const { DateHistogramValuesSource } = CompositeAggregation;

const getInstance = (...args) =>
    new DateHistogramValuesSource('my_val_src', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_val_src', 'date_histogram')
);

test('constructor sets arguments', t => {
    const value = getInstance('my_field', '1d').toJSON();
    const expected = {
        my_val_src: {
            date_histogram: {
                field: 'my_field',
                interval: '1d'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('calendar_interval_is_set', t => {
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
    t.deepEqual(value, expected);
});

test('fixed_interval_is_set', t => {
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
    t.deepEqual(value, expected);
});

test(setsAggType, DateHistogramValuesSource, 'date_histogram');
test(setsOption, 'interval', { param: 5 });
test(setsOption, 'timeZone', { param: 'America/Los_Angeles' });
test(setsOption, 'format', { param: 'yyyy-MM-dd' });
test(setsOption, 'calendarInterval', { param: 'month' });
test(setsOption, 'fixedInterval', { param: '90s' });
