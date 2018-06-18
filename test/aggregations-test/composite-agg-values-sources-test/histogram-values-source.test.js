import test from 'ava';
import { CompositeAggregation } from '../../../src';
import {
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../../_macros';

const { HistogramValuesSource } = CompositeAggregation;

const getInstance = (...args) =>
    new HistogramValuesSource('my_val_src', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_val_src', 'histogram')
);

test('constructor sets arguments', t => {
    const value = getInstance('my_field', 10).toJSON();
    const expected = {
        my_val_src: {
            histogram: {
                field: 'my_field',
                interval: 10
            }
        }
    };
    t.deepEqual(value, expected);
});

test(setsAggType, HistogramValuesSource, 'histogram');
test(setsOption, 'interval', { param: 5 });
