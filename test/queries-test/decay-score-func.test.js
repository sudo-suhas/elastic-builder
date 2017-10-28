import test from 'ava';
import { DecayScoreFunction } from '../../src';
import { validatedCorrectly, makeSetsOptionMacro } from '../_macros';

const getInstance = (mode, field = 'my_field') =>
    new DecayScoreFunction(mode, field);

const decayExpectStrategy = (keyName, propValue) => ({
    gauss: { my_field: { [keyName]: propValue } }
});

const setsOption = makeSetsOptionMacro(getInstance, decayExpectStrategy);

/**
 * Macro for testing decay mode.
 *
 * @param {*} t
 * @param {string} modeName
 */
function setsMode(t, modeName) {
    const value = getInstance()
        [modeName]()
        .toJSON();
    const expected = { [modeName]: { my_field: {} } };
    t.deepEqual(value, expected);
}

setsMode.title = (ignore, modeName) => `sets ${modeName} mode`;

test(validatedCorrectly, getInstance, 'mode', ['linear', 'exp', 'gauss']);
test(setsOption, 'origin', { param: 'now-1h' });
test(setsOption, 'scale', { param: '10d' });
test(setsOption, 'offset', { param: '5d' });
test(setsOption, 'decay', { param: 0.6 });
test(setsMode, 'linear');
test(setsMode, 'exp');
test(setsMode, 'gauss');

test('create with mode', t => {
    let value = getInstance('gauss').toJSON();
    let expected = { gauss: { my_field: {} } };
    t.deepEqual(value, expected);

    value = getInstance('linear').toJSON();
    expected = { linear: { my_field: {} } };
    t.deepEqual(value, expected);

    value = getInstance('exp').toJSON();
    expected = { exp: { my_field: {} } };
    t.deepEqual(value, expected);
});

test('sets field', t => {
    const value = new DecayScoreFunction().field('my_field').toJSON();
    const expected = { gauss: { my_field: {} } };
    t.deepEqual(value, expected);
});
