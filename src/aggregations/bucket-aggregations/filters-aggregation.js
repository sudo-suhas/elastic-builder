'use strict';

const isEmpty = require('lodash.isempty');

const {
    Query,
    util: { checkType, setDefault }
} = require('../../core');

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filters-aggregation.html';

/**
 * Defines a single bucket of all the documents in the current document set
 * context that match a specified filter. Often this will be used to narrow down
 * the current aggregation context to a specific set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filters-aggregation.html)
 *
 * @example
 * const agg = esb.filtersAggregation('messages')
 *     .filter('errors', esb.matchQuery('body', 'error'))
 *     .filter('warnings', esb.matchQuery('body', 'warning'));
 *
 *
 * @example
 * const agg = esb.filtersAggregation('messages')
 *     .anonymousFilters([
 *         esb.matchQuery('body', 'error'),
 *         esb.matchQuery('body', 'warning')
 *     ])
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */
class FiltersAggregation extends BucketAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'filters');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on FiltersAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in FiltersAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on FiltersAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in FiltersAggregation');
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */
    _warn(msg) {
        console.warn(`[FiltersAggregation] ${msg}`);
    }

    /**
     * Check and puts an object for the `filters` key in
     * internal aggregation representation object.
     * If the key has a value but is not an object,
     * a warning is printed.
     * @private
     */
    _checkNamedFilters() {
        if (
            !setDefault(this._aggsDef, 'filters', {}) &&
            Array.isArray(this._aggsDef.filters)
        ) {
            this._warn('Do not mix named and anonymous filters!');
            this._warn('Overwriting anonymous filters.');
            this._aggsDef.filters = {};
        }
    }

    /**
     * Check and puts an array for the `filters` key in
     * internal aggregation representation object.
     * If the key has a value but is not an array,
     * a warning is printed.
     * @private
     */
    _checkAnonymousFilters() {
        if (
            !setDefault(this._aggsDef, 'filters', []) &&
            !Array.isArray(this._aggsDef.filters)
        ) {
            this._warn('Do not mix named and anonymous filters!');
            this._warn('Overwriting named filters.');
            this._aggsDef.filters = [];
        }
    }

    /**
     * Sets a named filter query.
     * Does not mix with anonymous filters.
     * If anonymous filters are present, they will be overwritten.
     *
     * @param {string} bucketName Name for bucket which will collect
     * all documents that match its associated filter.
     * @param {Query} filterQuery Query to filter on. Example - term query.
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQuery` is not an instance of `Query`
     */
    filter(bucketName, filterQuery) {
        checkType(filterQuery, Query);

        this._checkNamedFilters();

        this._aggsDef.filters[bucketName] = filterQuery;
        return this;
    }

    /**
     * Assigns filters to already added filters.
     * Does not mix with anonymous filters.
     * If anonymous filters are present, they will be overwritten.
     *
     * @param {Object} filterQueries Object with multiple key value pairs
     * where bucket name is the key and filter query is the value.
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQueries` is not an instance of object
     */
    filters(filterQueries) {
        checkType(filterQueries, Object);

        this._checkNamedFilters();

        Object.assign(this._aggsDef.filters, filterQueries);
        return this;
    }

    /**
     * Appends an anonymous filter query.
     * Does not mix with named filters.
     * If named filters are present, they will be overwritten.
     *
     * @param {*} filterQuery Query to filter on. Example - term query.
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQuery` is not an instance of `Query`
     */
    anonymousFilter(filterQuery) {
        checkType(filterQuery, Query);

        this._checkAnonymousFilters();

        this._aggsDef.filters.push(filterQuery);
        return this;
    }

    /**
     * Appends an array of anonymous filters.
     * Does not mix with named filters.
     * If named filters are present, they will be overwritten.
     *
     * @param {*} filterQueries Array of queries to filter on and generate buckets.
     * Example - term query.
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `filterQueries` is not an instance of Array
     */
    anonymousFilters(filterQueries) {
        checkType(filterQueries, Array);

        this._checkAnonymousFilters();

        this._aggsDef.filters = this._aggsDef.filters.concat(filterQueries);
        return this;
    }

    /**
     * Adds a bucket to the response which will contain all documents
     * that do not match any of the given filters.
     * Returns the other bucket bucket either in a bucket
     * (named `_other_` by default) if named filters are being used,
     * or as the last bucket if anonymous filters are being used
     *
     * @param {boolean} enable `True` to return `other` bucket with documents
     * that do not match any filters and `False` to disable computation
     * @param {string=} otherBucketKey Optional key for the other bucket.
     * Default is `_other_`.
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     */
    otherBucket(enable, otherBucketKey) {
        this._aggsDef.other_bucket = enable;

        !isEmpty(otherBucketKey) && this.otherBucketKey(otherBucketKey);

        return this;
    }

    /**
     * Sets the key for the other bucket to a value other than the default `_other_`.
     * Setting this parameter will implicitly set the other_bucket parameter to true.
     * If anonymous filters are being used, setting this parameter will not make sense.
     *
     * @example
     * const agg = esb.filtersAggregation('messages')
     *     .filter('errors', esb.matchQuery('body', 'error'))
     *     .filter('warnings', esb.matchQuery('body', 'warning'))
     *     .otherBucketKey('other_messages');
     *
     * @param {string} otherBucketKey
     * @returns {FiltersAggregation} returns `this` so that calls can be chained
     */
    otherBucketKey(otherBucketKey) {
        this._aggsDef.other_bucket_key = otherBucketKey;
        return this;
    }
}

module.exports = FiltersAggregation;
