'use strict';

const isEmpty = require('lodash.isempty');
const has = require('lodash.has');
const isNil = require('lodash.isnil');

const Query = require('./query');
const Script = require('./script');
const { checkType, invalidParam, recursiveToJSON } = require('./util');
const { SORT_MODE_SET, UNIT_SET } = require('./consts');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html';

const invalidOrderParam = invalidParam(ES_REF_URL, 'order', "'asc' or 'desc'");
const invalidModeParam = invalidParam(ES_REF_URL, 'mode', SORT_MODE_SET);
const invalidDistanceTypeParam = invalidParam(
    ES_REF_URL,
    'distance_type',
    "'plane' or 'arc'"
);
const invalidUnitParam = invalidParam(ES_REF_URL, 'unit', UNIT_SET);

/**
 * Allows creating and configuring sort on specified field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.termQuery('user', 'kimchy'))
 *     .sort(esb.sort('post_date', 'asc'))
 *
 * @param {string=} field The field to sort on.
 * If a script is used to specify the sort order, `field` should be omitted.
 * @param {string=} order The `order` option can have the following values.
 * `asc`, `desc` to sort in ascending, descending order respectively.
 */
class Sort {
    // eslint-disable-next-line require-jsdoc
    constructor(field, order) {
        this._opts = {};
        this._geoPoint = null;
        this._script = null;

        if (!isNil(field)) this._field = field;
        if (!isNil(order)) this.order(order);
    }

    /**
     * Set order for sorting. The order defaults to `desc` when sorting on the `_score`,
     * and defaults to `asc` when sorting on anything else.
     *
     * @param {string} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    order(order) {
        if (isNil(order)) invalidOrderParam(order);

        const orderLower = order.toLowerCase();
        if (orderLower !== 'asc' && orderLower !== 'desc') {
            invalidOrderParam(order);
        }

        this._opts.order = orderLower;
        return this;
    }

    /**
     * Elasticsearch supports sorting by array or multi-valued fields.
     * The `mode` option controls what array value is picked for sorting the
     * document it belongs to.
     *
     * The `mode` option can have the following values:
     *
     * - `min` - Pick the lowest value.
     * - `max` - Pick the highest value.
     * - `sum` - Use the sum of all values as sort value.
     *   Only applicable for number based array fields.
     * - `avg` - Use the average of all values as sort value.
     *   Only applicable for number based array fields.
     * - `median` - Use the median of all values as sort value.
     *   Only applicable for number based array fields.
     *
     * @example
     * const sort = esb.sort('price', 'asc').mode('avg');
     *
     * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`.
     * @returns {Sort} returns `this` so that calls can be chained.
     */
    mode(mode) {
        if (isNil(mode)) invalidModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (!SORT_MODE_SET.has(modeLower)) {
            invalidModeParam(mode);
        }

        this._opts.mode = modeLower;
        return this;
    }

    /**
     * Defines on which nested object to sort. The actual sort field must be a direct
     * field inside this nested object. When sorting by nested field, this field
     * is mandatory.
     *
     * Note: This method has been deprecated in elasticsearch 6.1. From 6.1 and
     * later, use `nested` method instead.
     *
     * @example
     * const sort = esb.sort('offer.price', 'asc')
     *     .nestedPath('offer')
     *     .nestedFilter(esb.termQuery('offer.color', 'blue'));
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
     * Note: This method has been deprecated in elasticsearch 6.1. From 6.1 and
     * later, use `nested` method instead.
     *
     * @example
     * const sort = esb.sort('offer.price', 'asc')
     *     .nestedPath('offer')
     *     .nestedFilter(esb.termQuery('offer.color', 'blue'));
     *
     * @param {Query} filterQuery Filter query
     * @returns {Sort} returns `this` so that calls can be chained.
     * @throws {TypeError} If filter query is not an instance of `Query`
     */
    nestedFilter(filterQuery) {
        checkType(filterQuery, Query);

        this._opts.nested_filter = filterQuery;
        return this;
    }

    /**
     * Defines on which nested object to sort and the filter that the inner objects inside
     * the nested path should match with in order for its field values to be taken into
     * account by sorting
     *
     * Note: This method is incompatible with elasticsearch 6.0 and older.
     * Use it only with elasticsearch 6.1 and later.
     *
     * @example
     * const sort = esb.sort('offer.price', 'asc')
     *     .nested({
     *          path: 'offer',
     *          filter: esb.termQuery('offer.color', 'blue')
     *      });
     *
     * @param {Object} nested Nested config that contains path and filter
     * @param {string} nested.path Nested object to sort on
     * @param {Query} nested.filter Filter query
     * @returns {Sort} returns `this` so that calls can be chained.
     * @throws {TypeError} If filter query is not an instance of `Query`
     */
    nested(nested) {
        const { filter } = nested;
        if (!isNil(filter)) checkType(filter, Query);

        this._opts.nested = nested;
        return this;
    }

    /**
     * The missing parameter specifies how docs which are missing the field should
     * be treated: The missing value can be set to `_last`, `_first`, or a custom value
     * (that will be used for missing docs as the sort value). The default is `_last`.
     *
     * @example
     * const sort = esb.sort('price').missing('_last');
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
     * @example
     * const sort = esb.sort('price').unmappedType('long');
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
     * @example
     * const sort = esb.sort('pin.location', 'asc')
     *     .geoDistance([-70, 40])
     *     .unit('km')
     *     .mode('min')
     *     .distanceType('arc');
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
        if (isNil(type)) invalidDistanceTypeParam(type);

        const typeLower = type.toLowerCase();
        if (typeLower !== 'plane' && typeLower !== 'arc') {
            invalidDistanceTypeParam(type);
        }

        this._opts.distance_type = typeLower;
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
            invalidUnitParam(unit);
        }

        this._opts.unit = unit;
        return this;
    }

    /**
     * Sorts based on custom script. When sorting on a field, scores are not computed.
     *
     * @example
     * const sort = esb.sort()
     *    .type('number')
     *    .script(
     *        esb.script('inline', "doc['field_name'].value * params.factor")
     *            .lang('painless')
     *            .params({ factor: 1.1 })
     *    )
     *    .order('asc');
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
     * Sets the data type for field generated by script.
     *
     * @param {string} type
     * @returns {Sort} returns `this` so that calls can be chained
     */
    type(type) {
        this._opts.type = type;
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
     * Override default `toJSON` to return DSL representation for `sort` parameter.
     *
     * @override
     * @returns {Object|string} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        const geoPointIsNil = isNil(this._geoPoint);
        const scriptIsNil = isNil(this._script);

        if (geoPointIsNil && scriptIsNil) {
            if (isEmpty(this._opts)) return this._field;

            if (
                Object.keys(this._opts).length === 1 &&
                has(this._opts, 'order')
            ) {
                return { [this._field]: this._opts.order };
            }
        }

        let repr;

        // Should I pick only the accepted properties here?
        if (!geoPointIsNil) {
            repr = {
                _geo_distance: Object.assign(
                    { [this._field]: this._geoPoint },
                    this._opts
                )
            };
        } else if (!scriptIsNil) {
            repr = {
                _script: Object.assign({ script: this._script }, this._opts)
            };
        } else {
            repr = { [this._field]: this._opts };
        }

        return recursiveToJSON(repr);
    }
}

module.exports = Sort;
