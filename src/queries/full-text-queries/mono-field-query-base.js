'use strict';

const _ = require('lodash');

const FullTextQueryBase = require('./full-text-query-base');

/**
 * The `MonoFieldQueryBase` provides support for common options used across
 * various full text query implementations with single search field.
 *
 * @extends FullTextQueryBase
 */
class MonoFieldQueryBase extends FullTextQueryBase {

    /**
     * Creates an instance of `MonoFieldQueryBase`
     *
     * @param {string} type
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    constructor(type, field, queryString) {
        super(type, queryString);

        if (!_.isNil(field)) this._field = field;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {MonoFieldQueryBase} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Build and returns DSL representation of the Aggregation class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     * @override
     */
    getDSL() {
        // Revisit this.. Smells a little bit
        if (!_.has(this._queryOpts, 'query')) {
            throw new Error('Query is required for full text query!');
        }

        const queryOptKeys = Object.keys(this._queryOpts);
        const qryOpts = queryOptKeys.length === 1 ? this._queryOpts.query : this._queryOpts;

        const repr = {
            [this.type]: {
                [this._field]: qryOpts
            }
        };
        return repr;
    }
}

module.exports = MonoFieldQueryBase;
