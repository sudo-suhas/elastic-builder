'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { recursiveToJSON }
} = require('../../core');

/**
 * The `GeoQueryBase` provides support for common options used across
 * various geo query implementations.
 *
 * @borrows Query.boost
 * @extends Query
 */
class GeoQueryBase extends Query {

    /**
     * Creates an instance of `GeoQueryBase`
     *
     * @param {string} queryType
     * @param {string} field
     */
    constructor(queryType, field) {
        super(queryType);

        this._field = null;
        this._fieldOpts = {};

        if (!isNil(field)) this._field = field;
    }

    /**
     * Sets the field to run the geo query on.
     *
     * @param {string} field
     * @returns {GeoQueryBase} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Sets the `validation_method` parameter. Can be set to `IGNORE_MALFORMED` to accept
     * geo points with invalid latitude or longitude, `COERCE` to try and infer correct latitude
     * or longitude, or `STRICT` (default is `STRICT`).
     *
     * @param {string} method One of `IGNORE_MALFORMED`, `COERCE` or `STRICT`(default)
     * @returns {GeoQueryBase} returns `this` so that calls can be chained.
     * @throws {Error} If `method` parameter is not one of `IGNORE_MALFORMED`, `COERCE` or `STRICT`
     */
    validationMethod(method) {
        const methodUpper = method.toUpperCase();

        if (methodUpper !== 'IGNORE_MALFORMED' &&
            methodUpper !== 'COERCE' &&
            methodUpper !== 'STRICT') {
            throw new Error(
                '`validation_method` must be one of `IGNORE_MALFORMED`, `COERCE` or `STRICT`'
            );
        }

        this._queryOpts.validation_method = method;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the geo query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON({
            [this.queryType]: Object.assign({
                [this._field]: this._fieldOpts
            }, this._queryOpts)
        });
    }
}

module.exports = GeoQueryBase;
