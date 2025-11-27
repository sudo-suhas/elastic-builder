import { describe, test, expect } from 'vitest';
import { MatchPhraseQueryBase } from '../../src/queries/full-text-queries';

const getInstance = () =>
    new MatchPhraseQueryBase('my_qry_type', '', 'my_field', 'query str');

describe('MatchPhraseQueryBase', () => {
    describe('illegal method call', () => {
        test('minimum_should_match cannot be set', () => {
            expect(() =>
                new MatchPhraseQueryBase().minimumShouldMatch()
            ).toThrow(
                new Error(
                    'minimumShouldMatch is not supported in MatchPhraseQueryBase'
                )
            );
        });
    });

    describe('options', () => {
        test('sets slop option', () => {
            const result = getInstance().slop(2).toJSON();
            const expected = {
                my_qry_type: {
                    my_field: {
                        query: 'query str',
                        slop: 2
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
