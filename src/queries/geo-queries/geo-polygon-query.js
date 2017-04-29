'use strict';

const { util: { checkType } } = require('../../core');

const GeoQueryBase = require('./geo-query-base');

/**
 * A query allowing to include hits that only fall within a polygon of points.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-polygon-query.html)
 *
 * @param {string=} field
 *
 * @example
 * const geoQry = bob.geoPolygonQuery('person.location')
 *  .points([
 *      {"lat" : 40, "lon" : -70},
 *      {"lat" : 30, "lon" : -80},
 *      {"lat" : 20, "lon" : -90}
 *  ]);
 */
class GeoPolygonQuery extends GeoQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        super('geo_polygon', field);
    }

    /**
     * Sets the points which form the polygon.
     * Points can be instances of `GeoPoint`, Object with `lat`, `lon` keys,
     * `GeoJSON` array representation or string(`geohash`/`lat, lon`)
     *
     * @param {Array} points
     * @returns {GeoPolygonQuery} returns `this` so that calls can be chained
     * @throws {TypeError} If `points` parameter is not an instance of `Array`.
     */
    points(points) {
        checkType(points, Array);

        this._fieldOpts.points = points;
        return this;
    }
}

module.exports = GeoPolygonQuery;
