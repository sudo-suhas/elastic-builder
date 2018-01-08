'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam },
    consts: { EXECUTION_HINT_SET }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html';

const invalidExecutionHintParam = invalidParam(
    ES_REF_URL,
    'execution_hint',
    EXECUTION_HINT_SET
);

/**
 * A filtering aggregation used to limit any sub aggregations' processing
 * to a sample of the top-scoring documents. Diversity settings
 * are used to limit the number of matches that share a common value such as an "author".
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.queryStringQuery('tags:elasticsearch'))
 *     .agg(
 *         esb.diversifiedSamplerAggregation('my_unbiased_sample', 'author')
 *             .shardSize(200)
 *             .agg(
 *                 esb.significantTermsAggregation(
 *                     'keywords',
 *                     'tags'
 *                 ).exclude(['elasticsearch'])
 *             )
 *     );
 *
 * @example
 * // Use a script to produce a hash of the multiple values in a tags field
 * // to ensure we don't have a sample that consists of the same repeated
 * // combinations of tags
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.queryStringQuery('tags:kibana'))
 *     .agg(
 *         esb.diversifiedSamplerAggregation('my_unbiased_sample')
 *             .shardSize(200)
 *             .maxDocsPerValue(3)
 *             .script(esb.script('inline', "doc['tags'].values.hashCode()"))
 *             .agg(
 *                 esb.significantTermsAggregation(
 *                     'keywords',
 *                     'tags'
 *                 ).exclude(['kibana'])
 *             )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class DiversifiedSamplerAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'diversified_sampler', field);
    }

    /**
     * The shard_size parameter limits how many top-scoring documents
     * are collected in the sample processed on each shard. The default value is 100.
     *
     * @param {number} size Maximum number of documents to return from each shard(Integer)
     * @returns {DiversifiedSamplerAggregation} returns `this` so that calls can be chained
     */
    shardSize(size) {
        this._aggsDef.shard_size = size;
        return this;
    }

    /**
     * Used to control the maximum number of documents collected
     * on any one shard which share a common value.
     * Applies on a per-shard basis only for the purposes of shard-local sampling.
     *
     * @param {number} maxDocsPerValue Default 1.(Integer)
     * @returns {DiversifiedSamplerAggregation} returns `this` so that calls can be chained
     */
    maxDocsPerValue(maxDocsPerValue) {
        this._aggsDef.max_docs_per_value = maxDocsPerValue;
        return this;
    }

    /**
     * This setting can influence the management of the values used
     * for de-duplication. Each option will hold up to shard_size
     * values in memory while performing de-duplication but
     * the type of value held can be controlled
     *
     * @param {string} hint the possible values are `map`, `global_ordinals`,
     * `global_ordinals_hash` and `global_ordinals_low_cardinality`
     * @returns {DiversifiedSamplerAggregation} returns `this` so that calls can be chained
     * @throws {Error} If Execution Hint is outside the accepted set.
     */
    executionHint(hint) {
        if (isNil(hint)) invalidExecutionHintParam(hint);

        const hintLower = hint.toLowerCase();
        if (!EXECUTION_HINT_SET.has(hintLower)) {
            invalidExecutionHintParam(hint);
        }

        this._aggsDef.execution_hint = hintLower;
        return this;
    }
}

module.exports = DiversifiedSamplerAggregation;
