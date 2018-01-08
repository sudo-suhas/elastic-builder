'use strict';

const isNil = require('lodash.isnil');

const { Query } = require('../../core');

/**
 * Returns documents that have at least one non-`null` value in the original field
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)
 *
 * @example
 * const qry = esb.existsQuery('user');
 *
 * @example
 * const qry = esb.boolQuery().mustNot(esb.existsQuery('user'));
 *
 * @param {string=} field
 *
 * @extends Query
 */
class ExistsQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        super('exists');

        if (!isNil(field)) this._queryOpts.field = field;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {ExistsQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._queryOpts.field = field;
        return this;
    }
}

module.exports = ExistsQuery;
