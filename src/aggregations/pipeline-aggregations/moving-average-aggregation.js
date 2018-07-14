'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam },
    consts: { MODEL_SET }
} = require('../../core');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html';

const invalidModelParam = invalidParam(ES_REF_URL, 'model', MODEL_SET);

/**
 * Given an ordered series of data, the Moving Average aggregation will
 * slide a window across the data and emit the average value of that window.
 *
 * `moving_avg` aggregations must be embedded inside of a histogram or
 * date_histogram aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html)
 *
 * @example
 * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
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
 *             .agg(esb.movingAverageAggregation('the_movavg', 'the_sum'))
 *     )
 *     .size(0);
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             // Use the document count as it's input
 *             .agg(esb.movingAverageAggregation('the_movavg', '_count'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class MovingAverageAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'moving_avg', ES_REF_URL, bucketsPath);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on MovingAverageAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in MovingAverageAggregation');
    }

    /**
     * Sets the moving average weighting model that we wish to use. Optional.
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('simple')
     *     .window(30);
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('ewma')
     *     .window(30)
     *     .settings({ alpha: 0.8 });
     *
     * @param {string} model Can be `simple`, `linear`,
     * `ewma` (aka "single-exponential"), `holt` (aka "double exponential")
     * or `holt_winters` (aka "triple exponential").
     * Default is `simple`
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
     */
    model(model) {
        if (isNil(model)) invalidModelParam(model);

        const modelLower = model.toLowerCase();
        if (!MODEL_SET.has(modelLower)) invalidModelParam(model);

        this._aggsDef.model = modelLower;
        return this;
    }

    /**
     * Sets the size of window to "slide" across the histogram. Optional.
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('simple')
     *     .window(30)
     *
     * @param {number} window Default is 5
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
     */
    window(window) {
        this._aggsDef.window = window;
        return this;
    }

    /**
     * If the model should be algorithmically minimized. Optional.
     * Applicable on EWMA, Holt-Linear, Holt-Winters.
     * Minimization is disabled by default for `ewma` and `holt_linear`,
     * while it is enabled by default for `holt_winters`.
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('holt_winters')
     *     .window(30)
     *     .minimize(true)
     *     .settings({ period: 7 });
     *
     * @param {boolean} enable `false` for most models
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
     */
    minimize(enable) {
        this._aggsDef.minimize = enable;
        return this;
    }

    /**
     * Model-specific settings, contents which differ depending on the model specified.
     * Optional.
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('ewma')
     *     .window(30)
     *     .settings({ alpha: 0.8 });
     *
     * @param {Object} settings
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chaineds
     */
    settings(settings) {
        this._aggsDef.settings = settings;
        return this;
    }

    /**
     * Enable "prediction" mode, which will attempt to extrapolate into the future given
     * the current smoothed, moving average
     *
     * @example
     * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
     *     .model('simple')
     *     .window(30)
     *     .predict(10);
     *
     * @param {number} predict the number of predictions you would like appended to the
     * end of the series
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
     */
    predict(predict) {
        this._aggsDef.predict = predict;
        return this;
    }
}

module.exports = MovingAverageAggregation;
