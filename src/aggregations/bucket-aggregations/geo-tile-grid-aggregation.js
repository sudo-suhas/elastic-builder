'use strict';

const isNil = require('lodash.isnil');

const {
    GeoPoint,
    util: { checkType, setDefault }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html';

/**
 * A multi-bucket aggregation that works on geo_point fields and groups points
 * into buckets that represent cells in a grid. The resulting grid can be sparse
 * and only contains cells that have matching data. Each cell corresponds to a
 * map tile as used by many online map sites. Each cell is labeled using a
 * "{zoom}/{x}/{y}" format, where zoom is equal to the user-specified precision.

 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html)
 *
 * NOTE: This query was added in elasticsearch v7.0.
 *
 * @example
 * const agg = esb.geoTileGridAggregation('large-grid', 'location').precision(8);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class GeoTileGridAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'geotile_grid', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoTileGridAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoTileGridAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoTileGridAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoTileGridAggregation');
    }

    /**
     * The integer zoom of the key used to define cells/buckets in the results.
     * Defaults to 7.
     *
     * @param {number} precision Precision can be between 0 and 29
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
     * @throws {Error} If precision is not between 0 and 29.
     */
    precision(precision) {
        if (isNil(precision) || precision < 0 || precision > 29) {
            throw new Error('`precision` can only be value from 0 to 29.');
        }

        this._aggsDef.precision = precision;
        return this;
    }

    /**
     * Sets the maximum number of geotile buckets to return.
     * When results are trimmed, buckets are prioritised
     * based on the volumes of documents they contain.
     *
     * @param {number} size Optional. The maximum number of geotile
     * buckets to return (defaults to 10,000).
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * Determines how many geotile_grid buckets the coordinating node
     * will request from each shard. To allow for more accurate counting of the
     * top cells returned in the final result the aggregation defaults to
     * returning `max(10,(size x number-of-shards))` buckets from each shard.
     * If this heuristic is undesirable, the number considered from each shard
     * can be over-ridden using this parameter.
     *
     * @param {number} shardSize Optional.
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
     */
    shardSize(shardSize) {
        this._aggsDef.shard_size = shardSize;
        return this;
    }

    /**
     * Sets the top left coordinate for the bounding box used to filter the
     * points in the bucket.
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    topLeft(point) {
        checkType(point, GeoPoint);
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.top_left = point;
        return this;
    }

    /**
     * Sets the bottom right coordinate for the bounding box used to filter the
     * points in the bucket.
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    bottomRight(point) {
        checkType(point, GeoPoint);
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.bottom_right = point;
        return this;
    }

    /**
     * Sets the top right coordinate for the bounding box used to filter the
     * points in the bucket.
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    topRight(point) {
        checkType(point, GeoPoint);
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.top_right = point;
        return this;
    }

    /**
     * Sets the bottom left coordinate for the bounding box used to filter the
     * points in the bucket.
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    bottomLeft(point) {
        checkType(point, GeoPoint);
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.bottom_left = point;
        return this;
    }

    /**
     * Sets value for top of the bounding box.
     *
     * @param {number} val
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    top(val) {
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.top = val;
        return this;
    }

    /**
     * Sets value for left of the bounding box.
     *
     * @param {number} val
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    left(val) {
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.left = val;
        return this;
    }

    /**
     * Sets value for bottom of the bounding box.
     *
     * @param {number} val
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    bottom(val) {
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.bottom = val;
        return this;
    }

    /**
     * Sets value for right of the bounding box.
     *
     * @param {number} val
     * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
     */
    right(val) {
        setDefault(this._aggsDef, 'bounds', {});
        this._aggsDef.bounds.right = val;
        return this;
    }
}

module.exports = GeoTileGridAggregation;
