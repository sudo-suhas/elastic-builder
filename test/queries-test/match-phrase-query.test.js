import test from 'ava';
import { MatchPhraseQuery } from '../../src';

test('constructor sets arguments', t => {
    const value = new MatchPhraseQuery('my_field', 'query str').toJSON();
    const expected = {
        match_phrase: {
            my_field: 'query str'
        }
    };
    t.deepEqual(value, expected);
});
