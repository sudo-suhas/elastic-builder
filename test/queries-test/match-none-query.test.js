import { describe, test, expect } from 'vitest';
import { MatchNoneQuery } from '../../src';

describe('MatchNoneQuery', () => {
    test('can be instantiated', () => {
        const value = new MatchNoneQuery().toJSON();
        const expected = { match_none: {} };
        expect(value).toEqual(expected);
    });
});
