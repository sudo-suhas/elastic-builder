'use strict';

const { Query } = require('../../core');

/**
 * The sparse vector query executes a query consisting of sparse vectors, such as built by a learned sparse retrieval model
 *
 * [Elasticsearch reference](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-sparse-vector-query)
 *
 * @example
 * const qry = esb.sparseVector().field('ml_tokens').inferenceId('model_id').query('my query');
 *
 * @extends Query
 */
class SparseVectorQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('sparse_vector');
    }

    /**
     *
     * @param {string} field the field for the query
     * @returns {SparseVectorQuery}
     */
    field(field) {
        this._queryOpts.field = field;
        return this;
    }

    /**
     * Set model inference id
     *
     * @param {string} inferenceId The model inference ID
     * @returns {SparseVectorQuery}
     */
    inferenceId(inferenceId) {
        this._queryOpts.inference_id = inferenceId;
        return this;
    }

    /**
     * Sets the input query
     *
     * @param {string} query The input query
     * @returns {SparseVectorQuery}
     */
    query(query) {
        this._queryOpts.query = query;
        return this;
    }

    /**
     * Set a query vector to the query to run. if you don't use inference
     *
     * @param {Object} queryVector
     * @returns {SparseVectorQuery}
     */
    queryVector(queryVector) {
        this._queryOpts.query_vector = queryVector;
        return this;
    }

    /**
     * Enable pruning
     *
     * @param {boolean} prune
     * @returns {SparseVectorQuery} returns `this` so that calls can be chained.
     */
    prune(prune) {
        this._queryOpts.prune = prune;
        return this;
    }

    /**
     * Set pruning config tokens_freq_ratio_threshold
     *
     * @param {number} tokensFreqRatioThreshold
     * @returns {SparseVectorQuery} returns `this` so that calls can be chained.
     */
    tokensFreqRatioThreshold(tokensFreqRatioThreshold) {
        if (!this._queryOpts.pruning_config) {
            this._queryOpts.pruning_config = {};
        }
        this._queryOpts.pruning_config.tokens_freq_ratio_threshold = tokensFreqRatioThreshold;
        return this;
    }
    /**
     * Set pruning config tokens_weight_threshold
     *
     * @param {number} tokensWeightThreshold
     * @returns {SparseVectorQuery} returns `this` so that calls can be chained.
     */
    tokensWeightThreshold(tokensWeightThreshold) {
        if (!this._queryOpts.pruning_config) {
            this._queryOpts.pruning_config = {};
        }
        this._queryOpts.pruning_config.tokens_weight_threshold = tokensWeightThreshold;
        return this;
    }
    /**
     * Set pruning config only_score_pruned_tokens
     *
     * @param {boolean} onlyScorePrunedTokens
     * @returns {SparseVectorQuery} returns `this` so that calls can be chained.
     */
    onlyScorePrunedTokens(onlyScorePrunedTokens) {
        if (!this._queryOpts.pruning_config) {
            this._queryOpts.pruning_config = {};
        }
        this._queryOpts.pruning_config.only_score_pruned_tokens = onlyScorePrunedTokens;
        return this;
    }
}

module.exports = SparseVectorQuery;
