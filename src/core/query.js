'use strict';

/**
 * Base class implementation for all query types.
 */
class Query {

    /**
     * Creates an instance of `Query`.
     *
     * @param {string} type
     */
    constructor(type) {
        this.type = type;

        this._body = {};
        this._queryOpts = this._body[type] = {};
    }

    /**
     * Sets the boost value for documents matching the `Query`.
     *
     * @param {number} factor
     * @returns {Query} returns `this` so that calls can be chained.
     */
    boost(factor) {
        this._queryOpts.boost = factor;
        return this;
    }

    /**
     * Sets the query name.
     *
     * @param {string} name
     * @returns {Query} returns `this` so that calls can be chained.
     */
    name(name) {
        this._queryOpts._name = name;
        return this;
    }

    /**
     * Build and returns DSL representation of the Aggregation class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    getDSL() {
        return this._body;
    }

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object}
     */
    toJSON() {
        return this.getDSL();
    }
}

module.exports = Query;
