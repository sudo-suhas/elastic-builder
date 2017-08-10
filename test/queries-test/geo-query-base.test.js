import test from 'ava';
import { GeoQueryBase } from '../../src/queries/geo-queries';
import {
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (field = 'my_field') =>
    new GeoQueryBase('my_qry_type', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('my_qry_type', { my_field: {} })
);

test(validatedCorrectly, getInstance, 'validationMethod', [
    'IGNORE_MALFORMED',
    'COERCE',
    'STRICT'
]);
test(setsOption, 'validationMethod', { param: 'COERCE' });

test('constructor sets field', t => {
    const valueA = new GeoQueryBase('my_qry_type', 'my_field').toJSON();
    const valueB = new GeoQueryBase('my_qry_type').field('my_field').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_qry_type: {
            my_field: {}
        }
    };
    t.deepEqual(valueA, expected);
});
