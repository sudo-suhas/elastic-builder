'use strict';

const isNil = require('lodash.isnil');

const { Query } = require('../../core');

/**
 * Filters documents matching the provided document / mapping type.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html)
 *
 * @example
 * const qry = esb.typeQuery('my_type');
 *
 * @param {string=} type The elasticsearch doc type
 *
 * @extends Query
 */
class TypeQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(type) {
        super('type');

        if (!isNil(type)) this._queryOpts.value = type;
    }

    /**
     * Sets the elasticsearch doc type to query on.
     *
     * @param {string} type The elasticsearch doc type
     * @returns {TypeQuery} returns `this` so that calls can be chained.
     */
    value(type) {
        this._queryOpts.value = type;
        return this;
    }

    /**
     * Sets the elasticsearch doc type to query on.
     * Alias for method `value`.
     *
     * @param {string} type The elasticsearch doc type
     * @returns {TypeQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        return this.value(type);
    }
}

module.exports = TypeQuery;
