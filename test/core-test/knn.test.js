import test from 'ava';
import { KNN, TermQuery } from '../../src';

test('knn can be instantiated', t => {
    const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
    const json = knn.toJSON();
    t.truthy(json);
});

test('knn throws error if numCandidates is less than k', t => {
    const error = t.throws(() =>
        new KNN('my_field', 10, 5).queryVector([1, 2, 3])
    );
    t.is(error.message, 'KNN numCandidates cannot be less than k');
});

test('knn queryVector sets correctly', t => {
    const vector = [1, 2, 3];
    const knn = new KNN('my_field', 5, 10).queryVector(vector);
    const json = knn.toJSON();
    t.deepEqual(json.query_vector, vector);
});

test('knn queryVectorBuilder sets correctly', t => {
    const modelId = 'model_123';
    const modelText = 'Sample model text';
    const knn = new KNN('my_field', 5, 10).queryVectorBuilder(
        modelId,
        modelText
    );
    const json = knn.toJSON();
    t.deepEqual(json.query_vector_builder.text_embeddings, {
        model_id: modelId,
        model_text: modelText
    });
});

test('knn filter method adds queries correctly', t => {
    const knn = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
    const query = new TermQuery('field', 'value');
    knn.filter(query);
    const json = knn.toJSON();
    t.deepEqual(json.filter, [query.toJSON()]);
});

test('knn boost method sets correctly', t => {
    const boostValue = 1.5;
    const knn = new KNN('my_field', 5, 10)
        .boost(boostValue)
        .queryVector([1, 2, 3]);
    const json = knn.toJSON();
    t.is(json.boost, boostValue);
});

test('knn similarity method sets correctly', t => {
    const similarityValue = 0.8;
    const knn = new KNN('my_field', 5, 10)
        .similarity(similarityValue)
        .queryVector([1, 2, 3]);
    const json = knn.toJSON();
    t.is(json.similarity, similarityValue);
});

test('knn toJSON method returns correct DSL', t => {
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

    t.deepEqual(knn.toJSON(), expectedDSL);
});

test('knn toJSON throws error if neither query_vector nor query_vector_builder is provided', t => {
    const knn = new KNN('my_field', 5, 10);
    const error = t.throws(() => knn.toJSON());
    t.is(
        error.message,
        'either query_vector_builder or query_vector must be provided'
    );
});
