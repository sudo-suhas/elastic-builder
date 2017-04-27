import test from 'ava';
import { SpanWithinQuery } from '../../src';

test('sets correct type', t => {
    const value = new SpanWithinQuery().toJSON();
    const expected = {
        span_within: {}
    };
    t.deepEqual(value, expected);
});
