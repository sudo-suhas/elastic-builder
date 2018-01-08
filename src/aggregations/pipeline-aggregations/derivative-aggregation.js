'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html';

/**
 * A parent pipeline aggregation which calculates the derivative of a
 * specified metric in a parent histogram (or date_histogram) aggregation.
 * The specified metric must be numeric and the enclosing histogram must
 * have min_doc_count set to 0 (default for histogram aggregations).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.derivativeAggregation('sales_deriv', 'sales'))
 *     )
 *     .size(0);
 *
 * @example
 * // First and second order derivative of the monthly sales
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.derivativeAggregation('sales_deriv', 'sales'))
 *             .agg(esb.derivativeAggregation('sales_2nd_deriv', 'sales_deriv'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class DerivativeAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'derivative', ES_REF_URL, bucketsPath);
    }

    /**
     * Set the units of the derivative values. `unit` specifies what unit to use for
     * the x-axis of the derivative calculation
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.dateHistogramAggregation('sales_per_month', 'date')
     *             .interval('month')
     *             .agg(esb.sumAggregation('sales', 'price'))
     *             .agg(esb.derivativeAggregation('sales_deriv', 'sales').unit('day'))
     *     )
     *     .size(0);
     *
     * @param {string} unit `unit` specifies what unit to use for
     * the x-axis of the derivative calculation
     * @returns {DerivativeAggregation} returns `this` so that calls can be chained
     */
    unit(unit) {
        this._aggsDef.unit = unit;
        return this;
    }
}

module.exports = DerivativeAggregation;
