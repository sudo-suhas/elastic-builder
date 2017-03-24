'use strict';

const MetricsAggregation = require('./metrics-aggregation');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html';

/**
 * A metric aggregation that computes the weighted centroid from all coordinate values for a Geo-point datatype field.
 *
 * [Elasticsearch`reference](${ES_REF_URL}`
 *
 * @extends MetricsAggregation
 */
class GeoCentroidAggregation extends MetricsAggregation {

    /**
     * Creates an instance of GeoCentroidAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. field must be a Geo-point datatype type
     * @returns {GeoCentroidAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field) {
        super(name, 'geo_centroid', field);
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoCentroidAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoCentroidAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoCentroidAggregation
     */
    missing() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('missing is not supported in GeoCentroidAggregation');
    }
}

module.exports = GeoCentroidAggregation;
