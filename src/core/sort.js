'use strict';

const { inspect } = require('util');

const _ = require('lodash');

const Query = require('./query'),
    Script = require('../script-types/script');
const { checkType } = require('./util');
const { SORT_MODE_SET, UNIT_SET } = require('./consts');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html';

/**
 * Allows creating and configuring sort on specified field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html)
 */
class Sort {

    /**
     * Creates an instance of `Sort`
     *
     * @param {string} field The field to sort on
     * @param {string=} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     */
    constructor(field, order) {
        this.field = field;

        this._opts = {};
        this._geoPoint = null;
        this._script = null;

        if (!_.isNil(order)) this.order(order);
    }

    /**
     * Set order for sorting. The order defaults to desc when sorting on the _score,
     * and defaults to asc when sorting on anything else.
     *
     * @param {string} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    order(order) {
        const orderLower = order.toLowerCase();
        if (orderLower !== 'asc' &&
            orderLower !== 'desc') {
            throw new Error('`order` must be either `asc` or `desc`');
        }

        this._opts.order = orderLower;
        return this;
    }

    /**
     * The mode option controls what array value is picked for sorting the
     * document it belongs to.
     * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`.
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    mode(mode) {
        if (!SORT_MODE_SET.has(mode)) {
            console.log(`See ${ES_REF_URL}`);
            throw new Error(
                `The 'mode' parameter should belong to ${inspect(SORT_MODE_SET)}`
            );
        }

        this._opts.mode = mode;
        return this;
    }

    /**
     * Defines on which nested object to sort. The actual sort field must be a direct
     * field inside this nested object. When sorting by nested field, this field
     * is mandatory.
     *
     * @param {string} path Nested object to sort on
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    nestedPath(path) {
        this._opts.nested_path = path;
        return this;
    }

    /**
     * A filter that the inner objects inside the nested path should match with in order
     * for its field values to be taken into account by sorting. By default no
     * `nested_filter` is active.
     *
     * @param {Query} filterQuery
     * @returns {Sort} returns `this` so that calls can be chained.
     * @throws {TypeError} If filter query is not an instance of `Query`
     */
    nestedFilter(filterQuery) {
        checkType(filterQuery, Query);

        this._opts.nested_filter = filterQuery;
        return this;
    }

    /**
     * The missing parameter specifies how docs which are missing the field should
     * be treated: The missing value can be set to `_last`, `_first`, or a custom value
     * (that will be used for missing docs as the sort value). The default is `_last`.
     *
     * @param {string|number} value
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    missing(value) {
        this._opts.missing = value;
        return this;
    }

    /**
     * By default, the search request will fail if there is no mapping associated with
     * a field. The `unmapped_type` option allows to ignore fields that have no mapping
     * and not sort by them. The value of this parameter is used to determine what sort
     * values to emit.
     *
     * @param {string} type
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    unmappedType(type) {
        this._opts.unmapped_type = type;
        return this;
    }

    /**
     * Sorts documents by distance of the geo point field from reference point.
     * If multiple reference points are specified, the final distance for a
     * document will then be `min`/`max`/`avg` (defined via `mode`) distance of all
     * points contained in the document to all points given in the sort request.
     *
     * @param {GeoPoint|Object|Array|string} geoPoint Reference point or array of
     * points to calculate distance from. Can be expressed using the `GeoPoint` class,
     * `Object` with `lat`, `lon` keys, as a string either `lat,lon` or geohash
     * or as Array with GeoJSON format `[lon, lat]`
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    geoDistance(geoPoint) {
        this._geoPoint = geoPoint;
        return this;
    }

    /**
     * Sets the distance calculation mode, `arc` or `plane`.
     * The `arc` calculation is the more accurate.
     * The `plane` is the faster but least accurate.
     *
     * @param {string} type
     * @returns {Sort} returns `this` so that calls can be chained
     * @throws {Error} If `type` is neither `plane` nor `arc`.
     */
    distanceType(type) {
        const typeLower = type.toLowerCase();
        if (typeLower !== 'plane' && typeLower !== 'arc') {
            console.log(`See ${ES_REF_URL}`);
            throw new Error('The distance_type parameter can only be `plane` or `arc`');
        }

        this._aggsDef.distance_type = typeLower;
        return this;
    }

    /**
     * Sets the distance unit.  Valid values are:
     * mi (miles), in (inches), yd (yards),
     * km (kilometers), cm (centimeters), mm (millimeters),
     * ft(feet), NM(nauticalmiles)
     *
     * @param {string} unit Distance unit, default is `m`(meters).
     * @returns {Sort} returns `this` so that calls can be chained
     * @throws {Error} If Unit is outside the accepted set.
     */
    unit(unit) {
        if (!UNIT_SET.has(unit)) {
            console.log(`See ${ES_REF_URL}`);
            throw new Error(
                `The 'unit' parameter should belong to ${inspect(UNIT_SET)}`
            );
        }

        this._aggsDef.unit = unit;
        return this;
    }

    /**
     * Sorts based on custom script. When sorting on a field, scores are not computed.
     *
     * @param {Script} script
     * @returns {Sort} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        checkType(script, Script);

        this._script = script;
        return this;
    }

    /**
     * When sorting on a field, scores are not computed. By setting `track_scores` to true,
     * scores will still be computed and tracked.
     *
     * @param {boolean} enable
     * @returns {Sort} returns `this` so that calls can be chained
     */
    trackScores(enable) {
        this._opts.track_scores = enable;
        return this;
    }

    /**
     * Reverse the sort order. Valid during sort types: field, geo distance, and script.
     *
     * @param {boolean} reverse If sort should be in reverse order.
     * @returns {Sort} returns `this` so that calls can be chained
     */
    reverse(reverse) {
        this._opts.reverse = reverse;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object|string}
     */
    toJSON() {
        if (!_.isNil(this._geoPoint)) {
            // Should I pick only the accepted properties here?
            return {
                _geo_distance: Object.assign({
                    [this.field]: this._geoPoint
                }, this._opts)
            };
        } else if (!_.isNil(this._script)) {
            return {
                _script: Object.assign({ script: this._script }, this._opts)
            };
        }
        return _.isEmpty(this._opts) ? this.field : {
            [this.field]: this._opts
        };
    }
}

module.exports = Sort;
