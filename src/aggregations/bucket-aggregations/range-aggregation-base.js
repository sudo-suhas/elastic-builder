'use strict';

const isEmpty = require('lodash.isempty');

const {
    util: { checkType }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * The `RangeAggregationBase` provides support for common options used across
 * various range `Aggregation` implementations like Range Aggregation and
 * Date Range aggregation.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} aggType Type of aggregation
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class RangeAggregationBase extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, field) {
        super(name, aggType, field);
        // Variable name is misleading. Only one of these needs to be present.
        this._rangeRequiredKeys = ['from', 'to'];

        this._aggsDef.ranges = [];
    }

    /**
     * Sets the format expression for `key_as_string` in response buckets.
     * If no format is specified, then it will use the format specified in the field mapping.
     *
     * @param {string} fmt Supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern) for Date Histograms
     * @returns {RangeAggregationBase} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }

    /**
     * Adds a range to the list of existing range expressions.
     *
     * @param {Object} range Range to aggregate over. Valid keys are `from`, `to` and `key`
     * @returns {RangeAggregationBase} returns `this` so that calls can be chained
     *
     * @throws {TypeError} If `range` is not an instance of object
     * @throws {Error} If none of the required keys,
     * `from`, `to` or `mask`(for IP range) is passed
     */
    range(range) {
        checkType(range, Object);
        if (!this._rangeRequiredKeys.some(hasOwnProp, range)) {
            throw new Error(
                `Invalid Range! Range must have at least one of ${this._rangeRequiredKeys}`
            );
        }

        this._aggsDef.ranges.push(range);
        return this;
    }

    /**
     * Adds the list of ranges to the list of existing range expressions.
     *
     * @param {Array<Object>} ranges Ranges to aggregate over.
     * Each item must be an object with keys `from`, `to` and `key`.
     * @returns {RangeAggregationBase} returns `this` so that calls can be chained
     *
     * @throws {TypeError} If `ranges` is not an instance of an array or
     * and item in the array is not an instance of object
     * @throws {Error} If none of the required keys,
     * `from`, `to` or `mask`(for IP range) is passed
     */
    ranges(ranges) {
        checkType(ranges, Array);

        ranges.forEach(range => this.range(range));
        return this;
    }

    /**
     * Sets the missing parameter ehich defines how documents
     * that are missing a value should be treated.
     *
     * @param {string} value
     * @returns {RangeAggregationBase} returns `this` so that calls can be chained
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
     * const agg = esb.dateRangeAggregation('range', 'date')
     *     .format('MM-yyy')
     *     .ranges([{ to: 'now-10M/M' }, { from: 'now-10M/M' }])
     *     .keyed(true);
     *
     * @example
     * const agg = esb.geoDistanceAggregation('rings_around_amsterdam', 'location')
     *     .origin(esb.geoPoint().string('52.3760, 4.894'))
     *     .ranges([
     *         { to: 100000, key: 'first_ring' },
     *         { from: 100000, to: 300000, key: 'second_ring' },
     *         { from: 300000, key: 'third_ring' }
     *     ])
     *     .keyed(true);
     *
     * @param {boolean} keyed To enable keyed response or not.
     * @returns {RangeAggregationBase} returns `this` so that calls can be chained
     */
    keyed(keyed) {
        this._aggsDef.keyed = keyed;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `aggregation` query.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        if (isEmpty(this._aggsDef.ranges)) {
            throw new Error('`ranges` cannot be empty.');
        }

        return super.toJSON();
    }
}

module.exports = RangeAggregationBase;
