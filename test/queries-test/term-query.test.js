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
test('test caseInsensitive: default', t => {
    const valueA = new TermQuery('my_field', 'my-value')
        .caseInsensitive()
        .toJSON();

    const expected = {
        term: {
            my_field: {
                value: 'my-value',
                case_insensitive: true
            }
        }
    };
    t.deepEqual(valueA, expected);
});

test('test caseInsensitive: false', t => {
    const valueA = new TermQuery('my_field', 'my-value')
        .caseInsensitive(false)
        .toJSON();

    const expected = {
        term: {
            my_field: {
                value: 'my-value',
                case_insensitive: false
            }
        }
    };
    t.deepEqual(valueA, expected);
});

test('test caseInsensitive: true', t => {
    const valueA = new TermQuery('my_field', 'my-value')
        .caseInsensitive(true)
        .toJSON();

    const expected = {
        term: {
            my_field: {
                value: 'my-value',
                case_insensitive: true
            }
        }
    };
    t.deepEqual(valueA, expected);
});
