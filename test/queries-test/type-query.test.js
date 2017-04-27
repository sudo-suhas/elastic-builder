import test from 'ava';
import { TypeQuery } from '../../src';

test('all in one', t => {
    const valueA = new TypeQuery('my_type').toJSON();
    let valueB = new TypeQuery().value('my_type').toJSON();
    t.deepEqual(valueA, valueB);

    valueB = new TypeQuery().type('my_type').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = { type: { value: 'my_type' } };
    t.deepEqual(valueA, expected);
});
