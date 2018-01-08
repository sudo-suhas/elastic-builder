'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html';

/**
 * A metric aggregation that computes the bounding box
 * containing all geo_point values for a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html)
 *
 * @example
 * const agg = esb.geoBoundsAggregation('viewport', 'location').wrapLongitude(true);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends MetricsAggregationBase
 */
class GeoBoundsAggregation extends MetricsAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'geo_bounds', field);
    }

    // TODO: Override missing and take only GeoPoint as parameter

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoBoundsAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoBoundsAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoBoundsAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoBoundsAggregation');
    }

    /**
     *
     * @param {boolean} allowOverlap Optional parameter which specifies whether
     * the bounding box should be allowed to overlap the international date line.
     * The default value is true
     * @returns {GeoBoundsAggregation} returns `this` so that calls can be chained
     */
    wrapLongitude(allowOverlap) {
        this._aggsDef.wrap_longitude = allowOverlap;
        return this;
    }
}

module.exports = GeoBoundsAggregation;
