import test from 'ava';
import { CombinedFieldsQuery } from '../../src';
import {
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (fields, queryStr) =>
    new CombinedFieldsQuery(fields, queryStr);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('combined_fields', { fields: [] })
);

test(validatedCorrectly, getInstance, 'operator', ['and', 'or']);
test(validatedCorrectly, getInstance, 'zeroTermsQuery', ['all', 'none']);
test(setsOption, 'field', {
    param: 'my_field',
    propValue: ['my_field'],
    keyName: 'fields'
});
test(setsOption, 'fields', {
    param: ['my_field_a', 'my_field_b'],
    spread: false
});
test(setsOption, 'autoGenerateSynonymsPhraseQuery', { param: true });

// constructor, fields can be str or arr
test('constructor sets arguments', t => {
    let valueA = getInstance('my_field', 'query str').toJSON();
    let valueB = getInstance()
        .field('my_field')
        .query('query str')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        combined_fields: {
            fields: ['my_field'],
            query: 'query str'
        }
    };
    t.deepEqual(valueA, expected);

    valueA = getInstance(['my_field_a', 'my_field_b'], 'query str').toJSON();
    valueB = getInstance()
        .fields(['my_field_a', 'my_field_b'])
        .query('query str')
        .toJSON();
    t.deepEqual(valueA, valueB);

    const valueC = getInstance()
        .field('my_field_a')
        .field('my_field_b')
        .query('query str')
        .toJSON();
    t.deepEqual(valueA, valueC);

    expected = {
        combined_fields: {
            fields: ['my_field_a', 'my_field_b'],
            query: 'query str'
        }
    };
    t.deepEqual(valueA, valueB);
});
