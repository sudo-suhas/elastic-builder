'use strict';

const isNil = require('lodash.isnil');

const ValuesSourceBase = require('./values-source-base');

const REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_date_histogram';

/**
 * `DateHistogramValuesSource` is a source for the `CompositeAggregation` that
 * handles date histograms. It works very similar to a histogram aggregation
 * with a slightly different syntax.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_date_histogram)
 *
 * @example
 * const valueSrc = esb.CompositeAggregation.dateHistogramValuesSource(
 *   'date', // name
 *   'timestamp', // field
 *   '1d' // interval
 * );
 *
 * @param {string} name
 * @param {string=} field The field to aggregate on
 * @param {string|number=} interval Interval to generate histogram over.
 *
 * @extends ValuesSourceBase
 */
class DateHistogramValuesSource extends ValuesSourceBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, interval) {
        super('date_histogram', REF_URL, name, field);

        if (!isNil(interval)) this._opts.interval = interval;
    }

    /**
     * Sets the histogram interval. Buckets are generated based on this interval value.
     *
     * @param {string|number} interval Interval to generate histogram over.
     * @returns {DateHistogramValuesSource} returns `this` so that calls can be chained
     */
    interval(interval) {
        this._opts.interval = interval;
        return this;
    }

    /**
     * Calendar-aware intervals are configured with the calendarInterval parameter.
     * The combined interval field for date histograms is deprecated from ES 7.2.
     *
     * @example
     * const agg = esb.dateHistogramValuesSource('by_month', 'date').calendarInterval(
     *     'month'
     * );
     *
     * @param {string} interval Interval to generate histogram over.
     * You can specify calendar intervals using the unit name, such as month, or as
     * a single unit quantity, such as 1M. For example, day and 1d are equivalent.
     * Multiple quantities, such as 2d, are not supported.
     * @returns {DateHistogramValuesSource} returns `this` so that calls can be chained
     */
    calendarInterval(interval) {
        this._opts.calendar_interval = interval;
        return this;
    }

    /**
     * Fixed intervals are configured with the fixedInterval parameter.
     * The combined interval field for date histograms is deprecated from ES 7.2.
     *
     * @example
     * const agg = esb.dateHistogramValuesSource('by_minute', 'date').calendarInterval(
     *     '60s'
     * );
     *
     * @param {string} interval Interval to generate histogram over.
     * Intervals are a fixed number of SI units and never deviate, regardless
     * of where they fall on the calendar. However, it means fixed intervals
     * cannot express other units such as months, since the duration of a
     * month is not a fixed quantity.
     * The accepted units for fixed intervals are:
     * millseconds (ms), seconds (s), minutes (m), hours (h) and days (d).
     * @returns {DateHistogramValuesSource} returns `this` so that calls can be chained
     */
    fixedInterval(interval) {
        this._opts.fixed_interval = interval;
        return this;
    }

    /**
     * Sets the date time zone
     *
     * Date-times are stored in Elasticsearch in UTC. By default, all bucketing
     * and rounding is also done in UTC. The `time_zone` parameter can be used
     * to indicate that bucketing should use a different time zone.
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateHistogramValuesSource} returns `this` so that calls can be chained
     */
    timeZone(tz) {
        this._opts.time_zone = tz;
        return this;
    }

    /**
     * Sets the format expression for `key_as_string` in response buckets.
     * If no format is specified, then it will use the first format specified
     * in the field mapping.
     *
     * @example
     * const valueSrc = esb.CompositeAggregation.valuesSource
     *   .dateHistogram('date', 'timestamp', '1d')
     *   .format('yyyy-MM-dd');
     *
     * @param {string} fmt Format mask to apply on aggregation response.
     * For Date Histograms, supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern)
     * @returns {DateHistogramValuesSource} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._opts.format = fmt;
        return this;
    }
}

module.exports = DateHistogramValuesSource;
