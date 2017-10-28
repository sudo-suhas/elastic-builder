import test from 'ava';
import { MultiMatchQuery } from '../../src';
import {
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (fields, queryStr) => new MultiMatchQuery(fields, queryStr);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('multi_match', { fields: [] })
);

const validRewrites = [
    'constant_score',
    'scoring_boolean',
    'constant_score_boolean',
    'constant_score_filter',
    'top_terms_boost_23',
    'top_terms_15'
];

test(validatedCorrectly, getInstance, 'operator', ['and', 'or']);
test(validatedCorrectly, getInstance, 'zeroTermsQuery', ['all', 'none']);
// prettier-ignore
test(validatedCorrectly, getInstance, 'type', [
    'best_fields', 'most_fields', 'cross_fields', 'phrase', 'phrase_prefix'
]);
test(validatedCorrectly, getInstance, 'rewrite', validRewrites, false);
test(validatedCorrectly, getInstance, 'fuzzyRewrite', validRewrites, false);
test(setsOption, 'field', {
    param: 'my_field',
    propValue: ['my_field'],
    keyName: 'fields'
});
test(setsOption, 'fields', {
    param: ['my_field_a', 'my_field_b'],
    spread: false
});
test(setsOption, 'type', { param: 'best_fields' });
test(setsOption, 'tieBreaker', { param: 0.3 });
test(setsOption, 'operator', { param: 'and' });
test(setsOption, 'lenient', { param: true });
test(setsOption, 'slop', { param: 2 });
test(setsOption, 'fuzziness', { param: 'AUTO' });
test(setsOption, 'prefixLength', { param: 5 });
test(setsOption, 'maxExpansions', { param: 3 });
test(setsOption, 'rewrite', { param: 'constant_score' });
test(setsOption, 'fuzzyRewrite', { param: 'constant_score_boolean' });
test(setsOption, 'zeroTermsQuery', { param: 'all' });
test(setsOption, 'cutoffFrequency', { param: 10 });

// constructor, fields can be str or arr
test('constructor sets arguments', t => {
    let valueA = getInstance('my_field', 'query str').toJSON();
    let valueB = getInstance()
        .field('my_field')
        .query('query str')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        multi_match: {
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
        multi_match: {
            fields: ['my_field_a', 'my_field_b'],
            query: 'query str'
        }
    };
    t.deepEqual(valueA, valueB);
});
