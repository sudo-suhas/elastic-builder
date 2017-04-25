import test from 'ava';
import { QueryStringQueryBase } from '../../src/queries/full-text-queries';
import { validatedCorrectly, nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = queryStr => new QueryStringQueryBase('my_qry_type', '', queryStr);

const setsOption = makeSetsOptionMacro(getInstance, nameExpectStrategy('my_qry_type'));

test(validatedCorrectly, getInstance, 'defaultOperator', ['and', 'or']);
test(setsOption, 'field', { param: 'my_field', propValue: ['my_field'], keyName: 'fields' });
test(setsOption, 'fields', { param: ['my_field_a', 'my_field_b'], spread: false });
test(setsOption, 'defaultOperator', { param: 'AND' });
test(setsOption, 'lenient', { param: true });
test(setsOption, 'analyzeWildcard', { param: true });
test(setsOption, 'quoteFieldSuffix', { param: '.exact' });
test(setsOption, 'allFields', { param: true });

test('sets chained fields', t => {
    const value = getInstance()
        .field('my_field_a')
        .field('my_field_b')
        .fields(['my_field_c', 'my_field_c'])
        .query('query str')
        .toJSON();
    const expected = {
        my_qry_type: {
            fields: ['my_field_a', 'my_field_b', 'my_field_c', 'my_field_c'],
            query: 'query str'
        }
    };
    t.deepEqual(value, expected);
});
