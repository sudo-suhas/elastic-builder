'use strict';

const {
    util: { checkType }
} = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Base class for span queries with `little`, `big` clauses.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends SpanQueryBase
 */
class SpanLittleBigQueryBase extends SpanQueryBase {
    /**
     * Sets the `little` clause.
     *
     * @param {SpanQueryBase} spanQry Any span type query
     * @returns {SpanLittleBigQueryBase} returns `this` so that calls can be chained.
     */
    little(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.little = spanQry;
        return this;
    }

    /**
     * Sets the `big` clause.
     *
     * @param {SpanQueryBase} spanQry Any span type query
     * @returns {SpanLittleBigQueryBase} returns `this` so that calls can be chained.
     */
    big(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.big = spanQry;
        return this;
    }
}

module.exports = SpanLittleBigQueryBase;
