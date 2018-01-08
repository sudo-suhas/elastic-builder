'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam },
    consts: { EXECUTION_HINT_SET }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const invalidExecutionHintParam = invalidParam(
    '',
    'execution_hint',
    EXECUTION_HINT_SET
);

/**
 * The `TermsAggregationBase` provides support for common options used across
 * various terms `Aggregation` implementations like Significant terms and
 * Terms aggregation.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} aggType Type of aggregation
 * @param {string} refUrl Elasticsearch reference URL.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */
class TermsAggregationBase extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, refUrl, field) {
        super(name, aggType, field);

        this._refUrl = refUrl;
    }

    /**
     * Sets the format expression for `key_as_string` in response buckets.
     * If no format is specified, then it will use the first format specified in the field mapping.
     *
     * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._aggsDef.format = fmt;
        return this;
    }

    /**
     * Sets the minimum number of matching hits required to return the terms.
     *
     * @example
     * const agg = esb.significantTermsAggregation('tags', 'tag').minDocCount(10);
     *
     * @param {number} minDocCnt Integer value for minimum number of documents
     * required to return bucket in response
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    minDocCount(minDocCnt) {
        this._aggsDef.min_doc_count = minDocCnt;
        return this;
    }

    /**
     * Sets the parameter which regulates the _certainty_ a shard has if the term
     * should actually be added to the candidate list or not with respect to
     * the `min_doc_count`.
     * Terms will only be considered if their local shard frequency within
     * the set is higher than the `shard_min_doc_count`.
     *
     * @param {number} minDocCnt Sets the `shard_min_doc_count` parameter. Default is 1
     * and has no effect unless you explicitly set it.
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    shardMinDocCount(minDocCnt) {
        this._aggsDef.shard_min_doc_count = minDocCnt;
        return this;
    }

    /**
     * Defines how many term buckets should be returned out of the overall terms list.
     *
     * @example
     * const agg = esb.termsAggregation('products', 'product').size(5);
     *
     * @param {number} size
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * Sets the `shard_size` parameter to control the volumes of candidate terms
     * produced by each shard. For the default, -1, shard_size will be automatically
     * estimated based on the number of shards and the size parameter.
     *
     * `shard_size` cannot be smaller than size (as it doesn’t make much sense).
     * When it is, elasticsearch will override it and reset it to be equal to size.
     *
     * @param {number} size
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    shardSize(size) {
        this._aggsDef.shard_size = size;
        return this;
    }

    /**
     * Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     *
     * @param {string} value
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }

    /**
     * Filter the values for which buckets will be created.
     *
     * @example
     * const agg = esb.termsAggregation('tags', 'tags')
     *     .include('.*sport.*')
     *     .exclude('water_.*');
     *
     * @example
     * // Match on exact values
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.termsAggregation('JapaneseCars', 'make').include([
     *             'mazda',
     *             'honda'
     *         ])
     *     )
     *     .agg(
     *         esb.termsAggregation('ActiveCarManufacturers', 'make').exclude([
     *             'rover',
     *             'jensen'
     *         ])
     *     );
     *
     * @param {RegExp|Array|string} clause Determine what values are "allowed" to be aggregated
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    include(clause) {
        this._aggsDef.include = clause;
        return this;
    }

    /**
     * Filter the values for which buckets will be created.
     *
     * @example
     * const agg = esb.termsAggregation('tags', 'tags')
     *     .include('.*sport.*')
     *     .exclude('water_.*');
     *
     * @example
     * // Match on exact values
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.termsAggregation('JapaneseCars', 'make').include([
     *             'mazda',
     *             'honda'
     *         ])
     *     )
     *     .agg(
     *         esb.termsAggregation('ActiveCarManufacturers', 'make').exclude([
     *             'rover',
     *             'jensen'
     *         ])
     *     );
     *
     * @param {RegExp|Array|string} clause Determine the values that should not be aggregated
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     */
    exclude(clause) {
        this._aggsDef.exclude = clause;
        return this;
    }

    /**
     * This setting can influence the management of the values used
     * for de-duplication. Each option will hold up to shard_size
     * values in memory while performing de-duplication but
     * the type of value held can be controlled
     *
     * @example
     * const agg = esb.significantTermsAggregation('tags', 'tag').executionHint('map');
     *
     * @example
     * const agg = esb.termsAggregation('tags', 'tags').executionHint('map');
     *
     * @param {string} hint the possible values are `map`, `global_ordinals`,
     * `global_ordinals_hash` and `global_ordinals_low_cardinality`
     * @returns {TermsAggregationBase} returns `this` so that calls can be chained
     * @throws {Error} If Execution Hint is outside the accepted set.
     */
    executionHint(hint) {
        if (isNil(hint)) invalidExecutionHintParam(hint, this._refUrl);

        const hintLower = hint.toLowerCase();
        if (!EXECUTION_HINT_SET.has(hintLower)) {
            invalidExecutionHintParam(hint, this._refUrl);
        }

        this._aggsDef.execution_hint = hint;
        return this;
    }
}

module.exports = TermsAggregationBase;
