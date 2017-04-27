import test from 'ava';
import { SpanTermQuery } from '../../src';

test('all in one', t => {
    let valueA = new SpanTermQuery('user', 'kimchy').toJSON();
    const valueB = new SpanTermQuery().field('user').value('kimchy').toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        span_term: {
            user: 'kimchy'
        }
    };
    t.deepEqual(valueA, expected);

    valueA = new SpanTermQuery('user', 'kimchy').boost(2).toJSON();
    expected = {
        span_term: {
            user: { value: 'kimchy', boost: 2 }
        }
    };
    t.deepEqual(valueA, expected);
});

test('value is required', t => {
    const err = t.throws(() => new SpanTermQuery('user').toJSON(), Error);
    t.is(err.message, 'Value is required for Span term query!');
});
