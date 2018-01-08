'use strict';

const isNil = require('lodash.isnil');

const JoiningQueryBase = require('./joining-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html';

/**
 * Nested query allows to query nested objects. The query is executed against
 * the nested objects / docs as if they were indexed as separate docs
 * (they are, internally) and resulting in the root parent doc (or parent nested mapping).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html)
 *
 * @example
 * const qry = esb.nestedQuery()
 *     .path('obj1')
 *     .scoreMode('avg')
 *     .query(
 *         esb.boolQuery().must([
 *             esb.matchQuery('obj1.name', 'blue'),
 *             esb.rangeQuery('obj1.count').gt(5)
 *         ])
 *     );
 *
 * @param {Query=} qry A valid `Query` object
 * @param {string=} path The nested object path.
 *
 * @extends JoiningQueryBase
 */
class NestedQuery extends JoiningQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(qry, path) {
        super('nested', ES_REF_URL, qry);

        if (!isNil(path)) this._queryOpts.path = path;
    }

    /**
     * Sets the root context for the nested query.
     *
     * @param {string} path
     * @returns {NestedQuery} returns `this` so that calls can be chained.
     */
    path(path) {
        this._queryOpts.path = path;
        return this;
    }
}

module.exports = NestedQuery;
