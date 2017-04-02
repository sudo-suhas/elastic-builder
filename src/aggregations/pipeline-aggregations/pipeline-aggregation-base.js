'use strict';

const { Aggregation } = require('../../core');

/**
 * The `PipelineAggregationBase` provides support for common options used across
 * various pipeline `Aggregation` implementations.
 *
 * Pipeline aggregations cannot have sub-aggregations but depending on the type
 * it can reference another pipeline in the buckets_path allowing pipeline
 * aggregations to be chained. For example, you can chain together two derivatives
 * to calculate the second derivative (i.e. a derivative of a derivative).
 *
 * @extends Aggregation
 */
class PipelineAggregationBase extends Aggregation {

    /**
     * Creates an instance of `PipelineAggregationBase`
     *
     * @param {string} name a valid aggregation name
     * @param {string} type type of aggregation
     * @param {string|Object=} bucketsPath The relative path of metric to aggregate over
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */
    constructor(name, type, bucketsPath) {
        super(name, type);

        bucketsPath && this.bucketsPath(bucketsPath);

        return this;
    }

    /**
     * Sets the relative path, `buckets_path`, which refers to the metric to aggregate over.
     * Required.
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#buckets-path-syntax)
     *
     * @param {string|Object} path
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */
    bucketsPath(path) {
        this._aggsDef = path;
        return this;
    }

    /**
     * Set policy for missing data. Optional.
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#gap-policy)
     *
     * @param {string} policy Can be `skip` or `insert_zeros`
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */
    gapPolicy(policy) {
        const policyLower = policy;
        if (policyLower !== 'skip' && policyLower !== 'insert_zeros') {
            throw new Error('`gap_policy` can only be `skip` or `insert_zeros`');
        }

        this._aggsDef.gap_policy = policyLower;
        return this;
    }

    /**
     * Sets the format expression if applicable. Optional.
     *
     * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }
}

module.exports = PipelineAggregationBase;
