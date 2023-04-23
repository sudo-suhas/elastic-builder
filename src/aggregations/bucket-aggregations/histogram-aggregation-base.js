'use strict';

const has = require('lodash.has');
const isNil = require('lodash.isnil');

const {
    util: { invalidParam }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const invalidDirectionParam = invalidParam('', 'direction', "'asc' or 'desc'");

/**
 * The `HistogramAggregationBase` provides support for common options used across
 * various histogram `Aggregation` implementations like Histogram Aggregation,
 * Date Histogram aggregation.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} aggType Type of aggregation
 * @param {string=} field The field to aggregate on
 * @param {string|number=} interval Interval to generate histogram over.
 *
 * @extends BucketAggregationBase
 */
class HistogramAggregationBase extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, field, interval) {
        super(name, aggType, field);

        if (!isNil(interval)) this._aggsDef.interval = interval;
    }

    /**
     * Sets the histogram interval. Buckets are generated based on this interval value.
     *
     * @param {string} interval Interval to generate histogram over.
     * For date histograms, available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    interval(interval) {
        this._aggsDef.interval = interval;
        return this;
    }

    /**
     * Sets the format expression for `key_as_string` in response buckets.
     * If no format is specified, then it will use the first format specified in the field mapping.
     *
     * @example
     * const agg = esb.dateHistogramAggregation(
     *     'sales_over_time',
     *     'date',
     *     '1M'
     * ).format('yyyy-MM-dd');
     *
     * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
     * For Date Histograms, supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern)
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }

    /**
     * The offset parameter is used to change the start value of each bucket
     * by the specified positive (+) or negative offset (-).
     * Negative offset is not applicable on HistogramAggregation.
     * In case of DateHistogramAggregation, duration can be
     * a value such as 1h for an hour, or 1d for a day.
     *
     * @example
     * const agg = esb.dateHistogramAggregation('by_day', 'date', 'day').offset('6h');
     *
     * @param {string} offset Time or bucket key offset for bucketing.
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    offset(offset) {
        this._aggsDef.offset = offset;
        return this;
    }

    /**
     * Sets the ordering for buckets
     *
     * @example
     * const agg = esb.histogramAggregation('prices', 'price', 50)
     *     .order('_count', 'desc');
     *
     * @example
     * const agg = esb.histogramAggregation('prices', 'price', 50)
     *     .order('promoted_products>rating_stats.avg', 'desc')
     *     .agg(
     *         esb.filterAggregation('promoted_products')
     *             .filter(esb.termQuery('promoted', 'true'))
     *             .agg(esb.statsAggregation('rating_stats', 'rating'))
     *     );
     *
     * @param {string} key
     * @param {string} direction `asc` or `desc`
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    order(key, direction = 'desc') {
        if (isNil(direction)) invalidDirectionParam(direction);

        const directionLower = direction.toLowerCase();
        if (directionLower !== 'asc' && directionLower !== 'desc') {
            invalidDirectionParam(direction);
        }

        if (has(this._aggsDef, 'order')) {
            if (!Array.isArray(this._aggsDef.order)) {
                this._aggsDef.order = [this._aggsDef.order];
            }

            this._aggsDef.order.push({ [key]: directionLower });
        } else {
            this._aggsDef.order = { [key]: directionLower };
        }

        return this;
    }

    /**
     * Sets the minimum number of matching documents in range to return the bucket.
     *
     * @example
     * const agg = esb.histogramAggregation('prices', 'price', 50).minDocCount(1);
     *
     * @param {number} minDocCnt Integer value for minimum number of documents
     * required to return bucket in response
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    minDocCount(minDocCnt) {
        this._aggsDef.min_doc_count = minDocCnt;
        return this;
    }

    /**
     * Set's the range/bounds for the histogram aggregation.
     * Useful when you want to include buckets that might be
     * outside the bounds of indexed documents.
     *
     * @example
     * const agg = esb.histogramAggregation('prices', 'price', 50).extendedBounds(0, 500);
     *
     * @param {number|string} min Start bound / minimum bound value
     * For histogram aggregation, Integer value can be used.
     * For Date histogram, date expression can be used.
     * Available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @param {number|string} max End bound / maximum bound value
     * For histogram aggregation, Integer value can be used.
     * For Date histogram, date expression can be used.
     * Available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    extendedBounds(min, max) {
        this._aggsDef.extended_bounds = { min, max };
        return this;
    }

    /**
     * Set's the range/bounds for the histogram aggregation.
     * Useful when you want to limit the range of buckets in the histogram.
     * It is particularly useful in the case of open data ranges that can result in a very large number of buckets.
     * NOTE: Only available in Elasticsearch v7.10.0+
     *
     * @example
     * const agg = esb.histogramAggregation('prices', 'price', 50).hardBounds(0, 500);
     *
     * @param {number|string} min Start bound / minimum bound value
     * For histogram aggregation, Integer value can be used.
     * For Date histogram, date expression can be used.
     * Available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @param {number|string} max End bound / maximum bound value
     * For histogram aggregation, Integer value can be used.
     * For Date histogram, date expression can be used.
     * Available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    hardBounds(min, max) {
        this._aggsDef.hard_bounds = { min, max };
        return this;
    }

    /**
     * Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     *
     * @example
     * const agg = esb.histogramAggregation('quantity', 'quantity', 10).missing(0);
     *
     * @param {string} value
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }

    /**
     * Enable the response to be returned as a keyed object where the key is the
     * bucket interval.
     *
     * @example
     * const agg = esb.dateHistogramAggregation('sales_over_time', 'date', '1M')
     *     .keyed(true)
     *     .format('yyyy-MM-dd');
     *
     * @param {boolean} keyed To enable keyed response or not.
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */
    keyed(keyed) {
        this._aggsDef.keyed = keyed;
        return this;
    }
}

module.exports = HistogramAggregationBase;
