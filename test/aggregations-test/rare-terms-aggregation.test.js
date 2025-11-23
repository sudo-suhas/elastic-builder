import test from 'ava';
import { RareTermsAggregation } from '../../src';
import {
    setsAggType,
    makeSetsOptionMacro,
    nameTypeExpectStrategy,
    illegalCall
} from '../_macros';

const getInstance = field => new RareTermsAggregation('my_agg', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'rare_terms')
);

test(setsAggType, RareTermsAggregation, 'rare_terms');
test(setsOption, 'maxDocCount', { param: 42 });
test(setsOption, 'precision', { param: 0.001 });
test(setsOption, 'include', { param: 'swi*' });
test(setsOption, 'exclude', { param: 'electro*' });
test(setsOption, 'missing', { param: 'N/A' });
test(illegalCall, RareTermsAggregation, 'script', 'my_agg');

test('tries to construct agg name if not given', t => {
    const value = new RareTermsAggregation(null, 'myfield').toJSON();
    const expected = {
        agg_rare_terms_myfield: {
            rare_terms: {
                field: 'myfield'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('maxDocCount is set', t => {
    const value = getInstance('my_field').maxDocCount(42).toJSON();

    const expected = {
        my_agg: {
            rare_terms: {
                field: 'my_field',
                max_doc_count: 42
            }
        }
    };
    t.deepEqual(value, expected);
});

test('maxDocCount correctly validated', t => {
    let err = t.throws(() => getInstance().maxDocCount(null), Error);
    t.is(err.message, '`maxDocCount` can only be value from 1 to 100.');

    err = t.throws(() => getInstance().maxDocCount(undefined), Error);
    t.is(err.message, '`maxDocCount` can only be value from 1 to 100.');

    err = t.throws(() => getInstance().maxDocCount(0), Error);
    t.is(err.message, '`maxDocCount` can only be value from 1 to 100.');

    err = t.throws(() => getInstance().maxDocCount(101), Error);
    t.is(err.message, '`maxDocCount` can only be value from 1 to 100.');
});

test('precision is set', t => {
    const value = getInstance('my_field').precision(0.001).toJSON();

    const expected = {
        my_agg: {
            rare_terms: {
                field: 'my_field',
                precision: 0.001
            }
        }
    };
    t.deepEqual(value, expected);
});

test('precision correctly validated', t => {
    const err = t.throws(() => getInstance().precision(0.000001), Error);
    t.is(err.message, '`precision` must be greater than 0.00001.');
});

test('include is set', t => {
    const value = getInstance('my_field').include('swi*').toJSON();

    const expected = {
        my_agg: {
            rare_terms: {
                field: 'my_field',
                include: 'swi*'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('exclude is set', t => {
    const value = getInstance('my_field').exclude('electro*').toJSON();

    const expected = {
        my_agg: {
            rare_terms: {
                field: 'my_field',
                exclude: 'electro*'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('missing is set', t => {
    const value = getInstance('my_field').missing('N/A').toJSON();

    const expected = {
        my_agg: {
            rare_terms: {
                field: 'my_field',
                missing: 'N/A'
            }
        }
    };
    t.deepEqual(value, expected);
});
