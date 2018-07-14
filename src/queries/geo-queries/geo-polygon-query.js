'use strict';

const {
    util: { checkType }
} = require('../../core');

const GeoQueryBase = require('./geo-query-base');

/**
 * A query allowing to include hits that only fall within a polygon of points.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-polygon-query.html)
 *
 * @example
 * const geoQry = esb.geoPolygonQuery('person.location')
 *     .points([
 *         {"lat" : 40, "lon" : -70},
 *         {"lat" : 30, "lon" : -80},
 *         {"lat" : 20, "lon" : -90}
 *     ]);
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
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
     * @example
     * // Format in `[lon, lat]`
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     [-70, 40],
     *     [-80, 30],
     *     [-90, 20]
     * ]);
     *
     * @example
     * // Format in lat,lon
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     '40, -70',
     *     '30, -80',
     *     '20, -90'
     * ]);
     *
     * @example
     * // Geohash
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     'drn5x1g8cu2y',
     *     '30, -80',
     *     '20, -90'
     * ]);
     *
     * @param {Array<*>} points
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
