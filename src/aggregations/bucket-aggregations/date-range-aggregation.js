'use strict';

const RangeAggregationBase = require('./range-aggregation-base');

/**
 * A range aggregation that is dedicated for date values. The main difference
 * between this aggregation and the normal range aggregation is that the from
 * and to values can be expressed in Date Math expressions, and it is also
 * possible to specify a date format by which the from and to response fields
 * will be returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html)
 *
 * @example
 * const agg = esb.dateRangeAggregation('range', 'date')
 *     .format('MM-yyy')
 *     .ranges([{ to: 'now-10M/M' }, { from: 'now-10M/M' }]);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */
class DateRangeAggregation extends RangeAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'date_range', field);
    }

    /**
     * Sets the date time zone.
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that
     * bucketing should use a different time zone.
     *
     * @example
     * const agg = esb.dateRangeAggregation('range', 'date')
     *     .timeZone('CET')
     *     .ranges([
     *         { to: '2016/02/01' },
     *         { from: '2016/02/01', to: 'now/d' },
     *         { from: 'now/d' }
     *     ]);
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateRangeAggregation} returns `this` so that calls can be chained
     */
    timeZone(tz) {
        this._aggsDef.time_zone = tz;
        return this;
    }
}

module.exports = DateRangeAggregation;
