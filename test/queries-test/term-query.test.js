import test from 'ava';
import { TermQuery } from '../../src';

// NOTE: This also tests ValueTermQueryBase
test('all in one', t => {
    const valueA = new TermQuery('user', 'kimchy');
    const valueB = new TermQuery();

    const err = t.throws(() => valueB.toJSON(), Error);
    t.is(err.message, 'Value is required for term level query!');

    valueB.field('user').value('kimchy');
    t.deepEqual(valueA.toJSON(), valueB.toJSON());

    let expected = {
        term: { user: 'kimchy' }
    };
    t.deepEqual(valueA.toJSON(), expected);

    valueA.boost(2);
    expected = {
        term: { user: { value: 'kimchy', boost: 2 } }
    };
    t.deepEqual(valueA.toJSON(), expected);
});
