'use strict';

const _ = require('lodash');

const { checkType } = require('./util');

/**
 * Shape object that can be used in queries and filters that
 * take a Shape. Shape uses the GeoJSON format.
 *
 * @example
 * // Pass options using method
 * const shape = bob.geoShape()
 *  .type('linestring')
 *  .coordinates([ [-77.03653, 38.897676], [-77.009051, 38.889939] ]);
 *
 * // bob.prettyPrint(shape);
 * // {
 * //   "type": "linestring",
 * //   "coordinates": [
 * //     [
 * //       -77.03653,
 * //       38.897676
 * //     ],
 * //     [
 * //       -77.009051,
 * //       38.889939
 * //     ]
 * //   ]
 * // }
 *
 * // Pass parameters using contructor
 * bob.geoShape('multipoint', [ [102.0, 2.0], [103.0, 2.0] ])
 */
class GeoShape {

    /**
     * A Shape object that can be used in queries and filters that
     * take a Shape.  Shape uses the GeoJSON format.
     *
     * @param {string=} type A valid shape type.
     * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
     * `multipolygon`, `geometrycollection`, `envelope` and `circle`
     * @param {Array=} coords A valid coordinat definition for the given shape.
     */
    constructor(type, coords) {
        this._body = {};

        if (!_.isNil(type)) this.type(type);
        if (!_.isNil(coords)) this.coordinates(coords);
    }

    /**
     * Sets the GeoJSON format type used to represent shape.
     *
     * @example
     * bob.geoShape()
     *  .type('envelope')
     *  .coordinates([ [-45.0, 45.0], [45.0, -45.0] ])
     *
     * @param {string} type A valid shape type.
     * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
     * `multipolygon`, `geometrycollection`, `envelope`, `circle`
     * @returns {GeoShape} returns `this` so that calls can be chained.
     */
    type(type) {
        this._body.type = type;
        return this;
    }

    /**
     * Sets the coordinates for the shape definition.  Note, the coordinates
     * are not validated in this api. Please see [GeoJSON](http://geojson.org/geojson-spec.html#geometry-objects)
     * and [ElasticSearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html#input-structure) for correct coordinate definitions.
     *
     * @example
     * bob.geoShape()
     *  .type('point')
     *  .coordinates([-77.03653, 38.897676])
     *
     * @param {Array} coords
     * @returns {GeoShape} returns `this` so that calls can be chained.
     */
    coordinates(coords) {
        checkType(coords, Array);

        this._body.coordinates = coords;
        return this;
    }

    /**
     * Sets the radius for parsing a circle `GeoShape`.
     *
     * @example
     * bob.geoShape()
     *  .type('circle')
     *  .coordinates([-45.0, 45.0])
     *  .radius('100m)
     *
     * @param {string|number} radius The radius for shape circle.
     * @returns {GeoShape} returns `this` so that calls can be chained.
     */
    radius(radius) {
        this._body.radius = radius;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the geo shape
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return this._body;
    }
}

module.exports = GeoShape;
