'use strict';

const isNil = require('lodash.isnil');
const { Query } = require('../../core');

/**
 * The `distance_feature` query can be used to filter documents that are inside
 * a timeframe or radius given an **origin** point. For dates the difference can be
 * minutes, hours, etc and for coordinates it can be meters, kilometers..
 *
 *  [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-distance-feature-query.html)
 *
 * NOTE: Only available in Elasticsearch 7.1.0+.
 *
 * @example
 * const query = new DistanceFeatureQuery('time');
 *   query
 *       .origin('now')
 *       .pivot('1h')
 *       .toJSON();
 * @param {string} field The field inside the document to be used in the query
 * @extends Query
 */
class DistanceFeatureQuery extends Query {
    /**
     * @param {string} field The field inside the document to be used in the query
     */
    constructor(field) {
        super('distance_feature');
        if (!isNil(field)) this._queryOpts.field = field;
    }

    /**
     * Sets the field for the `distance_feature` query
     * @param {string} fieldName Name of the field inside the document
     * @returns {DistanceFeatureQuery} Instance of the distance feature query
     */
    field(fieldName) {
        this._queryOpts.field = fieldName;
        return this;
    }

    /**
     * Sets the origin of the function. Date or point of coordinates
     * used to calculate distances
     * @param {GeoPoint | string} originPoint Array of coordinates, LatLng object, "now-1h"
     * @returns {DistanceFeatureQuery} Instance of the distance feature query
     */
    origin(originPoint) {
        this._queryOpts.origin = originPoint;
        return this;
    }

    /**
     * Distance from the origin at which relevance scores receive half of the boost value.
     * @param {string} pivotDistance Distance value. If the field value is date then this must be a
     * [time unit](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units).
     * If it's a geo point field, then a [distance unit](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#distance-units)
     * @returns {DistanceFeatureQuery} Instance of the distance feature query
     */
    pivot(pivotDistance) {
        this._queryOpts.pivot = pivotDistance;
        return this;
    }
}

module.exports = DistanceFeatureQuery;
