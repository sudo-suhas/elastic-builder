'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-rare-terms-aggregation.html';

/**
 * A multi-bucket value source based aggregation which finds
 * "rare" terms — terms that are at the long-tail of the
 * distribution and are not frequent. Conceptually, this is like
 * a terms aggregation that is sorted by `_count` ascending.
 * As noted in the terms aggregation docs, actually ordering
 * a `terms` agg by count ascending has unbounded error.
 * Instead, you should use the `rare_terms` aggregation
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-rare-terms-aggregation.html)
 *
 * NOTE: Only available in Elasticsearch 7.3.0+.
 *
 * @example
 * const agg = esb.rareTermsAggregation('genres', 'genre');
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} field The field we wish to find rare terms in
 *
 * @extends BucketAggregationBase
 */
class RareTermsAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'rare_terms', field);
    }

    /**
     * Sets the maximum number of documents a term should appear in.
     *
     * @example
     * const agg = esb.rareTermsAggregation('genres', 'genre').maxDocCount(2);
     *
     * @param {number} maxDocCnt Integer value for maximum number of documents a term should appear in.
     * Max doc count can be between 1 and 100.
     * @returns {RareTermsAggregation} returns `this` so that calls can be chained
     */
    maxDocCount(maxDocCnt) {
        if (isNil(maxDocCnt) || maxDocCnt < 1 || maxDocCnt > 100) {
            throw new Error('`maxDocCount` can only be value from 1 to 100.');
        }

        this._aggsDef.max_doc_count = maxDocCnt;
        return this;
    }

    /**
     * Sets the precision of the internal CuckooFilters. Smaller precision
     * leads to better approximation, but higher memory usage.
     * Cannot be smaller than 0.00001
     *
     * @example
     * const agg = esb.rareTermsAggregation('genres', 'genre').precision(0.001);
     *
     * @param {number} precision Float value for precision of the internal CuckooFilters. Default is 0.01
     * @returns {RareTermsAggregation} returns `this` so that calls can be chained
     */
    precision(precision) {
        if (precision < 0.00001) {
            throw new Error('`precision` must be greater than 0.00001.');
        }

        this._aggsDef.precision = precision;
        return this;
    }

    /**
     * Sets terms that should be included in the aggregation
     *
     * @example
     * const agg = esb.rareTermsAggregation('genres', 'genre').include('swi*');
     *
     * @param {string} include Regular expression that will determine what values
     * are "allowed" to be aggregated
     * @returns {RareTermsAggregation} returns `this` so that calls can be chained
     */
    include(include) {
        this._aggsDef.include = include;
        return this;
    }

    /**
     * Sets terms that should be excluded from the aggregation
     *
     * @example
     * const agg = esb.rareTermsAggregation('genres', 'genre').exclude('electro*');
     *
     * @param {string} exclude Regular expression that will determine what values
     * should not be aggregated
     * @returns {RareTermsAggregation} returns `this` so that calls can be chained
     */
    exclude(exclude) {
        this._aggsDef.exclude = exclude;
        return this;
    }

    /**
     * Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     *
     * @param {string} value
     * @returns {RareTermsAggregation} returns `this` so that calls can be chained
     */
    missing(value) {
        this._aggsDef.missing = value;
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on RareTermsAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in RareTermsAggregation');
    }
}

module.exports = RareTermsAggregation;
