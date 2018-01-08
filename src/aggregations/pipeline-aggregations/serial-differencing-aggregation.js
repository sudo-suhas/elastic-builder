'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html';

/**
 * Serial differencing is a technique where values in a time series are
 * subtracted from itself at different time lags or periods.
 *
 * Serial differences are built by first specifying a `histogram` or `date_histogram` over a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             .agg(esb.sumAggregation('the_sum', 'lemmings'))
 *             .agg(
 *                 esb.serialDifferencingAggregation(
 *                     'thirtieth_difference',
 *                     'the_sum'
 *                 ).lag(30)
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class SerialDifferencingAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'serial_diff', ES_REF_URL, bucketsPath);
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
