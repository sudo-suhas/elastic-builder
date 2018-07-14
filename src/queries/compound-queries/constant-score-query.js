'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * A query that wraps another query and simply returns a constant score
 * equal to the query boost for every document in the filter.
 * Maps to Lucene `ConstantScoreQuery`.
 *
 * Constructs a query where each documents returned by the internal
 * query or filter have a constant score equal to the boost factor.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html)
 *
 * @example
 * const qry = esb.constantScoreQuery(esb.termQuery('user', 'kimchy')).boost(1.2);
 *
 * @param {Query=} filterQuery Query to filter on.
 *
 * @extends Query
 */
class ConstantScoreQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(filterQuery) {
        super('constant_score');

        if (!isNil(filterQuery)) this.filter(filterQuery);
    }

    /**
     * Adds the query to apply a constant score to.
     *
     * @param {Query} filterQuery  Query to filter on.
     * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
     */
    filter(filterQuery) {
        checkType(filterQuery, Query);

        this._queryOpts.filter = filterQuery;
        return this;
    }

    /**
     * Adds the query to apply a constant score to.
     * Alias for method `filter`.
     *
     * Note: This parameter has been removed in elasticsearch 6.0. Use `filter` instead.
     *
     * @param {Query} filterQuery  Query to filter on.
     * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
     */
    query(filterQuery) {
        return this.filter(filterQuery);
    }
}

module.exports = ConstantScoreQuery;
