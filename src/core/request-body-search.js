'use strict';

const has = require('lodash.has'),
    isNil = require('lodash.isnil'),
    isEmpty = require('lodash.isempty'),
    invokeMap = require('lodash.invokemap');

const Query = require('./query'),
    Aggregation = require('./aggregation'),
    Rescore = require('./rescore'),
    Sort = require('./sort'),
    Highlight = require('./highlight'),
    InnerHits = require('./inner-hits');

const { checkType, recursiveToJSON } = require('./util');

/**
 * The `RequestBodySearch` object provides methods generating an elasticsearch
 * search request body. The search request can be executed with a search DSL,
 * which includes the Query DSL, within its body.
 */
class RequestBodySearch {

    /**
     * Creates an instance of `RequestBodySearch`
     */
    constructor() {
        // Maybe accept some optional parameter?
        this._body = {};
        this._aggs = [];
    }

    /**
     * Define query on the search request body using the Query DSL.
     *
     * @param {Query} query
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    query(query) {
        checkType(query, Query);

        this._body.query = query;
        return this;
    }

    /**
     * Sets aggregation on the request body.
     * Alias for method `aggregation`
     *
     * @param {Aggregation} agg Any valid `Aggregation`
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If `agg` is not an instance of `Aggregation`
     */
    agg(agg) {
        return this.aggregation(agg);
    }

    /**
     * Sets aggregation on the request body.
     *
     * @param {Aggregation} agg Any valid `Aggregation`
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If `agg` is not an instance of `Aggregation`
     */
    aggregation(agg) {
        checkType(agg, Aggregation);
        this._aggs.push(agg);
        return this;
    }

    /**
     * Sets a search timeout, bounding the search request to be executed within
     * the specified time value and bail with the hits accumulated up to that
     * point when expired.
     *
     * @param {string} timeout Duration can be specified using
     * [time units](https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#time-units)
     * Defaults to no timeout.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    timeout(timeout) {
        this._body.timeout = timeout;
        return this;
    }

    /**
     * To retrieve hits from a certain offset.
     *
     * @param {number} from Defaults to 0.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    from(from) {
        this._body.from = from;
        return this;
    }

    /**
     * The number of hits to return. If you do not care about getting some hits back
     * but only about the number of matches and/or aggregations, setting the value
     * to 0 will help performance.
     *
     * @param {number} size Defaults to 10.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    size(size) {
        this._body.size = size;
        return this;
    }

    /**
     * The maximum number of documents to collect for each shard, upon reaching which
     * the query execution will terminate early. If set, the response will have a
     * boolean field `terminated_early` to indicate whether the query execution has
     * actually terminated early.
     *
     * @param {number} numberOfDocs Maximum number of documents to collect for each shard.
     * Defaults to no limit.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    terminateAfter(numberOfDocs) {
        this._body.terminate_after = numberOfDocs;
        return this;
    }

    /**
     * Allows to add sort on specific field. The sort can be reversed as well.
     * The sort is defined on a per field level, with special field name for `_score` to
     * sort by score, and `_doc` to sort by index order.
     *
     * @param {Sort} sort
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
     */
    sort(sort) {
        checkType(sort, Sort);
        if (!has(this._body, 'sort')) this._body.sort = [];

        this._body.sort.push(sort);
        return this;
    }

    /**
     * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
     * The sort is defined on a per field level, with special field name for _score to
     * sort by score, and _doc to sort by index order.
     *
     * @param {Array<Sort>} sorts Arry of sort
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
     */
    sorts(sorts) {
        invokeMap(sorts, sort => this.sort(sort));
        return this;
    }

    /**
     * Allows to control how the `_source` field is returned with every hit.
     * You can turn off `_source` retrieval by passing `false`.
     * It also accepts one(string) or more wildcard(array) patterns to control
     * what parts of the `_source` should be returned
     * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
     *
     * @param {boolean|string|Array|Object} source
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    source(source) {
        this._body._source = source;
        return this;
    }

    /**
     * The stored_fields parameter is about fields that are explicitly marked as stored in the mapping.
     * Selectively load specific stored fields for each document represented by a search hit
     * using array of stored fields.
     * An empty array will cause only the _id and _type for each hit to be returned.
     * To disable the stored fields (and metadata fields) entirely use: '_none_'
     *
     * @param {Array|string} fields
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    storedFields(fields) {
        this._body.stored_fields = fields;
        return this;
    }

    /**
     * Computes a document property dynamically based on the supplied `Script`.
     *
     * @param {string} scriptFieldName
     * @param {string|Script} script string or instance of `Script`
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    scriptField(scriptFieldName, script) {
        if (!has(this._body, 'script_fields')) this._body.script_fields = {};

        this._body.script_fields[scriptFieldName] = { script };
        return this;
    }

    /**
     * Allows to return the doc value representation of a field for each hit.
     * Doc value fields can work on fields that are not stored.
     *
     * @param {Array} fields
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    docvalueFields(fields) {
        this._body.docvalue_fields = fields;
        return this;
    }

    /**
     * The `post_filter` is applied to the search hits at the very end of a search request,
     * after aggregations have already been calculated.
     *
     * @param {Query} filterQuery The filter to be applied after aggregation.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    postFilter(filterQuery) {
        checkType(filterQuery, Query);

        this._body.post_filter = filterQuery;
        return this;
    }

    /**
     * Allows to highlight search results on one or more fields. The implementation
     * uses either the lucene `plain` highlighter, the fast vector highlighter (`fvh`)
     * or `postings` highlighter.
     *
     * @param {Highlight} highlight
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    highlight(highlight) {
        checkType(highlight, Highlight);

        this._body.highlight = highlight;
        return this;
    }

    /**
     * Rescoring can help to improve precision by reordering just the top (eg 100 - 500)
     * documents returned by the `query` and `post_filter` phases, using a secondary
     * (usually more costly) algorithm, instead of applying the costly algorithm to
     * all documents in the index.
     *
     * @param {Rescore} rescore
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     * @throws {TypeError} If `query` is not an instance of `Rescore`
     */
    rescore(rescore) {
        checkType(rescore, Rescore);

        if (has(this._body, 'rescore')) {
            if (!Array.isArray(this._body.rescore)) {
                this._body.rescore = [this._body.rescore];
            }

            this._body.rescore.push(rescore);
        } else this._body.rescore = rescore;

        return this;
    }

    // TODO: Scroll related changes
    // Maybe only slice needs to be supported.

    /**
     * Enables explanation for each hit on how its score was computed.
     *
     * @param {boolean} enable
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    explain(enable) {
        this._body.explain = enable;
        return this;
    }

    /**
     * Returns a version for each search hit.
     * @param {boolean} enable
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    version(enable) {
        this._body.version = enable;
        return this;
    }

    /**
     * Allows to configure different boost level per index when searching across
     * more than one indices. This is very handy when hits coming from one index
     * matter more than hits coming from another index.
     *
     * @param {string} index Index windcard expression or alias
     * @param {number} boost
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    indexBoost(index, boost) {
        if (!has(this._body, 'indices_boost')) this._body.indices_boost = [];

        this._body.indices_boost.push({
            [index]: boost
        });
        return this;
    }

    /**
     * Exclude documents which have a `_score` less than the minimum specified in `min_score`.
     *
     * @param {number} score
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    minScore(score) {
        this._body.min_score = score;
        return this;
    }

    /**
     * Allows to collapse search results based on field values. The collapsing
     * is done by selecting only the top sorted document per collapse key.
     *
     * The field used for collapsing must be a single valued `keyword` or `numeric`
     * field with `doc_values` activated
     *
     * @param {string} field
     * @param {InnerHits=} innerHits Allows to expand each collapsed top hits.
     * @param {number=} maxConcurrentGroupRequests The number of concurrent
     * requests allowed to retrieve the inner_hits' per group
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If `innerHits` is not an instance of `InnerHits`
     */
    collapse(field, innerHits, maxConcurrentGroupRequests) {
        const collapse = this._body.collapse = { field };

        if (!isNil(innerHits)) {
            checkType(innerHits, InnerHits);

            collapse.inner_hits = innerHits;
            collapse.max_concurrent_group_searches = maxConcurrentGroupRequests;
        }

        return this;
    }

    /**
     * Allows to use the results from the previous page to help the retrieval
     * of the next page. The `search_after` parameter provides a live cursor.
     *
     * The parameter `from` must be set to 0 (or -1) when `search_after` is used.
     *
     * @param {Array} values The `sort values` of the last document to retrieve
     * the next page of results
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    searchAfter(values) {
        this._body.search_after = values;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the request body search
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        if (isEmpty(this._aggs)) return recursiveToJSON(this._body);

        const aggregations = Object.assign({}, ...recursiveToJSON(this._aggs));
        return Object.assign({}, recursiveToJSON(this._body), { aggregations });
    }
}

module.exports = RequestBodySearch;
