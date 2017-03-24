'use strict';

const {
    Aggregation,
    util: { checkType }
} = require('../../core');

const Script = require('../../script-types/script');

/**
 * The MetricsAggregationMixin provides support for common options used across
 * various metrics `Aggregation` implementations.
 *
 * @extends Aggregation
 */
class MetricsAggregation extends Aggregation {

    /**
     * Creates an instance of MetricsAggregation
     *
     * @param {string} name a valid aggregation name
     * @param {string} type type of aggregation
     * @param {string} field The field to aggregate on
     * @returns {Aggregation} returns `this` so that calls can be chained
     */
    constructor(name, type, field) {
        super(name);

        this._aggsDef = this._aggs[type] = {};

        field && this.field(field);

        return this;
    }

    // TODO: Investigate whether Metrics Aggregations can have sub aggregations
    // Hide setters for `aggs` and `aggregations` if required

    // TODO: Investigate case when getters will be required

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {Aggregation} returns `this` so that calls can be chained
     */
    field(field) {
        this._aggsDef.field = field;
        return this;
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @param {Script} script
     * @returns {Aggregation} returns `this` so that calls can be chained
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
     * @param {string} value
     * @returns {Aggregation} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }
}

module.exports = MetricsAggregation;
