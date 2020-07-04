'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

/**
 * A multi-bucket aggregation similar to the Date histogram aggregation except instead of
 * providing an interval to use as the width of each bucket, a target number of buckets
 * is provided indicating the number of buckets needed and the interval of the buckets
 * is automatically chosen to best achieve that target. The number of buckets returned
 * will always be less than or equal to this target number.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-autodatehistogram-aggregation.html)
 *
 * @example
 * const agg = esb.autoDateHistogramAggregation('sales_over_time', 'date', 15);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} field The field to aggregate on
 * @param {number} buckets Bucket count to generate histogram over.
 *
 * @extends BucketAggregationBase
 */
class AutoDateHistogramAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, buckets) {
        super(name, 'auto_date_histogram', field);
        if (!isNil(buckets)) this._aggsDef.buckets = buckets;
    }

    /**
     * Sets the histogram bucket count. Buckets are generated based on this value.
     *
     * @param {number} buckets Bucket count to generate histogram over.
     * @returns {AutoDateHistogramAggregation} returns `this` so that calls can be chained
     */
    buckets(buckets) {
        this._aggsDef.buckets = buckets;
        return this;
    }

    /**
     * The minimum_interval allows the caller to specify the minimum rounding interval that
     * should be used. This can make the collection process more efficient, as the
     * aggregation will not attempt to round at any interval lower than minimum_interval.
     *
     * Accepted units: year, month, day, hour, minute, second
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-autodatehistogram-aggregation.html#_minimum_interval_parameter)
     *
     * @example
     * const agg = esb.autoDateHistogramAggregation(
     *     'sales_over_time',
     *     'date',
     *     5
     * ).minimumInterval('minute');
     *
     * @param {string} interval Minimum Rounding Interval Example: 'minute'
     * @returns {AutoDateHistogramAggregation} returns `this` so that calls can be chained
     */
    minimumInterval(interval) {
        this._aggsDef.minimum_interval = interval;
        return this;
    }

    /**
     * Sets the format expression for `key_as_string` in response buckets.
     * If no format is specified, then it will use the first format specified in the field mapping.
     *
     * @example
     * const agg = esb.autoDateHistogramAggregation(
     *     'sales_over_time',
     *     'date',
     *     5
     * ).format('yyyy-MM-dd');
     *
     * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
     * For Date Histograms, supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern)
     * @returns {AutoDateHistogramAggregation} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }

    /**
     * Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     *
     * @example
     * const agg = esb.autoDateHistogramAggregation('quantity', 'quantity', 10).missing(0);
     *
     * @param {string} value
     * @returns {AutoDateHistogramAggregation} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }

    /**
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
     * Sets the date time zone
     *
     * @example
     * const agg = esb.autoDateHistogramAggregation('by_day', 'date', 15).timeZone(
     *     '-01:00'
     * );
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {AutoDateHistogramAggregation} returns `this` so that calls can be chained
     */
    timeZone(tz) {
        this._aggsDef.time_zone = tz;
        return this;
    }
}

module.exports = AutoDateHistogramAggregation;
