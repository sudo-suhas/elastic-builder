'use strict';

const _ = require('lodash');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * The boosting query can be used to effectively demote results that match
 * a given query. Unlike the "NOT" clause in bool query, this still selects
 * documents that contain undesirable terms, but reduces their overall
 * score.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html)
 *
 * @extends Query
 */
class BoostingQuery extends Query {

    /**
     * Creates an instance of `BoostingQuery`
     *
     * @param {Query=} positiveQry A valid `Query` object.
     * @param {Query=} negativeQry A valid `Query` object.
     * @param {number=} negativeBoost A positive `double` value where `0 < n < 1`.
     */
    constructor(positiveQry, negativeQry, negativeBoost) {
        super('boosting');

        if (!_.isNil(positiveQry)) this.positive(positiveQry);
        if (!_.isNil(negativeQry)) this.negative(negativeQry);
        if (!_.isNil(negativeBoost)) this._queryOpts.negative_boost = negativeBoost;
    }

    /**
     * Sets the "master" query that determines which results are returned.
     *
     * @param {Query} query A valid `Query` object.
     * @returns {BoostingQuery} returns `this` so that calls can be chained.
     */
    positive(query) {
        checkType(query, Query);

        this._queryOpts.positive = query;
        return this;
    }

    /**
     * Sets the query used to match documents in the `positive`
     * query that will be negatively boosted.
     *
     * @param {Query} query A valid `Query` object.
     * @returns {BoostingQuery} returns `this` so that calls can be chained.
     */
    negative(query) {
        checkType(query, Query);

        this._queryOpts.negative = query;
        return this;
    }

    /**
     * Sets the negative boost value.
     *
     * @param {number} factor A positive `double` value where `0 < n < 1`.
     * @returns {BoostingQuery} returns `this` so that calls can be chained.
     */
    negativeBoost(factor) {
        this._queryOpts.negative_boost = factor;
        return this;
    }
}

module.exports = BoostingQuery;
