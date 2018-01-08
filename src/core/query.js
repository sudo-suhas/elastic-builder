'use strict';

const { recursiveToJSON } = require('./util');

/**
 * Base class implementation for all query types.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class should be extended and used, as validation against the class
 * type is present in various places.
 *
 * @param {string} queryType
 */
class Query {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType) {
        this.queryType = queryType;

        this._body = {};
        this._queryOpts = this._body[queryType] = {};
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
     * @example
     * const boolQry = esb.boolQuery()
     *     .should([
     *         esb.matchQuery('name.first', 'shay').name('first'),
     *         esb.matchQuery('name.last', 'banon').name('last')
     *     ])
     *     .filter(esb.termsQuery('name.last', ['banon', 'kimchy']).name('test'));
     *
     * @param {string} name
     * @returns {Query} returns `this` so that calls can be chained.
     */
    name(name) {
        this._queryOpts._name = name;
        return this;
    }

    /**
     * Build and returns DSL representation of the `Query` class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    getDSL() {
        return this.toJSON();
    }

    /**
     * Override default `toJSON` to return DSL representation for the `query`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._body);
    }
}

module.exports = Query;
