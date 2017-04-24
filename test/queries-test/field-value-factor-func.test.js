import test from 'ava';
import { FieldValueFactorFunction } from '../../src';
import { validatedCorrectly, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = field => new FieldValueFactorFunction(field);

const setsOption = makeSetsOptionMacro(getInstance, nameExpectStrategy('field_value_factor'));

test(validatedCorrectly, getInstance, 'modifier', [
    'none',
    'log',
    'log1p',
    'log2p',
    'ln',
    'ln1p',
    'ln2p',
    'square',
    'sqrt',
    'reciprocal'
]);
test(setsOption, 'field', { param: 'my_field' });
test(setsOption, 'factor', { param: 1.5 });
test(setsOption, 'modifier', { param: 'log1p' });
test(setsOption, 'missing', { param: 1 });

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = { field_value_factor: { field: 'my_field' } };
    t.deepEqual(value, expected);
});
