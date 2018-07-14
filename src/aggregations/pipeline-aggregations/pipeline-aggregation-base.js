'use strict';

const isNil = require('lodash.isnil');

const {
    Aggregation,
    util: { invalidParam }
} = require('../../core');

const invalidGapPolicyParam = invalidParam(
    '',
    'gap_policy',
    "'skip' or 'insert_zeros'"
);

/**
 * The `PipelineAggregationBase` provides support for common options used across
 * various pipeline `Aggregation` implementations.
 *
 * Pipeline aggregations cannot have sub-aggregations but depending on the type
 * it can reference another pipeline in the buckets_path allowing pipeline
 * aggregations to be chained. For example, you can chain together two derivatives
 * to calculate the second derivative (i.e. a derivative of a derivative).
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name a valid aggregation name
 * @param {string} aggType type of aggregation
 * @param {string} refUrl Elasticsearch reference URL
 * @param {string|Object=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends Aggregation
 */
class PipelineAggregationBase extends Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, refUrl, bucketsPath) {
        super(name, aggType);

        this._refUrl = refUrl;

        if (!isNil(bucketsPath)) this._aggsDef.buckets_path = bucketsPath;
    }

    /**
     * Sets the relative path, `buckets_path`, which refers to the metric to aggregate over.
     * Required.
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#buckets-path-syntax)
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.dateHistogramAggregation('histo', 'date')
     *             .interval('day')
     *             .agg(esb.termsAggregation('categories', 'category'))
     *             .agg(
     *                 esb.bucketSelectorAggregation('min_bucket_selector')
     *                     .bucketsPath({ count: 'categories._bucket_count' })
     *                     .script(esb.script('inline', 'params.count != 0'))
     *             )
     *     )
     *     .size(0);
     *
     * @param {string|Object} path
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */
    bucketsPath(path) {
        this._aggsDef.buckets_path = path;
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
        if (isNil(policy)) invalidGapPolicyParam(policy, this._refUrl);

        const policyLower = policy.toLowerCase();
        if (policyLower !== 'skip' && policyLower !== 'insert_zeros') {
            invalidGapPolicyParam(policy, this._refUrl);
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
