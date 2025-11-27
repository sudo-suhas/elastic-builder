import { describe, test, expect } from 'vitest';
import { MatchAllQuery } from '../../src';

describe('MatchAllQuery', () => {
    describe('constructor', () => {
        test('can be instantiated', () => {
            const value = new MatchAllQuery().toJSON();
            const expected = { match_all: {} };
            expect(value).toEqual(expected);
        });
    });
});
