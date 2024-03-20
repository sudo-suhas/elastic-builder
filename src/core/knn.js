'use strict';

const { recursiveToJSON, checkType } = require('./util');
const Query = require('./query');

/**
 * Class representing a k-Nearest Neighbors (k-NN) query.
 * This class extends the Query class to support the specifics of k-NN search, including setting up the field,
 * query vector, number of neighbors (k), and number of candidates.
 *
 * @example
 * const qry = esb.kNN('my_field', 100, 1000).vector([1,2,3]);
 * const qry = esb.kNN('my_field', 100, 1000).query_vector_builder('model_123', 'Sample model text');
 *
 * NOTE: kNN search was added to Elasticsearch in v8.0
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/knn-search.html)
 */
class KNN {
    /**
     * Creates an instance of KNN.
     */
    constructor(field, k, numCandidates) {
        if (k > numCandidates)
            throw new Error('KNN numCandidates cannot be less than k');
        this._body = {};
        this._body.field = field;
        this._body.k = k;
        this._body.filter = [];
        this._body.num_candidates = numCandidates;
    }

    /**
     * Sets the query vector for the k-NN search.
     * @param {Array<number>} vector - The query vector.
     * @returns {KNN} Returns the instance of KNN for method chaining.
     */
    queryVector(vector) {
        if (this._body.query_vector_builder)
            throw new Error(
                'cannot provide both query_vector_builder and query_vector'
            );
        this._body.query_vector = vector;
        return this;
    }

    /**
     * Sets the query vector builder for the k-NN search.
     * This method configures a query vector builder using a specified model ID and model text.
     * It's important to note that either a direct query vector or a query vector builder can be
     * provided, but not both.
     *
     * @param {string} modelId - The ID of the model to be used for generating the query vector.
     * @param {string} modelText - The text input based on which the query vector is generated.
     * @returns {KNN} Returns the instance of KNN for method chaining.
     * @throws {Error} Throws an error if both query_vector_builder and query_vector are provided.
     *
     * @example
     * let knn = new esb.KNN().queryVectorBuilder('model_123', 'Sample model text');
     */
    queryVectorBuilder(modelId, modelText) {
        if (this._body.query_vector)
            throw new Error(
                'cannot provide both query_vector_builder and query_vector'
            );
        this._body.query_vector_builder = {
            text_embeddings: {
                model_id: modelId,
                model_text: modelText
            }
        };
        return this;
    }

    /**
     * Adds one or more filter queries to the k-NN search.
     *
     * This method is designed to apply filters to the k-NN search. It accepts either a single
     * query or an array of queries. Each query acts as a filter, refining the search results
     * according to the specified conditions. These queries must be instances of the `Query` class.
     * If any provided query is not an instance of `Query`, a TypeError is thrown.
     *
     * @param {Query|Query[]} queries - A single `Query` instance or an array of `Query` instances for filtering.
     * @returns {KNN} Returns `this` to allow method chaining.
     * @throws {TypeError} If any of the provided queries is not an instance of `Query`.
     *
     * Usage example:
     * let knn = new KNN();
     * knn.filter(new TermQuery('field', 'value')); // Applying a single filter query
     * knn.filter([new TermQuery('field1', 'value1'), new TermQuery('field2', 'value2')]); // Applying multiple filter queries
     */
    filter(queries) {
        const queryArray = Array.isArray(queries) ? queries : [queries];
        queryArray.forEach(query => {
            checkType(query, Query);
            this._body.filter.push(query);
        });
        return this;
    }

    /**
     * Sets the field to perform the k-NN search on.
     * @param {number} boost - The number of the boost
     * @returns {KNN} Returns the instance of KNN for method chaining.
     */
    boost(boost) {
        this._body.boost = boost;
        return this;
    }

    /**
     * Sets the field to perform the k-NN search on.
     * @param {number} similarity - The number of the similarity
     * @returns {KNN} Returns the instance of KNN for method chaining.
     */
    similarity(similarity) {
        this._body.similarity = similarity;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `query`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        if (!this._body.query_vector && !this._body.query_vector_builder)
            throw new Error(
                'either query_vector_builder or query_vector must be provided'
            );
        return recursiveToJSON(this._body);
    }
}

module.exports = KNN;
