'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html';

/**
 * A sibling pipeline aggregation which calculates a variety of stats across
 * all bucket of a specified metric in a sibling aggregation. The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html)
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
 *         esb.statsBucketAggregation(
 *             'stats_monthly_sales',
 *             'sales_per_month>sales'
 *         )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class StatsBucketAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'stats_bucket', ES_REF_URL, bucketsPath);
    }
}

module.exports = StatsBucketAggregation;
