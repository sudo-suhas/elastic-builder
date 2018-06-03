'use strict';

const isObject = require('lodash.isobject');
const isNil = require('lodash.isnil');

const { checkType } = require('./util');

/**
 * A `GeoPoint` object that can be used in queries and filters that
 * take a `GeoPoint`.  `GeoPoint` supports various input formats.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html)
 */
class GeoPoint {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        // Take optional parameter and call appropriate method?
        // Will have to check for string, object and array.
        // this will be set depending on subsequent method called
        this._point = null;
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */
    _warn(msg) {
        console.warn(`[GeoPoint] ${msg}`);
    }

    /**
     * Print warning messages to not mix Geo Point representations
     * @private
     */
    _warnMixedRepr() {
        this._warn('Do not mix with other representation!');
        this._warn('Overwriting.');
    }

    /**
     * Check the instance for object representation of Geo Point.
     * If representation is null, new object is initialised.
     * If it is not null, warning is logged and point is overwritten.
     * @private
     */
    _checkObjRepr() {
        if (isNil(this._point)) this._point = {};
        else if (!isObject(this._point)) {
            this._warnMixedRepr();
            this._point = {};
        }
    }

    /**
     * Sets the latitude for the object representation.
     *
     * @param {number} lat Latitude
     * @returns {GeoPoint} returns `this` so that calls can be chained
     */
    lat(lat) {
        this._checkObjRepr();

        this._point.lat = lat;
        return this;
    }

    /**
     * Sets the longitude for the object representation.
     *
     * @param {number} lon Longitude
     * @returns {GeoPoint} returns `this` so that calls can be chained
     */
    lon(lon) {
        this._checkObjRepr();

        this._point.lon = lon;
        return this;
    }

    /**
     * Sets the Geo Point value expressed as an object,
     * with `lat` and `lon` keys.
     *
     * @param {Object} point
     * @returns {GeoPoint} returns `this` so that calls can be chained
     * @throws {TypeError} If `point` is not an instance of object
     */
    object(point) {
        checkType(point, Object);

        !isNil(this._point) && this._warnMixedRepr();

        this._point = point;
        return this; // This doesn't make much sense. What else are you gonna call?
    }

    /**
     * Sets the Geo Point value expressed as an array
     * with the format: `[ lon, lat ]`.
     *
     * @param {Array<number>} point Array in format `[ lon, lat ]`(`GeoJson` standard)
     * @returns {GeoPoint} returns `this` so that calls can be chained
     * @throws {TypeError} If `point` is not an instance of Array
     */
    array(point) {
        checkType(point, Array);

        !isNil(this._point) && this._warnMixedRepr();

        this._point = point;
        return this; // This doesn't make much sense. What else are you gonna call?
    }

    /**
     * Sets Geo-point expressed as a string with the format: `"lat,lon"`
     * or as a geo hash
     *
     * @param {string} point
     * @returns {GeoPoint} returns `this` so that calls can be chained
     */
    string(point) {
        !isNil(this._point) && this._warnMixedRepr();

        this._point = point;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `GeoPoint`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return this._point;
    }
}

module.exports = GeoPoint;
