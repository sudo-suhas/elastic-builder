'use strict';

const HistogramAggregationBase = require('./histogram-aggregation-base');

/**
 * A multi-bucket values source based aggregation that can be applied on
 * numeric values extracted from the documents. It dynamically builds fixed
 * size (a.k.a. interval) buckets over the values.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html)
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 * @param {number=} interval Interval to generate histogram over.
 *
 * @extends HistogramAggregationBase
 */
class HistogramAggregation extends HistogramAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, interval) {
        super(name, 'histogram', field, interval);
    }
}

module.exports = HistogramAggregation;
