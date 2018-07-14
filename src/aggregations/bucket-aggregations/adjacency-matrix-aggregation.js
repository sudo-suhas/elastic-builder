'use strict';

const {
    Query,
    util: { checkType, setDefault }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-adjacency-matrix-aggregation.html';

/**
 * A bucket aggregation returning a form of adjacency matrix.
 * The request provides a collection of named filter expressions,
 * similar to the `filters` aggregation request. Each bucket in the response
 * represents a non-empty cell in the matrix of intersecting filters.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-adjacency-matrix-aggregation.html)
 *
 * @example
 * const agg = esb.adjacencyMatrixAggregation('interactions').filters({
 *     grpA: esb.termsQuery('accounts', ['hillary', 'sidney']),
 *     grpB: esb.termsQuery('accounts', ['donald', 'mitt']),
 *     grpC: esb.termsQuery('accounts', ['vladimir', 'nigel'])
 * });
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */
class AdjacencyMatrixAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'adjacency_matrix');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on AdjacencyMatrixAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in AdjacencyMatrixAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on AdjacencyMatrixAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'script is not supported in AdjacencyMatrixAggregation'
        );
    }

    /**
     * Sets a named filter query.
     *
     * @param {string} filterName Name for the filter.
     * @param {Query} filterQuery Query to filter on. Example - term query.
     * @returns {AdjacencyMatrixAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQuery` is not an instance of `Query`
     */
    filter(filterName, filterQuery) {
        checkType(filterQuery, Query);

        setDefault(this._aggsDef, 'filters', {});

        this._aggsDef.filters[filterName] = filterQuery;
        return this;
    }

    /**
     * Assigns filters to already added filters.
     * Does not mix with anonymous filters.
     * If anonymous filters are present, they will be overwritten.
     *
     * @param {Object} filterQueries Object with multiple key value pairs
     * where filter name is the key and filter query is the value.
     * @returns {AdjacencyMatrixAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQueries` is not an instance of object
     */
    filters(filterQueries) {
        checkType(filterQueries, Object);

        setDefault(this._aggsDef, 'filters', {});

        Object.assign(this._aggsDef.filters, filterQueries);
        return this;
    }

    /**
     * Sets the `separator` parameter to use a separator string other than
     * the default of the ampersand.
     *
     * @param {string} sep the string used to separate keys in intersections buckets
     * e.g. & character for keyed filters A and B would return an
     * intersection bucket named A&B
     * @returns {AdjacencyMatrixAggregation} returns `this` so that calls can be chained
     */
    separator(sep) {
        this._aggsDef.separator = sep;
        return this;
    }
}

module.exports = AdjacencyMatrixAggregation;
