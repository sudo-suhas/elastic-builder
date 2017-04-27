import test from 'ava';
import { SpanContainingQuery } from '../../src';

test('sets correct type', t => {
    const value = new SpanContainingQuery().toJSON();
    const expected = {
        span_containing: {}
    };
    t.deepEqual(value, expected);
});
