'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { invalidParam, recursiveToJSON }
} = require('../../core');

const invalidValidationMethod = invalidParam(
    '',
    'validation_method',
    "'IGNORE_MALFORMED', 'COERCE' or 'STRICT'"
);

/**
 * The `GeoQueryBase` provides support for common options used across
 * various geo query implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string=} field
 *
 * @extends Query
 */
class GeoQueryBase extends Query {
    // eslint-disable-next-line require-jsdoc
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
     * Note: The `ignore_malformed` and `coerce` parameters have been removed
     * from `geo_bounding_box`, `geo_polygon`, and `geo_distance` queries in
     * elasticsearch 6.0.
     *
     * @param {string} method One of `IGNORE_MALFORMED`, `COERCE` or `STRICT`(default)
     * @returns {GeoQueryBase} returns `this` so that calls can be chained.
     * @throws {Error} If `method` parameter is not one of `IGNORE_MALFORMED`, `COERCE` or `STRICT`
     */
    validationMethod(method) {
        if (isNil(method)) invalidValidationMethod(method);

        const methodUpper = method.toUpperCase();
        if (
            methodUpper !== 'IGNORE_MALFORMED' &&
            methodUpper !== 'COERCE' &&
            methodUpper !== 'STRICT'
        ) {
            invalidValidationMethod(method);
        }

        this._queryOpts.validation_method = methodUpper;
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
            [this.queryType]: Object.assign(
                { [this._field]: this._fieldOpts },
                this._queryOpts
            )
        });
    }
}

module.exports = GeoQueryBase;
