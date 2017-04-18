'use strict';

const isNil = require('lodash.isnil');

const forEach = require('lodash.foreach'),
    head = require('lodash.head'),
    omit = require('lodash.omit');

const {
    Query,
    util: { checkType, invalidParam, recursiveToJSON },
    consts: { SCORE_MODE_SET, BOOST_MODE_SET }
} = require('../../core');

const { ScoreFunction } = require('./score-functions');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html';

const invalidScoreModeParam = invalidParam(ES_REF_URL, 'score_mode', SCORE_MODE_SET);
const invalidBoostModeParam = invalidParam(ES_REF_URL, 'boost_mode', BOOST_MODE_SET);

/**
 * The `function_score` allows you to modify the score of documents that are
 * retrieved by a query. This can be useful if, for example, a score function
 * is computationally expensive and it is sufficient to compute the score on
 * a filtered set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html)
 *
 * @extends Query
 */
class FunctionScoreQuery extends Query {
    /**
     * Creates an instance of `FunctionScoreQuery`
     */
    constructor() {
        super('function_score');

        this._queryOpts.functions = [];
    }

    /**
     * Sets the source query.
     *
     * @param {Query} query A valid `Query` object
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    query(query) {
        checkType(query, Query);

        this._queryOpts.query = query;
        return this;
    }

    /**
     * Controls the way the scores are combined.
     *
     * @param {string} mode Can be one of `multiply`, `sum`, `first`, `min`, `max`, `avg`.
     * Defaults to `multiply`.
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    scoreMode(mode) {
        if (isNil(mode)) invalidScoreModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (!SCORE_MODE_SET.has(modeLower)) {
            invalidScoreModeParam(mode);
        }

        this._queryOpts.score_mode = mode;
        return this;
    }

    /**
     * Controls the way the query and function scores are combined.
     *
     * @param {string} mode Can be one of `multiply`, `sum`, `first`, `min`, `max`, `avg`.
     * Defaults to `multiply`.
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    boostMode(mode) {
        if (isNil(mode)) invalidBoostModeParam(mode);
        if (!BOOST_MODE_SET.has(mode)) {
            invalidBoostModeParam(mode);
        }

        this._queryOpts.boost_mode = mode;
        return this;
    }

    /**
     * Restricts new score to not exceed given limit. The default for `max_boost` is `FLT_MAX`.
     *
     * @param {number} limit
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    maxBoost(limit) {
        this._queryOpts.max_boost = limit;
        return this;
    }

    /**
     * Sets the minimum score limit for documents to be included in search result.
     *
     * @param {number} limit Minimum score threshold
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    minScore(limit) {
        this._queryOpts.min_score = limit;
        return this;
    }

    /**
     * Add a single score function to the list of existing functions.
     *
     * @param {ScoreFunction} func A valid `ScoreFunction` object.
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    function(func) {
        checkType(func, ScoreFunction);

        this._queryOpts.functions.push(func);
        return this;
    }

    /**
     * Adds array of score functions to the list of existing functions.
     *
     * @param {Array<ScoreFunction>} funcs An array of valid `ScoreFunction` objects
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    functions(funcs) {
        checkType(funcs, Array);

        forEach(funcs, func => this.function(func));
        return this;
    }

    /**
     * Overrides default `toJSON` to return DSL representation of the function score query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // TODO: Throw error if there is no score function
        let qryOpts;
        const scoreFunctions = this._queryOpts.functions;

        if (scoreFunctions.length === 1) {
            qryOpts = Object.assign(
                omit(this._queryOpts, 'functions'),
                recursiveToJSON(head(scoreFunctions))
            );
        } else qryOpts = this._queryOpts;

        return recursiveToJSON({
            [this.queryType]: qryOpts
        });
    }
}

module.exports = FunctionScoreQuery;
