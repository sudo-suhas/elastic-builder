'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html';

/**
 * A multi-bucket aggregation that works on geo_point fields and groups points
 * into buckets that represent cells in a grid. The resulting grid can be sparse
 * and only contains cells that have matching data. Each cell is labeled using a
 * geohash which is of user-definable precision.

 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html)
 *
 * @example
 * const agg = esb.geoHashGridAggregation('large-grid', 'location').precision(3);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class GeoHashGridAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'geohash_grid', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoHashGridAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoHashGridAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoHashGridAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoHashGridAggregation');
    }

    /**
     * Sets the precision for the generated geohash.
     *
     * @param {number} precision Precision can be between 1 and 12
     * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
     * @throws {Error} If precision is not between 1 and 12.
     */
    precision(precision) {
        if (isNil(precision) || precision < 1 || precision > 12) {
            throw new Error('`precision` can only be value from 1 to 12.');
        }

        this._aggsDef.precision = precision;
        return this;
    }

    /**
     * Sets the maximum number of geohash buckets to return.
     * When results are trimmed, buckets are prioritised
     * based on the volumes of documents they contain.
     *
     * @param {number} size Optional. The maximum number of geohash
     * buckets to return (defaults to 10,000).
     * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * Determines how many geohash_grid the coordinating node
     * will request from each shard.
     *
     * @param {number} shardSize Optional.
     * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
     */
    shardSize(shardSize) {
        this._aggsDef.shard_size = shardSize;
        return this;
    }
}

module.exports = GeoHashGridAggregation;
