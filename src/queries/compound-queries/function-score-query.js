'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { checkType, invalidParam },
    consts: { SCORE_MODE_SET, BOOST_MODE_SET }
} = require('../../core');

const { ScoreFunction } = require('./score-functions');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html';

const invalidScoreModeParam = invalidParam(
    ES_REF_URL,
    'score_mode',
    SCORE_MODE_SET
);
const invalidBoostModeParam = invalidParam(
    ES_REF_URL,
    'boost_mode',
    BOOST_MODE_SET
);

/**
 * The `function_score` allows you to modify the score of documents that are
 * retrieved by a query. This can be useful if, for example, a score function
 * is computationally expensive and it is sufficient to compute the score on
 * a filtered set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html)
 *
 * @example
 * // `function_score` with only one function
 * const qry = esb.functionScoreQuery()
 *     .query(esb.matchAllQuery())
 *     .function(esb.randomScoreFunction())
 *     .boostMode('multiply')
 *     .boost('5');
 *
 * @example
 * // Several functions combined
 * const qry = esb.functionScoreQuery()
 *     .query(esb.matchAllQuery())
 *     .functions([
 *         esb.randomScoreFunction()
 *             .filter(esb.matchQuery('test', 'bar'))
 *             .weight(23),
 *         esb.weightScoreFunction()
 *             .filter(esb.matchQuery('test', 'cat'))
 *             .weight(42)
 *     ])
 *     .maxBoost(42)
 *     .scoreMode('max')
 *     .boostMode('multiply')
 *     .minScore(42)
 *     .boost('5');
 *
 * @example
 * // Combine decay functions
 * const qry = esb.functionScoreQuery()
 *     .functions([
 *         esb.decayScoreFunction('gauss', 'price').origin('0').scale('20'),
 *         esb.decayScoreFunction('gauss', 'location')
 *             .origin('11, 12')
 *             .scale('2km')
 *     ])
 *     .query(esb.matchQuery('properties', 'balcony'))
 *     .scoreMode('multiply');
 *
 * @extends Query
 */
class FunctionScoreQuery extends Query {
    // eslint-disable-next-line require-jsdoc
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
     * @param {string} mode Can be one of `multiply`, `replace`, `sum`, `avg`, `max`, `min`.
     * Defaults to `multiply`.
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */
    boostMode(mode) {
        if (isNil(mode)) invalidBoostModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (!BOOST_MODE_SET.has(modeLower)) {
            invalidBoostModeParam(mode);
        }

        this._queryOpts.boost_mode = modeLower;
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

        funcs.forEach(func => this.function(func));
        return this;
    }
}

module.exports = FunctionScoreQuery;
