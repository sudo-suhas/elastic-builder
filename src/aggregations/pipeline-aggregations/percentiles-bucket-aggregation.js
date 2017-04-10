'use strict';

const { util: { checkType } } = require('../../core');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A sibling pipeline aggregation which calculates percentiles across all
 * bucket of a specified metric in a sibling aggregation. The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class PercentilesBucketAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `PercentilesBucketAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'percentiles_bucket', bucketsPath);
    }

    /**
     * Sets the list of percentiles to calculate
     *
     * @param {Array} percents The list of percentiles to calculate
     * @returns {PercentilesBucketAggregation} returns `this` so that calls can be chained
     */
    percents(percents) {
        checkType(percents, Array);

        this._aggsDef.percents = percents;
        return this;
    }
}

module.exports = PercentilesBucketAggregation;
