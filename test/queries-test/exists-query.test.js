import test from 'ava';
import { ExistsQuery } from '../../src';

test('all in one', t => {
    const valueA = new ExistsQuery('my_field').toJSON();
    const valueB = new ExistsQuery().field('my_field').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        exists: {
            field: 'my_field'
        }
    };
    t.deepEqual(valueA, expected);
});
