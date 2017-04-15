'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A parent pipeline aggregation which calculates the derivative of a
 * specified metric in a parent histogram (or date_histogram) aggregation.
 * The specified metric must be numeric and the enclosing histogram must
 * have min_doc_count set to 0 (default for histogram aggregations).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class DerivativeAggregation extends PipelineAggregationBase {
    /**
     * Creates an instance of `DerivativeAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'derivative', bucketsPath);
    }

    /**
     * Set the units of the derivative values. `unit` specifies what unit to use for
     * the x-axis of the derivative calculation
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
