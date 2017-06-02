'use strict';

const has = require('lodash.has'),
    isNil = require('lodash.isnil'),
    isEmpty = require('lodash.isempty');

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
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)
 *
 * @example
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.termQuery('user', 'kimchy'))
 *     .from(0)
 *     .size(10);
 *
 * reqBody.toJSON();
 * {
 *   "query": { "term": { "user": "kimchy" } },
 *   "from": 0,
 *   "size": 10
 * }
 *
 * @example
 * // Query and aggregation
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.matchQuery('business_type', 'shop'))
 *     .agg(
 *         bob.geoBoundsAggregation('viewport', 'location').wrapLongitude(true)
 *     );
 *
 * @example
 * // Query, aggregation with nested
 * const reqBody = bob.requestBodySearch()
 *     .query(bob.matchQuery('crime', 'burglary'))
 *     .agg(
 *         bob.termsAggregation('towns', 'town').agg(
 *             bob.geoCentroidAggregation('centroid', 'location')
 *         )
 *     );
 */
class RequestBodySearch {
    // eslint-disable-next-line require-jsdoc
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .sort(bob.sort('post_date', 'asc'))
     *     .sort(bob.sort('user'))
     *     .sorts([
     *         bob.sort('name', 'desc'),
     *         bob.sort('age', 'desc'),
     *         bob.sort('_score')
     *     ]);
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .sort(bob.sort('post_date', 'asc'))
     *     .sort(bob.sort('user'))
     *     .sorts([
     *         bob.sort('name', 'desc'),
     *         bob.sort('age', 'desc'),
     *         bob.sort('_score')
     *     ]);
     *
     * @param {Array<Sort>} sorts Arry of sort
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
     */
    sorts(sorts) {
        sorts.forEach(sort => this.sort(sort));
        return this;
    }

    /**
     * When sorting on a field, scores are not computed. By setting `track_scores` to true,
     * scores will still be computed and tracked.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .trackScores(true)
     *     .sorts([
     *         bob.sort('post_date', 'desc'),
     *         bob.sort('name', 'desc'),
     *         bob.sort('age', 'desc')
     *     ])
     *     .query(bob.termQuery('user', 'kimchy'));

     *
     * @param {boolean} enable
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    trackScores(enable) {
        this._body.track_scores = enable;
        return this;
    }

    /**
     * Allows to control how the `_source` field is returned with every hit.
     * You can turn off `_source` retrieval by passing `false`.
     * It also accepts one(string) or more wildcard(array) patterns to control
     * what parts of the `_source` should be returned
     * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
     *
     * @example
     * // To disable `_source` retrieval set to `false`:
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .source(false);
     *
     * @example
     * // The `_source` also accepts one or more wildcard patterns to control what
     * // parts of the `_source` should be returned:
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .source('obj.*');
     *
     * // OR
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .source([ 'obj1.*', 'obj2.*' ]);
     *
     * @example
     * // For complete control, you can specify both `includes` and `excludes` patterns:
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .source({
     *         'includes': [ 'obj1.*', 'obj2.*' ],
     *         'excludes': [ '*.description' ]
     *     });
     *
     * @param {boolean|string|Array|Object} source
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    source(source) {
        this._body._source = source;
        return this;
    }

    /**
     * The `stored_fields` parameter is about fields that are explicitly marked as stored in the mapping.
     * Selectively load specific stored fields for each document represented by a search hit
     * using array of stored fields.
     * An empty array will cause only the `_id` and `_type` for each hit to be returned.
     * To disable the stored fields (and metadata fields) entirely use: `_none_`
     *
     * @example
     * // Selectively load specific stored fields for each document
     * // represented by a search hit
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .storedFields(['user', 'postDate']);
     *
     * @example
     * // Return only the `_id` and `_type` to be returned:
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .storedFields([]);
     *
     * @example
     * // Disable the stored fields (and metadata fields) entirely
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .storedFields('_none_');
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .scriptField(
     *         'test1',
     *         bob.script('inline', "doc['my_field_name'].value * 2").lang('painless')
     *     )
     *     .scriptField(
     *         'test2',
     *         bob.script('inline', "doc['my_field_name'].value * factor")
     *             .lang('painless')
     *             .params({ factor: 2.0 })
     *     );
     *
     * @example
     * // Script fields can also access the actual `_source` document and extract
     * // specific elements to be returned from it by using `params['_source']`.
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .scriptField('test1', "params['_source']['message']");
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
     * Sets given dynamic document properties to be computed using supplied `Script`s.
     *
     * Object should have `scriptFieldName` as key and `script` as the value.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .scriptFields({
     *         test1: bob
     *             .script('inline', "doc['my_field_name'].value * 2")
     *             .lang('painless'),
     *         test2: bob
     *             .script('inline', "doc['my_field_name'].value * factor")
     *             .lang('painless')
     *             .params({ factor: 2.0 })
     *     });
     *
     * @example
     * // Script fields can also access the actual `_source` document and extract
     * // specific elements to be returned from it by using `params['_source']`.
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .scriptFields({ test1: "params['_source']['message']" });
     * @param {Object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    scriptFields(scriptFields) {
        checkType(scriptFields, Object);

        Object.keys(scriptFields).forEach(scriptFieldName =>
            this.scriptField(scriptFieldName, scriptFields[scriptFieldName])
        );

        return this;
    }

    /**
     * Allows to return the doc value representation of a field for each hit.
     * Doc value fields can work on fields that are not stored.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .docvalueFields(['test1', 'test2']);
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.boolQuery().filter(bob.termQuery('brand', 'gucci')))
     *     .agg(bob.termsAggregation('colors', 'color'))
     *     .agg(
     *         bob.filterAggregation(
     *             'color_red',
     *             bob.termQuery('color', 'red')
     *         ).agg(bob.termsAggregation('models', 'model'))
     *     )
     *     .postFilter(bob.termQuery('color', 'red'));
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchAllQuery())
     *     .highlight(bob.highlight('content'));
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(
     *         bob.percolateQuery('query', 'doctype').document({
     *             message: 'The quick brown fox jumps over the lazy dog'
     *         })
     *     )
     *     .highlight(bob.highlight('message'));
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchQuery('message', 'the quick brown').operator('or'))
     *     .rescore(
     *         bob.rescore(
     *             50,
     *             bob.matchPhraseQuery('message', 'the quick brown').slop(2)
     *         )
     *             .queryWeight(0.7)
     *             .rescoreQueryWeight(1.2)
     *     );
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchQuery('message', 'the quick brown').operator('or'))
     *     .rescore(
     *         bob.rescore(
     *             100,
     *             bob.matchPhraseQuery('message', 'the quick brown').slop(2)
     *         )
     *             .queryWeight(0.7)
     *             .rescoreQueryWeight(1.2)
     *     )
     *     .rescore(
     *         bob.rescore(
     *             10,
     *             bob.functionScoreQuery().function(
     *                 bob.scriptScoreFunction(
     *                     bob.script('inline', 'Math.log10(doc.likes.value + 2)')
     *                 )
     *             )
     *         ).scoreMode('multiply')
     *     );
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .explain(true);
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
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .version(true);
     *
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
     * Alias for method `indicesBoost`.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .indexBoost('alias1', 1.4)
     *     .indexBoost('index*', 1.3);
     *
     * @param {string} index Index windcard expression or alias
     * @param {number} boost
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    indexBoost(index, boost) {
        return this.indicesBoost(index, boost);
    }

    /**
     * Allows to configure different boost level per index when searching across
     * more than one indices. This is very handy when hits coming from one index
     * matter more than hits coming from another index.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .indicesBoost('alias1', 1.4)
     *     .indicesBoost('index*', 1.3);
     *
     * @param {string} index Index windcard expression or alias
     * @param {number} boost
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    indicesBoost(index, boost) {
        if (!has(this._body, 'indices_boost')) this._body.indices_boost = [];

        this._body.indices_boost.push({
            [index]: boost
        });
        return this;
    }

    /**
     * Exclude documents which have a `_score` less than the minimum specified in `min_score`.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.termQuery('user', 'kimchy'))
     *     .minScore(0.5);
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
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchQuery('message', 'elasticsearch'))
     *     .collapse('user')
     *     .sort(bob.sort('likes'))
     *     .from(10);
     *
     * @example
     * // Wxpand each collapsed top hits with the `inner_hits` option:
     * const reqBody = bob.requestBodySearch()
     *     .query(bob.matchQuery('message', 'elasticsearch'))
     *     .collapse(
     *         'user',
     *         bob.innerHits('last_tweets')
     *             .size(5)
     *             .sort(bob.sort('date', 'asc')),
     *         4
     *     )
     *     .sort(bob.sort('likes'))
     *     .from(10);
     *
     * @param {string} field
     * @param {InnerHits=} innerHits Allows to expand each collapsed top hits.
     * @param {number=} maxConcurrentGroupRequests The number of concurrent
     * requests allowed to retrieve the inner_hits' per group
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If `innerHits` is not an instance of `InnerHits`
     */
    collapse(field, innerHits, maxConcurrentGroupRequests) {
        const collapse = (this._body.collapse = { field });

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
     * The parameter `from` must be set to `0` (or `-1`) when `search_after` is used.
     *
     * @example
     * const reqBody = bob.requestBodySearch()
     *     .size(10)
     *     .query(bob.matchQuery('message', 'elasticsearch'))
     *     .searchAfter(1463538857, 'tweet#654323')
     *     .sorts([bob.sort('date', 'asc'), bob.sort('_uid', 'desc')]);
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
