import { describe, test, expect } from 'vitest';
import { MatchPhrasePrefixQuery } from '../../src';

const getInstance = () => new MatchPhrasePrefixQuery('my_field', 'query str');

describe('MatchPhrasePrefixQuery', () => {
    describe('options', () => {
        test('sets max_expansions option', () => {
            const result = getInstance().maxExpansions(50).toJSON();
            const expected = {
                match_phrase_prefix: {
                    my_field: {
                        query: 'query str',
                        max_expansions: 50
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
