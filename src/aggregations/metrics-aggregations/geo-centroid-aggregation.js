'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html';

/**
 * A metric aggregation that computes the weighted centroid
 * from all coordinate values for a Geo-point datatype field.
 *
 * [Elasticsearchreference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html)
 *
 * @extends MetricsAggregationBase
 */
class GeoCentroidAggregation extends MetricsAggregationBase {
    /**
     * Creates an instance of `GeoCentroidAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. field must be a Geo-point datatype type
     */
    constructor(name, field) {
        super(name, 'geo_centroid', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoCentroidAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoCentroidAggregation');
    }
}

module.exports = GeoCentroidAggregation;
