'use strict';

const isNil = require('lodash.isnil');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-parent-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * from buckets on child document types to buckets on parent documents.
 *
 * This aggregation relies on the `_parent` field in the mapping.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-parent-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top-names', 'owner.display_name.keyword')
 *             .size(10)
 *             .agg(
 *                 esb.parentAggregation('to-questions')
 *                     .type('answer')
 *                     .agg(
 *                         esb.termsAggregation(
 *                             'top-tags',
 *                             'tags.keyword'
 *                         ).size(10)
 *                     )
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} type The type of the child document.
 *
 * @extends BucketAggregationBase
 */
class ParentAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, type) {
        super(name, 'parent');

        if (!isNil(type)) this.type(type);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ParentAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in ParentAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ParentAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in ParentAggregation');
    }

    /**
     * Sets the child type/mapping for aggregation.
     *
     * @param {string} type The child type that the buckets in the parent space should be mapped to.
     * @returns {ParentAggregation} returns `this` so that calls can be chained
     */
    type(type) {
        this._aggsDef.type = type;
        return this;
    }
}

module.exports = ParentAggregation;
