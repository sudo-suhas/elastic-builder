'use strict';

const {
    util: { checkType }
} = require('../../core');

const SignificantAggregationBase = require('./significant-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significanttext-aggregation.html';

/**
 * An aggregation that returns interesting or unusual occurrences of free-text
 * terms in a set. It is like the `SignificantTermsAggregation` but differs in
 * that:
 *   - It is specifically designed for use on type `text` fields
 *   - It does not require field data or doc-values
 *   - It re-analyzes text content on-the-fly meaning it can also filter
 *     duplicate sections of noisy text that otherwise tend to skew statistics.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significanttext-aggregation.html)
 *
 * NOTE: This query was added in elasticsearch v6.0.
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *   .query(esb.matchQuery('content', 'Bird flu'))
 *   .agg(
 *     esb.samplerAggregation('my_sample')
 *       .shardSize(100)
 *       .agg(esb.significantTextAggregation('keywords', 'content'))
 *   );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends SignificantAggregationBase
 */
class SignificantTextAggregation extends SignificantAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'significant_text', ES_REF_URL, field);
    }

    /**
     * Control if duplicate paragraphs of text should try be filtered from the
     * statistical text analysis. Can improve results but slows down analysis.
     * Default is `false`.
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *   .query(esb.matchQuery('content', 'elasticsearch'))
     *   .agg(
     *     esb.samplerAggregation('sample')
     *       .shardSize(100)
     *       .agg(
     *         esb.significantTextAggregation('keywords', 'content')
     *           .filterDuplicateText(true)
     *       )
     *   );
     *
     * @param {boolean} enable
     * @returns {SignificantTextAggregation} returns `this` so that calls can be chained
     */
    filterDuplicateText(enable) {
        this._aggsDef.filter_duplicate_text = enable;
        return this;
    }

    /**
     * Selects the fields to load from `_source` JSON and analyze. If none are
     * specified, the indexed "fieldName" value is assumed to also be the name
     * of the JSON field holding the value
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *   .query(esb.matchQuery('custom_all', 'elasticsearch'))
     *   .agg(
     *     esb.significantTextAggregation('tags', 'custom_all')
     *       .sourceFields(['content', 'title'])
     *   );
     *
     * @param {Array<string>} srcFields Array of fields
     * @returns {SignificantTextAggregation} returns `this` so that calls can be chained
     */
    sourceFields(srcFields) {
        checkType(srcFields, Array);

        this._aggsDef.source_fields = srcFields;
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SignificantTextAggregation
     */
    missing() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'missing is not supported in SignificantTextAggregation'
        );
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SignificantTextAggregation
     */
    executionHint() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'executionHint is not supported in SignificantTextAggregation'
        );
    }
}

module.exports = SignificantTextAggregation;
