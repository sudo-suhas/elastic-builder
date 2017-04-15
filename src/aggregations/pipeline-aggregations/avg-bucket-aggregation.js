'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A sibling pipeline aggregation which calculates the (mean) average value
 * of a specified metric in a sibling aggregation. The specified metric must
 * be numeric and the sibling aggregation must be a multi-bucket aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class AvgBucketAggregation extends PipelineAggregationBase {
    /**
     * Creates an instance of `AvgBucketAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'avg_bucket', bucketsPath);
    }
}

module.exports = AvgBucketAggregation;
