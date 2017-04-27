import test from 'ava';
import { MatchNoneQuery } from '../../src';

test('can be instantiated', t => {
    const value = new MatchNoneQuery().toJSON();
    const expected = { match_none: {} };
    t.deepEqual(value, expected);
});
