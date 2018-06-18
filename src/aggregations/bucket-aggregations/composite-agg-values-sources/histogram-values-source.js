'use strict';

const isNil = require('lodash.isnil');

const ValuesSourceBase = require('./values-source-base');

const REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_histogram';

/**
 * `HistogramValuesSource` is a source for the `CompositeAggregation` that handles
 * histograms. It works very similar to a histogram aggregation with a slightly
 * different syntax.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_histogram)
 *
 * @example
 * const valueSrc = esb.CompositeAggregation.histogramValuesSource(
 *   'histo', // name
 *   'price', // field
 *   5 // interval
 * );
 *
 * @param {string} name
 * @param {string=} field The field to aggregate on
 * @param {number=} interval Interval to generate histogram over.
 *
 * @extends ValuesSourceBase
 */
class HistogramValuesSource extends ValuesSourceBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, interval) {
        super('histogram', REF_URL, name, field);

        if (!isNil(interval)) this._opts.interval = interval;
    }

    /**
     * Sets the histogram interval. Buckets are generated based on this interval value.
     *
     * @param {number} interval Interval to generate histogram over.
     * @returns {HistogramValuesSource} returns `this` so that calls can be chained
     */
    interval(interval) {
        this._opts.interval = interval;
        return this;
    }
}

module.exports = HistogramValuesSource;
