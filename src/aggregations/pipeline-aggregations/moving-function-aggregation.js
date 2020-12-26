'use strict';

const isNil = require('lodash.isnil');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html';

/**
 * Given an ordered series of data, the Moving Function aggregation
 * will slide a window across the data and allow the user to specify
 * a custom script that is executed on each window of data.
 * For convenience, a number of common functions are predefined such as min/max, moving averages, etc.
 *
 * `moving_fn` aggregations must be embedded inside of a histogram or
 * date_histogram aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html)
 *
 * NOTE: Only available in Elasticsearch 6.4.0+.
 *
 * @example
 * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum')
 *     .model('holt')
 *     .window(5)
 *     .gapPolicy('insert_zeros')
 *     .settings({ alpha: 0.8 });
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             .agg(esb.sumAggregation('the_sum', 'lemmings'))
 *             // Relative path to sibling metric `the_sum`
 *             .agg(esb.movingFunctionAggregation('the_movfn', 'the_sum'))
 *     )
 *     .size(0);
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             // Use the document count as it's input
 *             .agg(esb.movingFunctionAggregation('the_movfn', '_count'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over.
 * @param {string=} window The size of window to "slide" across the histogram.
 * @param {string=} script The script that should be executed on each window of data.
 *
 * @extends PipelineAggregationBase
 */
class MovingFunctionAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath, window, script) {
        super(name, 'moving_fn', ES_REF_URL, bucketsPath);

        if (!isNil(window)) this._aggsDef.window = window;
        if (!isNil(script)) this._aggsDef.script = script;
    }

    /**
     * Sets the size of window to "slide" across the histogram. Optional.
     *
     * @example
     * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum')
     *     .window(30)
     *
     * @param {number} window Default is 5
     * @returns {MovingFunctionAggregation} returns `this` so that calls can be chained
     */
    window(window) {
        this._aggsDef.window = window;
        return this;
    }

    /**
     * Sets shift of window position. Optional.
     *
     * @example
     * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum')
     *     .shift(30)
     *
     * @param {number} shift Default is 0
     * @returns {MovingFunctionAggregation} returns `this` so that calls can be chained
     */
    shift(shift) {
        this._aggsDef.shift = shift;
        return this;
    }

    /**
     * Sets the script that should be executed on each window of data. Required.
     *
     * @example
     * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum', "MovingFunctions.unweightedAvg(values)"")
     *     .script("MovingFunctions.unweightedAvg(values)")
     *
     * @param {string} script
     * @returns {MovingFunctionAggregation} returns `this` so that calls can be chained
     */
    script(script) {
        this._aggsDef.script = script;
        return this;
    }
}

module.exports = MovingFunctionAggregation;
