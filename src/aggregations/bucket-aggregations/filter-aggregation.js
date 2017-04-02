'use strict';

const {
    Query,
    util: { checkType }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html';

/**
 * Defines a single bucket of all the documents in the current document set
 * context that match a specified filter. Often this will be used to narrow down
 * the current aggregation context to a specific set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html)
 *
 * @extends BucketAggregationBase
 */
class FilterAggregation extends BucketAggregationBase {

    /**
     * Creates an instance of `FilterAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {Query} filterQuery Query to filter on. Example - term query.
     * @returns {FilterAggregation} returns `this` so that calls can be chained
     */
    constructor(name, filterQuery) {
        super(name, 'filter');

        filterQuery && this.filter(filterQuery);

        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on FilterAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in FilterAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on FilterAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in FilterAggregation');
    }

    // NOTE: Special case. filter does not set a key inside
    // this._aggsDef but sets the entire object itself
    // Generic getOpt will fail for this.
    // Just a simple override should handle it though

    /**
     * Set the filter query for Filter Aggregation.
     *
     * @param {Query} filterQuery Query to filter on. Example - term query.
     * @returns {FilterAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQuery` is not an instance of `Query`
     */
    filter(filterQuery) {
        checkType(filterQuery, Query);
        this._aggsDef = this._aggs[this.type] = filterQuery;
        return this;
    }
}

module.exports = FilterAggregation;
