'use strict';

const _ = require('lodash');

const { Query } = require('../../core');

/**
 * Matches documents with fields that have terms within a certain range.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 *
 * @extends Query
 */
class RangeQuery extends Query {

    /**
     * Creates an instance of `RangeQuery`.
     *
     * @param {string=} field
     */
    constructor(field) {
        super('range');

        if (!_.isNil(field)) this._field = field;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Greater-than or equal to
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    gte(val) {
        this._queryOpts.gte = val;
        return this;
    }

    /**
     * Less-than or equal to
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    lte(val) {
        this._queryOpts.lte = val;
        return this;
    }

    /**
     * Greater-than
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    gt(val) {
        this._queryOpts.gt = val;
        return this;
    }

    /**
     * Less-than
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    lt(val) {
        this._queryOpts.lt = val;
        return this;
    }

    /**
     * Build and returns DSL representation of the term level query class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     * @override
     */
    getDSL() {
        return {
            [this.type]: {
                [this._field]: this._queryOpts
            }
        };
    }
}

module.exports = RangeQuery;
