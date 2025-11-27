import { describe, test, expect } from 'vitest';
import { MatchPhraseQuery } from '../../src';

describe('MatchPhraseQuery', () => {
    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const value = new MatchPhraseQuery(
                'my_field',
                'query str'
            ).toJSON();
            const expected = {
                match_phrase: {
                    my_field: 'query str'
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
