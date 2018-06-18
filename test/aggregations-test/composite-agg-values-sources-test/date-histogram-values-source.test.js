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

test(setsAggType, DateHistogramValuesSource, 'date_histogram');
test(setsOption, 'interval', { param: 5 });
test(setsOption, 'timeZone', { param: 'America/Los_Angeles' });
test(setsOption, 'format', { param: 'yyyy-MM-dd' });
