'use strict';

const { inspect } = require('util');

const isNil = require('lodash.isnil');

const Query = require('./query');
const { checkType, recursiveToJSON } = require('./util');
const { RESCORE_MODE_SET } = require('./consts');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html';

/**
 * A `rescore` request can help to improve precision by reordering just
 * the top (eg 100 - 500) documents returned by the `query` and `post_filter`
 * phases, using a secondary (usually more costly) algorithm, instead of
 * applying the costly algorithm to all documents in the index.
 *
 * The rescore phase is not executed when sort is used.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html)
 *
 */
class Rescore {
    /**
     * Creates an instance of `Rescore`
     *
     * @param {number=} windowSize
     * @param {Query=} rescoreQuery
     */
    constructor(windowSize, rescoreQuery) {
        this._body = {};
        this._rescoreOpts = this._body.query = {};

        if (!isNil(windowSize)) this._body.window_size = windowSize;
        if (!isNil(rescoreQuery)) this.rescoreQuery(rescoreQuery);
    }

    /**
     * The number of docs which will be examined on each shard can be controlled
     * by the window_size parameter, which defaults to `from` and `size`.
     *
     * @param {number} windowSize
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    windowSize(windowSize) {
        this._body.window_size = windowSize;
        return this;
    }

    /**
     * The query to execute on the Top-K results by the `query` and `post_filter` phases.
     *
     * @param {Query} rescoreQuery
     * @returns {Rescore} returns `this` so that calls can be chained.
     * @throws {TypeError} If `rescoreQuery` is not an instance of `Query`
     */
    rescoreQuery(rescoreQuery) {
        checkType(rescoreQuery, Query);

        this._rescoreOpts.rescore_query = rescoreQuery;
        return this;
    }

    /**
     * Control the relative importance of the original query.
     *
     * @param {number} weight Defaults to 1
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    queryWeight(weight) {
        this._rescoreOpts.query_weight = weight;
        return this;
    }

    /**
     * Control the relative importance of the rescore query.
     *
     * @param {number} weight Defaults to 1
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    rescoreQueryWeight(weight) {
        this._rescoreOpts.rescore_query_weight = weight;
        return this;
    }

    /**
     * Controls the way the scores are combined.
     *
     * @param {string} mode Can be one of `total`, `multiply`, `min`, `max`, `avg`.
     * Defaults to `total`.
     * @returns {Rescore} returns `this` so that calls can be chained.
     */
    scoreMode(mode) {
        if (!RESCORE_MODE_SET.has(mode)) {
            console.log(`See ${ES_REF_URL}`);
            console.warn(`Got 'score_mode' - ${mode}`);
            throw new Error(
                `The 'score_mode' parameter should belong to ${inspect(RESCORE_MODE_SET)}`
            );
        }

        this._rescoreOpts.score_mode = mode;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for `rescore` request
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._body);
    }
}

module.exports = Rescore;
