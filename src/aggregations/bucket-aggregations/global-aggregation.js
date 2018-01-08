'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html';

/**
 * Defines a single bucket of all the documents within the search execution
 * context. This context is defined by the indices and the document types you’re
 * searching on, but is not influenced by the search query itself.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('type', 't-shirt'))
 *     .agg(
 *         esb.globalAggregation('all_products').agg(
 *             esb.avgAggregation('avg_price', 'price')
 *         )
 *     )
 *     .agg(esb.avgAggregation('t_shirts', 'price'));
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */
class GlobalAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'global');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GlobalAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in GlobalAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GlobalAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in GlobalAggregation');
    }
}

module.exports = GlobalAggregation;
