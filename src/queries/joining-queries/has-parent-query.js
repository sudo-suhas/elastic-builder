'use strict';

const isNil = require('lodash.isnil');

const JoiningQueryBase = require('./joining-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html';

/**
 * The `has_parent` query accepts a query and a parent type. The query is
 * executed in the parent document space, which is specified by the parent
 * type. This query returns child documents which associated parents have
 * matched.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html)
 *
 * @extends JoiningQueryBase
 */
class HasParentQuery extends JoiningQueryBase {
    /**
     * Creates an instance of `HasParentQuery`
     *
     * @param {Query} qry A valid `Query` object
     * @param {string=} type The parent type
     */
    constructor(qry, type) {
        super('has_parent', ES_REF_URL, qry);

        if (!isNil(type)) this._queryOpts.parent_type = type;
    }

    /**
     * @throws {Error} `score_mode` is deprecated. Use `score` instead.
     */
    scoreMode() {
        console.log('`script_mode` is deprecated. Use `score` instead');
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('scoreMode is not supported in HasParentQuery');
    }

    /**
     * Sets the child document type to search against
     * Alias for method `parentType`
     *
     * @param {string} type A valid doc type name
     * @returns {HasParentQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        return this.parentType(type);
    }

    /**
     * Sets the child document type to search against
     *
     * @param {string} type A valid doc type name
     * @returns {HasParentQuery} returns `this` so that calls can be chained.
     */
    parentType(type) {
        this._queryOpts.parent_type = type;
        return this;
    }

    /**
     * By default, scoring is `false` which ignores the score from the parent document.
     * The score is in this case equal to the boost on the `has_parent` query (Defaults to 1).
     * If the score is set to `true`, then the score of the matching parent document is
     * aggregated into the child documents belonging to the matching parent document.
     *
     * @param {boolean} enable `true` to enable scoring, `false` to disable.
     * `false` by default.
     * @returns {HasParentQuery} returns `this` so that calls can be chained.
     */
    score(enable) {
        this._queryOpts.score = enable;
        return this;
    }
}

module.exports = HasParentQuery;
