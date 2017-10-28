import test from 'ava';
import { TermsQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new TermsQuery('my_field');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('terms', { my_field: [] })
);

test(illegalParamType, getInstance(), 'values', 'Array');
test(illegalParamType, getInstance(), 'termsLookup', 'Object');
test(setsOption, 'value', {
    param: 'my-value',
    propValue: ['my-value'],
    keyName: 'my_field'
});
test(setsOption, 'values', {
    param: ['my-value-1', 'my-value-2'],
    spread: false,
    keyName: 'my_field'
});
test(setsOption, 'termsLookup', {
    param: {
        index: 'users',
        type: 'user',
        id: '2',
        path: 'followers'
    },
    keyName: 'my_field'
});
test(setsOption, 'type', {
    param: 'user',
    propValue: { type: 'user' },
    keyName: 'my_field'
});
test(setsOption, 'index', {
    param: 'users',
    propValue: { index: 'users' },
    keyName: 'my_field'
});
test(setsOption, 'id', {
    param: '2',
    propValue: { id: '2' },
    keyName: 'my_field'
});
test(setsOption, 'path', {
    param: 'followers',
    propValue: { path: 'followers' },
    keyName: 'my_field'
});
test(setsOption, 'routing', {
    param: 'my_routing',
    propValue: { routing: 'my_routing' },
    keyName: 'my_field'
});

test('constructor sets arguments', t => {
    let valueA = new TermsQuery('my_field', 'my-value').toJSON();
    let valueB = new TermsQuery()
        .field('my_field')
        .value('my-value')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = { terms: { my_field: ['my-value'] } };
    t.deepEqual(valueA, expected);

    valueA = new TermsQuery('my_field', ['my-value-1', 'my-value-2']).toJSON();
    valueB = new TermsQuery()
        .field('my_field')
        .values(['my-value-1', 'my-value-2'])
        .toJSON();
    t.deepEqual(valueA, valueB);

    expected = { terms: { my_field: ['my-value-1', 'my-value-2'] } };
    t.deepEqual(valueA, expected);
});
