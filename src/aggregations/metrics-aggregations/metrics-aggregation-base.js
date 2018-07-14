'use strict';

const isNil = require('lodash.isnil');

const {
    Aggregation,
    Script,
    util: { checkType }
} = require('../../core');

/**
 * The `MetricsAggregationBase` provides support for common options used across
 * various metrics `Aggregation` implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name a valid aggregation name
 * @param {string} aggType type of aggregation
 * @param {string=} field The field to aggregate on
 *
 * @extends Aggregation
 */
class MetricsAggregationBase extends Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, field) {
        super(name, aggType);

        if (!isNil(field)) this._aggsDef.field = field;
    }

    // TODO: Investigate whether Metrics Aggregations can have sub aggregations
    // Hide setters for `aggs` and `aggregations` if required

    // TODO: Investigate case when getters will be required

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
     */
    field(field) {
        this._aggsDef.field = field;
        return this;
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @example
     * // Compute the average grade based on a script
     * const agg = esb.avgAggregation('avg_grade').script(
     *     esb.script('inline', "doc['grade'].value").lang('painless')
     * );
     *
     * @example
     * // Value script, apply grade correction
     * const agg = esb.avgAggregation('avg_grade', 'grade').script(
     *     esb.script('inline', '_value * params.correction')
     *         .lang('painless')
     *         .params({ correction: 1.2 })
     * );
     *
     * @param {Script} script
     * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        checkType(script, Script);

        this._aggsDef.script = script;
        return this;
    }

    /**
     * Sets the missing parameter ehich defines how documents
     * that are missing a value should be treated.
     *
     * @example
     * const agg = esb.avgAggregation('avg_grade', 'grade').missing(10);
     *
     * @param {string} value
     * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }

    /**
     * Sets the format expression if applicable.
     *
     * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
     * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }
}

module.exports = MetricsAggregationBase;
