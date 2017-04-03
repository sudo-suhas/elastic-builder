'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A sibling pipeline aggregation which identifies the bucket(s) with
 * the minimum value of a specified metric in a sibling aggregation and
 * outputs both the value and the key(s) of the bucket(s). The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-min-bucket-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class MinBucketAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `MinBucketAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'min_bucket', bucketsPath);
    }
}

module.exports = MinBucketAggregation;
