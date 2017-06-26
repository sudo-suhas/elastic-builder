import test from 'ava';
import sinon from 'sinon';
import { SearchTemplate, searchTemplate, matchQuery, termQuery } from '../../src';
import { makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(searchTemplate);

test(setsOption, 'inline', {
    param: {
        query: matchQuery('{{my_field}}', '{{my_value}}'),
        size: '{{my_size}}'
    }
});
test(setsOption, 'file', { param: 'storedTemplate' });
test(setsOption, 'id', { param: 'indexedTemplate' });
test(setsOption, 'indexed', { param: 'indexedTemplate', keyName: 'id' });
test(setsOption, 'params', {
    param: {
        my_field: 'message',
        my_value: 'some message',
        my_size: 5
    }
});

test('constructor sets arguments', t => {
    let valueA = new SearchTemplate(
        'inline',
        '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
    ).toJSON();
    let valueB = new SearchTemplate()
        .inline('{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}')
        .toJSON();
    t.deepEqual(valueA, valueB);

    let expected = {
        inline: '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
    };
    t.deepEqual(valueA, expected);

    valueA = new SearchTemplate('file', 'storedTemplate').toJSON();
    valueB = new SearchTemplate().file('storedTemplate').toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        file: 'storedTemplate'
    };
    t.deepEqual(valueA, expected);

    valueA = new SearchTemplate('id', 'indexedTemplate').toJSON();
    valueB = new SearchTemplate().id('indexedTemplate').toJSON();
    t.deepEqual(valueA, valueB);

    expected = {
        id: 'indexedTemplate'
    };
    t.deepEqual(valueA, expected);

    const err = t.throws(() => new SearchTemplate('invalid_script_type', 'src'), Error);
    t.is(err.message, '`type` must be one of `inline`, `id`, `indexed`, `file`');
});

test.serial('mixed representaion', t => {
    const spy = sinon.spy(console, 'warn');

    const value = new SearchTemplate().file('storedTemplate').id('indexedTemplate').toJSON();
    const expected = {
        id: 'indexedTemplate'
    };
    t.deepEqual(value, expected);

    t.true(spy.calledTwice);
    t.true(
        spy.firstCall.calledWith(
            '[SearchTemplate] Search template source(`inline`/`id`/`file`) was already specified!'
        )
    );
    t.true(spy.secondCall.calledWith('[SearchTemplate] Overwriting.'));
    console.warn.restore();
});

test('toJSON can handle elastic-builder objs', t => {
    const value = new SearchTemplate(
        'inline',
        '{ "query": { "bool": { "must": {{#toJson}}clauses{{/toJson}} } } }'
    )
        .params({
            clauses: [termQuery('user', 'foo'), termQuery('user', 'bar')]
        })
        .toJSON();
    const expected = {
        inline: '{ "query": { "bool": { "must": {{#toJson}}clauses{{/toJson}} } } }',
        params: {
            clauses: [{ term: { user: 'foo' } }, { term: { user: 'bar' } }]
        }
    };
    t.deepEqual(value, expected);
});
