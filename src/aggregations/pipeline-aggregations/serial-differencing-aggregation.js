'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * Serial differencing is a technique where values in a time series are
 * subtracted from itself at different time lags or periods.
 *
 * Serial differences are built by first specifying a histogram or date_histogram over a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class SerialDifferencingAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `SerialDifferencingAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'serial_diff', bucketsPath);
    }

    /**
     * The historical bucket to subtract from the current value.
     * Optional.
     *
     * @param {number} lag Default is 1.
     * @returns {SerialDifferencingAggregation} returns `this` so that calls can be chained
     */
    lag(lag) {
        this._aggsDef.lag = lag;
        return this;
    }
}

module.exports = SerialDifferencingAggregation;
