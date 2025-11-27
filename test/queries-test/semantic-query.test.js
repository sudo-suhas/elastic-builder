import { describe, test, expect } from 'vitest';
import esb, { SemanticQuery } from '../../src';

describe('SemanticQuery', () => {
    describe('constructor', () => {
        test('constructor sets field and query correctly', () => {
            const q = new SemanticQuery(
                'inference_field',
                'Best surfing places'
            );

            const expected = {
                semantic: {
                    field: 'inference_field',
                    query: 'Best surfing places'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('empty constructor allows method chaining', () => {
            const q = new SemanticQuery();
            q.field('inference_field').query('Best surfing places');

            const expected = {
                semantic: {
                    field: 'inference_field',
                    query: 'Best surfing places'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });
    });

    describe('options', () => {
        test('field method sets field correctly', () => {
            const q = new SemanticQuery();
            q.field('title_semantic');

            const expected = {
                semantic: {
                    field: 'title_semantic'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('query method sets query text correctly', () => {
            const q = new SemanticQuery();
            q.query('mountain lake');

            const expected = {
                semantic: {
                    query: 'mountain lake'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('supports boost parameter', () => {
            const q = new SemanticQuery('title_semantic', 'mountain lake');
            q.boost(2);

            const expected = {
                semantic: {
                    field: 'title_semantic',
                    query: 'mountain lake',
                    boost: 2
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('overwriting field and query works correctly', () => {
            const q = new SemanticQuery('old_field', 'old query');
            q.field('new_field').query('new query');

            const expected = {
                semantic: {
                    field: 'new_field',
                    query: 'new query'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });
    });

    describe('factory function', () => {
        test('calls semantic query via esb factory function', () => {
            const q = esb.semanticQuery(
                'inference_field',
                'Best surfing places'
            );

            const expected = {
                semantic: {
                    field: 'inference_field',
                    query: 'Best surfing places'
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });

        test('calls semantic query via esb factory function with chaining', () => {
            const q = esb
                .semanticQuery()
                .field('semantic_field')
                .query('shoes')
                .boost(1.5);

            const expected = {
                semantic: {
                    field: 'semantic_field',
                    query: 'shoes',
                    boost: 1.5
                }
            };
            expect(q.toJSON()).toEqual(expected);
        });
    });
});
