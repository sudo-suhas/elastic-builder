import test from 'ava';
import { TermsAggregation } from '../../src';
import {
    setsAggType,
    validatedCorrectly,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = field => new TermsAggregation('my_agg', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'terms')
);

test(setsAggType, TermsAggregation, 'terms');
test(validatedCorrectly, getInstance, 'collectMode', [
    'depth_first',
    'breadth_first'
]);
test(setsOption, 'showTermDocCountError', { param: true });
test(setsOption, 'collectMode', { param: 'breadth_first' });
test(setsOption, 'order', {
    param: 'my_field',
    propValue: { my_field: 'desc' }
});
test(setsOption, 'order', {
    param: ['my_field', 'asc'],
    propValue: { my_field: 'asc' }
});

test('tries to construct agg name if not given', t => {
    const value = new TermsAggregation(null, 'myfield').toJSON();
    const expected = {
        agg_terms_myfield: {
            terms: {
                field: 'myfield'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('include partition is set', t => {
    const value = getInstance('my_field')
        .includePartition(0, 20)
        .toJSON();
    const expected = {
        my_agg: {
            terms: {
                field: 'my_field',
                include: { partition: 0, num_partitions: 20 }
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
            terms: {
                field: 'my_field',
                order: { my_field_a: 'asc' }
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value.order('my_field_b', 'desc');
    expected = {
        my_agg: {
            terms: {
                field: 'my_field',
                order: [{ my_field_a: 'asc' }, { my_field_b: 'desc' }]
            }
        }
    };
    t.deepEqual(value.toJSON(), expected);

    value.order('my_field_c', 'asc');
    expected = {
        my_agg: {
            terms: {
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
