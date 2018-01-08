'use strict';

const isNil = require('lodash.isnil');

const JoiningQueryBase = require('./joining-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html';

/**
 * The `has_child` filter accepts a query and the child type to run against, and
 * results in parent documents that have child docs matching the query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html)
 *
 * @example
 * // Scoring support
 * const qry = esb.hasChildQuery(
 *     esb.termQuery('tag', 'something'),
 *     'blog_tag'
 * ).scoreMode('min');
 *
 * @example
 * // Sort by child documents' `click_count` field
 * const qry = esb.hasChildQuery()
 *     .query(
 *         esb.functionScoreQuery().function(
 *             esb.scriptScoreFunction("_score * doc['click_count'].value")
 *         )
 *     )
 *     .type('blog_tag')
 *     .scoreMode('max');
 *
 * @param {Query=} qry A valid `Query` object
 * @param {string=} type The child type
 *
 * @extends JoiningQueryBase
 */
class HasChildQuery extends JoiningQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(qry, type) {
        super('has_child', ES_REF_URL, qry);

        if (!isNil(type)) this._queryOpts.type = type;
    }

    /**
     * Sets the child document type to search against.
     * Alias for method `childType`.
     *
     * @param {string} type A valid doc type name
     * @returns {HasChildQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        this._queryOpts.type = type;
        return this;
    }

    /**
     * Sets the child document type to search against
     *
     * @param {string} type A valid doc type name
     * @returns {HasChildQuery} returns `this` so that calls can be chained.
     */
    childType(type) {
        console.warn(
            '[HasChildQuery] Field `child_type` is deprecated. Use `type` instead.'
        );
        return this.type(type);
    }

    /**
     * Specify the minimum number of children are required to match
     * for the parent doc to be considered a match
     *
     * @example
     * const qry = esb.hasChildQuery(esb.termQuery('tag', 'something'), 'blog_tag')
     *     .minChildren(2)
     *     .maxChildren(10)
     *     .scoreMode('min');
     *
     * @param {number} limit A positive `integer` value.
     * @returns {HasChildQuery} returns `this` so that calls can be chained.
     */
    minChildren(limit) {
        this._queryOpts.min_children = limit;
        return this;
    }

    /**
     * Specify the maximum number of children are required to match
     * for the parent doc to be considered a match
     *
     * @example
     * const qry = esb.hasChildQuery(esb.termQuery('tag', 'something'), 'blog_tag')
     *     .minChildren(2)
     *     .maxChildren(10)
     *     .scoreMode('min');
     *
     * @param {number} limit A positive `integer` value.
     * @returns {HasChildQuery} returns `this` so that calls can be chained.
     */
    maxChildren(limit) {
        this._queryOpts.max_children = limit;
        return this;
    }
}

module.exports = HasChildQuery;
