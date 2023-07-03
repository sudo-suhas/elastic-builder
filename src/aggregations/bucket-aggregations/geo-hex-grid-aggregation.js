'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohexgrid-aggregation.html';

/**
 * A multi-bucket aggregation that groups geo_point and geo_shape values into buckets
 * that represent a grid. The resulting grid can be sparse and only contains cells
 * that have matching data. Each cell corresponds to a H3 cell index and is labeled
 * using the H3Index representation.

 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohexgrid-aggregation.html)
 *
 * NOTE: This aggregation was added in elasticsearch v8.1.0.
 *
 * @example
 * const agg = esb.geoHexGridAggregation('hex-grid', 'location').precision(3);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class GeoHexGridAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'geohex_grid', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoHexGridAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in GeoHexGridAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoHexGridAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GeoHexGridAggregation');
    }

    /**
     * Sets the precision for the generated geohex.
     *
     * @param {number} precision Precision can be between 0 and 15
     * @returns {GeoHexGridAggregation} returns `this` so that calls can be chained
     * @throws {Error} If precision is not between 0 and 15.
     */
    precision(precision) {
        if (isNil(precision) || precision < 0 || precision > 15) {
            throw new Error('`precision` can only be value from 0 to 15.');
        }

        this._aggsDef.precision = precision;
        return this;
    }

    /**
     * Sets the maximum number of geohex buckets to return.
     * When results are trimmed, buckets are prioritised
     * based on the volumes of documents they contain.
     *
     * @param {number} size Optional. The maximum number of geohex
     * buckets to return (defaults to 10,000).
     * @returns {GeoHexGridAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * Determines how many geohex_grid the coordinating node
     * will request from each shard.
     *
     * @param {number} shardSize Optional.
     * @returns {GeoHexGridAggregation} returns `this` so that calls can be chained
     */
    shardSize(shardSize) {
        this._aggsDef.shard_size = shardSize;
        return this;
    }
}

module.exports = GeoHexGridAggregation;
