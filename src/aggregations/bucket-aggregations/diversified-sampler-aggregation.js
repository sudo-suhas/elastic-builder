'use strict';

const { inspect } = require('util');

const { consts: { EXECUTION_HINT_SET } } = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html';

/**
 * A filtering aggregation used to limit any sub aggregations' processing
 * to a sample of the top-scoring documents. Diversity settings
 * are used to limit the number of matches that share a common value such as an "author".
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-diversified-sampler-aggregation.html)
 *
 * @extends BucketAggregationBase
 */
class DiversifiedSamplerAggregation extends BucketAggregationBase {

    /**
     * Creates an instance of `DiversifiedSamplerAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
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
        if (!EXECUTION_HINT_SET.has(hint)) {
            console.log(`See ${ES_REF_URL}#_execution_hint`);
            throw new Error(
                `The 'execution_hint' parameter should belong to ${
                    inspect(EXECUTION_HINT_SET)
                }`
            );
        }

        this._aggsDef.execution_hint = hint;
        return this;
    }
}

module.exports = DiversifiedSamplerAggregation;
