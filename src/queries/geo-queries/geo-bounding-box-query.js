'use strict';

const isNil = require('lodash.isnil');

const {
    GeoPoint,
    util: { checkType, invalidParam }
} = require('../../core');

const GeoQueryBase = require('./geo-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-bounding-box-query.html';

const invalidTypeParam = invalidParam(
    ES_REF_URL,
    'type',
    "'memory' or 'indexed'"
);

/**
 * A query allowing to filter hits based on a point location using a bounding box.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-bounding-box-query.html)
 *
 * @example
 * // Format of point in Geohash
 * const qry = esb.geoBoundingBoxQuery('pin.location')
 *     .topLeft(esb.geoPoint().string('dr5r9ydj2y73'))
 *     .bottomRight(esb.geoPoint().string('drj7teegpus6'));
 *
 * @example
 * // Format of point with lat lon as properties
 * const qry = esb.geoBoundingBoxQuery()
 *     .field('pin.location')
 *     .topLeft(esb.geoPoint()
 *         .lat(40.73)
 *         .lon(-74.1))
 *     .bottomRight(esb.geoPoint()
 *         .lat(40.10)
 *         .lon(-71.12));
 *
 * @example
 * // Set bounding box values separately
 * const qry = esb.geoBoundingBoxQuery('pin.location')
 *     .top(40.73)
 *     .left(-74.1)
 *     .bottom(40.01)
 *     .right(-71.12);
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
 */
class GeoBoundingBoxQuery extends GeoQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        super('geo_bounding_box', field);
    }

    /**
     * Sets the top left coordinate for the Geo bounding box filter for
     * querying documents
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    topLeft(point) {
        checkType(point, GeoPoint);

        this._fieldOpts.top_left = point;
        return this;
    }

    /**
     * Sets the bottom right coordinate for the Geo bounding box filter for
     * querying documents
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    bottomRight(point) {
        checkType(point, GeoPoint);

        this._fieldOpts.bottom_right = point;
        return this;
    }

    /**
     * Sets the top right coordinate for the Geo bounding box filter for
     * querying documents
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    topRight(point) {
        checkType(point, GeoPoint);

        this._fieldOpts.top_right = point;
        return this;
    }

    /**
     * Sets the bottom left coordinate for the Geo bounding box filter for
     * querying documents
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    bottomLeft(point) {
        checkType(point, GeoPoint);

        this._fieldOpts.bottom_left = point;
        return this;
    }

    /**
     * Sets value for top of the bounding box.
     *
     * @param {number} val
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    top(val) {
        this._fieldOpts.top = val;
        return this;
    }

    /**
     * Sets value for left of the bounding box.
     *
     * @param {number} val
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    left(val) {
        this._fieldOpts.left = val;
        return this;
    }

    /**
     * Sets value for bottom of the bounding box.
     *
     * @param {number} val
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    bottom(val) {
        this._fieldOpts.bottom = val;
        return this;
    }

    /**
     * Sets value for right of the bounding box.
     *
     * @param {number} val
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    right(val) {
        this._fieldOpts.right = val;
        return this;
    }

    /**
     * Sets the type of execution for the bounding box query.
     * The type of the bounding box execution by default is set to memory,
     * which means in memory checks if the doc falls within the bounding
     * box range. In some cases, an indexed option will perform faster
     * (but note that the geo_point type must have lat and lon indexed in this case)
     *
     * @example
     *
     * const geoQry = esb.geoBoundingBoxQuery()
     *     .field('pin.location')
     *     .topLeft(esb.geoPoint()
     *         .lat(40.73)
     *         .lon(-74.1))
     *     .bottomRight(esb.geoPoint()
     *         .lat(40.10)
     *         .lon(-71.12))
     *     .type('indexed');
     *
     * @param {string} type Can either `memory` or `indexed`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        if (isNil(type)) invalidTypeParam(type);

        const typeLower = type.toLowerCase();
        if (typeLower !== 'memory' && typeLower !== 'indexed') {
            invalidTypeParam(type);
        }

        this._queryOpts.type = typeLower;
        return this;
    }
}

module.exports = GeoBoundingBoxQuery;
