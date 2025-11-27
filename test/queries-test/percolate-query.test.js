import { describe, test, expect } from 'vitest';
import { PercolateQuery, percolateQuery } from '../../src';

describe('PercolateQuery', () => {
    describe('options', () => {
        test('sets field option', () => {
            const result = percolateQuery().field('query').toJSON();
            const expected = {
                percolate: {
                    field: 'query',
                    documents: []
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets document_type option', () => {
            const result = percolateQuery().documentType('doctype').toJSON();
            const expected = {
                percolate: {
                    document_type: 'doctype',
                    documents: []
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets document option', () => {
            const doc = { message: 'A new bonsai tree in the office' };
            const result = percolateQuery().document(doc).toJSON();
            const expected = {
                percolate: {
                    documents: [doc]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets documents option', () => {
            const docs = [{ message: 'A new bonsai tree in the office' }];
            const result = percolateQuery().documents(docs).toJSON();
            const expected = {
                percolate: {
                    documents: docs
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets index option', () => {
            const result = percolateQuery().index('my-index').toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    index: 'my-index'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets type option', () => {
            const result = percolateQuery().type('message').toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    type: 'message'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets id option', () => {
            const result = percolateQuery().id('1').toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    id: '1'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets routing option', () => {
            const result = percolateQuery().routing('routing').toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    routing: 'routing'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets preference option', () => {
            const result = percolateQuery().preference('preference').toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    preference: 'preference'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets version option', () => {
            const result = percolateQuery().version(1).toJSON();
            const expected = {
                percolate: {
                    documents: [],
                    version: 1
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const value = new PercolateQuery('query', 'doctype').toJSON();
            const expected = {
                percolate: {
                    field: 'query',
                    document_type: 'doctype',
                    documents: []
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('document behavior', () => {
        test('set document after documents', () => {
            const docA = { param: { message: 'a bonsai' } };
            const docB = { param: { message: 'another bonsai' } };
            const field = 'query';
            const docType = 'docType';
            const query = new PercolateQuery(field, docType);
            const value = query.document(docA).documents([docB]).toJSON();

            const expected = {
                percolate: {
                    field,
                    document_type: docType,
                    documents: [docA, docB]
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
