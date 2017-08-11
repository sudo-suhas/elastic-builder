'use strict';

const has = require('lodash.has');
const isNil = require('lodash.isnil');

const FullTextQueryBase = require('./full-text-query-base');

/**
 * The `MonoFieldQueryBase` provides support for common options used across
 * various full text query implementations with single search field.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends FullTextQueryBase
 */
class MonoFieldQueryBase extends FullTextQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType, field, queryString) {
        super(queryType, queryString);

        if (!isNil(field)) this._field = field;
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
     * Override default `toJSON` to return DSL representation of the Full text query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be required here.

        // Revisit this.. Smells a little bit
        if (!has(this._queryOpts, 'query')) {
            throw new Error('Query string is required for full text query!');
        }

        const queryOptKeys = Object.keys(this._queryOpts);
        const qryOpts =
            queryOptKeys.length === 1 ? this._queryOpts.query : this._queryOpts;

        const repr = {
            [this.queryType]: {
                [this._field]: qryOpts
            }
        };
        return repr;
    }
}

module.exports = MonoFieldQueryBase;
