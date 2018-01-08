'use strict';

const isNil = require('lodash.isnil');

const { Query } = require('../../core');

/**
 * The `parent_id` query can be used to find child documents which belong to a particular parent.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-parent-id-query.html)
 *
 * @example
 * const qry = esb.parentIdQuery('blog_tag', 1);
 *
 * @param {string=} type The **child** type. This must be a type with `_parent` field.
 * @param {string|number=} id The required parent id select documents must refer to.
 *
 * @extends Query
 */
class ParentIdQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(type, id) {
        super('parent_id');

        if (!isNil(type)) this._queryOpts.type = type;
        if (!isNil(id)) this._queryOpts.id = id;
    }

    /**
     * Sets the child type.
     *
     * @param {string} type The **child** type. This must be a type with `_parent` field.
     * @returns {ParentIdQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        this._queryOpts.type = type;
        return this;
    }

    /**
     * Sets the id.
     *
     * @param {string|number} id The required parent id select documents must refer to.
     * @returns {ParentIdQuery} returns `this` so that calls can be chained.
     */
    id(id) {
        this._queryOpts.id = id;
        return this;
    }

    /**
     * When set to `true` will ignore an unmapped `path` and will not match any
     * documents for this query. When set to `false` (the default value) the query
     * will throw an exception if the path is not mapped.
     *
     * @param {boolean} enable `true` or `false`, `false` by default.
     * @returns {ParentIdQuery} returns `this` so that calls can be chained.
     */
    ignoreUnmapped(enable) {
        this._queryOpts.ignore_unmapped = enable;
        return this;
    }
}

module.exports = ParentIdQuery;
