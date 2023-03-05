'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

/**
 * This is a multi-bucket aggregation similar to Histogram.
 * However, the width of each bucket is not specified.
 * Rather, a target number of buckets is provided and bucket intervals are dynamically determined based on the document distribution.
 * This is done using a simple one-pass document clustering algorithm that aims to obtain low distances between bucket centroids.
 * Unlike other multi-bucket aggregations, the intervals will not necessarily have a uniform width.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-variablewidthhistogram-aggregation.html)
 *
 * NOTE: Only available in Elasticsearch v7.9.0+
 * @example
 * const agg = esb.variableWidthHistogramAggregation('price', 'lowestPrice', 10)
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} [field] The field to aggregate on
 * @param {number} [buckets] Bucket count to generate histogram over.
 *
 * @extends BucketAggregationBase
 */
class VariableWidthHistogramAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, buckets) {
        super(name, 'variable_width_histogram', field);
        if (!isNil(buckets)) this._aggsDef.buckets = buckets;
    }

    /**
     * Sets the histogram bucket count. Buckets are generated based on this value.
     *
     * @param {number} buckets Bucket count to generate histogram over.
     * @returns {VariableWidthHistogramAggregation} returns `this` so that calls can be chained
     */
    buckets(buckets) {
        this._aggsDef.buckets = buckets;
        return this;
    }
}

module.exports = VariableWidthHistogramAggregation;
