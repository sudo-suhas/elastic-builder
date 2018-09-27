'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html';

/**
 * A parent pipeline aggregation which sorts the buckets of its parent
 * multi-bucket aggregation. Zero or more sort fields may be specified
 * together with the corresponding sort order. Each bucket may be sorted
 * based on its _key, _count or its sub-aggregations. In addition, parameters
 * from and size may be set in order to truncate the result buckets.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.bucketSortAggregation('sort')
 *             .sort([
 *                  esb.sort('user', 'desc')
 *              ])
 *              .from(5)
 *              .size(10)
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends PipelineAggregationBase
 */
class BucketSortAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'bucket_sort', ES_REF_URL);
    }

    /**
     * Sets the list of fields to sort on. Optional.
     *
     * @param {Array<Sort>} sort The list of fields to sort on
     * @returns {BucketSortAggregation} returns `this` so that calls can be chained
     */
    sort(sort) {
        this._aggsDef.sort = sort;
        return this;
    }

    /**
     * Sets the value buckets in positions prior to which will be truncated. Optional.
     *
     * @param {number} from Buckets in positions prior to the set value will be truncated.
     * @returns {BucketSortAggregation} returns `this` so that calls can be chained
     */
    from(from) {
        this._aggsDef.from = from;
        return this;
    }

    /**
     * Sets the number of buckets to return. Optional.
     *
     * @param {number} size The number of buckets to return.
     * @returns {BucketSortAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }
}

module.exports = BucketSortAggregation;
