import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    SearchTemplate,
    searchTemplate,
    matchQuery,
    termQuery
} from '../../src';

describe('SearchTemplate', () => {
    describe('constructor', () => {
        test('sets inline via constructor', () => {
            const valueA = new SearchTemplate(
                'inline',
                '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
            ).toJSON();
            const valueB = new SearchTemplate()
                .inline(
                    '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
                )
                .toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({
                inline: '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
            });
        });

        test('sets file via constructor', () => {
            const valueA = new SearchTemplate(
                'file',
                'storedTemplate'
            ).toJSON();
            const valueB = new SearchTemplate().file('storedTemplate').toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({ file: 'storedTemplate' });
        });

        test('sets id via constructor', () => {
            const valueA = new SearchTemplate('id', 'indexedTemplate').toJSON();
            const valueB = new SearchTemplate().id('indexedTemplate').toJSON();
            expect(valueA).toEqual(valueB);
            expect(valueA).toEqual({ id: 'indexedTemplate' });
        });

        test('throws error for invalid script type', () => {
            expect(
                () => new SearchTemplate('invalid_script_type', 'src')
            ).toThrow(
                new Error(
                    '`type` must be one of `inline`, `id`, `indexed`, `file`'
                )
            );
        });
    });

    describe('options', () => {
        test('sets inline option', () => {
            const result = searchTemplate()
                .inline({
                    query: matchQuery('{{my_field}}', '{{my_value}}'),
                    size: '{{my_size}}'
                })
                .toJSON();
            const expected = {
                inline: {
                    query: { match: { '{{my_field}}': '{{my_value}}' } },
                    size: '{{my_size}}'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets file option', () => {
            const result = searchTemplate().file('storedTemplate').toJSON();
            const expected = { file: 'storedTemplate' };
            expect(result).toEqual(expected);
        });

        test('sets id option', () => {
            const result = searchTemplate().id('indexedTemplate').toJSON();
            const expected = { id: 'indexedTemplate' };
            expect(result).toEqual(expected);
        });

        test('sets params option', () => {
            const result = searchTemplate()
                .params({
                    my_field: 'message',
                    my_value: 'some message',
                    my_size: 5
                })
                .toJSON();
            const expected = {
                params: {
                    my_field: 'message',
                    my_value: 'some message',
                    my_size: 5
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets indexed option (maps to id)', () => {
            const result = searchTemplate().indexed('indexedTemplate').toJSON();
            const expected = { id: 'indexedTemplate' };
            expect(result).toEqual(expected);
        });
    });

    describe('mixed representation', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('logs warnings when overwriting template source', () => {
            const value = new SearchTemplate()
                .file('storedTemplate')
                .id('indexedTemplate')
                .toJSON();
            const expected = {
                id: 'indexedTemplate'
            };
            expect(value).toEqual(expected);

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[SearchTemplate] Search template source(`inline`/`id`/`file`) was already specified!'
            );
            expect(spy).toHaveBeenNthCalledWith(
                2,
                '[SearchTemplate] Overwriting.'
            );
        });
    });

    describe('toJSON', () => {
        test('can handle elastic-builder objs', () => {
            const value = new SearchTemplate(
                'inline',
                '{ "query": { "bool": { "must": {{#toJson}}clauses{{/toJson}} } } }'
            )
                .params({
                    clauses: [
                        termQuery('user', 'foo'),
                        termQuery('user', 'bar')
                    ]
                })
                .toJSON();
            const expected = {
                inline: '{ "query": { "bool": { "must": {{#toJson}}clauses{{/toJson}} } } }',
                params: {
                    clauses: [
                        { term: { user: 'foo' } },
                        { term: { user: 'bar' } }
                    ]
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
