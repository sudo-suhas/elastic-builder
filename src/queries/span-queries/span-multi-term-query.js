'use strict';

const _ = require('lodash');

const {
    util: { checkType }
} = require('../../core');

const { MultiTermQueryBase } = require('../term-level-queries');

const SpanQueryBase = require('./span-query-base');

/**
 * The `span_multi` query allows you to wrap a `multi term query` (one of wildcard,
 * fuzzy, prefix, range or regexp query) as a `span query`, so it can be nested.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-multi-term-query.html)
 *
 * @example
 * const spanQry = bob.spanMultiTermQuery()
 *  .match(bob.prefixQuery('user', 'ki'));
 *
 * @extends SpanQueryBase
 */
class SpanMultiTermQuery extends SpanQueryBase {

    /**
     * Creates an instance of `SpanMultiTermQuery`
     *
     * @param {MultiTermQueryBase} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
     */
    constructor(multiTermQry) {
        super('span_multi');

        if (!_.isNil(multiTermQry)) this.match(multiTermQry);
    }

    /**
     * Sets the multi term query.
     *
     * @param {MultiTermQueryBase} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
     * @returns {SpanMultiTermQuery} returns `this` so that calls can be chained.
     */
    match(multiTermQry) {
        checkType(multiTermQry, MultiTermQueryBase);

        this._queryOpts.match = multiTermQry;
        return this;
    }
}

module.exports = SpanMultiTermQuery;
