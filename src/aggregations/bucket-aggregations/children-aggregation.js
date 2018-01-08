'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * from buckets on parent document types to buckets on child documents.
 *
 * This aggregation relies on the `_parent` field in the mapping.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top-tags', 'tags.keyword')
 *             .size(10)
 *             .agg(
 *                 esb.childrenAggregation('to-answers')
 *                     .type('answer')
 *                     .agg(
 *                         esb.termsAggregation(
 *                             'top-names',
 *                             'owner.display_name.keyword'
 *                         ).size(10)
 *                     )
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */
class ChildrenAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'children');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ChildrenAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in ChildrenAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ChildrenAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in ChildrenAggregation');
    }

    /**
     * Sets the child type/mapping for aggregation.
     *
     * @param {string} type The child type that the buckets in the parent space should be mapped to.
     * @returns {ChildrenAggregation} returns `this` so that calls can be chained
     */
    type(type) {
        this._aggsDef.type = type;
        return this;
    }
}

module.exports = ChildrenAggregation;
