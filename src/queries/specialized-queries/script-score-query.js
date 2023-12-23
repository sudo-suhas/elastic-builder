'use strict';

const {
    Query,
    Script,
    util: { checkType }
} = require('../../core');

/**
 * A query that uses a script to provide a custom score for returned documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-score-query.html)
 *
 * NOTE: This query was added in elasticsearch v7.0.
 *
 * @example
 * const qry = esb.scriptScoreQuery()
 *   .query(esb.matchQuery("message", "elasticsearch"))
 *   .script(esb.script().source("doc['my-int'].value / 10"))
 *
 * @extends Query
 */
class ScriptScoreQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('script_score');
    }

    /**
     * Sets the query used to return documents.
     *
     * @param {Query} query A valid `Query` object
     * @returns {ScriptScoreQuery} returns `this` so that calls can be chained.
     */
    query(query) {
        checkType(query, Query);

        this._queryOpts.query = query;
        return this;
    }

    /**
     * Sets the script used to compute the score of documents returned by the query.
     *
     * @param {Script} script A valid `Script` object
     * @returns {ScriptScoreQuery} returns `this` so that calls can be chained.
     */
    script(script) {
        checkType(script, Script);

        this._queryOpts.script = script;
        return this;
    }

    /**
     * Sets the minimum score limit for documents to be included in search result.
     *
     * @param {number} limit Minimum score threshold
     * @returns {ScriptScoreQuery} returns `this` so that calls can be chained.
     */
    minScore(limit) {
        this._queryOpts.min_score = limit;
        return this;
    }
}

module.exports = ScriptScoreQuery;
