import test from 'ava';
import { TermsSetQuery } from '../../src';
import {
    illegalParamType,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new TermsSetQuery('my_field');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('terms_set', { terms: [] })
);

test(illegalParamType, getInstance(), 'terms', 'Array');
test(setsOption, 'term', {
    param: 'my-value',
    propValue: ['my-value'],
    keyName: 'terms'
});
test(setsOption, 'terms', {
    param: ['my-value-1', 'my-value-2'],
    spread: false
});
test(setsOption, 'minimumShouldMatchField', { param: 'required_matches' });
test(setsOption, 'minimumShouldMatchScript', {
    param: {
        source: "Math.min(params.num_terms, doc['required_matches'].value)"
    }
});

test('constructor sets arguments', t => {
    let valueA = new TermsSetQuery('my_field', 'my-value').toJSON();
    let valueB = new TermsSetQuery()
        .field('my_field')
        .term('my-value')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        terms_set: {
            my_field: { terms: ['my-value'] }
        }
    };
    t.deepEqual(valueA, expected);

    valueA = new TermsSetQuery('my_field', [
        'my-value-1',
        'my-value-2'
    ]).toJSON();
    valueB = new TermsSetQuery()
        .field('my_field')
        .terms(['my-value-1', 'my-value-2'])
        .toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        terms_set: {
            my_field: {
                terms: ['my-value-1', 'my-value-2']
            }
        }
    };
    t.deepEqual(valueA, expected);
});
