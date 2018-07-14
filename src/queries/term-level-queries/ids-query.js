'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * Filters documents that only have the provided ids.
 * Note, this query uses the _uid field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html)
 *
 * @example
 * const qry = esb.idsQuery('my_type', ['1', '4', '100']);
 *
 * @param {Array|string=} type The elasticsearch doc type
 * @param {Array=} ids List of ids to fiter on.
 *
 * @extends Query
 */
class IdsQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(type, ids) {
        super('ids');

        if (!isNil(type)) this._queryOpts.type = type;
        if (!isNil(ids)) this.values(ids);
    }

    /**
     * Sets the elasticsearch doc type to query on.
     * The type is optional and can be omitted, and can also accept an array of values.
     * If no type is specified, all types defined in the index mapping are tried.
     *
     * @param {Array<string>|string} type The elasticsearch doc type
     * @returns {IdsQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        this._queryOpts.type = type;
        return this;
    }

    /**
     * Sets the list of ids to fiter on.
     *
     * @param {Array<string|number>} ids
     * @returns {IdsQuery} returns `this` so that calls can be chained.
     */
    values(ids) {
        checkType(ids, Array);

        this._queryOpts.values = ids;
        return this;
    }

    /**
     * Sets the list of ids to fiter on.
     * Alias for `values` method.
     *
     * @param {Array<string|number>} ids
     * @returns {IdsQuery} returns `this` so that calls can be chained.
     */
    ids(ids) {
        return this.values(ids);
    }
}

module.exports = IdsQuery;
