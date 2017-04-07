'use strict';

const _ = require('lodash');

const JoiningQueryBase = require('./joining-query-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html';

/**
 * Nested query allows to query nested objects. The query is executed against
 * the nested objects / docs as if they were indexed as separate docs
 * (they are, internally) and resulting in the root parent doc (or parent nested mapping).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html)
 *
 * @extends JoiningQueryBase
 */
class NestedQuery extends JoiningQueryBase {

    /**
     * Creates an instance of `NestedQuery`
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} path The nested object path.
     */
    constructor(qry, path) {
        super('nested', ES_REF_URL, qry);

        if (!_.isNil(path)) this._queryOpts.path = path;
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
