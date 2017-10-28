import test from 'ava';
import { CompletionSuggester } from '../../src';
import { nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new CompletionSuggester('my_suggester');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_suggester', 'completion')
);

test('prefix is set', t => {
    const value = getInstance()
        .prefix('nir')
        .toJSON();
    const expected = {
        my_suggester: {
            prefix: 'nir',
            completion: {}
        }
    };
    t.deepEqual(value, expected);
});

test(setsOption, 'fuzzy', { param: true });
test(setsOption, 'fuzzy', { propValue: true });
test(setsOption, 'fuzziness', {
    param: 2,
    keyName: 'fuzzy',
    propValue: { fuzziness: 2 }
});
test(setsOption, 'transpositions', {
    param: true,
    keyName: 'fuzzy',
    propValue: { transpositions: true }
});
test(setsOption, 'minLength', {
    param: 2,
    keyName: 'fuzzy',
    propValue: { min_length: 2 }
});
test(setsOption, 'prefixLength', {
    param: 2,
    keyName: 'fuzzy',
    propValue: { prefix_length: 2 }
});
test(setsOption, 'fuzziness', {
    param: 2,
    keyName: 'fuzzy',
    propValue: { fuzziness: 2 }
});
test(setsOption, 'unicodeAware', {
    param: true,
    keyName: 'fuzzy',
    propValue: { unicode_aware: true }
});
test('regex is set', t => {
    const value = getInstance()
        .regex('nir')
        .toJSON();
    const expected = {
        my_suggester: {
            regex: 'nir',
            completion: {}
        }
    };
    t.deepEqual(value, expected);
});
test(setsOption, 'flags', {
    param: 'ANYSTRING',
    keyName: 'regex',
    propValue: { flags: 'ANYSTRING' }
});
test(setsOption, 'maxDeterminizedStates', {
    param: 5000,
    keyName: 'regex',
    propValue: { max_determinized_states: 5000 }
});
test(setsOption, 'contexts', {
    param: ['location', { lat: 43.662, lon: -79.38 }],
    propValue: { location: { lat: 43.662, lon: -79.38 } }
});

test('multiple contexts can be set', t => {
    const value = getInstance()
        .contexts('location', { lat: 43.662, lon: -79.38 })
        .contexts('place_type', ['cafe', 'restaurants'])
        .toJSON();
    const expected = {
        my_suggester: {
            completion: {
                contexts: {
                    location: { lat: 43.662, lon: -79.38 },
                    place_type: ['cafe', 'restaurants']
                }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('multiple fuzzy options can be set', t => {
    const value = getInstance()
        .fuzziness(2)
        .transpositions(true)
        .toJSON();
    const expected = {
        my_suggester: {
            completion: {
                fuzzy: {
                    fuzziness: 2,
                    transpositions: true
                }
            }
        }
    };
    t.deepEqual(value, expected);
});
