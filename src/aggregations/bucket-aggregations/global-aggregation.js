'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html';

/**
 * Defines a single bucket of all the documents within the search execution
 * context. This context is defined by the indices and the document types you’re
 * searching on, but is not influenced by the search query itself.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html)
 *
 * @extends BucketAggregationBase
 */
class GlobalAggregation extends BucketAggregationBase {

    /**
     * Creates an instance of `GlobalAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @returns {GlobalAggregation} returns `this` so that calls can be chained
     */
    constructor(name) {
        super(name, 'global');
        return this;
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
