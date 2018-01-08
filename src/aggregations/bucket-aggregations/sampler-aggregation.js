'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-sampler-aggregation.html';

/**
 * A filtering aggregation used to limit any sub aggregations'
 * processing to a sample of the top-scoring documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-sampler-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.queryStringQuery('tags:kibana OR tags:javascript'))
 *     .agg(
 *         esb.samplerAggregation('sample')
 *             .shardSize(200)
 *             .agg(
 *                 esb.significantTermsAggregation(
 *                     'keywords',
 *                     'tags'
 *                 ).exclude(['kibana', 'javascript'])
 *             )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class SamplerAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'sampler');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SamplerAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in SamplerAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SamplerAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in SamplerAggregation');
    }

    /**
     * The shard_size parameter limits how many top-scoring documents
     * are collected in the sample processed on each shard. The default value is 100.
     *
     * @param {number} size Maximum number of documents to return from each shard(Integer)
     * @returns {SamplerAggregation} returns `this` so that calls can be chained
     */
    shardSize(size) {
        this._aggsDef.shard_size = size;
        return this;
    }
}

module.exports = SamplerAggregation;
