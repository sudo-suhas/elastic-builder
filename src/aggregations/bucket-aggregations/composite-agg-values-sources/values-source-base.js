'use strict';

const isEmpty = require('lodash.isempty');
const isNil = require('lodash.isnil');

const {
    util: { invalidParam, recursiveToJSON }
} = require('../../../core');

const invalidOrderParam = invalidParam('', 'order', "'asc' or 'desc'");

/**
 * Base class implementation for all Composite Aggregation values sources.
 *
 * **NOTE:** Instantiating this directly should not be required.
 *
 * @param {string} valueSrcType Type of value source
 * @param {string} refUrl Elasticsearch reference URL
 * @param {string} name
 * @param {string=} field The field to aggregate on
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `valueSrcType` is empty
 */
class ValuesSourceBase {
    // eslint-disable-next-line require-jsdoc
    constructor(valueSrcType, refUrl, name, field) {
        if (isEmpty(valueSrcType))
            throw new Error('ValuesSourceBase `valueSrcType` cannot be empty');

        this._name = name;
        this._valueSrcType = valueSrcType;
        this._refUrl = refUrl;

        this._body = {};
        this._opts = this._body[valueSrcType] = {};

        if (!isNil(field)) this._opts.field = field;
    }

    /**
     * Field to use for this source.
     *
     * @param {string} field a valid field name
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     */
    field(field) {
        this._opts.field = field;
        return this;
    }

    /**
     * Script to use for this source.
     *
     * @param {Script|Object|string} script
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        this._opts.script = script;
        return this;
    }

    /**
     * Specifies the type of values produced by this source, e.g. `string` or
     * `date`.
     *
     * @param {string} valueType
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     */
    valueType(valueType) {
        this._opts.value_type = valueType;
        return this;
    }

    /**
     * Order specifies the order in the values produced by this source. It can
     * be either `asc` or `desc`.
     *
     * @param {string} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained.
     */
    order(order) {
        if (isNil(order)) invalidOrderParam(order, this._refUrl);

        const orderLower = order.toLowerCase();
        if (orderLower !== 'asc' && orderLower !== 'desc') {
            invalidOrderParam(order, this._refUrl);
        }

        this._opts.order = orderLower;
        return this;
    }

    /**
     * Missing specifies the value to use when the source finds a missing value
     * in a document.
     *
     * Note: This option was deprecated in
     * [Elasticsearch v6](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/breaking-changes-6.0.html#_literal_missing_literal_is_deprecated_in_the_literal_composite_literal_aggregation).
     * From 6.4 and later, use `missing_bucket` instead.
     *
     * @param {string|number} value
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     */
    missing(value) {
        this._opts.missing = value;
        return this;
    }

    /**
     * Specifies whether to include documents without a value for a given source
     * in the response. Defaults to `false` (not included).
     *
     * Note: This method is incompatible with elasticsearch 6.3 and older.
     * Use it only with elasticsearch 6.4 and later.
     *
     * @param {boolean} value
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     */
    missingBucket(value) {
        this._opts.missing_bucket = value;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the Composite
     * Aggregation values source.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return { [this._name]: recursiveToJSON(this._body) };
    }
}

module.exports = ValuesSourceBase;
