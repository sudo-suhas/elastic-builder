'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating nested
 * documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('name', 'led tv'))
 *     .agg(
 *         esb.nestedAggregation('resellers', 'resellers').agg(
 *             esb.minAggregation('min_price', 'resellers.price')
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} path `path` of the nested document
 *
 * @extends BucketAggregationBase
 */
class NestedAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, path) {
        super(name, 'nested');

        if (!isNil(path)) this._aggsDef.path = path;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on NestedAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in NestedAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on NestedAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in NestedAggregation');
    }

    /**
     * Sets the nested path
     *
     * @param {string} path `path` of the nested document
     * @returns {NestedAggregation} returns `this` so that calls can be chained
     */
    path(path) {
        this._aggsDef.path = path;
        return this;
    }
}

module.exports = NestedAggregation;
