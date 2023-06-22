'use strict';

const has = require('lodash.has');
const isNil = require('lodash.isnil');

const { Query } = require('../../core');

/**
 * The `ValueTermQueryBase` provides support for common options used across
 * various term level query implementations.
 *
 * @param {string} queryType
 * @param {string=} field The document field to query against
 * @param {string=} value The query string
 *
 * @extends Query
 */
class ValueTermQueryBase extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType, field, value) {
        super(queryType);

        if (!isNil(field)) this._field = field;
        if (!isNil(value)) this._queryOpts.value = value;
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
     * @param {string|number|boolean} queryVal
     * @returns {ValueTermQueryBase} returns `this` so that calls can be chained.
     */
    value(queryVal) {
        this._queryOpts.value = queryVal;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the term level query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be required here.

        // Revisit this.. Smells a little bit
        if (!has(this._queryOpts, 'value')) {
            throw new Error('Value is required for term level query!');
        }

        const qryOpts =
            Object.keys(this._queryOpts).length === 1
                ? this._queryOpts.value
                : this._queryOpts;
        return {
            [this.queryType]: {
                [this._field]: qryOpts
            }
        };
    }

    /**
     * Allows ASCII case insensitive matching of the value with the indexed
     * field values when set to true.
     *
     * NOTE: Only available in Elasticsearch v7.10.0+
     *
     * @param {boolean} value
     * @returns {ValueTermQueryBase} returns `this` so that calls can be chained.
     */
    caseInsensitive(value = true) {
        this._queryOpts.case_insensitive = value;
        return this;
    }
}

module.exports = ValueTermQueryBase;
