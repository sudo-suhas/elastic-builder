import test from 'ava';
import { MatchAllQuery } from '../../src';

test('can be instantiated', t => {
    const value = new MatchAllQuery().toJSON();
    const expected = { match_all: {} };
    t.deepEqual(value, expected);
});
