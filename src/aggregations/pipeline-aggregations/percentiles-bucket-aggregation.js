'use strict';

const {
    util: { checkType }
} = require('../../core');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html';

/**
 * A sibling pipeline aggregation which calculates percentiles across all
 * bucket of a specified metric in a sibling aggregation. The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *     )
 *     .agg(
 *         // Calculates stats for monthly sales
 *         esb.percentilesBucketAggregation(
 *             'percentiles_monthly_sales',
 *             'sales_per_month>sales'
 *         ).percents([25.0, 50.0, 75.0])
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class PercentilesBucketAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'percentiles_bucket', ES_REF_URL, bucketsPath);
    }

    /**
     * Sets the list of percentiles to calculate
     *
     * @param {Array<number>} percents The list of percentiles to calculate
     * @returns {PercentilesBucketAggregation} returns `this` so that calls can be chained
     */
    percents(percents) {
        checkType(percents, Array);

        this._aggsDef.percents = percents;
        return this;
    }
}

module.exports = PercentilesBucketAggregation;
