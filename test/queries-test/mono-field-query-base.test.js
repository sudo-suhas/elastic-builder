import test from 'ava';
import { MonoFieldQueryBase } from '../../src/queries/full-text-queries';

const getInstance = (field, queryStr) =>
    new MonoFieldQueryBase('my_qry_type', field, queryStr);

test('constructor sets arguments', t => {
    const valueA = getInstance('my_field', 'query str').toJSON();
    const valueB = getInstance().field('my_field').query('query str').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_qry_type: {
            my_field: 'query str'
        }
    };
    t.deepEqual(valueA, expected);
});

test('query is required', t => {
    const err = t.throws(() => getInstance().toJSON(), Error);
    t.is(err.message, 'Query string is required for full text query!');
});
