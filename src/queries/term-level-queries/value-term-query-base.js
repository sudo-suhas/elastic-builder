'use strict';

const _ = require('lodash');

const { Query } = require('../../core');

/**
 * The `ValueTermQueryBase` provides support for common options used across
 * various term level query implementations.
 *
 * @extends Query
 */
class ValueTermQueryBase extends Query {

    /**
     * Creates an instance of `MonoFieldQueryBase`
     *
     * @param {string} type
     * @param {string=} field The document field to query against
     * @param {string=} value The query string
     */
    constructor(type, field, value) {
        super(type);

        if (!_.isNil(field)) this._field = field;
        if (!_.isNil(value)) this._queryOpts.value = value;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {ValueTermQueryBase} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Sets the query string.
     *
     * @param {string|number} queryVal
     * @returns {ValueTermQueryBase} returns `this` so that calls can be chained.
     */
    value(queryVal) {
        this._queryOpts.value = queryVal;
        return this;
    }

    /**
     * Build and returns DSL representation of the term level query class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     * @override
     */
    getDSL() {
        // Revisit this.. Smells a little bit
        if (!_.has(this._queryOpts, 'value')) {
            throw new Error('Value is required for term level query!');
        }

        const qryOpts = Object.keys(this._queryOpts).length === 1 ?
            this._queryOpts.value : this._queryOpts;
        return {
            [this.type]: {
                [this._field]: qryOpts
            }
        };
    }
}

module.exports = ValueTermQueryBase;
