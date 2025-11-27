import { describe, test, expect } from 'vitest';
import { KNN, TermQuery } from '../../src';

describe('KNN', () => {
    describe('constructor', () => {
        test('can be instantiated', () => {
            const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            const json = knn.toJSON();
            expect(json).toEqual({
                field: 'my_field',
                k: 5,
                num_candidates: 10,
                query_vector: [1, 2, 3],
                filter: []
            });
        });

        test('throws error if numCandidates is less than k', () => {
            expect(() =>
                new KNN('my_field', 10, 5).queryVector([1, 2, 3])
            ).toThrow(new Error('KNN numCandidates cannot be less than k'));
        });
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: 'not_a_query'
            }
        ])('$name', ({ value }) => {
            test('filter()', () => {
                const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
                expect(() => knn.filter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('options', () => {
        test('queryVector sets correctly', () => {
            const vector = [1, 2, 3];
            const knn = new KNN('my_field', 5, 10).queryVector(vector);
            const json = knn.toJSON();
            expect(json.query_vector).toEqual(vector);
        });

        test('queryVectorBuilder sets correctly', () => {
            const modelId = 'model_123';
            const modelText = 'Sample model text';
            const knn = new KNN('my_field', 5, 10).queryVectorBuilder(
                modelId,
                modelText
            );
            const json = knn.toJSON();
            expect(json.query_vector_builder.text_embeddings).toEqual({
                model_id: modelId,
                model_text: modelText
            });
        });

        test('boost sets correctly', () => {
            const knn = new KNN('my_field', 5, 10)
                .boost(1.5)
                .queryVector([1, 2, 3]);
            const json = knn.toJSON();
            expect(json.boost).toBe(1.5);
        });

        test('similarity sets correctly', () => {
            const knn = new KNN('my_field', 5, 10)
                .similarity(0.8)
                .queryVector([1, 2, 3]);
            const json = knn.toJSON();
            expect(json.similarity).toBe(0.8);
        });
    });

    describe('filter method', () => {
        test('adds single query correctly', () => {
            const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            const query = new TermQuery('field', 'value');
            knn.filter(query);
            const json = knn.toJSON();
            expect(json.filter).toEqual([query.toJSON()]);
        });

        test('adds queries as array correctly', () => {
            const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            const query1 = new TermQuery('field1', 'value1');
            const query2 = new TermQuery('field2', 'value2');
            knn.filter([query1, query2]);
            const json = knn.toJSON();
            expect(json.filter).toEqual([query1.toJSON(), query2.toJSON()]);
        });
    });

    describe('toJSON', () => {
        test('returns correct DSL', () => {
            const knn = new KNN('my_field', 5, 10)
                .queryVector([1, 2, 3])
                .filter(new TermQuery('field', 'value'));

            const expectedDSL = {
                field: 'my_field',
                k: 5,
                num_candidates: 10,
                query_vector: [1, 2, 3],
                filter: [{ term: { field: 'value' } }]
            };

            expect(knn.toJSON()).toEqual(expectedDSL);
        });

        test('throws error if neither query_vector nor query_vector_builder is provided', () => {
            const knn = new KNN('my_field', 5, 10);
            expect(() => knn.toJSON()).toThrow(
                new Error(
                    'either query_vector_builder or query_vector must be provided'
                )
            );
        });
    });

    describe('query_vector and query_vector_builder mutual exclusivity', () => {
        test('throws error when first queryVector and then queryVectorBuilder are set', () => {
            const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            expect(() => {
                knn.queryVectorBuilder('model_123', 'Sample model text');
            }).toThrow(
                new Error(
                    'cannot provide both query_vector_builder and query_vector'
                )
            );
        });

        test('throws error when first queryVectorBuilder and then queryVector are set', () => {
            const knn = new KNN('my_field', 5, 10).queryVectorBuilder(
                'model_123',
                'Sample model text'
            );
            expect(() => {
                knn.queryVector([1, 2, 3]);
            }).toThrow(
                new Error(
                    'cannot provide both query_vector_builder and query_vector'
                )
            );
        });
    });
});
