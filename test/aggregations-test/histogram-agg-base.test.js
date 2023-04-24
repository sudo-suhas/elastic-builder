import test from 'ava';
import { HistogramAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) =>
    new HistogramAggregationBase('my_agg', 'my_type', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'my_type')
);

test(setsOption, 'interval', { param: 'year' });
test(setsOption, 'format', { param: '####.00' });
test(setsOption, 'offset', { param: 10 });
test(setsOption, 'minDocCount', { param: 1 });
test(setsOption, 'missing', { param: 0 });
test(setsOption, 'keyed', { param: true });
test(setsOption, 'extendedBounds', {
    param: [0, 500],
    propValue: { min: 0, max: 500 }
});
test(setsOption, 'hardBounds', {
    param: [0, 500],
    propValue: { min: 0, max: 500 }
});
test(setsOption, 'order', {
    param: 'my_field',
    propValue: { my_field: 'desc' }
});
test(setsOption, 'order', {
    param: ['my_field', 'asc'],
    propValue: { my_field: 'asc' }
});

test('constructor sets arguments', t => {
    const value = getInstance('my_field', 10).toJSON();
    const expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                interval: 10
            }
        }
    };
    t.deepEqual(value, expected);
});

test('order direction is validated', t => {
    t.notThrows(() => getInstance().order('my_field'));
    t.notThrows(() => getInstance().order('my_field', 'asc'));
    t.notThrows(() => getInstance().order('my_field', 'ASC'));
    t.notThrows(() => getInstance().order('my_field', 'desc'));
    t.notThrows(() => getInstance().order('my_field', 'DESC'));

    let err = t.throws(
        () => getInstance().order('my_field', 'invalid_direction'),
        Error
    );
    t.is(
        err.message,
        "The 'direction' parameter should be one of 'asc' or 'desc'"
    );

    err = t.throws(() => getInstance().order('my_field', null), Error);
    t.is(
        err.message,
        "The 'direction' parameter should be one of 'asc' or 'desc'"
    );
});

test('multiple order criteria can be set', t => {
    const value = getInstance('my_field').order('my_field_a', 'asc');
    let expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                order: { my_field_a: 'asc' }
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value.order('my_field_b', 'desc');
    expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                order: [{ my_field_a: 'asc' }, { my_field_b: 'desc' }]
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value.order('my_field_c', 'asc');
    expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                order: [
                    { my_field_a: 'asc' },
                    { my_field_b: 'desc' },
                    { my_field_c: 'asc' }
                ]
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);
});
