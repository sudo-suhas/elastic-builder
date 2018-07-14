'use strict';

const isNil = require('lodash.isnil');

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
 * const spanQry = esb.spanMultiTermQuery()
 *     .match(esb.prefixQuery('user', 'ki').boost(1.08));
 *
 * @param {MultiTermQueryBase=} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
 *
 * @extends SpanQueryBase
 */
class SpanMultiTermQuery extends SpanQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(multiTermQry) {
        super('span_multi');

        if (!isNil(multiTermQry)) this.match(multiTermQry);
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
