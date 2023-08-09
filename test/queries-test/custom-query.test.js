import test from 'ava';
import { CustomQuery } from '../../src';

test('can be instantiated', t => {
    const value = new CustomQuery('neural', 'field1').toJSON();

    const expected = { neural: { field1: {} } };
    t.deepEqual(value, expected);
});
