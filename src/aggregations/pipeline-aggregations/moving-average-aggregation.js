'use strict';

const { inspect } = require('util');

const { consts: { MODEL_SET } } = require('../../core');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html';

/**
 * Given an ordered series of data, the Moving Average aggregation will
 * slide a window across the data and emit the average value of that window.
 *
 * `moving_avg` aggregations must be embedded inside of a histogram or
 * date_histogram aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class MovingAverageAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `MovingAverageAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'moving_avg', bucketsPath);
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
     * @param {string} model Can be `simple`, `linear`,
     * `ewma` (aka "single-exponential"), `holt` (aka "double exponential")
     * or `holt_winters` (aka "triple exponential").
     * Default is `simple`
     * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
     */
    model(model) {
        const modelLower = model.toLowerCase();
        if (!MODEL_SET.has(modelLower)) {
            console.log(`See ${ES_REF_URL}`);
            console.warn(`Got 'model' - ${model}`);
            throw new Error(
                `The 'model' parameter should belong to ${inspect(MODEL_SET)}`
            );
        }

        this._aggsDef.model = modelLower;
        return this;
    }

    /**
     * Sets the size of window to "slide" across the histogram. Optional.
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
