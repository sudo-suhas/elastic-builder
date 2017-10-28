import test from 'ava';
import { FullTextQueryBase } from '../../src/queries/full-text-queries';
import { nameExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = queryString =>
    new FullTextQueryBase('my_qry_type', queryString);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('my_qry_type')
);

test(setsOption, 'analyzer', { param: 'snowball' });
test(setsOption, 'minimumShouldMatch', { param: 2 });
test(setsOption, 'query', { param: 'query str' });

test('constructor sets query str', t => {
    const valueA = getInstance('query str').toJSON();
    const valueB = getInstance()
        .query('query str')
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_qry_type: {
            query: 'query str'
        }
    };
    t.deepEqual(valueA, expected);
});
