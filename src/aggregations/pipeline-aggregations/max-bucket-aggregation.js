'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A sibling pipeline aggregation which identifies the bucket(s) with
 * the maximum value of a specified metric in a sibling aggregation and
 * outputs both the value and the key(s) of the bucket(s). The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-max-bucket-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class MaxBucketAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `MaxBucketAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @returns {MaxBucketAggregation} returns `this` so that calls can be chained
     */
    constructor(name, bucketsPath) {
        super(name, 'max_bucket', bucketsPath);
        return this;
    }
}

module.exports = MaxBucketAggregation;
