'use strict';

const MetricsAggregation = require('./metrics-aggregation');

/**
 * A metric aggregation that computes the bounding box
 * containing all geo_point values for a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html)
 *
 * @extends MetricsAggregation
 */
class GeoBoundsAggregation extends MetricsAggregation {

    /**
     * Creates an instance of GeoBoundsAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @returns {GeoBoundsAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field) {
        super(name, 'geo_bounds', field);
        return this;
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

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoBoundsAggregation
     */
    script() {
        console.log('Please refer https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html');
        throw new Error('script is not supported in GeoBoundsAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoBoundsAggregation
     */
    missing() {
        console.log('Please refer https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html');
        throw new Error('missing is not supported in GeoBoundsAggregation');
    }
}

module.exports = GeoBoundsAggregation;
