'use strict';

const { inspect } = require('util');

const {
    GeoPoint,
    util: { checkType },
    consts: { UNIT_SET }
} = require('../../core');

const RangeAggregationBase = require('./range-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html';

/**
 * A multi-bucket aggregation that works on geo_point fields and conceptually
 * works very similar to the range aggregation. The user can define a point of
 * origin and a set of distance range buckets. The aggregation evaluate the
 * distance of each document value from the origin point and determines the
 * buckets it belongs to based on the ranges (a document belongs to a bucket
 * if the distance between the document and the origin falls within the distance
 * range of the bucket).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html)
 *
 * @extends RangeAggregationBase
 */
class GeoDistanceAggregation extends RangeAggregationBase {

    /**
     * Creates an instance of `GeoDistanceAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'geo_distance', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoDistanceAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoDistanceAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoDistanceAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoDistanceAggregation');
    }

    /**
     * Sets the point of origin from where distances will be measured.
     *
     * @param {GeoPoint} point A valid `GeoPoint` object.
     * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `point` is not an instance of `GeoPoint`
     */
    origin(point) {
        checkType(point, GeoPoint);

        this._aggsDef.origin = point;
        return this;
    }

    /**
     * Sets the distance unit.  Valid values are:
     * mi (miles), in (inches), yd (yards),
     * km (kilometers), cm (centimeters), mm (millimeters),
     * ft(feet), NM(nauticalmiles)
     *
     * @param {string} unit Distance unit, default is `m`(meters).
     * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
     * @throws {Error} If Unit is outside the accepted set.
     */
    unit(unit) {
        if (!UNIT_SET.has(unit)) {
            console.log(`See ${ES_REF_URL}`);
            throw new Error(
                `The 'unit' parameter should belong to ${inspect(UNIT_SET)}`
            );
        }

        this._aggsDef.unit = unit;
        return this;
    }

    /**
     * Sets the distance calculation mode, `arc` or `plane`.
     * The `arc` calculation is the more accurate.
     * The `plane` is the faster but least accurate.
     *
     * @param {string} type
     * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
     * @throws {Error} If `type` is neither `plane` nor `arc`.
     */
    distanceType(type) {
        const typeLower = type.toLowerCase();
        if (typeLower !== 'plane' && typeLower !== 'arc') {
            console.log(`See ${ES_REF_URL}`);
            throw new Error('The distance_type parameter can only be `plane` or `arc`');
        }

        this._aggsDef.distance_type = typeLower;
        return this;
    }
}

module.exports = GeoDistanceAggregation;
