// Type definitions for elastic-builder
// Project: https://elastic-builder.js.org
// Definitions by: Suhas Karanth <sudo.suhas@gmail.com>

export = esb;

declare namespace esb {
    /**
     * The `RequestBodySearch` object provides methods generating an elasticsearch
     * search request body. The search request can be executed with a search DSL,
     * which includes the Query DSL, within its body.
     */
    export class RequestBodySearch {
        /**
         * Define query on the search request body using the Query DSL.
         *
         * @param {Query} query
         */
        query(query: Query): this;

        /**
         * Sets aggregation on the request body.
         * Alias for method `aggregation`
         *
         * @param {Aggregation} agg Any valid `Aggregation`
         * @throws {TypeError} If `agg` is not an instance of `Aggregation`
         */
        agg(agg: Aggregation): this;

        /**
         * Sets aggregation on the request body.
         *
         * @param {Aggregation} agg Any valid `Aggregation`
         * @throws {TypeError} If `agg` is not an instance of `Aggregation`
         */
        aggregation(agg: Aggregation): this;

        /**
         * Sets multiple aggregation items on the request body.
         * Alias for method `aggregations`
         *
         * @param {Array<Aggregation>} aggs Array of valid `Aggregation` items
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */
        aggs(aggs: Aggregation[]): this;

        /**
         * Sets multiple aggregation items on the request body.
         *
         * @param {Array<Aggregation>} aggs Array of valid `Aggregation` items
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */
        aggregations(aggs: Aggregation[]): this;

        /**
         * Sets suggester on the request body.
         *
         * @param {Suggester} suggest Any valid `Suggester`
         * @throws {TypeError} If `suggest` is not an instance of `Suggester`
         */
        suggest(suggest: Suggester): this;

        /**
         * Sets the global suggest text to avoid repetition for multiple suggestions.
         *
         * @param {string} txt Global suggest text
         */
        suggestText(txt: string): this;

        /**
         * Sets a search timeout, bounding the search request to be executed within
         * the specified time value and bail with the hits accumulated up to that
         * point when expired.
         *
         * @param {string} timeout Duration can be specified using time units.
         * Defaults to no timeout.
         */
        timeout(timeout: string): this;

        /**
         * To retrieve hits from a certain offset.
         *
         * @param {number} from Defaults to 0.
         */
        from(from: number): this;

        /**
         * The number of hits to return. If you do not care about getting some hits back
         * but only about the number of matches and/or aggregations, setting the value
         * to 0 will help performance.
         *
         * @param {number} size Defaults to 10.
         */
        size(size: number): this;

        /**
         * The maximum number of documents to collect for each shard, upon reaching which
         * the query execution will terminate early. If set, the response will have a
         * boolean field `terminated_early` to indicate whether the query execution has
         * actually terminated early.
         *
         * @param {number} numberOfDocs Maximum number of documents to collect for each shard.
         * Defaults to no limit.
         */
        terminateAfter(numberOfDocs: number): this;

        /**
         * Allows to add sort on specific field. The sort can be reversed as well.
         * The sort is defined on a per field level, with special field name for `_score` to
         * sort by score, and `_doc` to sort by index order.
         *
         * @param {Sort} sort
         * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
         */
        sort(sort: Sort): this;

        /**
         * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
         * The sort is defined on a per field level, with special field name for _score to
         * sort by score, and _doc to sort by index order.
         *
         * @param {Array<Sort>} sorts Arry of sort
         * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
         */
        sorts(sorts: Sort[]): this;

        /**
         * When sorting on a field, scores are not computed. By setting `track_scores` to true,
         * scores will still be computed and tracked.
         *
         * @param {boolean} enable
         */
        trackScores(enable: boolean): this;

        /**
         * The `track_total_hits` parameter allows you to control how the total number of hits
         * should be tracked. Passing `false` can increase performance in some situations.
         * (Added in elasticsearch@7)
         *
         * Pass true, false, or the upper limit of hits you want tracked.
         *
         * @param {boolean|number} enable
         */
        trackTotalHits(enable: boolean | number): this;

        /**
         * Allows to control how the `_source` field is returned with every hit.
         * You can turn off `_source` retrieval by passing `false`.
         * It also accepts one(string) or more wildcard(array) patterns to control
         * what parts of the `_source` should be returned
         * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
         *
         * @param {boolean|string|Array|Object} source
         */
        source(source: boolean | string | string[] | object): this;

        /**
         * The `stored_fields` parameter is about fields that are explicitly marked as stored in the mapping.
         * Selectively load specific stored fields for each document represented by a search hit
         * using array of stored fields.
         * An empty array will cause only the `_id` and `_type` for each hit to be returned.
         * To disable the stored fields (and metadata fields) entirely use: `_none_`
         *
         * @param {Array|string} fields
         */
        storedFields(fields: object | string): this;

        /**
         * Computes a document property dynamically based on the supplied `Script`.
         *
         * @param {string} scriptFieldName
         * @param {string|Script} script string or instance of `Script`
         */
        scriptField(scriptFieldName: string, script: string | Script): this;

        /**
         * Sets given dynamic document properties to be computed using supplied `Script`s.
         * Object should have `scriptFieldName` as key and `script` as the value.
         *
         * @param {object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
         */
        scriptFields(scriptFields: object): this;

        /**
         * Allows to return the doc value representation of a field for each hit.
         * Doc value fields can work on fields that are not stored.
         *
         * @param {Array<string>} fields
         */
        docvalueFields(fields: string[]): this;

        /**
         * The `post_filter` is applied to the search hits at the very end of a search request,
         * after aggregations have already been calculated.
         *
         * @param {Query} filterQuery The filter to be applied after aggregation.
         */
        postFilter(filterQuery: Query): this;

        /**
         * Allows to highlight search results on one or more fields. The implementation
         * uses either the lucene `plain` highlighter, the fast vector highlighter (`fvh`)
         * or `postings` highlighter.
         *
         * Note: The `postings` highlighter has been removed in elasticsearch 6.0. The `unified`
         * highlighter outputs the same highlighting when `index_options` is set to `offsets`.
         *
         * @param {Highlight} highlight
         */
        highlight(highlight: Highlight): this;

        /**
         * Rescoring can help to improve precision by reordering just the top (eg 100 - 500)
         * documents returned by the `query` and `post_filter` phases, using a secondary
         * (usually more costly) algorithm, instead of applying the costly algorithm to
         * all documents in the index.
         *
         * @param {Rescore} rescore
         * @throws {TypeError} If `query` is not an instance of `Rescore`
         */
        rescore(rescore: Rescore): this;

        /**
         * Enables explanation for each hit on how its score was computed.
         *
         * @param {boolean} enable
         */
        explain(enable: boolean): this;

        /**
         * Returns a version for each search hit.
         *
         * @param {boolean} enable
         */
        version(enable: boolean): this;

        /**
         * Allows to configure different boost level per index when searching across
         * more than one indices. This is very handy when hits coming from one index
         * matter more than hits coming from another index.
         * Alias for method `indicesBoost`.
         *
         * @param {string} index Index windcard expression or alias
         * @param {number} boost
         */
        indexBoost(index: string, boost: number): this;

        /**
         * Allows to configure different boost level per index when searching across
         * more than one indices. This is very handy when hits coming from one index
         * matter more than hits coming from another index.
         *
         * @param {string} index Index windcard expression or alias
         * @param {number} boost
         */
        indicesBoost(index: string, boost: number): this;

        /**
         * Exclude documents which have a `_score` less than the minimum specified in `min_score`.
         *
         * @param {number} score
         */
        minScore(score: number): this;

        /**
         * Allows to collapse search results based on field values. The collapsing
         * is done by selecting only the top sorted document per collapse key.
         * The field used for collapsing must be a single valued `keyword` or `numeric`
         * field with `doc_values` activated
         *
         * @param {string} field
         * @param {InnerHits=} innerHits Allows to expand each collapsed top hits.
         * @param {number=} maxConcurrentGroupRequests The number of concurrent
         * requests allowed to retrieve the inner_hits' per group
         * @throws {TypeError} If `innerHits` is not an instance of `InnerHits`
         */
        collapse(
            field: string,
            innerHits?: InnerHits,
            maxConcurrentGroupRequests?: number
        ): this;

        /**
         * Allows to use the results from the previous page to help the retrieval
         * of the next page. The `search_after` parameter provides a live cursor.
         * The parameter `from` must be set to `0` (or `-1`) when `search_after` is used.
         *
         * @param {Array<*>} values The `sort values` of the last document to retrieve
         * the next page of results
         */
        searchAfter(values: any[]): this;

        /**
         * Override default `toJSON` to return DSL representation for the request body search
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `RequestBodySearch` object provides methods generating an elasticsearch
     * search request body. The search request can be executed with a search DSL,
     * which includes the Query DSL, within its body.
     */
    export function requestBodySearch(): RequestBodySearch;

    /**
     * Base class implementation for all query types.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class should be extended and used, as validation against the class
     * type is present in various places.
     *
     * @param {string} queryType
     */
    export class Query {
        constructor(queryType: string);

        /**
         * Sets the boost value for documents matching the `Query`.
         *
         * @param {number} factor
         */
        boost(factor: number): this;

        /**
         * Sets the query name.
         *
         * @param {string} name
         */
        name(name: string): this;

        /**
         * Build and returns DSL representation of the `Query` class instance.
         *
         */
        getDSL(): object;

        /**
         * Override default `toJSON` to return DSL representation for the `query`
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The most simple query, which matches all documents, giving them all a `_score` of `1.0`.
     *
     * @extends Query
     */
    export class MatchAllQuery extends Query {
        constructor();
    }

    /**
     * The most simple query, which matches all documents, giving them all a `_score` of `1.0`.
     */
    export function matchAllQuery(): MatchAllQuery;

    /**
     * The inverse of the `match_all` query, which matches no documents.
     *
     * @extends Query
     */
    export class MatchNoneQuery extends Query {
        constructor();
    }

    /**
     * The inverse of the `match_all` query, which matches no documents.
     */
    export function matchNoneQuery(): MatchNoneQuery;

    /**
     * The `FullTextQueryBase` provides support for common options used across
     * various full text query implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string=} queryString The query string
     * @extends Query
     */
    class FullTextQueryBase extends Query {
        constructor(queryType: string, queryString?: string);

        /**
         * Set the analyzer to control which analyzer will perform the analysis process on the text
         *
         * @param {string} analyzer
         */
        analyzer(analyzer: string): this;

        /**
         * Sets the value controlling how many "should" clauses in the resulting boolean
         * query should match. It can be an absolute value (2), a percentage (30%)
         * or a combination of both. For Common Terms Query when specifying different
         * `minimum_should_match` for low and high frequency terms, an object with the
         * keys `low_freq` and `high_freq` can be used.
         *
         * @param {string|number|Object} minimumShouldMatch
         * Note: Object notation can only be used with Common Terms Query.
         */
        minimumShouldMatch(minimumShouldMatch: string | number | object): this;

        /**
         * Sets the query string.
         *
         * @param {string} queryString
         */
        query(queryString: string): this;
    }

    /**
     * The `MonoFieldQueryBase` provides support for common options used across
     * various full text query implementations with single search field.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends FullTextQueryBase
     */
    class MonoFieldQueryBase extends FullTextQueryBase {
        constructor(queryType: string, field?: string, queryString?: string);

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Override default `toJSON` to return DSL representation of the Full text query
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * `match` query accepts text/numerics/dates, analyzes them, and constructs a query.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends MonoFieldQueryBase
     */
    export class MatchQuery extends MonoFieldQueryBase {
        constructor(field?: string, queryString?: string);

        /**
         * The operator to be used in the boolean query which is constructed
         * by analyzing the text provided. The `operator` flag can be set to `or` or
         * `and` to control the boolean clauses (defaults to `or`).
         *
         * @param {string} operator Can be `and`/`or`. Default is `or`.
         */
        operator(operator: 'and' | 'or'): this;

        /**
         * Sets the `lenient` parameter which allows to ignore exceptions caused
         * by data-type mismatches such as trying to query a numeric field with a
         * text query string when set to `true`.
         *
         * @param {boolean} enable Defaules to `false`
         */
        lenient(enable: boolean): this;

        /**
         * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
         * the number of one character changes that need to be made to one string to make it
         * the same as another string.
         *
         * @param {number|string} factor Can be specified either as a number, or the maximum
         * number of edits, or as `AUTO` which generates an edit distance based on the length
         * of the term.
         */
        fuzziness(factor: number | string): this;

        /**
         * Sets the prefix length for a fuzzy prefix `MatchQuery`
         *
         * @param {number} len
         */
        prefixLength(len: number): this;

        /**
         * Sets the max expansions for a fuzzy prefix `MatchQuery`
         *
         * @param {number} limit
         */
        maxExpansions(limit: number): this;

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;

        /**
         * Sets the fuzzy rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
         */
        fuzzyRewrite(method: string): this;

        /**
         * Fuzzy transpositions (`ab` → `ba`) are allowed by default but can be disabled
         * by setting `fuzzy_transpositions` to false.
         *
         * @param {boolean} enable
         */
        fuzzyTranspositions(enable: boolean): this;

        /**
         * If the analyzer used removes all tokens in a query like a `stop` filter does,
         * the default behavior is to match no documents at all. In order to change that
         * the `zero_terms_query` option can be used, which accepts `none` (default) and `all`
         * which corresponds to a `match_all` query.
         *
         * @param {string} behavior A no match action, `all` or `none`. Default is `none`.
         */
        zeroTermsQuery(behavior: 'all' | 'none'): this;

        /**
         * Allows specifying an absolute or relative document frequency where high frequency
         * terms are moved into an optional subquery and are only scored if one of the
         * low frequency (below the cutoff) terms in the case of an `or` operator or
         * all of the low frequency terms in the case of an `and` operator match.
         *
         * @param {number} frequency It can either be relative to the total number of documents
         * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
         */
        cutoffFrequency(frequency: number): this;
    }

    /**
     * `match` query accepts text/numerics/dates, analyzes them, and constructs a query.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    export function matchQuery(
        field?: string,
        queryString?: string
    ): MatchQuery;

    /**
     * The `MatchPhraseQueryBase` provides support for common options used across
     * various bucket match phrase query implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string} refUrl
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends MonoFieldQueryBase
     */
    class MatchPhraseQueryBase extends MonoFieldQueryBase {
        constructor(
            queryType: string,
            refUrl: string,
            field?: string,
            queryString?: string
        );

        /**
         * @override
         * @throws {Error} This method cannot be called on `MatchPhraseQueryBase`
         */
        minimumShouldMatch(): never;

        /**
         * Configures the `slop`(default is 0) for matching terms in any order.
         * Transposed terms have a slop of 2.
         * @param {number} slop A positive integer value, defaults is 0.
         */
        slop(slop: number): this;
    }

    /**
     * The `match_phrase` query analyzes the text and creates a `phrase` query out of
     * the analyzed text.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends MatchPhraseQueryBase
     */
    export class MatchPhraseQuery extends MatchPhraseQueryBase {
        constructor(field?: string, queryString?: string);
    }

    /**
     * The `match_phrase` query analyzes the text and creates a `phrase` query out of
     * the analyzed text.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    export function matchPhraseQuery(
        field?: string,
        queryString?: string
    ): MatchPhraseQuery;

    /**
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends MatchPhraseQueryBase
     */
    export class MatchPhrasePrefixQuery extends MatchPhraseQueryBase {
        constructor(field?: string, queryString?: string);

        /**
         * Control to how many prefixes the last term will be expanded.
         *
         * @param {number} limit Defaults to 50.
         */
        maxExpansions(limit: number): this;
    }

    /**
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    export function matchPhrasePrefixQuery(
        field?: string,
        queryString?: string
    ): MatchPhrasePrefixQuery;

    /**
     * A `MultiMatchQuery` query builds further on top of the
     * `MultiMatchQuery` by allowing multiple fields to be specified.
     * The idea here is to allow to more easily build a concise match type query
     * over multiple fields instead of using a relatively more expressive query
     * by using multiple match queries within a bool query.
     *
     * @param {Array<string>|string=} fields The fields to be queried
     * @param {string=} queryString The query string
     * @extends FullTextQueryBase
     */
    export class MultiMatchQuery extends FullTextQueryBase {
        constructor(fields?: string[] | string, queryString?: string);

        /**
         * Appends given field to the list of fields to search against.
         * Fields can be specified with wildcards.
         * Individual fields can be boosted with the caret (^) notation.
         * Example - `"subject^3"`
         *
         * @param {string} field One of the fields to be queried
         */
        field(field: string): this;

        /**
         * Appends given fields to the list of fields to search against.
         * Fields can be specified with wildcards.
         * Individual fields can be boosted with the caret (^) notation.
         *
         * @param {Array<string>} fields The fields to be queried
         */
        fields(fields: string[]): this;

        /**
         * Sets the type of multi match query. Valid values are:
         * - `best_fields` - (default) Finds documents which match any field,
         * but uses the `_score` from the best field.
         * - `most_fields` - Finds documents which match any field and combines
         * the `_score` from each field.
         * - `cross_fields` - Treats fields with the same `analyzer` as though
         * they were one big field. Looks for each word in *any* field
         * - `phrase` - Runs a `match_phrase` query on each field and combines
         * the `_score` from each field.
         * - `phrase_prefix` - Runs a `match_phrase_prefix` query on each field
         * and combines the `_score` from each field.
         * - `bool_prefix` - (added in v7.2) Creates a match_bool_prefix query on each field and
         * combines the _score from each field.
         *
         * @param {string} type Can be one of `best_fields`, `most_fields`,
         * `cross_fields`, `phrase`, `phrase_prefix` and `bool_prefix`. Default is `best_fields`.
         */
        type(
            type:
                | 'best_fields'
                | 'most_fields'
                | 'cross_fields'
                | 'phrase'
                | 'phrase_prefix'
                | 'bool_prefix'
        ): this;

        /**
         * The tie breaker value. The tie breaker capability allows results
         * that include the same term in multiple fields to be judged better than
         * results that include this term in only the best of those multiple
         * fields, without confusing this with the better case of two different
         * terms in the multiple fields. Default: `0.0`.
         *
         * @param {number} factor
         */
        tieBreaker(factor: number): this;

        /**
         * The operator to be used in the boolean query which is constructed
         * by analyzing the text provided. The `operator` flag can be set to `or` or
         * `and` to control the boolean clauses (defaults to `or`).
         *
         * @param {string} operator Can be `and`/`or`. Default is `or`.
         */
        operator(operator: 'and' | 'or'): this;

        /**
         * Sets the `lenient` parameter which allows to ignore exceptions caused
         * by data-type mismatches such as trying to query a numeric field with a
         * text query string when set to `true`.
         *
         * @param {boolean} enable Defaules to `false`
         */
        lenient(enable: boolean): this;

        /**
         * Configures the `slop`(default is 0) for matching terms in any order.
         * Transposed terms have a slop of 2.
         *
         * @param {number} slop A positive integer value, defaults is 0.
         */
        slop(slop: number): this;

        /**
         * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
         * the number of one character changes that need to be made to one string to make it
         * the same as another string.
         * The `fuzziness` parameter cannot be used with the `phrase`, `phrase_prefix`
         * or `cross_fields` type.
         *
         * @param {number|string} factor Can be specified either as a number, or the maximum
         * number of edits, or as `AUTO` which generates an edit distance based on the length
         * of the term.
         */
        fuzziness(factor: number | string): this;

        /**
         * Sets the prefix length for a fuzzy prefix `MultiMatchQuery`
         *
         * @param {number} len
         */
        prefixLength(len: number): this;

        /**
         * Sets the max expansions for a fuzzy prefix `MultiMatchQuery`
         *
         * @param {number} limit
         */
        maxExpansions(limit: number): this;

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;

        /**
         * Sets the fuzzy rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
         */
        fuzzyRewrite(method: string): this;

        /**
         * If the analyzer used removes all tokens in a query like a `stop` filter does,
         * the default behavior is to match no documents at all. In order to change that
         * the `zero_terms_query` option can be used, which accepts `none` (default) and `all`
         * which corresponds to a `match_all` query.
         *
         * @param {string} behavior A no match action, `all` or `none`. Default is `none`.
         */
        zeroTermsQuery(behavior: 'all' | 'none'): this;

        /**
         * Allows specifying an absolute or relative document frequency where high frequency
         * terms are moved into an optional subquery and are only scored if one of the
         * low frequency (below the cutoff) terms in the case of an `or` operator or
         * all of the low frequency terms in the case of an `and` operator match.
         *
         * @param {number} frequency It can either be relative to the total number of documents
         * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
         */
        cutoffFrequency(frequency: number): this;
    }

    /**
     * A `MultiMatchQuery` query builds further on top of the
     * `MultiMatchQuery` by allowing multiple fields to be specified.
     * The idea here is to allow to more easily build a concise match type query
     * over multiple fields instead of using a relatively more expressive query
     * by using multiple match queries within a bool query.
     *
     * @param {Array<string>|string=} fields The fields to be queried
     * @param {string=} queryString The query string
     */
    export function multiMatchQuery(
        fields?: string[] | string,
        queryString?: string
    ): MultiMatchQuery;

    /**
     * The `common` terms query is a modern alternative to stopwords which
     * improves the precision and recall of search results (by taking
     * stopwords into account), without sacrificing performance.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     * @extends MonoFieldQueryBase
     */
    export class CommonTermsQuery extends MonoFieldQueryBase {
        constructor(field?: string, queryString?: string);

        /**
         * Allows specifying an absolute or relative document frequency where high frequency
         * terms are moved into an optional subquery and are only scored if one of the
         * low frequency (below the cutoff) terms in the case of an `or` operator or
         * all of the low frequency terms in the case of an `and` operator match.
         *
         * @param {number} frequency It can either be relative to the total number of documents
         * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
         */
        cutoffFrequency(frequency: number): this;

        /**
         * The operator to be used on low frequency terms in the boolean query
         * which is constructed by analyzing the text provided. The `operator` flag
         * can be set to `or` or `and` to control the boolean clauses (defaults to `or`).
         *
         * @param {string} operator Can be `and`/`or`. Default is `or`.
         */
        lowFreqOperator(operator: 'and' | 'or'): this;

        /**
         * The operator to be used on high frequency terms in the boolean query
         * which is constructed by analyzing the text provided. The `operator` flag
         * can be set to `or` or `and` to control the boolean clauses (defaults to `or`).
         *
         * @param {string} operator Can be `and`/`or`. Default is `or`.
         */
        highFreqOperator(operator: 'and' | 'or'): this;

        /**
         * Sets the value controlling how many "should" clauses in the resulting boolean
         * query should match for low frequency terms. It can be an absolute value (2),
         * a percentage (30%) or a combination of both.
         *
         * @param {string|number} lowFreqMinMatch
         */
        lowFreq(lowFreqMinMatch: string | number): this;

        /**
         * Sets the value controlling how many "should" clauses in the resulting boolean
         * query should match for high frequency terms. It can be an absolute value (2),
         * a percentage (30%) or a combination of both.
         *
         * @param {string|number} highFreqMinMatch
         */
        highFreq(highFreqMinMatch: string | number): this;

        /**
         * Enables or disables similarity coordinate scoring of documents
         * commoning the `CommonTermsQuery`. Default: `false`.
         *
         * NOTE: This has been removed in elasticsearch 6.0. If provided,
         * it will be ignored and a deprecation warning will be issued.
         *
         * @param {boolean} enable
         */
        disableCoord(enable: boolean): this;
    }

    /**
     * The `common` terms query is a modern alternative to stopwords which
     * improves the precision and recall of search results (by taking
     * stopwords into account), without sacrificing performance.
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    export function commonTermsQuery(
        field?: string,
        queryString?: string
    ): CommonTermsQuery;

    /**
     * The `QueryStringQueryBase` provides support for common options used across
     * full text query implementations `QueryStringQuery` and `SimpleQueryStringQuery`.
     * A query that uses a query parser in order to parse its content.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string} refUrl
     * @param {string=} queryString The actual query to be parsed.
     * @extends FullTextQueryBase
     */
    class QueryStringQueryBase extends FullTextQueryBase {
        constructor(queryType: string, refUrl: string, queryString?: string);

        /**
         * Appends given field to the list of fields to search against.
         * Fields can be specified with wildcards.
         * Individual fields can be boosted with the caret (^) notation.
         * Example - `"subject^3"`
         *
         * @param {string} field One of the fields to be queried
         */
        field(field: string): this;

        /**
         * Appends given fields to the list of fields to search against.
         * Fields can be specified with wildcards.
         * Individual fields can be boosted with the caret (^) notation.
         * Example - `[ "subject^3", "message" ]`
         *
         * @param {Array<string>} fields The fields to be queried
         */
        fields(fields: string[]): this;

        /**
         * The default operator used if no explicit operator is specified.
         * For example, with a default operator of `OR`, the query `capital of Hungary`
         * is translated to `capital OR of OR Hungary`, and with default operator of AND,
         * the same query is translated to `capital AND of AND Hungary`.
         * The default value is OR.
         *
         * @param {string} operator Can be `AND`/`OR`. Default is `OR`.
         */
        defaultOperator(operator: 'AND' | 'OR'): this;

        /**
         * By default, wildcards terms in a query string are not analyzed.
         * By setting this value to `true`, a best effort will be made to analyze those as well.
         *
         * @param {boolean} enable
         */
        analyzeWildcard(enable: boolean): this;

        /**
         * Sets the `lenient` parameter which allows to ignore exceptions caused
         * by data-type mismatches such as trying to query a numeric field with a
         * text query string when set to `true`.
         *
         * @param {boolean} enable Defaules to `false`
         */
        lenient(enable: boolean): this;

        /**
         * A suffix to append to fields for quoted parts of the query string.
         * This allows to use a field that has a different analysis chain for exact matching.
         *
         * @param {string} suffix
         */
        quoteFieldSuffix(suffix: string): this;

        /**
         * Perform the query on all fields detected in the mapping that can be queried.
         * Will be used by default when the `_all` field is disabled and
         * no `default_field` is specified (either in the index settings or
         * in the request body) and no `fields` are specified.
         *
         * @param {boolean} enable
         */
        allFields(enable: boolean): this;
    }

    /**
     * A query that uses a query parser in order to parse its content.
     *
     * @param {string=} queryString The actual query to be parsed.
     * @extends QueryStringQueryBase
     */
    export class QueryStringQuery extends QueryStringQueryBase {
        constructor(queryString?: string);

        /**
         * The default field for query terms if no prefix field is specified.
         * Defaults to the `index.query.default_field` index settings, which
         * in turn defaults to `_all`.
         *
         * @param {string} field
         */
        defaultField(field: string): this;

        /**
         * When set, `*` or `?` are allowed as the first character. Defaults to `true`.
         *
         * @param {boolean} enable
         */
        allowLeadingWildcard(enable: boolean): this;

        /**
         * Set to true to enable position increments in result queries. Defaults to true.
         *
         * @param {boolean} enable
         */
        enablePositionIncrements(enable: boolean): this;

        /**
         * Controls the number of terms fuzzy queries will expand to. Defaults to `50`.
         *
         * @param {number} limit
         */
        fuzzyMaxExpansions(limit: number): this;

        /**
         * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
         * the number of one character changes that need to be made to one string to make it
         * the same as another string. Defaults to `AUTO`.
         *
         * @param {number|string} factor Can be specified either as a number, or the maximum
         * number of edits, or as `AUTO` which generates an edit distance based on the length
         * of the term. Defaults to `AUTO`.
         */
        fuzziness(factor: number | string): this;

        /**
         * Set the prefix length for fuzzy queries. Default is `0`.
         *
         * @param {number} len
         */
        fuzzyPrefixLength(len: number): this;

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;

        /**
         * Sets the fuzzy rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
         */
        fuzzyRewrite(method: string): this;

        /**
         * Sets the default slop for phrases. If zero, then exact phrase matches are required.
         * Default value is 0.
         *
         * @param {number} slop A positive integer value, defaults is 0.
         */
        phraseSlop(slop: number): this;

        /**
         * Auto generate phrase queries. Defaults to `false`.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. If provided, it will be
         * ignored and issue a deprecation warning.
         *
         * @param {boolean} enable
         */
        autoGeneratePhraseQueries(enable: boolean): this;

        /**
         * Limit on how many automaton states regexp queries are allowed to create.
         * This protects against too-difficult (e.g. exponentially hard) regexps.
         * Defaults to 10000.
         *
         * @param {number} limit
         */
        maxDeterminizedStates(limit: number): this;

        /**
         * Time Zone to be applied to any range query related to dates.
         *
         * @param {string} zone
         */
        timeZone(zone: string): this;

        /**
         * Whether query text should be split on whitespace prior to analysis.
         * Instead the queryparser would parse around only real operators.
         * Default is `false`. It is not allowed to set this option to `false`
         * if `auto_generate_phrase_queries` is already set to `true`.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. If provided, it will be
         * ignored and issue a deprecation warning. The `query_string` query now splits on operator
         * only.
         *
         * @param {string} enable
         */
        splitOnWhitespace(enable: string): this;

        /**
         * Should the queries be combined using `dis_max` (set it to `true`),
         * or a bool query (set it to `false`). Defaults to `true`.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. If provided, it will be
         * ignored and issue a deprecation warning. The `tie_breaker` parameter must be used
         * instead.
         *
         * @param {boolean} enable
         */
        useDisMax(enable: boolean): this;

        /**
         * When using `dis_max`, the disjunction max tie breaker. Defaults to `0`.
         *
         * @param {number} factor
         */
        tieBreaker(factor: number): this;

        /**
         * Sets the quote analyzer name used to analyze the `query`
         * when in quoted text.
         *
         * @param {string} analyzer A valid analyzer name.
         */
        quoteAnalyzer(analyzer: string): this;

        /**
         * If they query string should be escaped or not.
         *
         * @param {boolean} enable
         */
        escape(enable: boolean): this;
    }

    /**
     * A query that uses a query parser in order to parse its content.
     *
     * @param {string=} queryString The actual query to be parsed.
     */
    export function queryStringQuery(queryString?: string): QueryStringQuery;

    /**
     * A query that uses the `SimpleQueryParser` to parse its context.
     * Unlike the regular `query_string` query, the `simple_query_string` query
     * will never throw an exception, and discards invalid parts of the query.
     *
     * @param {string=} queryString The query string
     * @extends QueryStringQueryBase
     */
    export class SimpleQueryStringQuery extends QueryStringQueryBase {
        constructor(queryString?: string);

        /**
         * `simple_query_string` support multiple flags to specify which parsing features
         * should be enabled. It is specified as a `|`-delimited string.
         *
         * @param {string} flags `|` delimited string. The available flags are: `ALL`, `NONE`,
         * `AND`, `OR`, `NOT`, `PREFIX`, `PHRASE`, `PRECEDENCE`, `ESCAPE`, `WHITESPACE`,
         * `FUZZY`, `NEAR`, and `SLOP`.
         */
        flags(flags: string): this;
    }

    /**
     * A query that uses the `SimpleQueryParser` to parse its context.
     * Unlike the regular `query_string` query, the `simple_query_string` query
     * will never throw an exception, and discards invalid parts of the query.
     *
     * @param {string=} queryString The query string
     */
    export function simpleQueryStringQuery(
        queryString?: string
    ): SimpleQueryStringQuery;

    /**
     * The `ValueTermQueryBase` provides support for common options used across
     * various term level query implementations.
     *
     * @param {string} queryType
     * @param {string=} field The document field to query against
     * @param {string=} value The query string
     * @extends Query
     */
    class ValueTermQueryBase extends Query {
        constructor(queryType: string, field?: string, value?: string);

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Sets the query string.
         *
         * @param {string|number|boolean} queryVal
         */
        value(queryVal: string | number | boolean): this;
        
        /**
         * Allows ASCII case insensitive matching of the value with the indexed
         * field values when set to true. 
         *
         * NOTE: Only available in Elasticsearch v7.10.0+
         *
         * @param enable 
         */
        caseInsensitive(enable: boolean): this;

    }

    /**
     * The `term` query finds documents that contain the *exact* term specified
     * in the inverted index.
     *
     * @param {string=} field
     * @param {string|number|boolean=} queryVal
     * @extends ValueTermQueryBase
     */
    export class TermQuery extends ValueTermQueryBase {
        constructor(field?: string, queryVal?: string | number | boolean);
    }

    /**
     * The `term` query finds documents that contain the *exact* term specified
     * in the inverted index.
     *
     * @param {string=} field
     * @param {string|number|boolean=} queryVal
     */
    export function termQuery(
        field?: string,
        queryVal?: string | number | boolean
    ): TermQuery;

    /**
     * Filters documents that have fields that match any of the provided terms (**not analyzed**).
     *
     * @param {string=} field
     * @param {Array|string|number|boolean=} values
     * @extends Query
     */
    export class TermsQuery extends Query {
        constructor(
            field?: string,
            values?: string[] | string | number | boolean
        );

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Append given value to list of values to run Terms Query with.
         *
         * @param {string|number|boolean} value
         */
        value(value: string | number | boolean): this;

        /**
         * Specifies the values to run query for.
         *
         * @param {Array<string|number|boolean>} values Values to run query for.
         * @throws {TypeError} If `values` is not an instance of Array
         */
        values(values: string[] | number[] | boolean[]): this;

        /**
         * Convenience method for setting term lookup options.
         * Valid options are `index`, `type`, `id`, `path`and `routing`
         *
         * @param {object} lookupOpts An object with any of the keys `index`,
         * `type`, `id`, `path` and `routing`.
         */
        termsLookup(lookupOpts: object): this;

        /**
         * The index to fetch the term values from. Defaults to the current index.
         *
         * Note: The `index` parameter in the terms filter, used to look up terms in a dedicated
         * index is mandatory in elasticsearch 6.0. Previously, the index defaulted to the index
         * the query was executed on. In 6.0, this index must be explicitly set in the request.
         *
         * @param {string} idx The index to fetch the term values from.
         * Defaults to the current index.
         */
        index(idx: string): this;

        /**
         * The type to fetch the term values from.
         *
         * @param {string} type
         */
        type(type: string): this;

        /**
         * The id of the document to fetch the term values from.
         *
         * @param {string} id
         */
        id(id: string): this;

        /**
         * The field specified as path to fetch the actual values for the `terms` filter.
         *
         * @param {string} path
         */
        path(path: string): this;

        /**
         * A custom routing value to be used when retrieving the external terms doc.
         *
         * @param {string} routing
         */
        routing(routing: string): this;
    }

    /**
     * Filters documents that have fields that match any of the provided terms (**not analyzed**).
     *
     * @param {string=} field
     * @param {Array<string|number|boolean>|string|number|boolean=} values
     */
    export function termsQuery(
        field?: string,
        values?: string[] | number[] | boolean[] | string | number | boolean
    ): TermsQuery;

    /**
     * Returns any documents that match with at least one or more of the provided
     * terms. The terms are not analyzed and thus must match exactly. The number of
     * terms that must match varies per document and is either controlled by a
     * minimum should match field or computed per document in a minimum should match
     * script.
     *
     * NOTE: This query was added in elasticsearch v6.1.
     *
     * @param {string=} field
     * @param {Array<string|number|boolean>|string|number=} terms
     *
     * @extends Query
     */
    export class TermsSetQuery extends Query {
        constructor(
            field?: string,
            terms?: string[] | number[] | boolean[] | string | number
        );

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Append given term to set of terms to run Terms Set Query with.
         *
         * @param {string|number|boolean} term
         */
        term(term: string | number | boolean): this;

        /**
         * Specifies the terms to run query for.
         *
         * @param {Array<string|number|boolean>} terms Terms set to run query for.
         * @throws {TypeError} If `terms` is not an instance of Array
         */
        terms(terms: string[] | number[] | boolean[]): this;

        /**
         * Controls the number of terms that must match per document.
         *
         * @param {string} fieldName
         */
        minimumShouldMatchField(fieldName: string): this;

        /**
         * Sets the `script` for query. It controls how many terms are required to
         * match in a more dynamic way.
         *
         * The `params.num_terms` parameter is available in the script to indicate
         * the number of terms that have been specified.
         *
         * @param {Script|string|Object} script
         * @returns {ScriptQuery} returns `this` so that calls can be chained.
         */
        minimumShouldMatchScript(script: Script | string | object): this;
    }

    /**
     * Returns any documents that match with at least one or more of the provided
     * terms. The terms are not analyzed and thus must match exactly. The number of
     * terms that must match varies per document and is either controlled by a
     * minimum should match field or computed per document in a minimum should match
     * script.
     *
     * NOTE: This query was added in elasticsearch v6.1.
     *
     * @param {string=} field
     * @param {Array|string|number=} terms
     */
    export function termsSetQuery(
        field?: string,
        terms?: string[] | number[] | boolean[] | string | number
    ): TermsSetQuery;

    /**
     * Interface-like class used to group and identify various implementations of
     * multi term queries:
     * - Wildcard Query
     * - Fuzzy Query
     * - Prefix Query
     * - Range Query
     * - Regexp Query
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     * @extends ValueTermQueryBase
     */
    class MultiTermQueryBase extends ValueTermQueryBase {}

    /**
     * Matches documents with fields that have terms within a certain range.
     *
     * @extends MultiTermQueryBase
     */
    export class RangeQuery extends MultiTermQueryBase {
        constructor(field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on RangeQuery
         */
        value(): never;

        /**
         * Greater-than or equal to
         *
         * @param {string|number} val
         */
        gte(val: string | number): this;

        /**
         * Less-than or equal to
         *
         * @param {string|number} val
         */
        lte(val: string | number): this;

        /**
         * Greater-than
         *
         * @param {string|number} val
         */
        gt(val: string | number): this;

        /**
         * Less-than
         *
         * @param {string|number} val
         */
        lt(val: string | number): this;

        /**
         * The lower bound. Defaults to start from the first.
         *
         * @param {string|number} val The lower bound value, type depends on field type
         */
        from(val: string | number): this;

        /**
         * The upper bound. Defaults to unbounded.
         *
         * @param {string|number} val The upper bound value, type depends on field type
         */
        to(val: string | number): this;

        /**
         * Should the first from (if set) be inclusive or not. Defaults to `true`
         *
         * @param {boolean} enable `true` to include, `false` to exclude
         */
        includeLower(enable: boolean): this;

        /**
         * Should the last to (if set) be inclusive or not. Defaults to `true`.
         *
         * @param {boolean} enable `true` to include, `false` to exclude
         */
        includeUpper(enable: boolean): this;

        /**
         * Time Zone to be applied to any range query related to dates.
         *
         * @param {string} zone
         */
        timeZone(zone: string): this;

        /**
         * Sets the format expression for parsing the upper and lower bounds.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @param {string} fmt Format for parsing upper and lower bounds.
         */
        format(fmt: string): this;

        /**
         * Sets the relationship between Query and indexed data
         * that will be used to determine if a Document should be matched or not.
         *
         * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
         * or `INTERSECTS`(default)
         */
        relation(
            relation: 'WITHIN' | 'CONTAINS' | 'DISJOINT' | 'INTERSECTS'
        ): this;

        /**
         * Override default `toJSON` to return DSL representation of the `range` query
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Matches documents with fields that have terms within a certain range.
     */
    export function rangeQuery(field?: string): RangeQuery;

    /**
     * Returns documents that have at least one non-`null` value in the original field
     *
     * @param {string=} field
     * @extends Query
     */
    export class ExistsQuery extends Query {
        constructor(field?: string);

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;
    }

    /**
     * Returns documents that have at least one non-`null` value in the original field
     *
     * @param {string=} field
     */
    export function existsQuery(field?: string): ExistsQuery;

    /**
     * Matches documents that have fields containing terms with a specified prefix (**not analyzed**).
     *
     * @param {string=} field
     * @param {string|number=} value
     * @extends MultiTermQueryBase
     */
    export class PrefixQuery extends MultiTermQueryBase {
        constructor(field?: string, value?: string | number);

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;
    }

    /**
     * Matches documents that have fields containing terms with a specified prefix (**not analyzed**).
     *
     * @param {string=} field
     * @param {string|number=} value
     */
    export function prefixQuery(
        field?: string,
        value?: string | number
    ): PrefixQuery;

    /**
     * Matches documents that have fields matching a wildcard expression (**not analyzed**).
     *
     * @param {string=} field
     * @param {string=} value
     * @extends MultiTermQueryBase
     */
    export class WildcardQuery extends MultiTermQueryBase {
        constructor(field?: string, value?: string);

        /**
         * Allow case insensitive matching or not (added in 7.10.0).
         * Defaults to false.
         *
         * @param {boolean} caseInsensitive
         */
        caseInsensitive(caseInsensitive: boolean): this;

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;
    }

    /**
     * Matches documents that have fields matching a wildcard expression (**not analyzed**).
     *
     * @param {string=} field
     * @param {string=} value
     */
    export function wildcardQuery(
        field?: string,
        value?: string
    ): WildcardQuery;

    /**
     * Query for regular expression term queries. Elasticsearch will apply the regexp
     * to the terms produced by the tokenizer for that field, and not to the original
     * text of the field.
     *
     * @param {string=} field
     * @param {string|number=} value
     * @extends MultiTermQueryBase
     */
    export class RegexpQuery extends MultiTermQueryBase {
        constructor(field?: string, value?: string | number);

        /**
         * Set special flags. Possible flags are `ALL` (default),
         * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
         *
         * @param {string} flags `|` separated flags. Possible flags are `ALL` (default),
         * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
         */
        flags(flags: string): this;

        /**
         * Allow case insensitive matching or not (added in 7.10.0).
         * Defaults to false.
         *
         * @param {boolean} caseInsensitive
         */
        caseInsensitive(caseInsensitive: boolean): this;

        /**
         * Limit on how many automaton states regexp queries are allowed to create.
         * This protects against too-difficult (e.g. exponentially hard) regexps.
         * Defaults to 10000.
         *
         * @param {number} limit
         */
        maxDeterminizedStates(limit: number): this;

        /**
         * Sets the rewrite method. Valid values are:
         * - `constant_score` - tries to pick the best constant-score rewrite
         *  method based on term and document counts from the query.
         *  Synonyms - `constant_score_auto`, `constant_score_filter`
         * - `scoring_boolean` - translates each term into boolean should and
         *  keeps the scores as computed by the query
         * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
         *  are computed.
         * - `constant_score_filter` - first creates a private Filter, by visiting
         *  each term in sequence and marking all docs for that term
         * - `top_terms_boost_N` - first translates each term into boolean should
         *  and scores are only computed as the boost using the top N
         *  scoring terms. Replace N with an integer value.
         * - `top_terms_N` - first translates each term into boolean should
         *  and keeps the scores as computed by the query. Only the top N
         *  scoring terms are used. Replace N with an integer value.
         *
         * Default is `constant_score`.
         * This is an advanced option, use with care.
         *
         * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
         * `constant_score_filter` (synonyms for `constant_score`) have been removed in
         * elasticsearch 6.0.
         *
         * @param {string} method The rewrite method as a string.
         * @throws {Error} If the given `rewrite` method is not valid.
         */
        rewrite(method: string): this;
    }

    /**
     * Query for regular expression term queries. Elasticsearch will apply the regexp
     * to the terms produced by the tokenizer for that field, and not to the original
     * text of the field.
     *
     * @param {string=} field
     * @param {string|number=} value
     */
    export function regexpQuery(
        field?: string,
        value?: string | number
    ): RegexpQuery;

    /**
     * The fuzzy query generates all possible matching terms that are within
     * the maximum edit distance specified in `fuzziness` and then checks
     * the term dictionary to find out which of those generated terms
     * actually exist in the index.
     * The fuzzy query uses similarity based on Levenshtein edit distance.
     *
     * @param {string=} field
     * @param {string|number=} value
     * @extends MultiTermQueryBase
     */
    export class FuzzyQuery extends MultiTermQueryBase {
        constructor(field?: string, value?: string | number);

        /**
         * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
         * the number of one character changes that need to be made to one string to make it
         * the same as another string.
         *
         * @param {number|string} factor Can be specified either as a number, or the maximum
         * number of edits, or as `AUTO` which generates an edit distance based on the length
         * of the term.
         */
        fuzziness(factor: number | string): this;

        /**
         * The number of initial characters which will not be “fuzzified”.
         * This helps to reduce the number of terms which must be examined. Defaults to `0`.
         *
         * @param {number} len Characters to skip fuzzy for. Defaults to `0`.
         */
        prefixLength(len: number): this;

        /**
         * The maximum number of terms that the fuzzy query will expand to. Defaults to `50`.
         *
         * @param {number} limit Limit for fuzzy query expansion. Defaults to `50`.
         */
        maxExpansions(limit: number): this;

        /**
         * Transpositions (`ab` → `ba`) are allowed by default but can be disabled
         * by setting `transpositions` to false.
         *
         * @param {boolean} enable
         */
        transpositions(enable: boolean): this;
    }

    /**
     * The fuzzy query generates all possible matching terms that are within
     * the maximum edit distance specified in `fuzziness` and then checks
     * the term dictionary to find out which of those generated terms
     * actually exist in the index.
     * The fuzzy query uses similarity based on Levenshtein edit distance.
     *
     * @param {string=} field
     * @param {string|number=} value
     */
    export function fuzzyQuery(
        field?: string,
        value?: string | number
    ): FuzzyQuery;

    /**
     * Filters documents matching the provided document / mapping type.
     *
     * @param {string=} type The elasticsearch doc type
     * @extends Query
     */
    export class TypeQuery extends Query {
        constructor(type?: string);

        /**
         * Sets the elasticsearch doc type to query on.
         *
         * @param {string} type The elasticsearch doc type
         */
        value(type: string): this;

        /**
         * Sets the elasticsearch doc type to query on.
         * Alias for method `value`.
         *
         * @param {string} type The elasticsearch doc type
         */
        type(type: string): this;
    }

    /**
     * Filters documents matching the provided document / mapping type.
     *
     * @param {string=} type The elasticsearch doc type
     */
    export function typeQuery(type?: string): TypeQuery;

    /**
     * Filters documents that only have the provided ids.
     * Note, this query uses the _uid field.
     *
     * @param {Array|string=} type The elasticsearch doc type
     * @param {Array=} ids List of ids to fiter on.
     * @extends Query
     */
    export class IdsQuery extends Query {
        constructor(type?: string[] | string, ids?: object);

        /**
         * Sets the elasticsearch doc type to query on.
         * The type is optional and can be omitted, and can also accept an array of values.
         * If no type is specified, all types defined in the index mapping are tried.
         *
         * @param {Array<string>|string} type The elasticsearch doc type
         */
        type(type: string[] | string): this;

        /**
         * Sets the list of ids to fiter on.
         *
         * @param {Array<string|number>} ids
         */
        values(ids: string[] | number[]): this;

        /**
         * Sets the list of ids to fiter on.
         * Alias for `values` method.
         *
         * @param {Array<string|number>} ids
         */
        ids(ids: string[] | number[]): this;
    }

    /**
     * Filters documents that only have the provided ids.
     * Note, this query uses the _uid field.
     *
     * @param {Array|string=} type The elasticsearch doc type
     * @param {Array=} ids List of ids to fiter on.
     */
    export function idsQuery(type?: string[] | string, ids?: object): IdsQuery;

    /**
     * A query that wraps another query and simply returns a constant score
     * equal to the query boost for every document in the filter.
     * Maps to Lucene `ConstantScoreQuery`.
     * Constructs a query where each documents returned by the internal
     * query or filter have a constant score equal to the boost factor.
     *
     * @param {Query=} filterQuery Query to filter on.
     * @extends Query
     */
    export class ConstantScoreQuery extends Query {
        constructor(filterQuery?: Query);

        /**
         * Adds the query to apply a constant score to.
         *
         * @param {Query} filterQuery  Query to filter on.
         */
        filter(filterQuery: Query): this;

        /**
         * Adds the query to apply a constant score to.
         * Alias for method `filter`.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. Use `filter` instead.
         *
         * @param {Query} filterQuery  Query to filter on.
         */
        query(filterQuery: Query): this;
    }

    /**
     * A query that wraps another query and simply returns a constant score
     * equal to the query boost for every document in the filter.
     * Maps to Lucene `ConstantScoreQuery`.
     * Constructs a query where each documents returned by the internal
     * query or filter have a constant score equal to the boost factor.
     *
     * @param {Query=} filterQuery Query to filter on.
     */
    export function constantScoreQuery(filterQuery?: Query): ConstantScoreQuery;

    /**
     * A query that matches documents matching boolean combinations of other queries.
     * The bool query maps to Lucene `BooleanQuery`. It is built using one or more
     * boolean clauses, each clause with a typed occurrence.
     *
     * @extends Query
     */
    export class BoolQuery extends Query {
        constructor();
        /**
         * Adds `must` query to boolean container.
         * The clause (query) **must** appear in matching documents and will contribute to the score.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */
        must(queries: Query[] | Query): this;

        /**
         * Adds `filter` query to boolean container.
         * The clause (query) **must** appear in matching documents. However unlike `must` the score
         * of the query will be ignored. Filter clauses are executed in filter context, meaning that
         * scoring is ignored and clauses are considered for caching.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */
        filter(queries: Query[] | Query): this;

        /**
         * Adds `must_not` query to boolean container.
         * The clause (query) **must not** appear in the matching documents.
         * Clauses are executed in filter context meaning that scoring is ignored
         * and clauses are considered for caching. Because scoring is ignored,
         * a score of 0 for all documents is returned.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */
        mustNot(queries: Query[] | Query): this;

        /**
         * Adds `should` query to boolean container.
         * The clause (query) **should** appear in the matching document. In a boolean query with
         * no must or filter clauses, one or more should clauses must match a document.
         * The minimum number of should clauses to match can be set using the
         * `minimum_should_match` parameter.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */
        should(queries: Query[] | Query): this;

        /**
         * Enables or disables similarity coordinate scoring of documents
         * commoning the `CommonTermsQuery`. Default: `false`.
         *
         * **NOTE**: This has been removed in elasticsearch 6.0. If provided,
         * it will be ignored and a deprecation warning will be issued.
         *
         * @param {boolean} enable
         */
        disableCoord(enable: boolean): this;

        /**
         * Sets the value controlling how many `should` clauses in the boolean
         * query should match. It can be an absolute value (2), a percentage (30%)
         * or a combination of both. By default no optional clauses are necessary for a match.
         * However, if the bool query is used in a filter context and it has `should` clauses then,
         * at least one `should` clause is required to match.
         *
         * @param {string|number} minimumShouldMatch An absolute value (2), a percentage (30%)
         * or a combination of both.
         */
        minimumShouldMatch(minimumShouldMatch: string | number): this;

        /**
         * Sets if the `Query` should be enhanced with a `MatchAllQuery` in order
         * to act as a pure exclude when only negative (mustNot) clauses exist. Default: true.
         *
         * @param {boolean} enable
         */
        adjustPureNegative(enable: boolean): this;
    }

    /**
     * A query that matches documents matching boolean combinations of other queries.
     * The bool query maps to Lucene `BooleanQuery`. It is built using one or more
     * boolean clauses, each clause with a typed occurrence.
     */
    export function boolQuery(): BoolQuery;

    /**
     * A query that generates the union of documents produced by its subqueries,
     * and that scores each document with the maximum score for that document
     * as produced by any subquery, plus a tie breaking increment for
     * any additional matching subqueries.
     *
     * @extends Query
     */
    export class DisMaxQuery extends Query {
        constructor();
        /**
         * The tie breaker value. The tie breaker capability allows results
         * that include the same term in multiple fields to be judged better than
         * results that include this term in only the best of those multiple
         * fields, without confusing this with the better case of two different
         * terms in the multiple fields. Default: `0.0`.
         *
         * @param {number} factor
         */
        tieBreaker(factor: number): this;

        /**
         * Add given query array or query to list of queries
         *
         * @param {Array<Query>|Query} queries Array of valid `Query` objects or a `Query` object
         */
        queries(queries: Query[] | Query): this;
    }

    /**
     * A query that generates the union of documents produced by its subqueries,
     * and that scores each document with the maximum score for that document
     * as produced by any subquery, plus a tie breaking increment for
     * any additional matching subqueries.
     */
    export function disMaxQuery(): DisMaxQuery;

    /**
     * The `function_score` allows you to modify the score of documents that are
     * retrieved by a query. This can be useful if, for example, a score function
     * is computationally expensive and it is sufficient to compute the score on
     * a filtered set of documents.
     *
     * @extends Query
     */
    export class FunctionScoreQuery extends Query {
        constructor();
        /**
         * Sets the source query.
         * @param {Query} query A valid `Query` object
         */
        query(query: Query): this;

        /**
         * Controls the way the scores are combined.
         * @param {string} mode Can be one of `multiply`, `sum`, `first`, `min`, `max`, `avg`.
         * Defaults to `multiply`.
         */
        scoreMode(
            mode: 'multiply' | 'sum' | 'first' | 'min' | 'max' | 'avg'
        ): this;

        /**
         * Controls the way the query and function scores are combined.
         * @param {string} mode Can be one of `multiply`, `replace`, `sum`, `avg`, `max`, `min`.
         * Defaults to `multiply`.
         */
        boostMode(
            mode: 'multiply' | 'sum' | 'replace' | 'min' | 'max' | 'avg'
        ): this;

        /**
         * Restricts new score to not exceed given limit. The default for `max_boost` is `FLT_MAX`.
         * @param {number} limit
         */
        maxBoost(limit: number): this;

        /**
         * Sets the minimum score limit for documents to be included in search result.
         * @param {number} limit Minimum score threshold
         */
        minScore(limit: number): this;

        /**
         * Add a single score function to the list of existing functions.
         * @param {ScoreFunction} func A valid `ScoreFunction` object.
         */
        function(func: ScoreFunction): this;

        /**
         * Adds array of score functions to the list of existing functions.
         * @param {Array<ScoreFunction>} funcs An array of valid `ScoreFunction` objects
         */
        functions(funcs: ScoreFunction[]): this;
    }

    /**
     * The `function_score` allows you to modify the score of documents that are
     * retrieved by a query. This can be useful if, for example, a score function
     * is computationally expensive and it is sufficient to compute the score on
     * a filtered set of documents.
     */
    export function functionScoreQuery(): FunctionScoreQuery;

    /**
     * The boosting query can be used to effectively demote results that match
     * a given query. Unlike the "NOT" clause in bool query, this still selects
     * documents that contain undesirable terms, but reduces their overall
     * score.
     *
     * @param {Query=} positiveQry A valid `Query` object.
     * @param {Query=} negativeQry A valid `Query` object.
     * @param {number=} negativeBoost A positive `double` value where `0 < n < 1`.
     * @extends Query
     */
    export class BoostingQuery extends Query {
        constructor(
            positiveQry?: Query,
            negativeQry?: Query,
            negativeBoost?: number
        );

        /**
         * Sets the "master" query that determines which results are returned.
         *
         * @param {Query} query A valid `Query` object.
         */
        positive(query: Query): this;

        /**
         * Sets the query used to match documents in the `positive`
         * query that will be negatively boosted.
         *
         * @param {Query} query A valid `Query` object.
         */
        negative(query: Query): this;

        /**
         * Sets the negative boost value.
         *
         * @param {number} factor A positive `double` value where `0 < n < 1`.
         */
        negativeBoost(factor: number): this;
    }

    /**
     * The boosting query can be used to effectively demote results that match
     * a given query. Unlike the "NOT" clause in bool query, this still selects
     * documents that contain undesirable terms, but reduces their overall
     * score.
     *
     * @param {Query=} positiveQry A valid `Query` object.
     * @param {Query=} negativeQry A valid `Query` object.
     * @param {number=} negativeBoost A positive `double` value where `0 < n < 1`.
     */
    export function boostingQuery(
        positiveQry?: Query,
        negativeQry?: Query,
        negativeBoost?: number
    ): BoostingQuery;

    /**
     * The `JoiningQueryBase` class provides support for common options used across
     * various joining query implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string} refUrl
     * @param {Query=} qry A valid `Query` object
     * @extends Query
     */
    class JoiningQueryBase extends Query {
        constructor(queryType: string, refUrl: string, qry?: Query);

        /**
         * Sets the nested query to be executed.
         *
         * @param {Query} qry A valid `Query` object
         */
        query(qry: Query): this;

        /**
         * Sets the scoring method.
         * Valid values are:
         * - `none` - no scoring
         * - `max` - the highest score of all matched child documents is used
         * - `min` - the lowest score of all matched child documents is used
         * - `sum` - the sum the all the matched child documents is used
         * - `avg` - the default, the average of all matched child documents is used
         *
         * @param {string} mode Can be one of `none`, `sum`, `min`, `max`, `avg`.
         * Defaults to `avg` for `NestedQuery`, `none` for `HasChildQuery`.
         */
        scoreMode(mode: 'none' | 'sum' | 'min' | 'max' | 'avg'): this;

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         */
        ignoreUnmapped(enable: boolean): this;

        /**
         * Sets the inner hits options
         *
         * @param {InnerHits} innerHits A valid `InnerHits` object
         */
        innerHits(innerHits: InnerHits): this;
    }

    /**
     * Nested query allows to query nested objects. The query is executed against
     * the nested objects / docs as if they were indexed as separate docs
     * (they are, internally) and resulting in the root parent doc (or parent nested mapping).
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} path The nested object path.
     * @extends JoiningQueryBase
     */
    export class NestedQuery extends JoiningQueryBase {
        constructor(qry?: Query, path?: string);

        /**
         * Sets the root context for the nested query.
         *
         * @param {string} path
         */
        path(path: string): this;
    }

    /**
     * Nested query allows to query nested objects. The query is executed against
     * the nested objects / docs as if they were indexed as separate docs
     * (they are, internally) and resulting in the root parent doc (or parent nested mapping).
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} path The nested object path.
     */
    export function nestedQuery(qry?: Query, path?: string): NestedQuery;

    /**
     * The `has_child` filter accepts a query and the child type to run against, and
     * results in parent documents that have child docs matching the query.
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} type The child type
     * @extends JoiningQueryBase
     */
    export class HasChildQuery extends JoiningQueryBase {
        constructor(qry?: Query, type?: string);

        /**
         * Sets the child document type to search against.
         * Alias for method `childType`.
         *
         * @param {string} type A valid doc type name
         */
        type(type: string): this;

        /**
         * Sets the child document type to search against
         *
         * @param {string} type A valid doc type name
         */
        childType(type: string): this;

        /**
         * Specify the minimum number of children are required to match
         * for the parent doc to be considered a match
         *
         * @param {number} limit A positive `integer` value.
         */
        minChildren(limit: number): this;

        /**
         * Specify the maximum number of children are required to match
         * for the parent doc to be considered a match
         *
         * @param {number} limit A positive `integer` value.
         */
        maxChildren(limit: number): this;
    }

    /**
     * The `has_child` filter accepts a query and the child type to run against, and
     * results in parent documents that have child docs matching the query.
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} type The child type
     */
    export function hasChildQuery(qry?: Query, type?: string): HasChildQuery;

    /**
     * The `has_parent` query accepts a query and a parent type. The query is
     * executed in the parent document space, which is specified by the parent
     * type. This query returns child documents which associated parents have
     * matched.
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} type The parent type
     * @extends JoiningQueryBase
     */
    export class HasParentQuery extends JoiningQueryBase {
        constructor(qry?: Query, type?: string);

        /**
         * @override
         * @throws {Error} `score_mode` is deprecated. Use `score` instead.
         */
        scoreMode(): never;

        /**
         * Sets the child document type to search against
         * Alias for method `parentType`
         *
         * @param {string} type A valid doc type name
         */
        type(type: string): this;

        /**
         * Sets the child document type to search against
         *
         * @param {string} type A valid doc type name
         */
        parentType(type: string): this;

        /**
         * By default, scoring is `false` which ignores the score from the parent document.
         * The score is in this case equal to the boost on the `has_parent` query (Defaults to 1).
         * If the score is set to `true`, then the score of the matching parent document is
         * aggregated into the child documents belonging to the matching parent document.
         *
         * @param {boolean} enable `true` to enable scoring, `false` to disable.
         * `false` by default.
         */
        score(enable: boolean): this;
    }

    /**
     * The `has_parent` query accepts a query and a parent type. The query is
     * executed in the parent document space, which is specified by the parent
     * type. This query returns child documents which associated parents have
     * matched.
     *
     * @param {Query=} qry A valid `Query` object
     * @param {string=} type The parent type
     */
    export function hasParentQuery(qry?: Query, type?: string): HasParentQuery;

    /**
     * The `parent_id` query can be used to find child documents which belong to a particular parent.
     *
     * @param {string=} type The **child** type. This must be a type with `_parent` field.
     * @param {string|number=} id The required parent id select documents must refer to.
     * @extends Query
     */
    export class ParentIdQuery extends Query {
        constructor(type?: string, id?: string | number);

        /**
         * Sets the child type.
         *
         * @param {string} type The **child** type. This must be a type with `_parent` field.
         */
        type(type: string): this;

        /**
         * Sets the id.
         *
         * @param {string|number} id The required parent id select documents must refer to.
         */
        id(id: string | number): this;

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         */
        ignoreUnmapped(enable: boolean): this;
    }

    /**
     * The `parent_id` query can be used to find child documents which belong to a particular parent.
     *
     * @param {string=} type The **child** type. This must be a type with `_parent` field.
     * @param {string|number=} id The required parent id select documents must refer to.
     */
    export function parentIdQuery(
        type?: string,
        id?: string | number
    ): ParentIdQuery;

    /**
     * The `GeoQueryBase` provides support for common options used across
     * various geo query implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} queryType
     * @param {string=} field
     * @extends Query
     */
    export class GeoQueryBase extends Query {
        constructor(queryType: string, field?: string);

        /**
         * Sets the field to run the geo query on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Sets the `validation_method` parameter. Can be set to `IGNORE_MALFORMED` to accept
         * geo points with invalid latitude or longitude, `COERCE` to try and infer correct latitude
         * or longitude, or `STRICT` (default is `STRICT`).
         *
         * Note: The `ignore_malformed` and `coerce` parameters have been removed from
         * `geo_bounding_box`, `geo_polygon`, and `geo_distance` queries in elasticsearch 6.0.
         *
         * @param {string} method One of `IGNORE_MALFORMED`, `COERCE` or `STRICT`(default)
         * @throws {Error} If `method` parameter is not one of `IGNORE_MALFORMED`, `COERCE` or `STRICT`
         */
        validationMethod(
            method: 'IGNORE_MALFORMED' | 'COERCE' | 'STRICT'
        ): this;
    }

    /**
     * Filter documents indexed using the `geo_shape` type. Requires
     * the `geo_shape` Mapping.
     *
     * The `geo_shape` query uses the same grid square representation as
     * the `geo_shape` mapping to find documents that have a shape that
     * intersects with the query shape. It will also use the same PrefixTree
     * configuration as defined for the field mapping.
     *
     * The query supports two ways of defining the query shape, either by
     * providing a whole shape definition, or by referencing the name of
     * a shape pre-indexed in another index.
     *
     * @param {string=} field
     * @extends GeoQueryBase
     */
    export class GeoShapeQuery extends GeoQueryBase {
        constructor(field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoShapeQuery
         */
        validationMethod(): never;

        /**
         * Sets the shape definition for the geo query.
         *
         * @param {GeoShape} shape
         * @throws {TypeError} If given `shape` is not an instance of `GeoShape`
         */
        shape(shape: GeoShape): this;

        /**
         * Sets the reference name of a shape pre-indexed in another index.
         *
         * @param {IndexedShape} shape
         * @throws {TypeError} If given `shape` is not an instance of `IndexedShape`
         */
        indexedShape(shape: IndexedShape): this;

        /**
         * Sets the relationship between Query and indexed data
         * that will be used to determine if a Document should be matched or not.
         *
         * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
         * or `INTERSECTS`(default)
         */
        relation(
            relation: 'WITHIN' | 'CONTAINS' | 'DISJOINT' | 'INTERSECTS'
        ): this;

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         */
        ignoreUnmapped(enable: boolean): this;
    }

    /**
     * Filter documents indexed using the `geo_shape` type. Requires
     * the `geo_shape` Mapping.
     *
     * The `geo_shape` query uses the same grid square representation as
     * the `geo_shape` mapping to find documents that have a shape that
     * intersects with the query shape. It will also use the same PrefixTree
     * configuration as defined for the field mapping.
     *
     * The query supports two ways of defining the query shape, either by
     * providing a whole shape definition, or by referencing the name of
     * a shape pre-indexed in another index.
     *
     * @param {string=} field
     */
    export function geoShapeQuery(field?: string): GeoShapeQuery;

    /**
     * A query allowing to filter hits based on a point location using a bounding box.
     *
     * @param {string=} field
     * @extends GeoQueryBase
     */
    export class GeoBoundingBoxQuery extends GeoQueryBase {
        constructor(field?: string);

        /**
         * Sets the top left coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        topLeft(point: GeoPoint): this;

        /**
         * Sets the bottom right coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        bottomRight(point: GeoPoint): this;

        /**
         * Sets the top right coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        topRight(point: GeoPoint): this;

        /**
         * Sets the bottom left coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        bottomLeft(point: GeoPoint): this;

        /**
         * Sets value for top of the bounding box.
         *
         * @param {number} val
         */
        top(val: number): this;

        /**
         * Sets value for left of the bounding box.
         *
         * @param {number} val
         */
        left(val: number): this;

        /**
         * Sets value for bottom of the bounding box.
         *
         * @param {number} val
         */
        bottom(val: number): this;

        /**
         * Sets value for right of the bounding box.
         *
         * @param {number} val
         */
        right(val: number): this;

        /**
         * Sets the type of execution for the bounding box query.
         * The type of the bounding box execution by default is set to memory,
         * which means in memory checks if the doc falls within the bounding
         * box range. In some cases, an indexed option will perform faster
         * (but note that the geo_point type must have lat and lon indexed in this case)
         *
         * @param {string} type Can either `memory` or `indexed`
         */
        type(type: 'memory' | 'indexed'): this;
    }

    /**
     * A query allowing to filter hits based on a point location using a bounding box.
     *
     * @param {string=} field
     */
    export function geoBoundingBoxQuery(field?: string): GeoBoundingBoxQuery;

    /**
     * Filters documents that include only hits that exists within a specific distance from a geo point.
     *
     * @param {string=} field
     * @param {GeoPoint=} point Geo point used to measure and filter documents based on distance from it.
     * @extends GeoQueryBase
     */
    export class GeoDistanceQuery extends GeoQueryBase {
        constructor(field?: string, point?: GeoPoint);

        /**
         * Sets the radius of the circle centred on the specified location. Points which
         * fall into this circle are considered to be matches. The distance can be specified
         * in various units.
         *
         * @param {string|number} distance Radius of circle centred on specified location.
         */
        distance(distance: string | number): this;

        /**
         * Sets the distance calculation mode, `arc` or `plane`.
         * The `arc` calculation is the more accurate.
         * The `plane` is the faster but least accurate.
         *
         * @param {string} type
         * @throws {Error} If `type` is neither `plane` nor `arc`.
         */
        distanceType(type: 'arc' | 'plane'): this;

        /**
         * Sets the point to filter documents based on the distance from it.
         *
         * @param {GeoPoint} point Geo point used to measure and filter documents based on distance from it.
         * @throws {TypeError} If parameter `point` is not an instance of `GeoPoint`
         */
        geoPoint(point: GeoPoint): this;
    }

    /**
     * Filters documents that include only hits that exists within a specific distance from a geo point.
     *
     * @param {string=} field
     * @param {GeoPoint=} point Geo point used to measure and filter documents based on distance from it.
     */
    export function geoDistanceQuery(
        field?: string,
        point?: GeoPoint
    ): GeoDistanceQuery;

    /**
     * A query allowing to include hits that only fall within a polygon of points.
     *
     * @param {string=} field
     * @extends GeoQueryBase
     */
    export class GeoPolygonQuery extends GeoQueryBase {
        constructor(field?: string);

        /**
         * Sets the points which form the polygon.
         * Points can be instances of `GeoPoint`, Object with `lat`, `lon` keys,
         * `GeoJSON` array representation or string(`geohash`/`lat, lon`)
         *
         * @param {Array<*>} points
         * @throws {TypeError} If `points` parameter is not an instance of `Array`.
         */
        points(points: any[]): GeoPolygonQuery;
    }

    /**
     * A query allowing to include hits that only fall within a polygon of points.
     *
     * @param {string=} field
     */
    export function geoPolygonQuery(field?: string): GeoPolygonQuery;

    /**
     * The More Like This Query (MLT Query) finds documents that are "like" a given set
     * of documents. In order to do so, MLT selects a set of representative terms of
     * these input documents, forms a query using these terms, executes the query and
     * returns the results. The user controls the input documents, how the terms should
     * be selected and how the query is formed.
     *
     * @extends Query
     */
    export class MoreLikeThisQuery extends Query {
        constructor();
        /**
         * Sets the list of fields to fetch and analyze the text from. Defaults to
         * the `_all` field for free text and to all possible fields for document inputs.
         *
         * @param {Array<string>} fields Array of fields to search against
         */
        fields(fields: string[]): this;

        /**
         * Sets the search clause for the query. It is the only required parameter of the MLT query
         * and follows a versatile syntax, in which the user can specify free form text and/or
         * a single or multiple documents (see examples above). The syntax to specify documents
         * is similar to the one used by the Multi GET API.
         * When specifying documents, the text is fetched from fields unless overridden
         * in each document request. The text is analyzed by the analyzer at the field,
         * but could also be overridden. The syntax to override the analyzer at the
         * field follows a similar syntax to the `per_field_analyzer` parameter of the
         * Term Vectors API.
         * Additionally, to provide documents not necessarily present in the index,
         * artificial documents are also supported.
         * If string or object is passed, it is
         * appended to the list. If an array is passed, it replaces the existing list.
         *
         * @param {string|Object|Array} like Can be passed as a string,
         * Object representing indexed document, or array of string/objects.
         */
        like(like: string | object | string[] | object[]): this;

        /**
         * The `unlike` parameter is used in conjunction with `like` in order not to
         * select terms found in a chosen set of documents. In other words, we could ask
         * for documents `like`: "Apple", but `unlike`: "cake crumble tree".
         * The syntax is the same as like.
         *
         * @param {string|Object|Array} unlike Can be passed as a string,
         * Object representing indexed document, or array of string/objects.
         */
        unlike(unlike: string | object | string[] | object[]): this;

        /**
         * Sets the text to find documents like it.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. Use `like` instead.
         *
         * @param {string} txt The text to find documents like it.
         */
        likeText(txt: string): this;

        /**
         * Sets the list of `ids` for the documents with syntax similar to
         * the Multi GET API.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. Use `like` instead.
         *
         * @param {Array<string>} ids
         */
        ids(ids: string[]): this;

        /**
         * Sets the list of `docs` for the documents with syntax similar to
         * the Multi GET API.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. Use `like` instead.
         *
         * @param {Array<Object>} docs
         */
        docs(docs: object[]): this;

        /**
         * Sets the maximum number of query terms that will be selected.
         * Increasing this value gives greater accuracy at the expense of query execution speed.
         * Defaults to `25`.
         *
         * @param {number} termsLimit The maximum number of query terms that will be selected.
         */
        maxQueryTerms(termsLimit: number): this;

        /**
         * Sets the minimum term frequency below which the terms will be ignored from
         * the input document Defaults to 2.
         *
         * @param {number} termFreqLimit
         */
        minTermFreq(termFreqLimit: number): this;

        /**
         * Sets the minimum document frequency below which the terms will be ignored
         * from the input document. Defaults to `5`.
         *
         * @param {number} docFreqLimit The minimum document frequency
         */
        minDocFreq(docFreqLimit: number): this;

        /**
         * Sets the maximum document frequency above which the terms will be ignored
         * from the input document. Defaults to unbounded (`0`).
         *
         * @param {number} docFreqLimit The minimum document frequency
         */
        maxDocFreq(docFreqLimit: number): this;

        /**
         * Sets the minimum word length below which the terms will be ignored.
         * Defaults to `0`.
         *
         * @param {number} wordLenLimit
         */
        minWordLength(wordLenLimit: number): this;

        /**
         * Sets the maximum word length above which the terms will be ignored.
         * Defaults to unbounded (`0`).
         *
         * @param {number} wordLenLimit
         */
        maxWordLength(wordLenLimit: number): this;

        /**
         * Sets the array of stop words. Any word in this set is considered
         * "uninteresting" and ignored.
         *
         * @param {Array<string>} words Array of stop words.
         */
        stopWords(words: string[]): this;

        /**
         * Set the analyzer to control which analyzer will perform the analysis process on the text.
         * Defaults to the analyzer associated with the first field in `fields`.
         *
         * @param {string} analyzer A valid text analyzer.
         */
        analyzer(analyzer: string): this;

        /**
         * Sets the value controlling how many `should` clauses in the boolean
         * query should match. It can be an absolute value (2), a percentage (30%)
         * or a combination of both. (Defaults to `"30%"`).
         *
         * @param {string|number} minimumShouldMatch An absolute value (`2`), a percentage (`30%`)
         * or a combination of both.
         */
        minimumShouldMatch(minimumShouldMatch: string | number): this;

        /**
         * Sets the boost factor to use when boosting terms.
         * Defaults to deactivated (`0`).
         *
         * @param {number} boost A positive value to boost terms.
         */
        boostTerms(boost: number): this;

        /**
         * Specifies whether the input documents should also be included in the
         * search results returned. Defaults to `false`.
         *
         * @param {boolean} enable
         */
        include(enable: boolean): this;
    }

    /**
     * The More Like This Query (MLT Query) finds documents that are "like" a given set
     * of documents. In order to do so, MLT selects a set of representative terms of
     * these input documents, forms a query using these terms, executes the query and
     * returns the results. The user controls the input documents, how the terms should
     * be selected and how the query is formed.
     */
    export function moreLikeThisQuery(): MoreLikeThisQuery;

    /**
     * A query allowing to define scripts as queries.
     * They are typically used in a filter context.
     *
     * @param {Script=} script
     * @extends Query
     */
    export class ScriptQuery extends Query {
        constructor(script?: Script);

        /**
         * Sets the `script` for query.
         * @param {Script} script
         */
        script(script: Script): this;
    }

    /**
     * A query allowing to define scripts as queries.
     * They are typically used in a filter context.
     *
     * @param {Script=} script
     */
    export function scriptQuery(script?: Script): ScriptQuery;

    /**
     * The `percolate` query can be used to match queries stored in an index.
     * The `percolate` query itself contains the document that will be used
     * as query to match with the stored queries.
     *
     * @param {string=} field The field of type `percolator` and that holds the indexed queries.
     * @param {string=} docType The type / mapping of the document being percolated.
     * @extends Query
     */
    export class PercolateQuery extends Query {
        constructor(field?: string, docType?: string);

        /**
         * Sets the field of type `percolator` and that holds the indexed queries.
         *
         * @param {string} field The field of type `percolator` and that holds the indexed queries.
         */
        field(field: string): this;

        /**
         * Sets the type / mapping of the document being percolated.
         *
         * Note: This param has been deprecated in elasticsearch 6.0. From 6.0 and later, it is no
         * longer required to specify the `document_type` parameter.
         *
         * @param {string} docType The type / mapping of the document being percolated.
         */
        documentType(docType: string): this;

        /**
         * Appends given source document to the list of source documents being percolated.
         * Instead of specifying the source document being percolated,
         * the source can also be retrieved from an already stored document.
         *
         * @param {Object} doc The source document being percolated.
         */
        document(doc: object): this;

        /**
         * Appends given source documents to the list of source documents being percolated.
         * Instead of specifying the source documents being percolated,
         * the source can also be retrieved from already stored documents.
         *
         * @param {Object[]} docs The source documents being percolated.
         */
        documents(docs: object[]): this;

        /**
         * Sets the index the document resides in. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} index The index the document resides in.
         */
        index(index: string): this;

        /**
         * Sets the type of the document to fetch. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} type The type of the document to fetch.
         */
        type(type: string): this;

        /**
         * Sets the id of the document to fetch. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} id The id of the document to fetch.
         */
        id(id: string): this;

        /**
         * Sets the routing to be used to fetch document to percolate. Optional.
         *
         * @param {string} routing The routing to be used to fetch document to percolate.
         */
        routing(routing: string): this;

        /**
         * Sets the preference to be used to fetch document to percolate. Optional.
         *
         * @param {string} preference The preference to be used to fetch document to percolate.
         */
        preference(preference: string): this;

        /**
         * Sets the expected version of the document to be fetched. Optional.
         * If the version does not match, the search request will fail
         * with a version conflict error.
         *
         * @param {string} version The expected version of the document to be fetched.
         */
        version(version: string): this;
    }

    /**
     * The `percolate` query can be used to match queries stored in an index.
     * The `percolate` query itself contains the document that will be used
     * as query to match with the stored queries.
     *
     * @param {string=} field The field of type `percolator` and that holds the indexed queries.
     * @param {string=} docType The type / mapping of the document being percolated.
     */
    export function percolateQuery(
        field?: string,
        docType?: string
    ): PercolateQuery;

    /**
     * The `distance_feature` query can be used to filter documents that are inside
     * a timeframe or radius given an **origin** point. For dates the difference can be
     * minutes, hours, etc and for coordinates it can be meters, kilometers..
     *
     *  [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-distance-feature-query.html)
     *
     * NOTE: Only available in Elasticsearch 7.1.0+.
     *
     * @example
     * const query = new DistanceFeatureQuery('time');
     *   query
     *       .origin('now')
     *       .pivot('1h')
     *       .toJSON();
     *
     * @param {string} field The field inside the document to be used in the query
     * @extends Query
     */
    export class DistanceFeatureQuery extends Query {
        constructor(field?: string);

        /**
         * Sets the field for the `distance_feature` query
         * @param {string} fieldName Name of the field inside the document
         * @returns {DistanceFeatureQuery} Instance of the query
         */
        field(fieldName: string): DistanceFeatureQuery;

        /**
         * Sets the origin of the function. Date or point of coordinates
         * used to calculate distances
         * @param {GeoPoint | string} originPoint
         * @returns {DistanceFeatureQuery} Instance of the distance feature query
         */
        origin(originPoint: string | GeoPoint): DistanceFeatureQuery;

        /**
         * Distance from the origin at which relevance scores receive half of the boost value.
         * @param {string} pivotDistance Distance value. If the field value is date then this must be a
         * [time unit](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units).
         * If it's a geo point field, then a [distance unit](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#distance-units)
         * @returns {DistanceFeatureQuery} Instance of the distance feature query
         */
        pivot(pivotDistance: string): DistanceFeatureQuery;
    }

    /**
     * The `distance_feature` query can be used to filter documents that are inside
     * a timeframe or radius given an **origin** point. For dates the difference can be
     * minutes, hours, etc and for coordinates it can be meters, kilometers..
     *
     *  [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-distance-feature-query.html)
     *
     * NOTE: Only available in Elasticsearch 7.1.0+.
     *
     * @example
     * const query = new DistanceFeatureQuery('time');
     *   query
     *       .origin('now')
     *       .pivot('1h')
     *       .toJSON();
     *
     * @param {string} field The field inside the document to be used in the query
     * @return {DistanceFeatureQuery}
     */
    export function distanceFeatureQuery(field?: string): DistanceFeatureQuery;

    /**
     * Interface-like class used to group and identify various implementations of Span queries.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @extends Query
     */
    export class SpanQueryBase extends Query {}

    /**
     * Matches spans containing a term. The span term query maps to Lucene `SpanTermQuery`.
     *
     * @param {string=} field The document field to query against
     * @param {string|number=} value The query string
     * @extends SpanQueryBase
     */
    export class SpanTermQuery extends SpanQueryBase {
        constructor(field?: string, value?: string | number);

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         */
        field(field: string): this;

        /**
         * Sets the query string.
         *
         * @param {string|number} queryVal
         */
        value(queryVal: string | number): this;

        /**
         * Override default `toJSON` to return DSL representation of the Span term query
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Matches spans containing a term. The span term query maps to Lucene `SpanTermQuery`.
     *
     * @param {string=} field The document field to query against
     * @param {string|number=} value The query string
     */
    export function spanTermQuery(
        field?: string,
        value?: string | number
    ): SpanTermQuery;

    /**
     * The `span_multi` query allows you to wrap a `multi term query` (one of wildcard,
     * fuzzy, prefix, range or regexp query) as a `span query`, so it can be nested.
     *
     * @param {MultiTermQueryBase=} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
     * @extends SpanQueryBase
     */
    export class SpanMultiTermQuery extends SpanQueryBase {
        constructor(multiTermQry?: MultiTermQueryBase);

        /**
         * Sets the multi term query.
         *
         * @param {MultiTermQueryBase} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
         */
        match(multiTermQry: MultiTermQueryBase): this;
    }

    /**
     * The `span_multi` query allows you to wrap a `multi term query` (one of wildcard,
     * fuzzy, prefix, range or regexp query) as a `span query`, so it can be nested.
     *
     * @param {MultiTermQueryBase=} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
     */
    export function spanMultiTermQuery(
        multiTermQry?: MultiTermQueryBase
    ): SpanMultiTermQuery;

    /**
     * Matches spans near the beginning of a field. The span first query maps to Lucene `SpanFirstQuery`.
     *
     * @param {SpanQueryBase=} spanQry Any other span type query
     * @extends SpanQueryBase
     */
    export class SpanFirstQuery extends SpanQueryBase {
        constructor(spanQry?: SpanQueryBase);

        /**
         * Sets the `match` clause which can be any other span type query.
         *
         * @param {SpanQueryBase} spanQry
         */
        match(spanQry: SpanQueryBase): this;

        /**
         * Sets the maximum end position permitted in a match.
         *
         * @param {number} limit The maximum end position permitted in a match.
         */
        end(limit: number): this;
    }

    /**
     * Matches spans near the beginning of a field. The span first query maps to Lucene `SpanFirstQuery`.
     *
     * @param {SpanQueryBase=} spanQry Any other span type query
     */
    export function spanFirstQuery(spanQry?: SpanQueryBase): SpanFirstQuery;

    /**
     * Matches spans which are near one another. One can specify `slop`, the maximum
     * number of intervening unmatched positions, as well as whether matches are
     * required to be in-order. The span near query maps to Lucene `SpanNearQuery`.
     *
     * @extends SpanQueryBase
     */
    export class SpanNearQuery extends SpanQueryBase {
        constructor();

        /**
         * Sets the clauses element which is a list of one or more other span type queries.
         *
         * @param {Array<SpanQueryBase>} clauses
         * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
         * any member of the array is not an instance of `SpanQueryBase`.
         */
        clauses(clauses: SpanQueryBase[]): this;

        /**
         * Configures the `slop`(default is 0), the maximum number of intervening
         * unmatched positions permitted.
         *
         * @param {number} slop A positive integer value, defaults is 0.
         */
        slop(slop: number): this;

        /**
         * @param {boolean} enable
         */
        inOrder(enable: boolean): this;
    }

    /**
     * Matches spans which are near one another. One can specify `slop`, the maximum
     * number of intervening unmatched positions, as well as whether matches are
     * required to be in-order. The span near query maps to Lucene `SpanNearQuery`.
     */
    export function spanNearQuery(): SpanNearQuery;

    /**
     * Matches the union of its span clauses. The span or query maps to Lucene `SpanOrQuery`.
     *
     * @extends SpanQueryBase
     */
    export class SpanOrQuery extends SpanQueryBase {
        constructor();
        /**
         * Sets the clauses element which is a list of one or more other span type queries.
         *
         * @param {Array<SpanQueryBase>} clauses
         * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
         * any member of the array is not an instance of `SpanQueryBase`.
         */
        clauses(clauses: SpanQueryBase[]): this;
    }

    /**
     * Matches the union of its span clauses. The span or query maps to Lucene `SpanOrQuery`.
     */
    export function spanOrQuery(): SpanOrQuery;

    /**
     * Removes matches which overlap with another span query. The span not query
     * maps to Lucene `SpanNotQuery`.
     *
     * @extends SpanQueryBase
     */
    export class SpanNotQuery extends SpanQueryBase {
        constructor();
        /**
         * Sets the `include` clause which is the span query whose matches are filtered
         *
         * @param {SpanQueryBase} spanQry
         */
        include(spanQry: SpanQueryBase): this;

        /**
         * Sets the `exclude` clause which is the span query whose matches must
         * not overlap those returned.
         *
         * @param {SpanQueryBase} spanQry
         */
        exclude(spanQry: SpanQueryBase): this;

        /**
         * If set the amount of tokens before the include span can't have overlap with
         * the exclude span.
         *
         * @param {number} pre
         */
        pre(pre: number): this;

        /**
         * If set the amount of tokens after the include span can't have overlap with the exclude span.
         *
         * @param {number} post
         */
        post(post: number): this;

        /**
         * If set the amount of tokens from within the include span can't have overlap
         * with the exclude span. Equivalent of setting both `pre` and `post`.
         *
         * @param {number} dist
         */
        dist(dist: number): this;
    }

    /**
     * Removes matches which overlap with another span query. The span not query
     * maps to Lucene `SpanNotQuery`.
     */
    export function spanNotQuery(): SpanNotQuery;

    /**
     * Base class for span queries with `little`, `big` clauses.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @extends SpanQueryBase
     */
    export class SpanLittleBigQueryBase extends SpanQueryBase {
        /**
         * Sets the `little` clause.
         *
         * @param {SpanQueryBase} spanQry Any span type query
         */
        little(spanQry: SpanQueryBase): this;

        /**
         * Sets the `big` clause.
         *
         * @param {SpanQueryBase} spanQry Any span type query
         */
        big(spanQry: SpanQueryBase): this;
    }

    /**
     * Returns matches which enclose another span query. The span containing query
     * maps to Lucene `SpanContainingQuery`.
     * Matching spans from big that contain matches from little are returned.
     *
     * @extends SpanLittleBigQueryBase
     */
    export class SpanContainingQuery extends SpanLittleBigQueryBase {
        constructor();
    }

    /**
     * Returns matches which enclose another span query. The span containing query
     * maps to Lucene `SpanContainingQuery`.
     * Matching spans from big that contain matches from little are returned.
     */
    export function spanContainingQuery(): SpanContainingQuery;

    /**
     * Returns matches which are enclosed inside another span query. The span within
     * query maps to Lucene `SpanWithinQuery`.
     * Matching spans from `little` that are enclosed within `big` are returned.
     *
     * @extends SpanLittleBigQueryBase
     */
    export class SpanWithinQuery extends SpanLittleBigQueryBase {
        constructor();
    }

    /**
     * Returns matches which are enclosed inside another span query. The span within
     * query maps to Lucene `SpanWithinQuery`.
     * Matching spans from `little` that are enclosed within `big` are returned.
     */
    export function spanWithinQuery(): SpanWithinQuery;

    /**
     * Wrapper to allow span queries to participate in composite single-field
     * span queries by lying about their search field. The span field masking
     * query maps to Lucene's `SpanFieldMaskingQuery`.
     *
     * This can be used to support queries like span-near or span-or across
     * different fields, which is not ordinarily permitted.
     *
     * Span field masking query is invaluable in conjunction with multi-fields
     * when same content is indexed with multiple analyzers. For instance we
     * could index a field with the standard analyzer which breaks text up into
     * words, and again with the english analyzer which stems words into their root form.
     *
     * @param {string=} field
     * @param {SpanQueryBase=} spanQry Any other span type query
     * @extends SpanQueryBase
     */
    export class SpanFieldMaskingQuery extends SpanQueryBase {
        constructor(field?: string, spanQry?: SpanQueryBase);

        /**
         * Sets the span query.
         *
         * @param {SpanQueryBase} spanQry
         */
        query(spanQry: SpanQueryBase): this;

        /**
         * Sets the field to mask.
         *
         * @param {string} field
         */
        field(field: string): this;
    }

    /**
     * Wrapper to allow span queries to participate in composite single-field
     * span queries by lying about their search field. The span field masking
     * query maps to Lucene's `SpanFieldMaskingQuery`.
     *
     * This can be used to support queries like span-near or span-or across
     * different fields, which is not ordinarily permitted.
     *
     * Span field masking query is invaluable in conjunction with multi-fields
     * when same content is indexed with multiple analyzers. For instance we
     * could index a field with the standard analyzer which breaks text up into
     * words, and again with the english analyzer which stems words into their root form.
     *
     * @param {string=} field
     * @param {SpanQueryBase=} spanQry Any other span type query
     */
    export function spanFieldMaskingQuery(
        field?: string,
        spanQry?: SpanQueryBase
    ): SpanFieldMaskingQuery;

    /**
     * Base class implementation for all aggregation types.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class should be extended and used, as validation against the class
     * type is present in various places.
     *
     * @param {string} name
     * @param {string} aggType Type of aggregation
     * @throws {Error} if `name` is empty
     * @throws {Error} if `aggType` is empty
     */
    class Aggregation {
        constructor(name: string, aggType: string);

        /**
         * Sets nested aggregations.
         * This method can be called multiple times in order to set multiple nested aggregations.
         *
         * @param {Aggregation} agg Any valid `Aggregation`
         * @throws {TypeError} If `agg` is not an instance of `Aggregation`
         */
        aggregation(agg: Aggregation): this;

        /**
         * Sets nested aggregation.
         * This method can be called multiple times in order to set multiple nested aggregations.
         *
         * @param {Aggregation} agg Any valid {@link Aggregation}
         */
        agg(agg: Aggregation): this;

        /**
         * Sets multiple aggregation items on the request body.
         *
         * @param {Array<Aggregation>} aggs Array of valid `Aggregation` items
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */
        aggregations(aggs: Aggregation[]): this;

        /**
         * Sets multiple aggregation items on the request body.
         * Alias for method `aggregations`
         *
         * @param {Array<Aggregation>} aggs Array of valid `Aggregation` items
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */
        aggs(aggs: Aggregation[]): this;

        /**
         * You can associate a piece of metadata with individual aggregations at request time
         * that will be returned in place at response time.
         *
         * @param {object} meta
         */
        meta(meta: object): this;

        /**
         * Build and returns DSL representation of the `Aggregation` class instance.
         *
         */
        getDSL(): object;

        /**
         * Override default `toJSON` to return DSL representation for the `aggregation` query.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `MetricsAggregationBase` provides support for common options used across
     * various metrics `Aggregation` implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name a valid aggregation name
     * @param {string} aggType type of aggregation
     * @param {string=} field The field to aggregate on
     * @extends Aggregation
     */
    export class MetricsAggregationBase extends Aggregation {
        constructor(name: string, aggType: string, field?: string);

        /**
         * Sets field to run aggregation on.
         *
         * @param {string} field a valid field name
         */
        field(field: string): this;

        /**
         * Sets script parameter for aggregation.
         *
         * @param {Script} script
         * @throws {TypeError} If `script` is not an instance of `Script`
         */
        script(script: Script): this;

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         */
        missing(value: string): this;

        /**
         * Sets the format expression if applicable.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
         */
        format(fmt: string): this;
    }

    /**
     * A single-value metrics aggregation that computes the average of numeric
     * values that are extracted from the aggregated documents. These values can be
     * extracted either from specific numeric fields in the documents, or be
     * generated by a provided script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class AvgAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A single-value metrics aggregation that computes the average of numeric
     * values that are extracted from the aggregated documents. These values can be
     * extracted either from specific numeric fields in the documents, or be
     * generated by a provided script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function avgAggregation(
        name: string,
        field?: string
    ): AvgAggregation;

    /**
     * A single-value metrics aggregation that calculates an approximate count of
     * distinct values. Values can be extracted either from specific fields in the
     * document or generated by a script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class CardinalityAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on CardinalityAggregation
         */
        format(): never;

        /**
         * The `precision_threshold` options allows to trade memory for accuracy,
         * and defines a unique count below which counts are expected to be close to accurate.
         *
         * @param {number} threshold The threshold value.
         * The maximum supported value is 40000, thresholds above this number
         * will have the same effect as a threshold of 40000. The default values is 3000.
         */
        precisionThreshold(threshold: number): this;
    }

    /**
     * A single-value metrics aggregation that calculates an approximate count of
     * distinct values. Values can be extracted either from specific fields in the
     * document or generated by a script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function cardinalityAggregation(
        name: string,
        field?: string
    ): CardinalityAggregation;

    /**
     * A multi-value metrics aggregation that computes stats over numeric values
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a provided
     * script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class ExtendedStatsAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * Set sigma in the request for getting custom boundary.
         * sigma controls how many standard deviations +/- from the mean should be displayed
         *
         * @param {number} sigma sigma can be any non-negative double,
         * meaning you can request non-integer values such as 1.5.
         * A value of 0 is valid, but will simply return the average for both upper and lower bounds.
         */
        sigma(sigma: number): this;
    }

    /**
     * A multi-value metrics aggregation that computes stats over numeric values
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a provided
     * script.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function extendedStatsAggregation(
        name: string,
        field?: string
    ): ExtendedStatsAggregation;

    /**
     * A metric aggregation that computes the bounding box
     * containing all geo_point values for a field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class GeoBoundsAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoBoundsAggregation
         */
        format(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoBoundsAggregation
         */
        script(): never;

        /**
         * @param {boolean} allowOverlap Optional parameter which specifies whether
         * the bounding box should be allowed to overlap the international date line.
         * The default value is true
         */
        wrapLongitude(allowOverlap: boolean): GeoBoundsAggregation;
    }

    /**
     * A metric aggregation that computes the bounding box
     * containing all geo_point values for a field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function geoBoundsAggregation(
        name: string,
        field?: string
    ): GeoBoundsAggregation;

    /**
     * A metric aggregation that computes the weighted centroid
     * from all coordinate values for a Geo-point datatype field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. field must be a Geo-point datatype type
     * @extends MetricsAggregationBase
     */
    export class GeoCentroidAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoCentroidAggregation
         */
        format(): never;
    }

    /**
     * A metric aggregation that computes the weighted centroid
     * from all coordinate values for a Geo-point datatype field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. field must be a Geo-point datatype type
     */
    export function geoCentroidAggregation(
        name: string,
        field?: string
    ): GeoCentroidAggregation;

    /**
     * A single-value metrics aggregation that keeps track and returns the
     * maximum value among the numeric values extracted from the aggregated
     * documents. These values can be extracted either from specific numeric fields
     * in the documents, or be generated by a provided script.
     *
     * Aggregation that keeps track and returns the maximum value among the
     * numeric values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class MaxAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A single-value metrics aggregation that keeps track and returns the
     * maximum value among the numeric values extracted from the aggregated
     * documents. These values can be extracted either from specific numeric fields
     * in the documents, or be generated by a provided script.
     *
     * Aggregation that keeps track and returns the maximum value among the
     * numeric values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function maxAggregation(
        name: string,
        field?: string
    ): MaxAggregation;

    /**
     * A single-value metrics aggregation that keeps track and returns the
     * minimum value among the numeric values extracted from the aggregated
     * documents. These values can be extracted either from specific numeric fields
     * in the documents, or be generated by a provided script.
     *
     * Aggregation that keeps track and returns the minimum value among numeric
     * values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class MinAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A single-value metrics aggregation that keeps track and returns the
     * minimum value among the numeric values extracted from the aggregated
     * documents. These values can be extracted either from specific numeric fields
     * in the documents, or be generated by a provided script.
     *
     * Aggregation that keeps track and returns the minimum value among numeric
     * values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function minAggregation(
        name: string,
        field?: string
    ): MinAggregation;

    /**
     * A multi-value metrics aggregation that calculates one or more percentiles
     * over numeric values extracted from the aggregated documents. These values can
     * be extracted either from specific numeric fields in the documents, or be
     * generated by a provided script.
     *
     * Aggregation that calculates one or more percentiles over numeric values
     * extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class PercentilesAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * Enable the response to be returned as a keyed object where the key is the
         * bucket interval.
         *
         * @param {boolean} keyed To enable keyed response or not. True by default
         */
        keyed(keyed: boolean): this;

        /**
         * Specifies the percents of interest.
         * Requested percentiles must be a value between 0-100 inclusive
         *
         * @param {Array<number>} percents Parameter to specify particular percentiles to calculate
         * @throws {TypeError} If `percents` is not an instance of Array
         */
        percents(percents: number[]): this;

        /**
         * Compression controls memory usage and approximation error. The compression
         * value limits the maximum number of nodes to 100 * compression. By
         * increasing the compression value, you can increase the accuracy of your
         * percentiles at the cost of more memory. Larger compression values also make
         * the algorithm slower since the underlying tree data structure grows in
         * size, resulting in more expensive operations. The default compression
         * value is 100.
         *
         * @param {number} compression Parameter to balance memory utilization with estimation accuracy.
         */
        tdigest(compression: number): this;

        /**
         * Compression controls memory usage and approximation error. The compression
         * value limits the maximum number of nodes to 100 * compression. By
         * increasing the compression value, you can increase the accuracy of your
         * percentiles at the cost of more memory. Larger compression values also make
         * the algorithm slower since the underlying tree data structure grows in
         * size, resulting in more expensive operations. The default compression
         * value is 100.
         * Alias for `tdigest`
         *
         * @param {number} compression Parameter to balance memory utilization with estimation accuracy.
         */
        compression(compression: number): this;

        /**
         * HDR Histogram (High Dynamic Range Histogram) is an alternative implementation
         * that can be useful when calculating percentiles for latency measurements
         * as it can be faster than the t-digest implementation
         * with the trade-off of a larger memory footprint.
         * The HDR Histogram can be used by specifying the method parameter in the request.
         *
         * @param {number} numberOfSigDigits The resolution of values
         * for the histogram in number of significant digits
         */
        hdr(numberOfSigDigits: number): this;
    }

    /**
     * A multi-value metrics aggregation that calculates one or more percentiles
     * over numeric values extracted from the aggregated documents. These values can
     * be extracted either from specific numeric fields in the documents, or be
     * generated by a provided script.
     *
     * Aggregation that calculates one or more percentiles over numeric values
     * extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function percentilesAggregation(
        name: string,
        field?: string
    ): PercentilesAggregation;

    /**
     * A multi-value metrics aggregation that calculates one or more percentile ranks
     * over numeric values extracted from the aggregated documents. These values can
     * be extracted either from specific numeric fields in the documents, or be
     * generated by a provided script.
     *
     * Aggregation that calculates one or more percentiles ranks over numeric values
     * extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on. It must be a numeric field
     * @param {Array=} values Values to compute percentiles from.
     * @throws {TypeError} If `values` is not an instance of Array
     * @extends MetricsAggregationBase
     */
    export class PercentileRanksAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string, values?: number[]);

        /**
         * @override
         * @throws {Error} This method cannot be called on PercentileRanksAggregation
         */
        format(): never;

        /**
         * Enable the response to be returned as a keyed object where the key is the
         * bucket interval.
         *
         * @param {boolean} keyed To enable keyed response or not.
         */
        keyed(keyed: boolean): this;

        /**
         * Specifies the values to compute percentiles from.
         *
         * @param {Array<number>} values Values to compute percentiles from.
         * @throws {TypeError} If `values` is not an instance of Array
         */
        values(values: number[]): this;

        /**
         * Compression controls memory usage and approximation error. The compression
         * value limits the maximum number of nodes to 100 * compression. By
         * increasing the compression value, you can increase the accuracy of your
         * percentiles at the cost of more memory. Larger compression values also make
         * the algorithm slower since the underlying tree data structure grows in
         * size, resulting in more expensive operations. The default compression
         * value is 100.
         *
         * @param {number} compression Parameter to balance memory utilization with estimation accuracy.
         */
        tdigest(compression: number): this;

        /**
         * Compression controls memory usage and approximation error. The compression
         * value limits the maximum number of nodes to 100 * compression. By
         * increasing the compression value, you can increase the accuracy of your
         * percentiles at the cost of more memory. Larger compression values also make
         * the algorithm slower since the underlying tree data structure grows in
         * size, resulting in more expensive operations. The default compression
         * value is 100.
         *
         * Alias for `tdigest`
         *
         * @param {number} compression Parameter to balance memory utilization with estimation accuracy.
         */
        compression(compression: number): this;

        /**
         * HDR Histogram (High Dynamic Range Histogram) is an alternative implementation
         * that can be useful when calculating percentiles for latency measurements
         * as it can be faster than the t-digest implementation
         * with the trade-off of a larger memory footprint.
         * The HDR Histogram can be used by specifying the method parameter in the request.
         *
         * @param {number} numberOfSigDigits The resolution of values
         * for the histogram in number of significant digits
         */
        hdr(numberOfSigDigits: number): this;
    }

    export function percentileRanksAggregation(
        name: string,
        field?: string,
        values?: number[]
    ): PercentileRanksAggregation;

    /**
     * A metric aggregation that executes using scripts to provide a metric output.
     *
     * Aggregation that keeps track and returns the minimum value among numeric
     * values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends MetricsAggregationBase
     */
    export class ScriptedMetricAggregation extends MetricsAggregationBase {
        constructor(name: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on ScriptedMetricAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on ScriptedMetricAggregation
         */
        script(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on ScriptedMetricAggregation
         */
        missing(): never;

        /**
         * Sets the initialization script.
         * Executed prior to any collection of documents. Allows the aggregation to set up any initial state.
         *
         * @param {string|Script} initScript The initialization script. Can be a string or an Script instance
         */
        initScript(initScript: string | Script): this;

        /**
         * Sets the map script. This is the only required script.
         * Executed once per document collected.
         * If no combine_script is specified, the resulting state needs to be stored in an object named _agg.
         *
         * @param {string|Script} mapScript The map script. Can be a string or an Script instance
         */
        mapScript(mapScript: string | Script): this;

        /**
         * Sets the combine phase script.
         * Executed once on each shard after document collection is complete.
         * Allows the aggregation to consolidate the state returned from each shard.
         * If a combine_script is not provided the combine phase will return the aggregation variable.
         *
         * @param {string|Script} combineScript The combine script. Can be a string or an Script instance
         */
        combineScript(combineScript: string | Script): this;

        /**
         * Sets the reduce phase script.
         * Executed once on the coordinating node after all shards have returned their results.
         * The script is provided with access to a variable _aggs
         * which is an array of the result of the combine_script on each shard.
         * If a reduce_script is not provided the reduce phase will return the _aggs variable.
         *
         * @param {string|Script} reduceScript The combine script. Can be a string or an Script instance
         */
        reduceScript(reduceScript: string | Script): this;

        /**
         * Sets the params for scripts.
         * Optional object whose contents will be passed as variables to
         * the init_script, map_script and combine_script
         * If you specify script parameters then you must specify `"_agg": {}`.
         *
         * @param {object} params Object passed to init, map and combine script. Default value - `{ "_agg": {} }`
         */
        params(params: object): this;
    }

    /**
     * A metric aggregation that executes using scripts to provide a metric output.
     *
     * Aggregation that keeps track and returns the minimum value among numeric
     * values extracted from the aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function scriptedMetricAggregation(
        name: string
    ): ScriptedMetricAggregation;

    /**
     * A multi-value metrics aggregation that computes stats over numeric values
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a provided
     * script.
     * The stats that are returned consist of: min, max, sum, count and avg.
     *
     * Aggregation that computes stats over numeric values extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class StatsAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A multi-value metrics aggregation that computes stats over numeric values
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a provided
     * script.
     * The stats that are returned consist of: min, max, sum, count and avg.
     *
     * Aggregation that computes stats over numeric values extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function statsAggregation(
        name: string,
        field?: string
    ): StatsAggregation;

    /**
     * A single-value metrics aggregation that sums up numeric values that are
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a
     * provided script.
     *
     * Aggregation that sums up numeric values that are extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class SumAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A single-value metrics aggregation that sums up numeric values that are
     * extracted from the aggregated documents. These values can be extracted either
     * from specific numeric fields in the documents, or be generated by a
     * provided script.
     *
     * Aggregation that sums up numeric values that are extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function sumAggregation(
        name: string,
        field?: string
    ): SumAggregation;

    /**
     * A `top_hits` metric aggregator keeps track of the most relevant document being
     * aggregated. This aggregator is intended to be used as a sub aggregator, so that
     * the top matching documents can be aggregated per bucket.
     *
     * `top_hits` metric aggregator keeps track of the most relevant document being
     * aggregated.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends MetricsAggregationBase
     */
    export class TopHitsAggregation extends MetricsAggregationBase {
        constructor(name: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */
        script(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */
        missing(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */
        format(): never;

        /**
         * Sets the offset for fetching result.
         *
         * @param {number} from The offset from the first result you want to fetch.
         */
        from(from: number): this;

        /**
         * Sets the maximum number of top matching hits to return per bucket.
         *
         * @param {number} size The numer of aggregation entries to be returned per bucket.
         */
        size(size: number): this;

        /**
         * How the top matching hits should be sorted. Allows to add sort on specific field.
         * The sort can be reversed as well. The sort is defined on a per field level,
         * with special field name for `_score` to sort by score, and `_doc` to sort by
         * index order.
         *
         * @param {Sort} sort How the top matching hits should be sorted.
         * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
         */
        sort(sort: Sort): this;

        /**
         * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
         * The sort is defined on a per field level, with special field name for _score to
         * sort by score, and _doc to sort by index order.
         *
         * @param {Array<Sort>} sorts Arry of sort How the top matching hits should be sorted.
         * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
         */
        sorts(sorts: Sort[]): this;

        /**
         * Enables score computation and tracking during sorting.
         * By default, sorting scores are not computed.
         *
         * @param {boolean} trackScores If scores should be computed and tracked. Defaults to false.
         */
        trackScores(trackScores: boolean): this;

        /**
         * Enable/Disable returning version number for each hit.
         *
         * @param {boolean} version true to enable, false to disable
         */
        version(version: boolean): this;

        /**
         * Enable/Disable explanation of score for each hit.
         *
         * @param {boolean} explain true to enable, false to disable
         */
        explain(explain: boolean): this;

        /**
         * Performs highlighting based on the `Highlight` settings.
         *
         * @param {Highlight} highlight
         */
        highlight(highlight: Highlight): this;

        /**
         * Allows to control how the `_source` field is returned with every hit.
         * You can turn off `_source` retrieval by passing `false`.
         * It also accepts one(string) or more wildcard(array) patterns to control
         * what parts of the `_source` should be returned
         * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
         *
         * @param {boolean|string|Array|Object} source
         */
        source(source: boolean | string | string[] | object): this;

        /**
         * The stored_fields parameter is about fields that are explicitly marked as stored in the mapping.
         * Selectively load specific stored fields for each document represented by a search hit
         * using array of stored fields.
         * An empty array will cause only the _id and _type for each hit to be returned.
         * To disable the stored fields (and metadata fields) entirely use: '_none_'
         *
         * @param {Array|string} fields
         */
        storedFields(fields: object | string): this;

        /**
         * Computes a document property dynamically based on the supplied `Script`.
         *
         * @param {string} scriptFieldName
         * @param {string|Script} script string or instance of `Script`
         */
        scriptField(scriptFieldName: string, script: string | Script): this;

        /**
         * Sets given dynamic document properties to be computed using supplied `Script`s.
         * Object should have `scriptFieldName` as key and `script` as the value.
         *
         * @param {object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
         */
        scriptFields(scriptFields: object): this;

        /**
         * Allows to return the doc value representation of a field for each hit.
         * Doc value fields can work on fields that are not stored.
         *
         * @param {Array<string>} fields
         */
        docvalueFields(fields: string[]): this;
    }

    /**
     * A `top_hits` metric aggregator keeps track of the most relevant document being
     * aggregated. This aggregator is intended to be used as a sub aggregator, so that
     * the top matching documents can be aggregated per bucket.
     *
     * `top_hits` metric aggregator keeps track of the most relevant document being
     * aggregated.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function topHitsAggregation(name: string): TopHitsAggregation;

    /**
     * A single-value metrics aggregation that counts the number of values that
     * are extracted from the aggregated documents. These values can be extracted
     * either from specific fields in the documents, or be generated by a provided
     * script. Typically, this aggregator will be used in conjunction with other
     * single-value aggregations.
     *
     * Aggregation that counts the number of values that are extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends MetricsAggregationBase
     */
    export class ValueCountAggregation extends MetricsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on ValueCountAggregation
         */
        format(): never;
    }

    /**
     * A single-value metrics aggregation that counts the number of values that
     * are extracted from the aggregated documents. These values can be extracted
     * either from specific fields in the documents, or be generated by a provided
     * script. Typically, this aggregator will be used in conjunction with other
     * single-value aggregations.
     *
     * Aggregation that counts the number of values that are extracted from the
     * aggregated documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function valueCountAggregation(
        name: string,
        field?: string
    ): ValueCountAggregation;

    /**
     * The `BucketAggregationBase` provides support for common options used across
     * various bucket `Aggregation` implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name a valid aggregation name
     * @param {string} aggType type of aggregation
     * @param {string=} field The field to aggregate on
     * @extends Aggregation
     */
    export class BucketAggregationBase extends Aggregation {
        constructor(name: string, aggType: string, field?: string);

        /**
         * Sets field to run aggregation on.
         *
         * @param {string} field a valid field name
         */
        field(field: string): this;

        /**
         * Sets script parameter for aggregation.
         *
         * @param {Script} script
         * @throws {TypeError} If `script` is not an instance of `Script`
         */
        script(script: Script): this;
    }

    /**
     * A bucket aggregation returning a form of adjacency matrix.
     * The request provides a collection of named filter expressions,
     * similar to the `filters` aggregation request. Each bucket in the response
     * represents a non-empty cell in the matrix of intersecting filters.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     *
     * @extends BucketAggregationBase
     */
    export class AdjacencyMatrixAggregation extends BucketAggregationBase {
        constructor(name: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on AdjacencyMatrixAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on AdjacencyMatrixAggregation
         */
        script(): never;

        /**
         * Sets a named filter query.
         *
         * @param {string} filterName Name for the filter.
         * @param {Query} filterQuery Query to filter on. Example - term query.
         * @throws {TypeError} If `filterQuery` is not an instance of `Query`
         */
        filter(filterName: string, filterQuery: Query): this;

        /**
         * Assigns filters to already added filters.
         * Does not mix with anonymous filters.
         * If anonymous filters are present, they will be overwritten.
         *
         * @param {Object} filterQueries Object with multiple key value pairs
         * where filter name is the key and filter query is the value.
         * @throws {TypeError} If `filterQueries` is not an instance of object
         */
        filters(filterQueries: object): this;

        /**
         * Sets the `separator` parameter to use a separator string other than
         * the default of the ampersand.
         *
         * @param {string} sep the string used to separate keys in intersections buckets
         * e.g. & character for keyed filters A and B would return an
         * intersection bucket named A&B
         */
        separator(sep: string): this;
    }

    /**
     * A bucket aggregation returning a form of adjacency matrix.
     * The request provides a collection of named filter expressions,
     * similar to the `filters` aggregation request. Each bucket in the response
     * represents a non-empty cell in the matrix of intersecting filters.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     *
     * @extends BucketAggregationBase
     */
    export function adjacencyMatrixAggregation(
        name: string
    ): AdjacencyMatrixAggregation;

    /**
     * A special single bucket aggregation that enables aggregating
     * from buckets on parent document types to buckets on child documents.
     * This aggregation relies on the `_parent` field in the mapping.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends BucketAggregationBase
     */
    export class ChildrenAggregation extends BucketAggregationBase {
        constructor(name: string);
        /**
         * @override
         * @throws {Error} This method cannot be called on ChildrenAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on ChildrenAggregation
         */
        script(): never;

        /**
         * Sets the child type/mapping for aggregation.
         *
         * @param {string} type The child type that the buckets in the parent space should be mapped to.
         */
        type(type: string): this;
    }

    /**
     * A special single bucket aggregation that enables aggregating
     * from buckets on parent document types to buckets on child documents.
     * This aggregation relies on the `_parent` field in the mapping.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function childrenAggregation(name: string): ChildrenAggregation;

    /**
     * CompositeAggregation is a multi-bucket values source based aggregation that
     * can be used to calculate unique composite values from source documents.
     *
     * Unlike the other multi-bucket aggregation the composite aggregation can be
     * used to paginate **all** buckets from a multi-level aggregation efficiently.
     * This aggregation provides a way to stream **all** buckets of a specific
     * aggregation similarly to what scroll does for documents.
     *
     * NOTE: This query was added in elasticsearch v6.1.
     *
     * @param {string} name a valid aggregation name
     *
     * @extends Aggregation
     */
    export class CompositeAggregation extends Aggregation {
        constructor(name: string);

        /**
         * Specifies the Composite Aggregation values sources to use in the
         * aggregation.
         *
         * @param {...ValuesSourceBase} sources
         * @throws {TypeError} If any of the rest parameters `sources` is not an
         * instance of `ValuesSourceBase`
         */
        sources(...sources: CompositeAggregation.ValuesSourceBase[]): this;

        /**
         * Defines how many composite buckets should be returned. Each composite
         * bucket is considered as a single bucket so setting a size of 10 will
         * return the first 10 composite buckets created from the values source. The
         * response contains the values for each composite bucket in an array
         * containing the values extracted from each value source.
         *
         * @param {number} size
         */
        size(size: number): this;

        /**
         * The `after` parameter can be used to retrieve the composite buckets that
         * are after the last composite buckets returned in a previous round.
         *
         * @param {Object} afterKey
         */
        after(afterKey: object): this;
    }

    /**
     * CompositeAggregation is a multi-bucket values source based aggregation that
     * can be used to calculate unique composite values from source documents.
     *
     * Unlike the other multi-bucket aggregation the composite aggregation can be
     * used to paginate **all** buckets from a multi-level aggregation efficiently.
     * This aggregation provides a way to stream **all** buckets of a specific
     * aggregation similarly to what scroll does for documents.
     *
     * NOTE: This query was added in elasticsearch v6.1.
     *
     * @param {string} name a valid aggregation name
     */
    export function compositeAggregation(name: string): CompositeAggregation;

    namespace CompositeAggregation {
        /**
         * Base class implementation for all Composite Aggregation values sources.
         *
         * **NOTE:** Instantiating this directly should not be required.
         *
         * @param {string} valueSrcType Type of value source.
         * @param {string} refUrl Elasticsearch reference URL
         * @param {string} name
         * @param {string=} field The field to aggregate on
         *
         * @throws {Error} if `name` is empty
         * @throws {Error} if `valueSrcType` is empty
         */
        class ValuesSourceBase {
            constructor(
                valueSrcType: string,
                refUrl: string,
                name: string,
                field?: string
            );

            /**
             * Field to use for this source.
             *
             * @param {string} field a valid field name
             */
            field(field: string): this;

            /**
             * Script to use for this source.
             *
             * @param {Script|Object|string} script
             * @throws {TypeError} If `script` is not an instance of `Script`
             */
            script(script: Script | object | string): this;

            /**
             * Specifies the type of values produced by this source, e.g. `string` or
             * `date`.
             *
             * @param {string} valueType
             */
            valueType(valueType: string): this;

            /**
             * Order specifies the order in the values produced by this source. It can
             * be either `asc` or `desc`.
             *
             * @param {string} order The `order` option can have the following values.
             * `asc`, `desc` to sort in ascending, descending order respectively..
             */
            order(order: 'asc' | 'desc'): this;

            /**
             * Missing specifies the value to use when the source finds a missing value
             * in a document.
             *
             * Note: Thes option was deprecated in
             * [Elasticsearch v6.0](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/breaking-changes-6.0.html#_literal_missing_literal_is_deprecated_in_the_literal_composite_literal_aggregation).
             * From 6.4 and later, use `missing_bucket` instead.
             *
             * @param {string|number} value
             */
            missing(value: string | number): this;

            /**
             * Specifies to include documents without a value for a given source in the
             * response, or not. Defaults to `false` (not include).
             *
             * Note: This method is incompatible with elasticsearch 6.3 and older.
             * Use it only with elasticsearch 6.4 and later.
             *
             * @param {boolean} value
             */
            missingBucket(value: boolean): this;

            /**
             * Override default `toJSON` to return DSL representation for the Composite
             * Aggregation values source.
             *
             * @override
             */
            toJSON(): object;
        }

        /**
         * `TermsValuesSource` is a source for the `CompositeAggregation` that handles
         * terms. It works very similar to a terms aggregation with a slightly different
         * syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         *
         * @extends ValuesSourceBase
         */
        export class TermsValuesSource extends ValuesSourceBase {
            constructor(name: string, field?: string);
        }

        /**
         * `TermsValuesSource` is a source for the `CompositeAggregation` that handles
         * terms. It works very similar to a terms aggregation with a slightly different
         * syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         */
        export function termsValuesSource(
            name: string,
            field?: string
        ): TermsValuesSource;

        /**
         * `HistogramValuesSource` is a source for the `CompositeAggregation` that handles
         * histograms. It works very similar to a histogram aggregation with a slightly
         * different syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         * @param {number=} interval Interval to generate histogram over.
         *
         * @extends ValuesSourceBase
         */
        export class HistogramValuesSource extends ValuesSourceBase {
            constructor(name: string, field?: string, interval?: number);

            /**
             * Sets the histogram interval. Buckets are generated based on this interval value.
             *
             * @param {number} interval Interval to generate histogram over.
             */
            interval(interval: number): this;
        }

        /**
         * `HistogramValuesSource` is a source for the `CompositeAggregation` that handles
         * histograms. It works very similar to a histogram aggregation with a slightly
         * different syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         * @param {number=} interval Interval to generate histogram over.
         */
        export function histogramValuesSource(
            name: string,
            field?: string,
            interval?: number
        ): HistogramValuesSource;

        /**
         * `DateHistogramValuesSource` is a source for the `CompositeAggregation` that
         * handles date histograms. It works very similar to a histogram aggregation
         * with a slightly different syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         * @param {string|number=} interval Interval to generate histogram over.
         *
         * @extends ValuesSourceBase
         */
        export class DateHistogramValuesSource extends ValuesSourceBase {
            constructor(
                name: string,
                field?: string,
                interval?: string | number
            );

            /**
             * Sets the histogram interval. Buckets are generated based on this interval value.
             *
             * @param {string|number} interval Interval to generate histogram over.
             */
            interval(interval: string | number): this;

            /**
             * Calendar-aware intervals are configured with the calendarInterval parameter.
             * The combined interval field for date histograms is deprecated from ES 7.2.
             *
             * @param {string} interval Interval to generate histogram over.
             * You can specify calendar intervals using the unit name, such as month, or as
             * a single unit quantity, such as 1M. For example, day and 1d are equivalent.
             * Multiple quantities, such as 2d, are not supported.
             */
            calendarInterval(interval: string): this;

            /**
             * Fixed intervals are configured with the fixedInterval parameter.
             * The combined interval field for date histograms is deprecated from ES 7.2.
             *
             * @param {string} interval Interval to generate histogram over.
             * Intervals are a fixed number of SI units and never deviate, regardless
             * of where they fall on the calendar. However, it means fixed intervals
             * cannot express other units such as months, since the duration of a
             * month is not a fixed quantity.
             *
             * The accepted units for fixed intervals are:
             * millseconds (ms), seconds (s), minutes (m), hours (h) and days (d).
             */
            fixedInterval(interval: string): this;

            /**
             * Sets the date time zone
             *
             * Date-times are stored in Elasticsearch in UTC. By default, all bucketing
             * and rounding is also done in UTC. The `time_zone` parameter can be used
             * to indicate that bucketing should use a different time zone.
             *
             * @param {string} tz Time zone. Time zones may either be specified
             * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
             * an identifier used in the TZ database like America/Los_Angeles.
             */
            timeZone(tz: string): this;

            /**
             * Sets the format expression for `key_as_string` in response buckets.
             * If no format is specified, then it will use the first format specified
             * in the field mapping.
             *
             * @param {string} fmt Format mask to apply on aggregation response.
             * For Date Histograms, supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern)
             */
            format(fmt: string): this;
        }

        /**
         * `DateHistogramValuesSource` is a source for the `CompositeAggregation` that
         * handles date histograms. It works very similar to a histogram aggregation
         * with a slightly different syntax.
         *
         * @param {string} name
         * @param {string=} field The field to aggregate on
         * @param {string|number=} interval Interval to generate histogram over.
         */
        export function dateHistogramValuesSource(
            name: string,
            field?: string,
            interval?: string | number
        ): DateHistogramValuesSource;
    }

    /**
     * The `HistogramAggregationBase` provides support for common options used across
     * various histogram `Aggregation` implementations like Histogram Aggregation,
     * Date Histogram aggregation.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} aggType Type of aggregation
     * @param {string=} field The field to aggregate on
     * @param {string|number=} interval Interval to generate histogram over.
     * @extends BucketAggregationBase
     */
    export class HistogramAggregationBase extends BucketAggregationBase {
        constructor(
            name: string,
            aggType: string,
            field?: string,
            interval?: string | number
        );

        /**
         * Sets the histogram interval. Buckets are generated based on this interval value.
         *
         * @param {string} interval Interval to generate histogram over.
         * For date histograms, available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         */
        interval(interval: string): this;

        /**
         * Sets the format expression for `key_as_string` in response buckets.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
         * For Date Histograms, supports expressive date format pattern
         */
        format(fmt: string): this;

        /**
         * The offset parameter is used to change the start value of each bucket
         * by the specified positive (+) or negative offset (-).
         * Negative offset is not applicable on HistogramAggregation.
         * In case of DateHistogramAggregation, duration can be
         * a value such as 1h for an hour, or 1d for a day.
         *
         * @param {string} offset Time or bucket key offset for bucketing.
         */
        offset(offset: string): this;

        /**
         * Sets the ordering for buckets
         *
         * @param {string} key
         * @param {string} direction `asc` or `desc`
         */
        order(key: string, direction?: 'asc' | 'desc'): this;

        /**
         * Sets the minimum number of matching documents in range to return the bucket.
         *
         * @param {number} minDocCnt Integer value for minimum number of documents
         * required to return bucket in response
         */
        minDocCount(minDocCnt: number): this;

        /**
         * Set's the range/bounds for the histogram aggregation.
         * Useful when you want to include buckets that might be
         * outside the bounds of indexed documents.
         *
         * @param {number|string} min Start bound / minimum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         * @param {number|string} max End bound / maximum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         */
        extendedBounds(min: number | string, max: number | string): this;

        /**
         * Set's the range/bounds for the histogram aggregation.
         * Useful when you want to limit the range of buckets in the histogram.
         * It is particularly useful in the case of open data ranges that can result in a very large number of buckets.
         * NOTE: Only available in Elasticsearch v7.10.0+
         *
         * @example
         * const agg = esb.histogramAggregation('prices', 'price', 50).hardBounds(0, 500);
         *
         * @param {number|string} min Start bound / minimum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         * @param {number|string} max End bound / maximum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */
        hardBounds(min: number | string, max: number | string): this;

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         */
        missing(value: string): this;

        /**
         * Enable the response to be returned as a keyed object where the key is the
         * bucket interval.
         *
         * @param {boolean} keyed To enable keyed response or not.
         */
        keyed(keyed: boolean): this;
    }

    /**
     * The `AutoDateHistogramAggregation` is similar to the Date histogram aggregation except
     * instead of providing an interval to use as the width of each bucket, a target number
     * of buckets is provided indicating the number of buckets needed and the interval of the
     * buckets is automatically chosen to best achieve that target.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} aggType Type of aggregation
     * @param {string=} field The field to aggregate on
     * @param {number=} buckets Bucket count to generate histogram over.
     * @extends BucketAggregationBase
     */
    export class AutoDateHistogramAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string, buckets?: number);

        /**
         * Sets the bucket count. Buckets are generated based on this interval value.
         *
         * @param {number} buckets Bucket count to generate histogram over.
         */
        buckets(buckets: number): this;

        /**
         * Sets the format expression for `key_as_string` in response buckets.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
         * For Date Histograms, supports expressive date format pattern
         */
        format(fmt: string): this;

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         */
        missing(value: string): this;

        /**
         * Sets the minimum rounding interval that should be used.
         *
         * @param {string} value
         */
        minimumInterval(value: string): this;

        /**
         * Date-times are stored in Elasticsearch in UTC.
         * By default, all bucketing and rounding is also done in UTC.
         * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
         * Sets the date time zone
         *
         * @param {string} tz Time zone. Time zones may either be specified
         * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
         * an identifier used in the TZ database like America/Los_Angeles.
         */
        timeZone(tz: string): this;
    }

    /**
     * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
     * The interval can be specified by date/time expressions.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {number=} buckets Bucket count to generate histogram over.
     */
    export function autoDateHistogramAggregation(
        name: string,
        field?: string,
        buckets?: number
    ): AutoDateHistogramAggregation;

    /**
     * A multi-bucket aggregation similar to Histogram, but the width of each bucket is not specified.
     *
     * NOTE: Only available in Elasticsearch v7.9.0+
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} [field] The field to aggregate on
     * @param {number=} [buckets] Bucket count to generate histogram over.
     * @extends BucketAggregationBase
     */
    export class VariableWidthHistogramAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string, buckets?: number);

        /**
         * Sets the histogram bucket count. Buckets are generated based on this value.
         *
         * @param {number} buckets Bucket count to generate histogram over.
         * @returns {VariableWidthHistogramAggregation} returns `this` so that calls can be chained
         */
        buckets(buckets: number): this;
    }

    /**
     * A multi-bucket aggregation similar to Histogram, but the width of each bucket is not specified.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} [field] The field to aggregate on
     * @param {number=} [buckets] Bucket count to generate histogram over.
     * @extends BucketAggregationBase
     */
    export function variableWidthHistogramAggregation(
        name: string,
        field?: string,
        buckets?: number
    ): VariableWidthHistogramAggregation;

    /**
     * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
     * The interval can be specified by date/time expressions.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {string=} interval Interval to generate histogram over.
     * Available expressions for interval: year, quarter, month, week, day, hour, minute, second
     * @extends HistogramAggregationBase
     */
    export class DateHistogramAggregation extends HistogramAggregationBase {
        constructor(name: string, field?: string, interval?: string);

        /**
         * Date-times are stored in Elasticsearch in UTC.
         * By default, all bucketing and rounding is also done in UTC.
         * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
         * Sets the date time zone
         *
         * @param {string} tz Time zone. Time zones may either be specified
         * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
         * an identifier used in the TZ database like America/Los_Angeles.
         */
        timeZone(tz: string): this;

        /**
         * Calendar-aware intervals are configured with the calendarInterval parameter.
         * The combined interval field for date histograms is deprecated from ES 7.2.
         *
         * @param {string} interval Interval to generate histogram over.
         * You can specify calendar intervals using the unit name, such as month, or as
         * a single unit quantity, such as 1M. For example, day and 1d are equivalent.
         * Multiple quantities, such as 2d, are not supported.
         */
        calendarInterval(interval: string): this;

        /**
         * Fixed intervals are configured with the fixedInterval parameter.
         * The combined interval field for date histograms is deprecated from ES 7.2.
         *
         * @param {string} interval Interval to generate histogram over.
         * Intervals are a fixed number of SI units and never deviate, regardless
         * of where they fall on the calendar. However, it means fixed intervals
         * cannot express other units such as months, since the duration of a
         * month is not a fixed quantity.
         *
         * The accepted units for fixed intervals are:
         * millseconds (ms), seconds (s), minutes (m), hours (h) and days (d).
         */
        fixedInterval(interval: string): this;
    }

    /**
     * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
     * The interval can be specified by date/time expressions.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {string=} interval Interval to generate histogram over.
     * Available expressions for interval: year, quarter, month, week, day, hour, minute, second
     */
    export function dateHistogramAggregation(
        name: string,
        field?: string,
        interval?: string
    ): DateHistogramAggregation;

    /**
     * The `RangeAggregationBase` provides support for common options used across
     * various range `Aggregation` implementations like Range Aggregation and
     * Date Range aggregation.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} aggType Type of aggregation
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class RangeAggregationBase extends BucketAggregationBase {
        constructor(name: string, aggType: string, field?: string);

        /**
         * Sets the format expression for `key_as_string` in response buckets.
         * If no format is specified, then it will use the format specified in the field mapping.
         *
         * @param {string} fmt Supports expressive date format pattern for Date Histograms
         */
        format(fmt: string): this;

        /**
         * Adds a range to the list of existing range expressions.
         *
         * @param {object} range Range to aggregate over. Valid keys are `from`, `to` and `key`
         * @throws {TypeError} If `range` is not an instance of object
         * @throws {Error} If none of the required keys,
         * `from`, `to` or `mask`(for IP range) is passed
         */
        range(range: object): this;

        /**
         * Adds the list of ranges to the list of existing range expressions.
         *
         * @param {Array<Object>} ranges Ranges to aggregate over.
         * Each item must be an object with keys `from`, `to` and `key`.
         * @throws {TypeError} If `ranges` is not an instance of an array or
         * and item in the array is not an instance of object
         * @throws {Error} If none of the required keys,
         * `from`, `to` or `mask`(for IP range) is passed
         */
        ranges(ranges: object[]): this;

        /**
         * Sets the missing parameter ehich defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         */
        missing(value: string): this;

        /**
         * Enable the response to be returned as a keyed object where the key is the
         * bucket interval.
         *
         * @param {boolean} keyed To enable keyed response or not.
         */
        keyed(keyed: boolean): this;
    }

    /**
     * A range aggregation that is dedicated for date values. The main difference
     * between this aggregation and the normal range aggregation is that the from
     * and to values can be expressed in Date Math expressions, and it is also
     * possible to specify a date format by which the from and to response fields
     * will be returned.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends RangeAggregationBase
     */
    export class DateRangeAggregation extends RangeAggregationBase {
        constructor(name: string, field?: string);

        /**
         * Sets the date time zone.
         * Date-times are stored in Elasticsearch in UTC.
         * By default, all bucketing and rounding is also done in UTC.
         * The `time_zone` parameter can be used to indicate that
         * bucketing should use a different time zone.
         *
         * @param {string} tz Time zone. Time zones may either be specified
         * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
         * an identifier used in the TZ database like America/Los_Angeles.
         */
        timeZone(tz: string): this;
    }

    /**
     * A range aggregation that is dedicated for date values. The main difference
     * between this aggregation and the normal range aggregation is that the from
     * and to values can be expressed in Date Math expressions, and it is also
     * possible to specify a date format by which the from and to response fields
     * will be returned.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends RangeAggregationBase
     */

    export function dateRangeAggregation(
        name: string,
        field?: string
    ): DateRangeAggregation;

    /**
     * A filtering aggregation used to limit any sub aggregations' processing
     * to a sample of the top-scoring documents. Diversity settings
     * are used to limit the number of matches that share a common value such as an "author".
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class DiversifiedSamplerAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * The shard_size parameter limits how many top-scoring documents
         * are collected in the sample processed on each shard. The default value is 100.
         *
         * @param {number} size Maximum number of documents to return from each shard(Integer)
         */
        shardSize(size: number): this;

        /**
         * Used to control the maximum number of documents collected
         * on any one shard which share a common value.
         * Applies on a per-shard basis only for the purposes of shard-local sampling.
         *
         * @param {number} maxDocsPerValue Default 1.(Integer)
         */
        maxDocsPerValue(maxDocsPerValue: number): this;

        /**
         * This setting can influence the management of the values used
         * for de-duplication. Each option will hold up to shard_size
         * values in memory while performing de-duplication but
         * the type of value held can be controlled
         *
         * @param {string} hint the possible values are `map`, `global_ordinals`,
         * `global_ordinals_hash` and `global_ordinals_low_cardinality`
         * @throws {Error} If Execution Hint is outside the accepted set.
         */
        executionHint(
            hint:
                | 'map'
                | 'global_ordinals'
                | 'global_ordinals_hash'
                | 'global_ordinals_low_cardinality'
        ): this;
    }

    /**
     * A filtering aggregation used to limit any sub aggregations' processing
     * to a sample of the top-scoring documents. Diversity settings
     * are used to limit the number of matches that share a common value such as an "author".
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function diversifiedSamplerAggregation(
        name: string,
        field?: string
    ): DiversifiedSamplerAggregation;

    /**
     * Defines a single bucket of all the documents in the current document set
     * context that match a specified filter. Often this will be used to narrow down
     * the current aggregation context to a specific set of documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {Query=} filterQuery Query to filter on. Example - term query.
     * @extends BucketAggregationBase
     */
    export class FilterAggregation extends BucketAggregationBase {
        constructor(name: string, filterQuery?: Query);

        /**
         * @override
         * @throws {Error} This method cannot be called on FilterAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on FilterAggregation
         */
        script(): never;

        /**
         * Set the filter query for Filter Aggregation.
         *
         * @param {Query} filterQuery Query to filter on. Example - term query.
         * @throws {TypeError} If `filterQuery` is not an instance of `Query`
         */
        filter(filterQuery: Query): this;
    }

    /**
     * Defines a single bucket of all the documents in the current document set
     * context that match a specified filter. Often this will be used to narrow down
     * the current aggregation context to a specific set of documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {Query=} filterQuery Query to filter on. Example - term query.
     */
    export function filterAggregation(
        name: string,
        filterQuery?: Query
    ): FilterAggregation;

    /**
     * Defines a single bucket of all the documents in the current document set
     * context that match a specified filter. Often this will be used to narrow down
     * the current aggregation context to a specific set of documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends BucketAggregationBase
     */
    export class FiltersAggregation extends BucketAggregationBase {
        constructor(name: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on FiltersAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on FiltersAggregation
         */
        script(): never;

        /**
         * Sets a named filter query.
         * Does not mix with anonymous filters.
         * If anonymous filters are present, they will be overwritten.
         *
         * @param {string} bucketName Name for bucket which will collect
         * all documents that match its associated filter.
         * @param {Query} filterQuery Query to filter on. Example - term query.
         * @throws {TypeError} If `filterQuery` is not an instance of `Query`
         */
        filter(bucketName: string, filterQuery: Query): this;

        /**
         * Assigns filters to already added filters.
         * Does not mix with anonymous filters.
         * If anonymous filters are present, they will be overwritten.
         *
         * @param {object} filterQueries Object with multiple key value pairs
         * where bucket name is the key and filter query is the value.
         * @throws {TypeError} If `filterQueries` is not an instance of object
         */
        filters(filterQueries: object): this;

        /**
         * Appends an anonymous filter query.
         * Does not mix with named filters.
         * If named filters are present, they will be overwritten.
         *
         * @param {*} filterQuery Query to filter on. Example - term query.
         * @throws {TypeError} If `filterQuery` is not an instance of `Query`
         */
        anonymousFilter(filterQuery: object): this;

        /**
         * Appends an array of anonymous filters.
         * Does not mix with named filters.
         * If named filters are present, they will be overwritten.
         *
         * @param {*} filterQueries Array of queries to filter on and generate buckets.
         * Example - term query.
         * @throws {TypeError} If `filterQueries` is not an instance of Array
         */
        anonymousFilters(filterQueries: object): this;

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
         */
        otherBucket(enable: boolean, otherBucketKey?: string): this;

        /**
         * Sets the key for the other bucket to a value other than the default `_other_`.
         * Setting this parameter will implicitly set the other_bucket parameter to true.
         * If anonymous filters are being used, setting this parameter will not make sense.
         *
         * @param {string} otherBucketKey
         */
        otherBucketKey(otherBucketKey: string): this;
    }

    /**
     * Defines a single bucket of all the documents in the current document set
     * context that match a specified filter. Often this will be used to narrow down
     * the current aggregation context to a specific set of documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function filtersAggregation(name: string): FiltersAggregation;

    /**
     * A multi-bucket aggregation that works on geo_point fields and conceptually
     * works very similar to the range aggregation. The user can define a point of
     * origin and a set of distance range buckets. The aggregation evaluate the
     * distance of each document value from the origin point and determines the
     * buckets it belongs to based on the ranges (a document belongs to a bucket
     * if the distance between the document and the origin falls within the distance
     * range of the bucket).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends RangeAggregationBase
     */
    export class GeoDistanceAggregation extends RangeAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoDistanceAggregation
         */
        format(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoDistanceAggregation
         */
        script(): never;

        /**
         * Sets the point of origin from where distances will be measured.
         *
         * @param {GeoPoint} point A valid `GeoPoint` object.
         * @throws {TypeError} If `point` is not an instance of `GeoPoint`
         */
        origin(point: GeoPoint): this;

        /**
         * Sets the distance unit.  Valid values are:
         * mi (miles), in (inches), yd (yards),
         * km (kilometers), cm (centimeters), mm (millimeters),
         * ft(feet), NM(nauticalmiles)
         *
         * @param {string} unit Distance unit, default is `m`(meters).
         * @throws {Error} If Unit is outside the accepted set.
         */
        unit(unit: string): this;

        /**
         * Sets the distance calculation mode, `arc` or `plane`.
         * The `arc` calculation is the more accurate.
         * The `plane` is the faster but least accurate.
         *
         * @param {string} type
         * @throws {Error} If `type` is neither `plane` nor `arc`.
         */
        distanceType(type: 'arc' | 'plane'): this;
    }

    /**
     * A multi-bucket aggregation that works on geo_point fields and conceptually
     * works very similar to the range aggregation. The user can define a point of
     * origin and a set of distance range buckets. The aggregation evaluate the
     * distance of each document value from the origin point and determines the
     * buckets it belongs to based on the ranges (a document belongs to a bucket
     * if the distance between the document and the origin falls within the distance
     * range of the bucket).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function geoDistanceAggregation(
        name: string,
        field?: string
    ): GeoDistanceAggregation;

    /**
     * A multi-bucket aggregation that works on geo_point fields and groups points
     * into buckets that represent cells in a grid. The resulting grid can be sparse
     * and only contains cells that have matching data. Each cell is labeled using a
     * geohash which is of user-definable precision.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class GeoHashGridAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoHashGridAggregation
         */
        format(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoHashGridAggregation
         */
        script(): never;

        /**
         * Sets the precision for the generated geohash.
         *
         * @param {number} precision Precision can be between 1 and 12
         * @throws {Error} If precision is not between 1 and 12.
         */
        precision(precision: number): this;

        /**
         * Sets the maximum number of geohash buckets to return.
         * When results are trimmed, buckets are prioritised
         * based on the volumes of documents they contain.
         *
         * @param {number} size Optional. The maximum number of geohash
         * buckets to return (defaults to 10,000).
         */
        size(size: number): this;

        /**
         * Determines how many geohash_grid the coordinating node
         * will request from each shard.
         *
         * @param {number} shardSize Optional.
         */
        shardSize(shardSize: number): this;
    }

    /**
     * A multi-bucket aggregation that works on geo_point fields and groups points
     * into buckets that represent cells in a grid. The resulting grid can be sparse
     * and only contains cells that have matching data. Each cell is labeled using a
     * geohash which is of user-definable precision.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function geoHashGridAggregation(
        name: string,
        field?: string
    ): GeoHashGridAggregation;

    /**
     * A multi-bucket aggregation that groups geo_point and geo_shape values into buckets
     * that represent a grid. The resulting grid can be sparse and only contains cells
     * that have matching data. Each cell corresponds to a H3 cell index and is labeled
     * using the H3Index representation.
     *
     * NOTE: This aggregation was added in elasticsearch v8.1.0.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class GeoHexGridAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoHexGridAggregation
         */
        format(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoHexGridAggregation
         */
        script(): never;

        /**
         * Sets the precision for the generated geohex.
         *
         * @param {number} precision Precision can be between 0 and 15
         * @throws {Error} If precision is not between 0 and 15.
         */
        precision(precision: number): this;

        /**
         * Sets the maximum number of geohex buckets to return.
         * When results are trimmed, buckets are prioritised
         * based on the volumes of documents they contain.
         *
         * @param {number} size Optional. The maximum number of geohex
         * buckets to return (defaults to 10,000).
         */
        size(size: number): this;

        /**
         * Determines how many geohex_grid the coordinating node
         * will request from each shard.
         *
         * @param {number} shardSize Optional.
         */
        shardSize(shardSize: number): this;
    }

    /**
     * A multi-bucket aggregation that groups geo_point and geo_shape values into buckets
     * that represent a grid. The resulting grid can be sparse and only contains cells
     * that have matching data. Each cell corresponds to a H3 cell index and is labeled
     * using the H3Index representation.
     *
     * NOTE: This aggregation was added in elasticsearch v8.1.0.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function geoHexGridAggregation(
        name: string,
        field?: string
    ): GeoHexGridAggregation;

    /**
     * A multi-bucket aggregation that works on geo_point fields and groups points
     * into buckets that represent cells in a grid. The resulting grid can be sparse
     * and only contains cells that have matching data. Each cell corresponds to a
     * map tile as used by many online map sites. Each cell is labeled using a
     * "{zoom}/{x}/{y}" format, where zoom is equal to the user-specified precision.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class GeoTileGridAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoTileGridAggregation
         */
        format(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoTileGridAggregation
         */
        script(): never;

        /**
         * Sets the precision for the generated geotile.
         *
         * @param {number} precision Precision can be between 0 and 29
         * @throws {Error} If precision is not between 0 and 29.
         */
        precision(precision: number): this;

        /**
         * Sets the maximum number of geotile buckets to return.
         * When results are trimmed, buckets are prioritised
         * based on the volumes of documents they contain.
         *
         * @param {number} size Optional. The maximum number of geotile
         * buckets to return (defaults to 10,000).
         */
        size(size: number): this;

        /**
         * Determines how many geotile_grid the coordinating node
         * will request from each shard.
         *
         * @param {number} shardSize Optional.
         */
        shardSize(shardSize: number): this;

        /**
         * Sets the top left coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        topLeft(point: GeoPoint): this;

        /**
         * Sets the bottom right coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        bottomRight(point: GeoPoint): this;

        /**
         * Sets the top right coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        topRight(point: GeoPoint): this;

        /**
         * Sets the bottom left coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         */
        bottomLeft(point: GeoPoint): this;

        /**
         * Sets value for top of the bounding box.
         *
         * @param {number} val
         */
        top(val: number): this;

        /**
         * Sets value for left of the bounding box.
         *
         * @param {number} val
         */
        left(val: number): this;

        /**
         * Sets value for bottom of the bounding box.
         *
         * @param {number} val
         */
        bottom(val: number): this;

        /**
         * Sets value for right of the bounding box.
         *
         * @param {number} val
         */
        right(val: number): this;
    }

    /**
     * A multi-bucket aggregation that works on geo_point fields and groups points
     * into buckets that represent cells in a grid. The resulting grid can be sparse
     * and only contains cells that have matching data. Each cell corresponds to a
     * map tile as used by many online map sites. Each cell is labeled using a
     * "{zoom}/{x}/{y}" format, where zoom is equal to the user-specified precision.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function geoTileGridAggregation(
        name: string,
        field?: string
    ): GeoTileGridAggregation;

    /**
     * Defines a single bucket of all the documents within the search execution
     * context. This context is defined by the indices and the document types you’re
     * searching on, but is not influenced by the search query itself.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends BucketAggregationBase
     */
    export class GlobalAggregation extends BucketAggregationBase {
        constructor(name: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on GlobalAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on GlobalAggregation
         */
        script(): never;
    }

    /**
     * Defines a single bucket of all the documents within the search execution
     * context. This context is defined by the indices and the document types you’re
     * searching on, but is not influenced by the search query itself.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function globalAggregation(name: string): GlobalAggregation;

    /**
     * A multi-bucket values source based aggregation that can be applied on
     * numeric values extracted from the documents. It dynamically builds fixed
     * size (a.k.a. interval) buckets over the values.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {number=} interval Interval to generate histogram over.
     * @extends HistogramAggregationBase
     */
    export class HistogramAggregation extends HistogramAggregationBase {
        constructor(name: string, field?: string, interval?: number);
    }

    /**
     * A multi-bucket values source based aggregation that can be applied on
     * numeric values extracted from the documents. It dynamically builds fixed
     * size (a.k.a. interval) buckets over the values.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @param {number=} interval Interval to generate histogram over.
     */
    export function histogramAggregation(
        name: string,
        field?: string,
        interval?: number
    ): HistogramAggregation;

    /**
     * Dedicated range aggregation for IP typed fields.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends RangeAggregationBase
     */
    export class IpRangeAggregation extends RangeAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on IpRangeAggregation
         */
        format(): never;
    }

    /**
     * Dedicated range aggregation for IP typed fields.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function ipRangeAggregation(
        name: string,
        field?: string
    ): IpRangeAggregation;

    /**
     * A field data based single bucket aggregation, that creates a bucket of all
     * documents in the current document set context that are missing a field value
     * (effectively, missing a field or having the configured NULL value set).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class MissingAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on MissingAggregation
         */
        script(): never;
    }

    /**
     * A field data based single bucket aggregation, that creates a bucket of all
     * documents in the current document set context that are missing a field value
     * (effectively, missing a field or having the configured NULL value set).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function missingAggregation(
        name: string,
        field?: string
    ): MissingAggregation;

    /**
     * A special single bucket aggregation that enables aggregating nested
     * documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} path `path` of the nested document
     * @extends BucketAggregationBase
     */
    export class NestedAggregation extends BucketAggregationBase {
        constructor(name: string, path?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on NestedAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on NestedAggregation
         */
        script(): never;

        /**
         * Sets the nested path
         *
         * @param {string} path `path` of the nested document
         */
        path(path: string): this;
    }

    /**
     * A special single bucket aggregation that enables aggregating nested
     * documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} path `path` of the nested document
     */
    export function nestedAggregation(
        name: string,
        path?: string
    ): NestedAggregation;

    /**
     * A special single bucket aggregation that enables aggregating
     * from buckets on child document types to buckets on parent documents.
     * This aggregation relies on the `_parent` field in the mapping.
     *
     * NOTE: This query was added in elasticsearch v6.6.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends BucketAggregationBase
     */
    export class ParentAggregation extends BucketAggregationBase {
        constructor(name: string);
        /**
         * @override
         * @throws {Error} This method cannot be called on ParentAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on ParentAggregation
         */
        script(): never;

        /**
         * Sets the child type/mapping for aggregation.
         *
         * @param {string} type The child type that the buckets in the parent space should be mapped to.
         */
        type(type: string): this;
    }

    /**
     * A special single bucket aggregation that enables aggregating
     * from buckets on child document types to buckets on parent documents.
     * This aggregation relies on the `_parent` field in the mapping.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function parentAggregation(name: string): ParentAggregation;

    /**
     * A multi-bucket value source based aggregation that enables the user to
     * define a set of ranges - each representing a bucket. During the aggregation
     * process, the values extracted from each document will be checked against each
     * bucket range and "bucket" the relevant/matching document.
     * Note that this aggregration includes the from value and excludes the to
     * value for each range.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends RangeAggregationBase
     */
    export class RangeAggregation extends RangeAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * A multi-bucket value source based aggregation that enables the user to
     * define a set of ranges - each representing a bucket. During the aggregation
     * process, the values extracted from each document will be checked against each
     * bucket range and "bucket" the relevant/matching document.
     * Note that this aggregration includes the from value and excludes the to
     * value for each range.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function rangeAggregation(
        name: string,
        field?: string
    ): RangeAggregation;

    /**
     * A multi-bucket value source based aggregation which finds
     * "rare" terms — terms that are at the long-tail of the
     * distribution and are not frequent. Conceptually, this is like
     * a terms aggregation that is sorted by `_count` ascending.
     * As noted in the terms aggregation docs, actually ordering
     * a `terms` agg by count ascending has unbounded error.
     * Instead, you should use the `rare_terms` aggregation
     *
     * NOTE: Only available in Elasticsearch 7.3.0+.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} field The field we wish to find rare terms in
     * @extends BucketAggregationBase
     */
    export class RareTermsAggregation extends BucketAggregationBase {
        constructor(name: string, field: string);

        /**
         * Sets the maximum number of documents a term should appear in.
         *
         * @param {number} maxDocCnt Integer value for maximum number of documents a term should appear in.
         * Max doc count can be between 1 and 100.
         * @returns {RareTermsAggregation} returns `this` so that calls can be chained
         */
        maxDocCount(maxDocCnt: number): this;

        /**
         * Sets the precision of the internal CuckooFilters. Smaller precision
         * leads to better approximation, but higher memory usage.
         * Cannot be smaller than 0.00001
         *
         * @param {number} precision Float value for precision of the internal CuckooFilters. Default is 0.01
         * @returns {RareTermsAggregation} returns `this` so that calls can be chained
         */
        precision(precision: number): this;

        /**
         * Sets terms that should be included in the aggregation
         *
         * @param {string} include Regular expression that will determine what values
         * are "allowed" to be aggregated
         * @returns {RareTermsAggregation} returns `this` so that calls can be chained
         */
        include(include: string): this;

        /**
         * Sets terms that should be excluded from the aggregation
         *
         * @param {string} exclude Regular expression that will determine what values
         * should not be aggregated
         * @returns {RareTermsAggregation} returns `this` so that calls can be chained
         */
        exclude(exclude: string): this;

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         * @returns {RareTermsAggregation} returns `this` so that calls can be chained
         */
        missing(value: string): this;

        /**
         * @override
         * @throws {Error} This method cannot be called on RareTermsAggregation
         */
        script(): never;
    }

    /**
     * A multi-bucket value source based aggregation which finds
     * "rare" terms — terms that are at the long-tail of the
     * distribution and are not frequent. Conceptually, this is like
     * a terms aggregation that is sorted by `_count` ascending.
     * As noted in the terms aggregation docs, actually ordering
     * a `terms` agg by count ascending has unbounded error.
     * Instead, you should use the `rare_terms` aggregation
     *
     * NOTE: Only available in Elasticsearch 7.3.0+.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} field The field we wish to find rare terms in
     */
    export function rareTermsAggregation(
        name: string,
        field: string
    ): RareTermsAggregation;

    /**
     * A special single bucket aggregation that enables aggregating
     * on parent docs from nested documents. Effectively this
     * aggregation can break out of the nested block structure and
     * link to other nested structures or the root document,
     * which allows nesting other aggregations that aren’t part of
     * the nested object in a nested aggregation.
     * The `reverse_nested` aggregation must be defined inside a nested aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} path Defines to what nested object field should be joined back.
     * The default is empty, which means that it joins back to the root / main document
     * level.
     * @extends BucketAggregationBase
     */
    export class ReverseNestedAggregation extends BucketAggregationBase {
        constructor(name: string, path?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on ReverseNestedAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on ReverseNestedAggregation
         */
        script(): never;

        /**
         * Sets the level to join back for subsequent aggregations in a multiple
         * layered nested object types
         *
         * @param {string} path Defines to what nested object field should be joined back.
         * The default is empty, which means that it joins back to the root / main document
         * level.
         */
        path(path: string): this;
    }

    /**
     * A special single bucket aggregation that enables aggregating
     * on parent docs from nested documents. Effectively this
     * aggregation can break out of the nested block structure and
     * link to other nested structures or the root document,
     * which allows nesting other aggregations that aren’t part of
     * the nested object in a nested aggregation.
     * The `reverse_nested` aggregation must be defined inside a nested aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} path Defines to what nested object field should be joined back.
     * The default is empty, which means that it joins back to the root / main document
     * level.
     */
    export function reverseNestedAggregation(
        name: string,
        path?: string
    ): ReverseNestedAggregation;

    /**
     * A filtering aggregation used to limit any sub aggregations'
     * processing to a sample of the top-scoring documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class SamplerAggregation extends BucketAggregationBase {
        constructor(name: string, field?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on SamplerAggregation
         */
        field(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on SamplerAggregation
         */
        script(): never;

        /**
         * The shard_size parameter limits how many top-scoring documents
         * are collected in the sample processed on each shard. The default value is 100.
         *
         * @param {number} size Maximum number of documents to return from each shard(Integer)
         */
        shardSize(size: number): this;
    }

    /**
     * A filtering aggregation used to limit any sub aggregations'
     * processing to a sample of the top-scoring documents.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function samplerAggregation(
        name: string,
        field?: string
    ): SamplerAggregation;

    /**
     * The `TermsAggregationBase` provides support for common options used across
     * various terms `Aggregation` implementations like Significant terms and
     * Terms aggregation.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string} aggType Type of aggregation
     * @param {string} refUrl Elasticsearch reference URL.
     * @param {string=} field The field to aggregate on
     * @extends BucketAggregationBase
     */
    export class TermsAggregationBase extends BucketAggregationBase {
        constructor(
            name: string,
            aggType: string,
            refUrl: string,
            field?: string
        );

        /**
         * Sets the format expression for `key_as_string` in response buckets.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
         */
        format(fmt: string): this;

        /**
         * Sets the minimum number of matching hits required to return the terms.
         *
         * @param {number} minDocCnt Integer value for minimum number of documents
         * required to return bucket in response
         */
        minDocCount(minDocCnt: number): this;

        /**
         * Sets the parameter which regulates the _certainty_ a shard has if the term
         * should actually be added to the candidate list or not with respect to
         * the `min_doc_count`.
         * Terms will only be considered if their local shard frequency within
         * the set is higher than the `shard_min_doc_count`.
         *
         * @param {number} minDocCnt Sets the `shard_min_doc_count` parameter. Default is 1
         * and has no effect unless you explicitly set it.
         */
        shardMinDocCount(minDocCnt: number): this;

        /**
         * Defines how many term buckets should be returned out of the overall terms list.
         *
         * @param {number} size
         */
        size(size: number): this;

        /**
         * Sets the `shard_size` parameter to control the volumes of candidate terms
         * produced by each shard. For the default, -1, shard_size will be automatically
         * estimated based on the number of shards and the size parameter.
         * `shard_size` cannot be smaller than size (as it doesn’t make much sense).
         * When it is, elasticsearch will override it and reset it to be equal to size.
         *
         * @param {number} size
         */
        shardSize(size: number): this;

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @param {string} value
         */
        missing(value: string): this;

        /**
         * Filter the values for which buckets will be created.
         *
         * @param {RegExp|Array|string} clause Determine what values are "allowed" to be aggregated
         */
        include(clause: object | string[] | string): this;

        /**
         * Filter the values for which buckets will be created.
         *
         * @param {RegExp|Array|string} clause Determine the values that should not be aggregated
         */
        exclude(clause: object | string[] | string): this;

        /**
         * This setting can influence the management of the values used
         * for de-duplication. Each option will hold up to shard_size
         * values in memory while performing de-duplication but
         * the type of value held can be controlled
         *
         * @param {string} hint the possible values are `map`, `global_ordinals`,
         * `global_ordinals_hash` and `global_ordinals_low_cardinality`
         * @throws {Error} If Execution Hint is outside the accepted set.
         */
        executionHint(
            hint:
                | 'map'
                | 'global_ordinals'
                | 'global_ordinals_hash'
                | 'global_ordinals_low_cardinality'
        ): this;
    }

    /**
     * The `SignificantAggregationBase` provides support for common options used
     * in `SignificantTermsAggregation` and `SignificantTextAggregation`.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @extends TermsAggregationBase
     */
    export class SignificantAggregationBase extends TermsAggregationBase {
        /**
         * Use JLH score as significance score.
         */
        jlh(): this;

        /**
         * Use `mutual_information` as significance score
         *
         * @param {boolean=} includeNegatives Default `true`. If set to `false`,
         * filters out the terms that appear less often in the subset than in
         * documents outside the subset
         * @param {boolean=} backgroundIsSuperset `true`(default) if the documents in the bucket
         * are also contained in the background. If instead you defined a custom background filter
         * that represents a different set of documents that you want to compare to, pass `false`
         */
        mutualInformation(
            includeNegatives?: boolean,
            backgroundIsSuperset?: boolean
        ): this;

        /**
         * Use `chi_square` as significance score
         *
         * @param {boolean} includeNegatives Default `true`. If set to `false`,
         * filters out the terms that appear less often in the subset than in
         * documents outside the subset
         * @param {boolean} backgroundIsSuperset `true`(default) if the documents in the bucket
         * are also contained in the background. If instead you defined a custom background filter
         * that represents a different set of documents that you want to compare to, pass `false`
         */
        chiSquare(
            includeNegatives?: boolean,
            backgroundIsSuperset?: boolean
        ): this;

        /**
         * Sets `gnd`, google normalized score to be used as significance score.
         *
         * @param {boolean} backgroundIsSuperset `true`(default) if the documents in the bucket
         * are also contained in the background. If instead you defined a custom background filter
         * that represents a different set of documents that you want to compare to, pass `false`
         */
        gnd(backgroundIsSuperset?: boolean): this;

        /**
         * Use a simple calculation of the number of documents in the foreground sample with a term
         * divided by the number of documents in the background with the term. By default this
         * produces a score greater than zero and less than one.
         */
        percentage(): this;

        /**
         * Sets script for customized score calculation.
         *
         * @param {Script} script
         */
        scriptHeuristic(script: Script): this;

        /**
         * Sets the `background_filter` to narrow the scope of statistical information
         * for background term frequencies instead of using the entire index.
         *
         * @param {Query} filterQuery Filter query
         */
        backgroundFilter(filterQuery: Query): this;

        /**
         * @override
         * @throws {Error} This method cannot be called on SignificantAggregationBase
         */
        script(): never;
    }

    /**
     * An aggregation that returns interesting or unusual occurrences of terms in
     * a set.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends SignificantAggregationBase
     */
    export class SignificantTermsAggregation extends SignificantAggregationBase {
        constructor(name: string, field?: string);
    }

    /**
     * An aggregation that returns interesting or unusual occurrences of terms in
     * a set.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function significantTermsAggregation(
        name: string,
        field?: string
    ): SignificantTermsAggregation;

    /**
     * An aggregation that returns interesting or unusual occurrences of free-text
     * terms in a set. It is like the `SignificantTermsAggregation` but differs in
     * that:
     *   - It is specifically designed for use on type `text` fields
     *   - It does not require field data or doc-values
     *   - It re-analyzes text content on-the-fly meaning it can also filter
     *     duplicate sections of noisy text that otherwise tend to skew statistics.
     *
     * NOTE: This query was added in elasticsearch v6.0.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends SignificantAggregationBase
     */
    export class SignificantTextAggregation extends SignificantAggregationBase {
        constructor(name: string, field?: string);

        /**
         * Control if duplicate paragraphs of text should try be filtered from the
         * statistical text analysis. Can improve results but slows down analysis.
         * Default is `false`.
         *
         * @param {boolean} enable
         */
        filterDuplicateText(enable: boolean): this;

        /**
         * Selects the fields to load from `_source` JSON and analyze. If none are
         * specified, the indexed "fieldName" value is assumed to also be the name
         * of the JSON field holding the value
         *
         * @param {Array<string>} srcFields Array of fields
         */
        sourceFields(srcFields: string[]): this;

        /**
         * @override
         * @throws {Error} This method cannot be called on SignificantTextAggregation
         */
        missing(): never;

        /**
         * @override
         * @throws {Error} This method cannot be called on SignificantTextAggregation
         */
        executionHint(): never;
    }

    /**
     * An aggregation that returns interesting or unusual occurrences of free-text
     * terms in a set. It is like the `SignificantTermsAggregation` but differs in
     * that:
     *   - It is specifically designed for use on type `text` fields
     *   - It does not require field data or doc-values
     *   - It re-analyzes text content on-the-fly meaning it can also filter
     *     duplicate sections of noisy text that otherwise tend to skew statistics.
     *
     * NOTE: This query was added in elasticsearch v6.0.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function significantTextAggregation(
        name: string,
        field?: string
    ): SignificantTextAggregation;

    /**
     * A multi-bucket value source based aggregation where buckets are dynamically
     * built - one per unique value.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @extends TermsAggregationBase
     */
    export class TermsAggregation extends TermsAggregationBase {
        constructor(name: string, field?: string);

        /**
         * When set to `true`, shows an error value for each term returned by the aggregation
         * which represents the _worst case error_ in the document count and can be useful
         * when deciding on a value for the shard_size parameter.
         *
         * @param {boolean} enable
         */
        showTermDocCountError(enable: boolean): this;

        /**
         * Break the analysis up into multiple requests by grouping the field’s values
         * into a number of partitions at query-time and processing only one
         * partition in each request.
         * Note that this method is a special case as the name doesn't map to the
         * elasticsearch parameter name. This is required because there is already
         * a method for `include` applicable for Terms aggregations. However, this
         * could change depending on community interest.
         *
         * @param {number} partition
         * @param {number} numPartitions
         */
        includePartition(partition: number, numPartitions: number): this;

        /**
         * Can be used for deferring calculation of child aggregations by using
         * `breadth_first` mode. In `depth_first` mode all branches of the aggregation
         * tree are expanded in one depth-first pass and only then any pruning occurs.
         *
         * @param {string} mode The possible values are `breadth_first` and `depth_first`.
         */
        collectMode(mode: 'breadth_first' | 'depth_first'): this;

        /**
         * Sets the ordering for buckets
         *
         * @param {string} key
         * @param {string} direction `asc` or `desc`
         */
        order(key: string, direction?: 'asc' | 'desc'): this;
    }

    /**
     * A multi-bucket value source based aggregation where buckets are dynamically
     * built - one per unique value.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    export function termsAggregation(
        name: string,
        field?: string
    ): TermsAggregation;

    /**
     * The `PipelineAggregationBase` provides support for common options used across
     * various pipeline `Aggregation` implementations.
     * Pipeline aggregations cannot have sub-aggregations but depending on the type
     * it can reference another pipeline in the buckets_path allowing pipeline
     * aggregations to be chained. For example, you can chain together two derivatives
     * to calculate the second derivative (i.e. a derivative of a derivative).
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name a valid aggregation name
     * @param {string} aggType type of aggregation
     * @param {string} refUrl Elasticsearch reference URL
     * @param {string|Object=} bucketsPath The relative path of metric to aggregate over
     * @extends Aggregation
     */
    export class PipelineAggregationBase extends Aggregation {
        constructor(
            name: string,
            aggType: string,
            refUrl: string,
            bucketsPath?: string | object
        );

        /**
         * Sets the relative path, `buckets_path`, which refers to the metric to aggregate over.
         * Required.
         *
         * @param {string|Object} path
         */
        bucketsPath(path: string | any): this;

        /**
         * Set policy for missing data. Optional.
         *
         * @param {string} policy Can be `skip` or `insert_zeros`
         */
        gapPolicy(policy: 'skip' | 'insert_zeros'): this;

        /**
         * Sets the format expression if applicable. Optional.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
         */
        format(fmt: string): this;
    }

    /**
     * A sibling pipeline aggregation which calculates the (mean) average value
     * of a specified metric in a sibling aggregation. The specified metric must
     * be numeric and the sibling aggregation must be a multi-bucket aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class AvgBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);
    }

    /**
     * A sibling pipeline aggregation which calculates the (mean) average value
     * of a specified metric in a sibling aggregation. The specified metric must
     * be numeric and the sibling aggregation must be a multi-bucket aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function avgBucketAggregation(
        name: string,
        bucketsPath?: string
    ): AvgBucketAggregation;

    /**
     * A parent pipeline aggregation which calculates the derivative of a
     * specified metric in a parent histogram (or date_histogram) aggregation.
     * The specified metric must be numeric and the enclosing histogram must
     * have min_doc_count set to 0 (default for histogram aggregations).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class DerivativeAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * Set the units of the derivative values. `unit` specifies what unit to use for
         * the x-axis of the derivative calculation
         *
         * @param {string} unit `unit` specifies what unit to use for
         * the x-axis of the derivative calculation
         */
        unit(unit: string): DerivativeAggregation;
    }

    /**
     * A parent pipeline aggregation which calculates the derivative of a
     * specified metric in a parent histogram (or date_histogram) aggregation.
     * The specified metric must be numeric and the enclosing histogram must
     * have min_doc_count set to 0 (default for histogram aggregations).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function derivativeAggregation(
        name: string,
        bucketsPath?: string
    ): DerivativeAggregation;

    /**
     * A sibling pipeline aggregation which identifies the bucket(s) with
     * the maximum value of a specified metric in a sibling aggregation and
     * outputs both the value and the key(s) of the bucket(s). The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class MaxBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);
    }

    /**
     * A sibling pipeline aggregation which identifies the bucket(s) with
     * the maximum value of a specified metric in a sibling aggregation and
     * outputs both the value and the key(s) of the bucket(s). The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function maxBucketAggregation(
        name: string,
        bucketsPath?: string
    ): MaxBucketAggregation;

    /**
     * A sibling pipeline aggregation which identifies the bucket(s) with
     * the minimum value of a specified metric in a sibling aggregation and
     * outputs both the value and the key(s) of the bucket(s). The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class MinBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);
    }

    /**
     * A sibling pipeline aggregation which identifies the bucket(s) with
     * the minimum value of a specified metric in a sibling aggregation and
     * outputs both the value and the key(s) of the bucket(s). The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function minBucketAggregation(
        name: string,
        bucketsPath?: string
    ): MinBucketAggregation;

    /**
     * A sibling pipeline aggregation which calculates the sum across all bucket
     * of a specified metric in a sibling aggregation. The specified metric must
     * be numeric and the sibling aggregation must be a multi-bucket aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class SumBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);
    }

    /**
     * A sibling pipeline aggregation which calculates the sum across all bucket
     * of a specified metric in a sibling aggregation. The specified metric must
     * be numeric and the sibling aggregation must be a multi-bucket aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function sumBucketAggregation(
        name: string,
        bucketsPath?: string
    ): SumBucketAggregation;

    /**
     * A sibling pipeline aggregation which calculates a variety of stats across
     * all bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class StatsBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);
    }

    /**
     * A sibling pipeline aggregation which calculates a variety of stats across
     * all bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function statsBucketAggregation(
        name: string,
        bucketsPath?: string
    ): StatsBucketAggregation;

    /**
     * A sibling pipeline aggregation which calculates a variety of stats across
     * all bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class ExtendedStatsBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * Sets the number of standard deviations above/below the mean to display.
         * Optional.
         *
         * @param {number} sigma Default is 2.
         */
        sigma(sigma: number): this;
    }

    /**
     * A sibling pipeline aggregation which calculates a variety of stats across
     * all bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function extendedStatsBucketAggregation(
        name: string,
        bucketsPath?: string
    ): ExtendedStatsBucketAggregation;

    /**
     * A sibling pipeline aggregation which calculates percentiles across all
     * bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class PercentilesBucketAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * Sets the list of percentiles to calculate
         *
         * @param {Array<number>} percents The list of percentiles to calculate
         */
        percents(percents: number[]): this;
    }

    /**
     * A sibling pipeline aggregation which calculates percentiles across all
     * bucket of a specified metric in a sibling aggregation. The specified
     * metric must be numeric and the sibling aggregation must be a multi-bucket
     * aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function percentilesBucketAggregation(
        name: string,
        bucketsPath?: string
    ): PercentilesBucketAggregation;

    /**
     * Given an ordered series of data, the Moving Average aggregation will
     * slide a window across the data and emit the average value of that window.
     * `moving_avg` aggregations must be embedded inside of a histogram or
     * date_histogram aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class MovingAverageAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on MovingAverageAggregation
         */
        format(): never;

        /**
         * Sets the moving average weighting model that we wish to use. Optional.
         *
         * @param {string} model Can be `simple`, `linear`,
         * `ewma` (aka "single-exponential"), `holt` (aka "double exponential")
         * or `holt_winters` (aka "triple exponential").
         * Default is `simple`
         */
        model(
            model: 'simple' | 'linear' | 'ewma' | 'holt' | 'holt_winters'
        ): this;

        /**
         * Sets the size of window to "slide" across the histogram. Optional.
         *
         * @param {number} window Default is 5
         */
        window(window: number): this;

        /**
         * If the model should be algorithmically minimized. Optional.
         * Applicable on EWMA, Holt-Linear, Holt-Winters.
         * Minimization is disabled by default for `ewma` and `holt_linear`,
         * while it is enabled by default for `holt_winters`.
         *
         * @param {boolean} enable `false` for most models
         */
        minimize(enable: boolean): this;

        /**
         * Model-specific settings, contents which differ depending on the model specified.
         * Optional.
         *
         * @param {object} settingss
         */
        settings(settings: object): this;

        /**
         * Enable "prediction" mode, which will attempt to extrapolate into the future given
         * the current smoothed, moving average
         *
         * @param {number} predict the number of predictions you would like appended to the
         * end of the series
         */
        predict(predict: number): this;
    }

    /**
     * Given an ordered series of data, the Moving Average aggregation will
     * slide a window across the data and emit the average value of that window.
     * `moving_avg` aggregations must be embedded inside of a histogram or
     * date_histogram aggregation.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function movingAverageAggregation(
        name: string,
        bucketsPath?: string
    ): MovingAverageAggregation;

    /**
     * Given an ordered series of data, the Moving Function aggregation
     * will slide a window across the data and allow the user to specify
     * a custom script that is executed on each window of data.
     * For convenience, a number of common functions are predefined such as min/max, moving averages, etc.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over.
     * @param {string=} window The size of window to "slide" across the histogram.
     * @param {string=} script The script that should be executed on each window of data.
     * @extends PipelineAggregationBase
     */
    export class MovingFunctionAggregation extends PipelineAggregationBase {
        constructor(
            name: string,
            bucketsPath?: string,
            window?: number,
            script?: string
        );

        /**
         * Sets the size of window to "slide" across the histogram. Required.
         *
         * @param {number} window
         */
        window(window: number): this;

        /**
         * Sets shift of window position. Optional.
         *
         * @param {number} window
         */
        shift(shift: number): this;

        /**
         * Sets the script that should be executed on each window of data. Required.
         *
         * @param {string} script
         */
        script(script: string): this;
    }

    /**
     * Given an ordered series of data, the Moving Function aggregation
     * will slide a window across the data and allow the user to specify
     * a custom script that is executed on each window of data.
     * For convenience, a number of common functions are predefined such as min/max, moving averages, etc.
     *
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over.
     * @param {string=} window The size of window to "slide" across the histogram.
     * @param {string=} script The script that should be executed on each window of data.
     */
    export function movingFunctionAggregation(
        name: string,
        bucketsPath?: string,
        window?: number,
        script?: string
    ): MovingFunctionAggregation;

    /**
     * A parent pipeline aggregation which calculates the cumulative sum of
     * a specified metric in a parent histogram (or date_histogram) aggregation.
     * The specified metric must be numeric and the enclosing histogram must
     * have min_doc_count set to 0 (default for histogram aggregations).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class CumulativeSumAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on CumulativeSumAggregation
         */
        gapPolicy(): never;
    }

    /**
     * A parent pipeline aggregation which calculates the cumulative sum of
     * a specified metric in a parent histogram (or date_histogram) aggregation.
     * The specified metric must be numeric and the enclosing histogram must
     * have min_doc_count set to 0 (default for histogram aggregations).
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function cumulativeSumAggregation(
        name: string,
        bucketsPath?: string
    ): CumulativeSumAggregation;

    /**
     * A parent pipeline aggregation which executes a script which can perform
     * per bucket computations on specified metrics in the parent multi-bucket
     * aggregation. The specified metric must be numeric and the script must
     * return a numeric value.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class BucketScriptAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * Sets script parameter for aggregation.
         *
         * @param {Script|string} script
         * @throws {TypeError} If `script` is not an instance of `Script`
         */
        script(script: Script | string): this;
    }

    /**
     * A parent pipeline aggregation which executes a script which can perform
     * per bucket computations on specified metrics in the parent multi-bucket
     * aggregation. The specified metric must be numeric and the script must
     * return a numeric value.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function bucketScriptAggregation(
        name: string,
        bucketsPath?: string
    ): BucketScriptAggregation;

    /**
     * A parent pipeline aggregation which executes a script which determines whether
     * the current bucket will be retained in the parent multi-bucket aggregation.
     * The specified metric must be numeric and the script must return a boolean value.
     * If the script language is expression then a numeric return value is permitted.
     * In this case 0.0 will be evaluated as false and all other values will evaluate to true.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class BucketSelectorAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * @override
         * @throws {Error} This method cannot be called on BucketSelectorAggregation
         */
        format(): never;

        /**
         * Sets script parameter for aggregation. Required.
         * @param {Script|string} script
         * @throws {TypeError} If `script` is not an instance of `Script`
         */
        script(script: Script | string): this;
    }

    /**
     * A parent pipeline aggregation which executes a script which determines whether
     * the current bucket will be retained in the parent multi-bucket aggregation.
     * The specified metric must be numeric and the script must return a boolean value.
     * If the script language is expression then a numeric return value is permitted.
     * In this case 0.0 will be evaluated as false and all other values will evaluate to true.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function bucketSelectorAggregation(
        name: string,
        bucketsPath?: string
    ): BucketSelectorAggregation;

    /**
     * A parent pipeline aggregation which sorts the buckets of its parent
     * multi-bucket aggregation. Zero or more sort fields may be specified
     * together with the corresponding sort order. Each bucket may be sorted
     * based on its _key, _count or its sub-aggregations. In addition, parameters
     * from and size may be set in order to truncate the result buckets.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @extends PipelineAggregationBase
     */
    export class BucketSortAggregation extends PipelineAggregationBase {
        constructor(name: string);

        /**
         * Sets the list of fields to sort on.
         *
         * @param {Array<Sort>} sort The list of fields to sort on
         */
        sort(sort: Array<Sort>): this;

        /**
         * Sets the value buckets in positions prior to which will be truncated.
         *
         * @param {number} from Buckets in positions prior to the set value will be truncated.
         */
        from(from: number): this;

        /**
         * Sets the number of buckets to return.
         *
         * @param {number} size The number of buckets to return.
         */
        size(size: number): this;
    }

    /**
     * A parent pipeline aggregation which sorts the buckets of its parent
     * multi-bucket aggregation. Zero or more sort fields may be specified
     * together with the corresponding sort order. Each bucket may be sorted
     * based on its _key, _count or its sub-aggregations. In addition, parameters
     * from and size may be set in order to truncate the result buckets.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    export function bucketSortAggregation(name: string): BucketSortAggregation;

    /**
     * Serial differencing is a technique where values in a time series are
     * subtracted from itself at different time lags or periods.
     * Serial differences are built by first specifying a `histogram` or `date_histogram` over a field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     * @extends PipelineAggregationBase
     */
    export class SerialDifferencingAggregation extends PipelineAggregationBase {
        constructor(name: string, bucketsPath?: string);

        /**
         * The historical bucket to subtract from the current value.
         * Optional.
         *
         * @param {number} lag Default is 1.
         */
        lag(lag: number): this;
    }

    /**
     * Serial differencing is a technique where values in a time series are
     * subtracted from itself at different time lags or periods.
     * Serial differences are built by first specifying a `histogram` or `date_histogram` over a field.
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    export function serialDifferencingAggregation(
        name: string,
        bucketsPath?: string
    ): SerialDifferencingAggregation;

    /**
     * The `matrix_stats` aggregation is a numeric aggregation that computes
     * statistics over a set of document fields
     *
     * @param {string} name A valid aggregation name
     * @param {Array=} fields Array of fields
     * @extends Aggregation
     */
    export class MatrixStatsAggregation extends Aggregation {
        constructor(name: string, fields?: object);

        /**
         * The `fields` setting defines the set of fields (as an array) for computing
         * the statistics.
         *
         * @param {Array<string>} fields Array of fields
         */
        fields(fields: string[]): this;

        /**
         * The `mode` parameter controls what array value the aggregation will use for
         * array or multi-valued fields
         *
         * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`
         */
        mode(mode: string): this;

        /**
         * The missing parameter defines how documents that are missing a value should
         * be treated. By default they will be ignored but it is also possible to treat
         * them as if they had a value.
         *
         * @param {object} missing Set of fieldname : value mappings to specify default
         * values per field
         */
        missing(missing: object): this;
    }

    /**
     * The `matrix_stats` aggregation is a numeric aggregation that computes
     * statistics over a set of document fields
     *
     * @param {string} name A valid aggregation name
     * @param {Array=} fields Array of fields
     */
    export function matrixStatsAggregation(
        name: string,
        fields?: object
    ): MatrixStatsAggregation;

    /**
     * `ScoreFunction` provides support for common options used across
     * various `ScoreFunction` implementations.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} name
     */
    class ScoreFunction {
        constructor(name: string);

        /**
         * Adds a filter query whose matching documents will have the score function applied.
         *
         * @param {Query} filterQry A valid `Query` object.
         */
        filter(filterQry: Query): this;

        /**
         * Sets the weight of the score function
         *
         * @param {number} weight The weight of this score function.
         */
        weight(weight: number): this;

        /**
         * Overrides default `toJSON` to return DSL representation of the score function
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `script_score` function allows you to wrap another query and customize
     * the scoring of it optionally with a computation derived from other numeric
     * field values in the doc using a script expression.
     *
     * @param {Script|string} script
     * @extends ScoreFunction
     */
    export class ScriptScoreFunction extends ScoreFunction {
        constructor(script: Script | string);

        /**
         * @param {Script|string} script
         */
        script(script: Script | string): this;
    }

    /**
     * The `script_score` function allows you to wrap another query and customize
     * the scoring of it optionally with a computation derived from other numeric
     * field values in the doc using a script expression.
     *
     * @param {Script|string} script
     */
    export function scriptScoreFunction(
        script: Script | string
    ): ScriptScoreFunction;

    /**
     * The `weight` score allows you to multiply the score by the provided `weight`.
     * This can sometimes be desired since boost value set on specific queries gets
     * normalized, while for this score function it does not.
     * The number value is of type float.
     *
     * @param {number=} weight
     * @extends ScoreFunction
     */
    export class WeightScoreFunction extends ScoreFunction {
        constructor(weight?: number);

        /**
         * Overrides default `toJSON` to return DSL representation of the score function
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `weight` score allows you to multiply the score by the provided `weight`.
     * This can sometimes be desired since boost value set on specific queries gets
     * normalized, while for this score function it does not.
     * The number value is of type float.
     *
     * @param {number=} weight
     */
    export function weightScoreFunction(weight?: number): WeightScoreFunction;

    /**
     * The `random_score` generates scores using a hash of the `_uid` field,
     * with a `seed` for variation. If `seed` is not specified, the current time is used.
     *
     * @extends ScoreFunction
     */
    export class RandomScoreFunction extends ScoreFunction {
        constructor();
        /**
         * Sets random seed value.
         *
         * @param {number} seed A seed value.
         */
        seed(seed: number): this;
    }

    /**
     * The `random_score` generates scores using a hash of the `_uid` field,
     * with a `seed` for variation. If `seed` is not specified, the current time is used.
     */
    export function randomScoreFunction(): RandomScoreFunction;

    /**
     * The `field_value_factor` function allows you to use a field from a document
     * to influence the score. It's similar to using the `script_score` function, however,
     * it avoids the overhead of scripting. If used on a multi-valued field, only the
     * first value of the field is used in calculations.
     *
     * @param {string=} field the field to be extracted from the document.
     * @extends ScoreFunction
     */
    export class FieldValueFactorFunction extends ScoreFunction {
        constructor(field?: string);

        /**
         * Sets the field to be extracted from the document.
         *
         * @param {string} field the field to be extracted from the document.
         */
        field(field: string): this;

        /**
         * Optional factor to multiply the field value with, defaults to `1`.
         *
         * @param {number} factor Factor to multiply the field with.
         */
        factor(factor: number): this;

        /**
         * Modifier to apply to the field value, can be one of: `none`, `log`,
         * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
         * Defaults to `none`.
         *
         * @param {string} mod Modified to apply on field. Can be one of: `none`, `log`,
         * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
         * Defaults to `none`.
         */
        modifier(
            mod:
                | 'none'
                | 'log'
                | 'log1p'
                | 'log2p'
                | 'ln'
                | 'ln1p'
                | 'ln2p'
                | 'square'
                | 'sqrt'
                | 'reciprocal'
        ): this;

        /**
         * Value used if the document doesn’t have that field. The modifier and factor
         * are still applied to it as though it were read from the document.
         *
         * @param {number} val To be used with documents which do not have field value.
         */
        missing(val: number): this;
    }

    /**
     * The `field_value_factor` function allows you to use a field from a document
     * to influence the score. It's similar to using the `script_score` function, however,
     * it avoids the overhead of scripting. If used on a multi-valued field, only the
     * first value of the field is used in calculations.
     *
     * @param {string=} field the field to be extracted from the document.
     */
    export function fieldValueFactorFunction(
        field?: string
    ): FieldValueFactorFunction;

    /**
     * Decay functions score a document with a function that decays depending on
     * the distance of a numeric field value of the document from a user given
     * origin. This is similar to a range query, but with smooth edges instead of
     * boxes.
     * Supported decay functions are: `linear`, `exp`, and `gauss`.
     *
     * If no `mode` is supplied, `gauss` will be used.
     *
     * @param {string=} mode Can be one of `linear`, `exp`, and `gauss`.
     * Defaults to `gauss`.
     * @param {string=} field the document field to run decay function against.
     * @extends ScoreFunction
     */
    export class DecayScoreFunction extends ScoreFunction {
        // I dunno how to denote the default value with a union type
        constructor(mode?: 'linear' | 'exp' | 'gauss', field?: string);

        /**
         * Set the decay mode.
         *
         * @param {string} mode  Can be one of `linear`, `exp`, and `gauss`.
         * Defaults to `gauss`.
         */
        mode(mode: 'linear' | 'exp' | 'gauss'): this;

        /**
         * Sets the decay mode to linear.
         * Alias for `mode('linear')`
         */
        linear(): this;

        /**
         * Sets the decay mode to exp.
         * Alias for `mode('exp')`
         */
        exp(): this;

        /**
         * Sets the decay mode to gauss.
         * Alias for `mode('gauss')`
         */
        gauss(): this;

        /**
         * Sets the document field to run decay function against.
         *
         * @param {string} field the document field to run decay function against.
         */
        field(field: string): this;

        /**
         * The point of origin used for calculating distance. Must be given as a number
         * for numeric field, date for date fields and geo point for geo fields.
         * Required for geo and numeric field. For date fields the default is `now`.
         * Date math (for example `now-1h`) is supported for origin.
         *
         * @param {number|string|Object} origin A valid origin value for the field type.
         */
        origin(origin: number | string | object): this;

        /**
         * Required for all types. Defines the distance from origin + offset at which
         * the computed score will equal decay parameter. For geo fields: Can be defined
         * as number+unit (`1km`, `12m`,…). Default unit is meters. For date fields: Can be
         * defined as a number+unit (`1h`, `10d`,…). Default unit is milliseconds.
         * For numeric field: Any number.
         *
         * @param {number|string} scale A valid scale value for the field type.
         */
        scale(scale: number | string): this;

        /**
         * If an `offset` is defined, the decay function will only compute the decay function
         * for documents with a distance greater that the defined offset. The default is `0`.
         *
         * @param {number|string} offset A valid offset value for the field type.
         */
        offset(offset: number | string): this;

        /**
         * The `decay` parameter defines how documents are scored at the distance given at `scale`.
         * If no `decay` is defined, documents at the distance `scale` will be scored `0.5`.
         *
         * @param {number} decay A decay value as a double.
         */
        decay(decay: number): this;
    }

    /**
     * Decay functions score a document with a function that decays depending on
     * the distance of a numeric field value of the document from a user given
     * origin. This is similar to a range query, but with smooth edges instead of
     * boxes.
     * Supported decay functions are: `linear`, `exp`, and `gauss`.
     *
     * If no `mode` is supplied, `gauss` will be used.
     *
     * @param {string=} mode Can be one of `linear`, `exp`, and `gauss`.
     * Defaults to `gauss`.
     * @param {string=} field the document field to run decay function against.
     */
    export function decayScoreFunction(
        mode?: 'linear' | 'exp' | 'gauss',
        field?: string
    ): DecayScoreFunction;

    /**
     * Base class implementation for all suggester types.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class should be extended and used, as validation against the class
     * type is present in various places.
     *
     * @param {string} suggesterType The type of suggester.
     * Can be one of `term`, `phrase`, `completion`
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     *
     * @throws {Error} if `name` is empty
     * @throws {Error} if `suggesterType` is empty
     */
    class Suggester {
        constructor(suggesterType: string, name: string, field?: string);

        /**
         * Sets field to fetch the candidate suggestions from. This is a required option
         * that either needs to be set globally or per suggestion.
         *
         * @param {string} field a valid field name
         */
        field(field: string): this;

        /**
         * Sets the number of suggestions to return (defaults to `5`).
         *
         * @param {number} size
         */
        size(size: number): this;

        /**
         * Override default `toJSON` to return DSL representation for the `suggester`
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `AnalyzedSuggesterBase` provides support for common options used
     * in `TermSuggester` and `PhraseSuggester`.
     *
     * **NOTE:** Instantiating this directly should not be required.
     * However, if you wish to add a custom implementation for whatever reason,
     * this class could be extended.
     *
     * @param {string} suggesterType The type of suggester.
     * Can be one of `term`, `phrase`
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     * @param {string=} txt A string to get suggestions for.
     *
     * @throws {Error} if `name` is empty
     * @throws {Error} if `suggesterType` is empty
     *
     * @extends Suggester
     */
    class AnalyzedSuggesterBase extends Suggester {
        constructor(
            suggesterType: string,
            name: string,
            field?: string,
            txt?: string
        );

        /**
         * Sets the text to get suggestions for. If not set, the global
         * suggestion text will be used.
         *
         * @param {string} txt A string to get suggestions for.
         */
        text(txt: string): this;

        /**
         * Sets the analyzer to analyse the suggest text with. Defaults to
         * the search analyzer of the suggest field.
         *
         * @param {string} analyzer The analyzer to analyse the suggest text with.
         */
        analyzer(analyzer: string): this;

        /**
         * Sets the maximum number of suggestions to be retrieved from each individual shard.
         * During the reduce phase only the top N suggestions are returned based on the `size`
         * option. Defaults to the `size` option. Setting this to a value higher than the `size`
         * can be useful in order to get a more accurate document frequency for spelling
         * corrections at the cost of performance. Due to the fact that terms are partitioned
         * amongst shards, the shard level document frequencies of spelling corrections
         * may not be precise. Increasing this will make these document frequencies
         * more precise.
         *
         * @param {number} size
         */
        shardSize(size: number): this;
    }

    /**
     * The term suggester suggests terms based on edit distance.
     * The provided suggest text is analyzed before terms are suggested.
     * The suggested terms are provided per analyzed suggest text token.
     * The term suggester doesn’t take the query into account that is part of request.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     * @param {string=} txt A string to get suggestions for.
     *
     * @throws {Error} if `name` is empty
     *
     * @extends AnalyzedSuggesterBase
     */
    export class TermSuggester extends AnalyzedSuggesterBase {
        constructor(name: string, field?: string, txt?: string);

        /**
         * Sets the sort to control how suggestions should be sorted per
         * suggest text term.
         * Two possible values:
         *   - `score`: Sort by score first, then document frequency and
         *     then the term itself.
         *   - `frequency`: Sort by document frequency first, then similarity
         *     score and then the term itself.
         * @param {string} sort Can be `score` or `frequency`
         * @throws {Error} If `sort` is neither `score` nor `frequency`.
         */
        sort(sort: 'score' | 'frequency'): this;

        /**
         * Sets the suggest mode which controls what suggestions are included
         * or controls for what suggest text terms, suggestions should be suggested.
         *
         * Three possible values can be specified:
         *   - `missing`: Only provide suggestions for suggest text terms that
         *     are not in the index. This is the default.
         *   - `popular`:  Only suggest suggestions that occur in more docs
         *     than the original suggest text term.
         *   - `always`: Suggest any matching suggestions based on terms in the suggest text.
         *
         * @param {string} mode Can be `missing`, `popular` or `always`
         * @throws {Error} If `mode` is not one of `missing`, `popular` or `always`.
         */
        suggestMode(mode: 'missing' | 'popular' | 'always'): this;

        /**
         * Sets the maximum edit distance candidate suggestions can have
         * in order to be considered as a suggestion. Can only be a value
         * between 1 and 2. Any other value result in an bad request
         * error being thrown. Defaults to 2.
         *
         * @param {number} maxEdits Value between 1 and 2. Defaults to 2.
         */
        maxEdits(maxEdits: number): this;

        /**
         * Sets the number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         * Increasing this number improves spellcheck performance.
         * Usually misspellings don't occur in the beginning of terms.
         *
         * @param {number} len The number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         */
        prefixLength(len: number): this;

        /**
         * Sets the minimum length a suggest text term must have in order to be included.
         * Defaults to 4.
         *
         * @param {number} len The minimum length a suggest text term must have in order
         * to be included. Defaults to 4.
         */
        minWordLength(len: number): this;

        /**
         * Sets factor that is used to multiply with the `shards_size` in order to inspect
         * more candidate spell corrections on the shard level.
         * Can improve accuracy at the cost of performance. Defaults to 5.
         *
         * @param {number} maxInspections Factor used to multiple with `shards_size` in
         * order to inspect more candidate spell corrections on the shard level.
         * Defaults to 5
         */
        maxInspections(maxInspections: number): this;

        /**
         * Sets the minimal threshold in number of documents a suggestion should appear in.
         * This can be specified as an absolute number or as a relative percentage of
         * number of documents. This can improve quality by only suggesting high
         * frequency terms. Defaults to 0f and is not enabled. If a value higher than 1
         * is specified then the number cannot be fractional. The shard level document
         * frequencies are used for this option.
         *
         * @param {number} limit Threshold in number of documents a suggestion
         * should appear in. Defaults to 0f and is not enabled.
         */
        minDocFreq(limit: number): this;

        /**
         * Sets the maximum threshold in number of documents a suggest text token can
         * exist in order to be included. Can be a relative percentage number (e.g 0.4)
         * or an absolute number to represent document frequencies. If an value higher
         * than 1 is specified then fractional can not be specified. Defaults to 0.01f.
         * This can be used to exclude high frequency terms from being spellchecked.
         * High frequency terms are usually spelled correctly on top of this also
         * improves the spellcheck performance. The shard level document frequencies are
         * used for this option.
         *
         * @param {number} limit Maximum threshold in number of documents a suggest text
         * token can exist in order to be included. Defaults to 0.01f.
         */
        maxTermFreq(limit: number): this;

        /**
         * Sets the string distance implementation to use for comparing how similar
         * suggested terms are.
         *
         * Five possible values can be specified:
         *   - `internal`: The default based on `damerau_levenshtein` but highly optimized for
         *     comparing string distance for terms inside the index.
         *   - `damerau_levenshtein`: String distance algorithm based on Damerau-Levenshtein
         *     algorithm.
         *   - `levenstein`: String distance algorithm based on Levenstein edit distance
         *     algorithm.
         *   - `jarowinkler`: String distance algorithm based on Jaro-Winkler algorithm.
         *   - `ngram`: String distance algorithm based on character n-grams.
         *
         * @param {string} implMethod One of `internal`, `damerau_levenshtein`, `levenstein`,
         * `jarowinkler`, `ngram`
         *
         * @throws {Error} If `implMethod` is not one of `internal`, `damerau_levenshtein`,
         * `levenstein`, `jarowinkler` or ngram`.
         */
        stringDistance(
            implMethod:
                | 'internal'
                | 'damerau_levenshtein'
                | 'levenstein'
                | 'jarowinkler'
                | 'ngram'
        ): this;
    }

    /**
     * The term suggester suggests terms based on edit distance.
     * The provided suggest text is analyzed before terms are suggested.
     * The suggested terms are provided per analyzed suggest text token.
     * The term suggester doesn’t take the query into account that is part of request.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     * @param {string=} txt A string to get suggestions for.
     *
     * @throws {Error} if `name` is empty
     */
    export function termSuggester(
        name: string,
        field?: string,
        txt?: string
    ): TermSuggester;

    /**
     * The `phrase` suggester uses candidate generators to produce a list of possible
     * terms per term in the given text. A single candidate generator is similar
     * to a `term` suggester called for each individual term in the text. The output
     * of the generators is subsequently scored in combination with the candidates
     * from the other terms to for suggestion candidates.
     * The Phrase suggest API accepts a list of generators under the key `direct_generator`
     * each of the generators in the list are called per term in the original text.
     *
     * @param {string=} field The field to fetch the candidate suggestions from.
     */
    export class DirectGenerator {
        constructor(field?: string);

        /**
         * Sets field to fetch the candidate suggestions from. This is a required option
         * that either needs to be set globally or per suggestion.
         *
         * @param {string} field a valid field name
         */
        field(field: string): this;

        /**
         * Sets the number of suggestions to return (defaults to `5`).
         *
         * @param {number} size
         */
        size(size: number): this;

        /**
         * Sets the suggest mode which controls what suggestions are included
         * or controls for what suggest text terms, suggestions should be suggested.
         *
         * All values other than `always` can be thought of as an optimization to
         * generate fewer suggestions to test on each shard and are not rechecked
         * when combining the suggestions generated on each shard. Thus `missing`
         * will generate suggestions for terms on shards that do not contain them
         * even other shards do contain them. Those should be filtered out
         * using `confidence`.
         *
         * Three possible values can be specified:
         *   - `missing`: Only provide suggestions for suggest text terms that
         *     are not in the index. This is the default.
         *   - `popular`:  Only suggest suggestions that occur in more docs
         *     than the original suggest text term.
         *   - `always`: Suggest any matching suggestions based on terms in the suggest text.
         *
         * @param {string} mode Can be `missing`, `popular` or `always`
         *
         * @throws {Error} If `mode` is not one of `missing`, `popular` or `always`.
         */
        suggestMode(mode: 'missing' | 'popular' | 'always'): this;

        /**
         * Sets the maximum edit distance candidate suggestions can have
         * in order to be considered as a suggestion. Can only be a value
         * between 1 and 2. Any other value result in an bad request
         * error being thrown. Defaults to 2.
         *
         * @param {number} maxEdits Value between 1 and 2. Defaults to 2.
         */
        maxEdits(maxEdits: number): this;

        /**
         * Sets the number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         * Increasing this number improves spellcheck performance.
         * Usually misspellings don't occur in the beginning of terms.
         *
         * @param {number} len The number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         */
        prefixLength(len: number): this;

        /**
         * Sets the minimum length a suggest text term must have in order to be included.
         * Defaults to 4.
         *
         * @param {number} len The minimum length a suggest text term must have in order
         * to be included. Defaults to 4.
         */
        minWordLength(len: number): this;

        /**
         * Sets factor that is used to multiply with the `shards_size` in order to inspect
         * more candidate spell corrections on the shard level.
         * Can improve accuracy at the cost of performance. Defaults to 5.
         *
         * @param {number} maxInspections Factor used to multiple with `shards_size` in
         * order to inspect more candidate spell corrections on the shard level.
         * Defaults to 5
         */
        maxInspections(maxInspections: number): this;

        /**
         * Sets the minimal threshold in number of documents a suggestion should appear in.
         * This can be specified as an absolute number or as a relative percentage of
         * number of documents. This can improve quality by only suggesting high
         * frequency terms. Defaults to 0f and is not enabled. If a value higher than 1
         * is specified then the number cannot be fractional. The shard level document
         * frequencies are used for this option.
         *
         * @param {number} limit Threshold in number of documents a suggestion
         * should appear in. Defaults to 0f and is not enabled.
         */
        minDocFreq(limit: number): this;

        /**
         * Sets the maximum threshold in number of documents a suggest text token can
         * exist in order to be included. Can be a relative percentage number (e.g 0.4)
         * or an absolute number to represent document frequencies. If an value higher
         * than 1 is specified then fractional can not be specified. Defaults to 0.01f.
         * This can be used to exclude high frequency terms from being spellchecked.
         * High frequency terms are usually spelled correctly on top of this also
         * improves the spellcheck performance. The shard level document frequencies are
         * used for this option.
         *
         * @param {number} limit Maximum threshold in number of documents a suggest text
         * token can exist in order to be included. Defaults to 0.01f.
         */
        maxTermFreq(limit: number): this;

        /**
         * Sets the filter (analyzer) that is applied to each of the tokens passed to this
         * candidate generator. This filter is applied to the original token before
         * candidates are generated.
         *
         * @param {string} filter a filter (analyzer) that is applied to each of the
         * tokens passed to this candidate generator.
         */
        preFilter(filter: string): this;

        /**
         * Sets the filter (analyzer) that is applied to each of the generated tokens
         * before they are passed to the actual phrase scorer.
         *
         * @param {string} filter a filter (analyzer) that is applied to each of the
         * generated tokens before they are passed to the actual phrase scorer.
         */
        postFilter(filter: string): this;

        /**
         * Override default `toJSON` to return DSL representation for the `direct_generator`
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The `phrase` suggester uses candidate generators to produce a list of possible
     * terms per term in the given text. A single candidate generator is similar
     * to a `term` suggester called for each individual term in the text. The output
     * of the generators is subsequently scored in combination with the candidates
     * from the other terms to for suggestion candidates.
     * The Phrase suggest API accepts a list of generators under the key `direct_generator`
     * each of the generators in the list are called per term in the original text.
     *
     * @param {string=} field The field to fetch the candidate suggestions from.
     */
    export function directGenerator(field?: string): DirectGenerator;

    /**
     * The phrase suggester adds additional logic on top of the `term` suggester
     * to select entire corrected phrases instead of individual tokens weighted
     * based on `ngram-language` models. In practice this suggester will be able
     * to make better decisions about which tokens to pick based on co-occurrence
     * and frequencies.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     * @param {string=} txt A string to get suggestions for.
     *
     * @throws {Error} if `name` is empty
     *
     * @extends AnalyzedSuggesterBase
     */
    export class PhraseSuggester extends AnalyzedSuggesterBase {
        constructor(name: string, field?: string, txt?: string);

        /**
         * Sets max size of the n-grams (shingles) in the `field`. If the field
         * doesn't contain n-grams (shingles) this should be omitted or set to `1`.
         * Note: Elasticsearch tries to detect the gram size based on
         * the specified `field`. If the field uses a `shingle` filter the `gram_size`
         * is set to the `max_shingle_size` if not explicitly set.
         *
         * @param {number} size Max size of the n-grams (shingles) in the `field`.
         */
        gramSize(size: number): this;

        /**
         * Sets the likelihood of a term being a misspelled even if the term exists
         * in the dictionary. The default is `0.95` corresponding to 5% of the
         * real words are misspelled.
         *
         * @param {number} factor Likelihood of a term being misspelled. Defaults to `0.95`
         */
        realWordErrorLikelihood(factor: number): this;

        /**
         * Sets the confidence level defines a factor applied to the input phrases score
         * which is used as a threshold for other suggest candidates. Only candidates
         * that score higher than the threshold will be included in the result.
         * For instance a confidence level of `1.0` will only return suggestions
         * that score higher than the input phrase. If set to `0.0` the top N candidates
         * are returned. The default is `1.0`.
         *
         * @param {number} level Factor applied to the input phrases score, used as
         * a threshold for other suggest candidates.
         */
        confidence(level: number): this;

        /**
         * Sets the maximum percentage of the terms that at most considered to be
         * misspellings in order to form a correction. This method accepts a float
         * value in the range `[0..1)` as a fraction of the actual query terms or a
         * number `>=1` as an absolute number of query terms. The default is set
         * to `1.0` which corresponds to that only corrections with at most
         * 1 misspelled term are returned. Note that setting this too high can
         * negatively impact performance. Low values like 1 or 2 are recommended
         * otherwise the time spend in suggest calls might exceed the time spend
         * in query execution.
         *
         * @param {number} limit The maximum percentage of the terms that at most considered
         * to be misspellings in order to form a correction.
         */
        maxErrors(limit: number): this;

        /**
         * Sets the separator that is used to separate terms in the bigram field.
         * If not set the whitespace character is used as a separator.
         *
         * @param {string} sep The separator that is used to separate terms in the
         * bigram field.
         */
        separator(sep: string): this;

        /**
         * Sets up suggestion highlighting. If not provided then no `highlighted` field
         * is returned. If provided must contain exactly `pre_tag` and `post_tag` which
         * are wrapped around the changed tokens. If multiple tokens in a row are changed
         * the entire phrase of changed tokens is wrapped rather than each token.
         *
         * @param {string} preTag Pre-tag to wrap token
         * @param {string} postTag Post-tag to wrap token
         */
        highlight(preTag: string, postTag: string): this;

        /**
         * Checks each suggestion against the specified `query` to prune suggestions
         * for which no matching docs exist in the index. The collate query for
         * a suggestion is run only on the local shard from which the suggestion
         * has been generated from. The `query` must be specified, and it is run
         * as a `template` query.
         *
         * The current suggestion is automatically made available as the
         * `{{suggestion}}` variable, which should be used in your query.
         * Additionally, you can specify a `prune` to control if all phrase
         * suggestions will be returned, when set to `true` the suggestions will
         * have an additional option `collate_match`, which will be true if matching
         * documents for the phrase was found, `false` otherwise. The default value
         * for prune is `false`.
         *
         * @param {object} opts The options for `collate`. Can include the following:
         *   - `query`: The `query` to prune suggestions for which
         *      no matching docs exist in the index. It is run as a `template` query.
         *   - `params`: The parameters to be passed to the template. The suggestion
         *      value will be added to the variables you specify.
         *   - `prune`: When set to `true`, the suggestions will
         *      have an additional option `collate_match`, which will be true if matching
         *      documents for the phrase was found, `false` otherwise. The default value
         *      for prune is `false`.
         */
        collate(opts: object): this;

        /**
         * Sets the smoothing model to balance weight between infrequent grams
         * (grams (shingles) are not existing in the index) and frequent grams
         * (appear at least once in the index).
         *
         * Three possible values can be specified:
         *   - `stupid_backoff`: a simple backoff model that backs off to lower order
         *     n-gram models if the higher order count is 0 and discounts the lower order
         *     n-gram model by a constant factor. The default `discount` is `0.4`.
         *     Stupid Backoff is the default model
         *   - `laplace`: a smoothing model that uses an additive smoothing where a
         *     constant (typically `1.0` or smaller) is added to all counts to balance weights,
         *     The default `alpha` is `0.5`.
         *   - `linear_interpolation`: a smoothing model that takes the weighted mean of the
         *     unigrams, bigrams and trigrams based on user supplied weights (lambdas).
         *     Linear Interpolation doesn’t have any default values.
         *     All parameters (`trigram_lambda`, `bigram_lambda`, `unigram_lambda`)
         *     must be supplied.
         *
         * @param {string} model One of `stupid_backoff`, `laplace`, `linear_interpolation`
         */
        smoothing(
            model: 'stupid_backoff' | 'laplace' | 'linear_interpolation'
        ): this;

        /**
         * Sets the given list of candicate generators which produce a list of possible terms
         * per term in the given text. Each of the generators in the list are
         * called per term in the original text.
         * The output of the generators is subsequently scored in combination with the
         * candidates from the other terms to for suggestion candidates.
         *
         * @param {Array<DirectGenerator>|DirectGenerator} dirGen Array of `DirectGenerator`
         * instances or a single instance of `DirectGenerator`
         */
        directGenerator(dirGen: DirectGenerator[] | DirectGenerator): this;

        /**
         * Override default `toJSON` to return DSL representation for the `phrase suggester`
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * The phrase suggester adds additional logic on top of the `term` suggester
     * to select entire corrected phrases instead of individual tokens weighted
     * based on `ngram-language` models. In practice this suggester will be able
     * to make better decisions about which tokens to pick based on co-occurrence
     * and frequencies.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     * @param {string=} txt A string to get suggestions for.
     *
     * @throws {Error} if `name` is empty
     */
    export function phraseSuggester(
        name: string,
        field?: string,
        txt?: string
    ): PhraseSuggester;

    /**
     * The completion suggester provides auto-complete/search-as-you-type
     * functionality. This is a navigational feature to guide users to relevant
     * results as they are typing, improving search precision. It is not meant
     * for spell correction or did-you-mean functionality like the term or
     * phrase suggesters.
     *
     * Ideally, auto-complete functionality should be as fast as a user types to
     * provide instant feedback relevant to what a user has already typed in.
     * Hence, completion suggester is optimized for speed. The suggester uses
     * data structures that enable fast lookups, but are costly to build
     * and are stored in-memory.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     *
     * @throws {Error} if `name` is empty
     *
     * @extends Suggester
     */
    export class CompletionSuggester extends Suggester {
        constructor(name: string, field?: string);

        /**
         * Sets the `prefix` for the `CompletionSuggester` query.
         *
         * @param {string} prefix
         */
        prefix(prefix: string): this;

        /**
         * Sets whether duplicate suggestions should be filtered out (defaults to false).
         *
         * NOTE: This option was added in elasticsearch v6.1.
         *
         * @param {boolean} skip Enable/disable skipping duplicates
         */
        skipDuplicates(skip?: boolean): this;

        /**
         * Sets the `fuzzy` parameter. Can be customised with specific fuzzy parameters.
         *
         * @param {boolean|Object=} fuzzy Enable/disable `fuzzy` using boolean or
         * object(with params)
         */
        fuzzy(fuzzy?: boolean | object): this;

        /**
         * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
         * the number of one character changes that need to be made to one string to make it
         * the same as another string.
         *
         * @param {number|string} factor Can be specified either as a number, or the maximum
         * number of edits, or as `AUTO` which generates an edit distance based on the length
         * of the term.
         */
        fuzziness(factor: number | string): this;

        /**
         * Transpositions (`ab` → `ba`) are allowed by default but can be disabled
         * by setting `transpositions` to false.
         *
         * @param {boolean} enable
         */
        transpositions(enable: boolean): this;

        /**
         * Sets the minimum length of the input before fuzzy suggestions are returned,
         * defaults 3
         *
         * @param {number} len Minimum length of the input before fuzzy suggestions
         * are returned, defaults 3
         */
        minLength(len: number): this;

        /**
         * The number of initial characters which will not be "fuzzified".
         * This helps to reduce the number of terms which must be examined. Defaults to `1`.
         *
         * @param {number} len Characters to skip fuzzy for. Defaults to `1`.
         */
        prefixLength(len: number): this;

        /**
         * If `true`, all measurements (like fuzzy edit distance, transpositions,
         * and lengths) are measured in Unicode code points instead of in bytes.
         * This is slightly slower than raw bytes, so it is set to `false` by default.
         *
         * @param {boolean} enable Measure in Unicode code points instead of in bytes.
         * `false` by default.
         */
        unicodeAware(enable: boolean): this;

        /**
         * Sets the regular expression for completion suggester which supports regex queries.
         *
         * @param {string} expr Regular expression
         */
        regex(expr: string): this;

        /**
         * Set special flags. Possible flags are `ALL` (default),
         * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
         *
         * @param {string} flags `|` separated flags. Possible flags are `ALL` (default),
         * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
         */
        flags(flags: string): this;

        /**
         * Limit on how many automaton states regexp queries are allowed to create.
         * This protects against too-difficult (e.g. exponentially hard) regexps.
         * Defaults to 10000. You can raise this limit to allow more complex regular
         * expressions to execute.
         *
         * @param {number} limit
         */
        maxDeterminizedStates(limit: number): this;

        /**
         * The completion suggester considers all documents in the index, but it is often
         * desirable to serve suggestions filtered and/or boosted by some criteria.
         * To achieve suggestion filtering and/or boosting, you can add context mappings
         * while configuring a completion field. You can define multiple context mappings
         * for a completion field. Every context mapping has a unique name and a type.
         *
         * @param {string} name
         * @param {Array|Object} ctx
         */
        contexts(name: string, ctx: object[] | string[] | object): this;
    }

    /**
     * The completion suggester provides auto-complete/search-as-you-type
     * functionality. This is a navigational feature to guide users to relevant
     * results as they are typing, improving search precision. It is not meant
     * for spell correction or did-you-mean functionality like the term or
     * phrase suggesters.
     *
     * Ideally, auto-complete functionality should be as fast as a user types to
     * provide instant feedback relevant to what a user has already typed in.
     * Hence, completion suggester is optimized for speed. The suggester uses
     * data structures that enable fast lookups, but are costly to build
     * and are stored in-memory.
     *
     * @param {string} name The name of the Suggester, an arbitrary identifier
     * @param {string=} field The field to fetch the candidate suggestions from.
     *
     * @throws {Error} if `name` is empty
     *
     * @extends Suggester
     */
    export function completionSuggester(
        name: string,
        field?: string
    ): CompletionSuggester;

    /**
     * Allows to highlight search results on one or more fields. In order to
     * perform highlighting, the actual content of the field is required. If the
     * field in question is stored (has store set to yes in the mapping), it will
     * be used, otherwise, the actual _source will be loaded and the relevant
     * field will be extracted from it.
     *
     * If no term_vector information is provided (by setting it to
     * `with_positions_offsets` in the mapping), then the plain highlighter will be
     * used. If it is provided, then the fast vector highlighter will be used.
     * When term vectors are available, highlighting will be performed faster at
     * the cost of bigger index size.
     *
     *
     * @param {string|Array=} fields An optional field or array of fields to highlight.
     */
    export class Highlight {
        constructor(fields?: string | string[]);

        /**
         * Allows you to set a field that will be highlighted. The field is
         * added to the current list of fields.
         *
         * @param {string} field A field name.
         */
        field(field: string): this;

        /**
         * Allows you to set the fields that will be highlighted. All fields are
         * added to the current list of fields.
         *
         * @param {Array<string>} fields Array of field names.
         * @throws {TypeError} If `fields` is not an instance of Array
         */
        fields(fields: string[]): this;

        /**
         * Sets the pre tags for highlighted fragments. You can apply the
         * tags to a specific field by passing the optional field name parameter.
         *
         * @param {string|Array} tags
         * @param {string=} field
         */
        preTags(tags: string | any, field?: string): this;

        /**
         * Sets the post tags for highlighted fragments. You can apply the
         * tags to a specific field by passing the optional field name parameter.
         *
         * @param {string|Array} tags
         * @param {string=} field
         */
        postTags(tags: string | any, field?: string): this;

        /**
         * Sets the styled schema to be used for the tags.
         * styled - 10 `<em>` pre tags with css class of hltN, where N is 1-10
         */
        styledTagsSchema(): this;

        /**
         * Sets the order of highlight fragments to be sorted by score. You can apply the
         * score order to a specific field by passing the optional field name parameter.
         *
         * @param {string=} field An optional field name
         */
        scoreOrder(field?: string): this;

        /**
         * Sets the size of each highlight fragment in characters. You can apply the
         * option to a specific field by passing the optional field name parameter.
         *
         * @param {number} size The fragment size in characters. Defaults to 100.
         * @param {string=} field An optional field name
         */
        fragmentSize(size: number, field?: string): this;

        /**
         * Sets the maximum number of fragments to return. You can apply the
         * option to a specific field by passing the optional field name parameter.
         *
         * @param {number} count The maximum number of fragments to return
         * @param {string=} field An optional field name
         */
        numberOfFragments(count: number, field?: string): this;

        /**
         * If `no_match_size` is set, in the case where there is no matching fragment
         * to highlight, a snippet of text, with the specified length, from the beginning
         * of the field will be returned.
         * The actual length may be shorter than specified as it tries to break on a word boundary.
         * Default is `0`.
         *
         * @param {number} size
         * @param {string} field
         */
        noMatchSize(size: number, field: string): this;

        /**
         * Highlight against a query other than the search query.
         * Useful if you use a rescore query because those
         * are not taken into account by highlighting by default.
         *
         * @param {Query} query
         * @param {string=} field An optional field name
         * @throws {TypeError} If `query` is not an instance of `Query`
         */
        highlightQuery(query: Query, field?: string): this;

        /**
         * Combine matches on multiple fields to highlight a single field.
         * Useful for multifields that analyze the same string in different ways.
         * Sets the highlight type to Fast Vector Highlighter(`fvh`).
         *
         * @param {Array<string>} fields
         * @param {string} field Field name
         * @throws {Error} field parameter should be valid field name
         * @throws {TypeError} If `fields` is not an instance of Array
         */
        matchedFields(fields: string[], field: string): this;

        /**
         * The fast vector highlighter has a phrase_limit parameter that prevents
         * it from analyzing too many phrases and eating tons of memory. It defaults
         * to 256 so only the first 256 matching phrases in the document scored
         * considered. You can raise the limit with the phrase_limit parameter.
         * If using `matched_fields`, `phrase_limit` phrases per matched field
         * are considered.
         *
         * @param {number} limit Defaults to 256.
         */
        phraseLimit(limit: number): this;

        /**
         * Can be used to define how highlighted text will be encoded.
         *
         * @param {string} encoder It can be either `default` (no encoding)
         * or `html` (will escape html, if you use html highlighting tags)
         * @throws {Error} Encoder can be either `default` or `html`
         */
        encoder(encoder: 'default' | 'html'): this;

        /**
         * By default only fields that hold a query match will be highlighted.
         * This can be set to false to highlight the field regardless of whether
         * the query matched specifically on them. You can apply the
         * option to a specific field by passing the optional field name parameter.
         *
         * @param {boolean} requireFieldMatch
         * @param {string=} field An optional field name
         */
        requireFieldMatch(requireFieldMatch: boolean, field?: string): this;

        /**
         * Allows to control how far to look for boundary characters, and defaults to 20.
         * You can apply the option to a specific field by passing the optional field name parameter.
         *
         * @param {number} count The max characters to scan.
         * @param {string=} field An optional field name
         */
        boundaryMaxScan(count: number, field?: string): this;

        /**
         * Defines what constitutes a boundary for highlighting.
         * It is a single string with each boundary character defined in it.
         * It defaults to `.,!? \t\n`. You can apply the
         * option to a specific field by passing the optional field name parameter.
         *
         * @param {string} charStr
         * @param {string=} field An optional field name
         */
        boundaryChars(charStr: string, field?: string): this;

        /**
         * Allows to force a specific highlighter type.
         * This is useful for instance when needing to use
         * the plain highlighter on a field that has term_vectors enabled.
         * You can apply the option to a specific field by passing the optional field name parameter.
         *
         * Note: The `postings` highlighter has been removed in elasticsearch 6.0. The `unified`
         * highlighter outputs the same highlighting when `index_options` is set to `offsets`.
         *
         * @param {string} type The allowed values are: `plain`, `postings` and `fvh`.
         * @param {string=} field An optional field name
         * @throws {Error} Type can be one of `plain`, `postings` or `fvh`.
         */
        type(type: 'plain' | 'postings' | 'fvh', field?: string): this;

        /**
         * Forces the highlighting to highlight fields based on the source
         * even if fields are stored separately. Defaults to false.
         *
         * @param {boolean} forceSource
         * @param {string=} field An optional field name
         */
        forceSource(forceSource: boolean, field?: string): this;

        /**
         * Sets the fragmenter type. You can apply the
         * option to a specific field by passing the optional field name parameter.
         * Valid values for order are:
         *  - `simple` - breaks text up into same-size fragments with no concerns
         *      over spotting sentence boundaries.
         *  - `span` - breaks text up into same-size fragments but does not split
         *      up Spans.
         *
         * @param {string} fragmenter The fragmenter.
         * @param {string=} field An optional field name
         * @throws {Error} Fragmenter can be either `simple` or `span`
         */
        fragmenter(fragmenter: 'simple' | 'span', field?: string): this;

        /**
         * Override default `toJSON` to return DSL representation for the `highlight` request
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Allows to highlight search results on one or more fields. In order to
     * perform highlighting, the actual content of the field is required. If the
     * field in question is stored (has store set to yes in the mapping), it will
     * be used, otherwise, the actual _source will be loaded and the relevant
     * field will be extracted from it.
     *
     * If no term_vector information is provided (by setting it to
     * `with_positions_offsets` in the mapping), then the plain highlighter will be
     * used. If it is provided, then the fast vector highlighter will be used.
     * When term vectors are available, highlighting will be performed faster at
     * the cost of bigger index size.
     *
     *
     * @param {string|Array=} fields An optional field or array of fields to highlight.
     */
    export function highlight(fields?: string | string[]): Highlight;

    /**
     * Class supporting the Elasticsearch scripting API.
     *
     * Note: `inline` script type was deprecated in [elasticsearch v5.0](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/breaking_50_scripting.html).
     * `source` should be used instead. And similarly for `stored` scripts, type
     * `id` must be used instead. `file` scripts were removed as part of the
     * breaking changes in [elasticsearch v6.0](https://www.elastic.co/guide/en/elasticsearch/reference/6.0/breaking_60_scripting_changes.html#_file_scripts_removed)
     *
     * @param {string=} type One of `inline`, `stored`, `file`, `source`, `id`.
     * @param {string=} source Source of the script.
     * This needs to be specified if optional argument `type` is passed.
     */
    export class Script {
        constructor(type?: string, source?: string);

        /**
         * Sets the type of script to be `inline` and specifies the source of the script.
         *
         * Note: This type was deprecated in elasticsearch v5.0. Use `source`
         * instead if you are using elasticsearch `>= 5.0`.
         *
         * @param {string} scriptCode
         */
        inline(scriptCode: string): this;

        /**
         * Sets the type of script to be `source` and specifies the source of the script.
         *
         * Note: `source` is an alias for the `inline` type which was deprecated
         * in elasticsearch v5.0. So this type is supported only in versions
         * `>= 5.0`.
         *
         * @param {string} scriptCode
         */
        source(scriptCode: string): this;

        /**
         * Specify the `stored` script by `id` which will be retrieved from cluster state.
         *
         * Note: This type was deprecated in elasticsearch v5.0. Use `id`
         * instead if you are using elasticsearch `>= 5.0`.
         *
         * @param {string} scriptId The unique identifier for the stored script.
         */
        stored(scriptId: string): this;

        /**
         * Specify the stored script to be used by it's `id` which will be retrieved
         * from cluster state.
         *
         * Note: `id` is an alias for the `stored` type which was deprecated in
         * elasticsearch v5.0. So this type is supported only in versions `>= 5.0`.
         *
         * @param {string} scriptId The unique identifier for the stored script.
         */
        id(scriptId: string): this;

        /**
         * Specify the `stored` script by `id` which will be retrieved from cluster state.
         *
         * For script file `config/scripts/calculate-score.groovy`,
         * `fileName` should be `calculate-score`.
         *
         * Note: File scripts have been removed in elasticsearch 6.0. Instead, use stored scripts.
         *
         * @param {string} fileName The name of the script stored as a file in the scripts folder.
         */
        file(fileName: string): this;

        /**
         * Specifies the language the script is written in. Defaults to `painless` but
         * may be set to any of languages listed in Scripting elasticsearch documentation.
         * The default language may be changed in the `elasticsearch.yml` config file by setting
         * `script.default_lang` to the appropriate language.
         *
         * For a `file` script,  it should correspond with the script file suffix.
         * `groovy` for `config/scripts/calculate-score.groovy`.
         *
         * Note: The Groovy, JavaScript, and Python scripting languages were deprecated in
         * elasticsearch 5.0 and removed in 6.0. Use painless instead.
         *
         * @param {string} lang The language for the script.
         */
        lang(lang: string): this;

        /**
         * Specifies any named parameters that are passed into the script as variables.
         *
         * @param {object} params Named parameters to be passed to script.
         */
        params(params: object): this;

        /**
         * Override default `toJSON` to return DSL representation for the `script`.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Class supporting the Elasticsearch scripting API.
     *
     * @param {string=} type One of `inline`, `stored`, `file`
     * @param {string=} source Source of the script.
     * This needs to be specified if optional argument `type` is passed.
     */
    export function script(type?: string, source?: string): Script;

    /**
     * A `GeoPoint` object that can be used in queries and filters that
     * take a `GeoPoint`.  `GeoPoint` supports various input formats.
     */
    export class GeoPoint {
        /**
         * Sets the latitude for the object representation.
         *
         * @param {number} lat Latitude
         */
        lat(lat: number): this;

        /**
         * Sets the longitude for the object representation.
         *
         * @param {number} lon Longitude
         */
        lon(lon: number): this;

        /**
         * Sets the Geo Point value expressed as an object,
         * with `lat` and `lon` keys.
         *
         * @param {object} point
         * @throws {TypeError} If `point` is not an instance of object
         */
        object(point: object): this;

        /**
         * Sets the Geo Point value expressed as an array
         * with the format: `[ lon, lat ]`.
         *
         * @param {Array<number>} point Array in format `[ lon, lat ]`(`GeoJson` standard)
         * @throws {TypeError} If `point` is not an instance of Array
         */
        array(point: number[]): this;

        /**
         * Sets Geo-point expressed as a string with the format: `"lat,lon"`
         * or as a geo hash
         *
         * @param {string} point
         */
        string(point: string): this;

        /**
         * Override default `toJSON` to return DSL representation for the `GeoPoint`
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * A `GeoPoint` object that can be used in queries and filters that
     * take a `GeoPoint`.  `GeoPoint` supports various input formats.
     */
    export function geoPoint(): GeoPoint;

    /**
     * Shape object that can be used in queries and filters that
     * take a Shape. Shape uses the GeoJSON format.
     *
     * @param {string=} type A valid shape type.
     * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
     * `multipolygon`, `geometrycollection`, `envelope` and `circle`
     * @param {Array=} coords A valid coordinat definition for the given shape.
     */
    export class GeoShape {
        constructor(
            type?:
                | 'point'
                | 'linestring'
                | 'polygon'
                | 'multipoint'
                | 'multilinestring'
                | 'multipolygon'
                | 'geometrycollection'
                | 'envelope'
                | 'circle',
            coords?: object
        );

        /**
         * Sets the GeoJSON format type used to represent shape.
         *
         * @param {string} type A valid shape type.
         * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
         * `multipolygon`, `geometrycollection`, `envelope`, `circle`
         */
        type(
            type:
                | 'point'
                | 'linestring'
                | 'polygon'
                | 'multipoint'
                | 'multilinestring'
                | 'multipolygon'
                | 'geometrycollection'
                | 'envelope'
                | 'circle'
        ): this;

        /**
         * Sets the coordinates for the shape definition. Note, the coordinates
         * are not validated in this api. Please see `GeoJSON`
         * and ElasticSearch documentation for correct coordinate definitions.
         *
         * @param {Array<Array<number>>|Array<number>} coords
         */
        coordinates(coords: number[][] | number[]): this;

        /**
         * Sets the radius for parsing a circle `GeoShape`.
         *
         * @param {string|number} radius The radius for shape circle.
         */
        radius(radius: string | number): this;

        /**
         * Override default `toJSON` to return DSL representation of the geo shape
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Shape object that can be used in queries and filters that
     * take a Shape. Shape uses the GeoJSON format.
     *
     * @param {string=} type A valid shape type.
     * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
     * `multipolygon`, `geometrycollection`, `envelope` and `circle`
     * @param {Array=} coords A valid coordinat definition for the given shape.
     */
    export function geoShape(
        type?:
            | 'point'
            | 'linestring'
            | 'polygon'
            | 'multipoint'
            | 'multilinestring'
            | 'multipolygon'
            | 'geometrycollection'
            | 'envelope'
            | 'circle',
        coords?: object
    ): GeoShape;

    /**
     * A shape which has already been indexed in another index and/or index
     * type. This is particularly useful for when you have a pre-defined list of
     * shapes which are useful to your application and you want to reference this
     * using a logical name (for example 'New Zealand') rather than having to
     * provide their coordinates each time.
     *
     * @param {string=} id The document id of the shape.
     * @param {string=} type The name of the type where the shape is indexed.
     */
    export class IndexedShape {
        constructor(id?: string, type?: string);

        /**
         * Sets the ID of the document that containing the pre-indexed shape.
         *
         * @param {string} id The document id of the shape.
         */
        id(id: string): this;

        /**
         * Sets the index type where the pre-indexed shape is.
         *
         * @param {string} type The name of the type where the shape is indexed.
         */
        type(type: string): this;

        /**
         * Sets the name of the index where the pre-indexed shape is. Defaults to `shapes`.
         *
         * @param {string} index A valid index name
         */
        index(index: string): this;

        /**
         * Sets the field specified as path containing the pre-indexed shape.
         * Defaults to `shape`.
         *
         * @param {string} path field name.
         */
        path(path: string): this;

        /**
         * Override default `toJSON` to return DSL representation of the geo shape
         * class instance.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * A shape which has already been indexed in another index and/or index
     * type. This is particularly useful for when you have a pre-defined list of
     * shapes which are useful to your application and you want to reference this
     * using a logical name (for example 'New Zealand') rather than having to
     * provide their coordinates each time.
     *
     * @param {string=} id The document id of the shape.
     * @param {string=} type The name of the type where the shape is indexed.
     */
    export function indexedShape(id?: string, type?: string): IndexedShape;

    /**
     * Allows creating and configuring sort on specified field.
     *
     * @param {string=} field The field to sort on.
     * If a script is used to specify the sort order, `field` should be omitted.
     * @param {string=} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     */
    export class Sort {
        constructor(field?: string, order?: string);

        /**
         * Set order for sorting. The order defaults to `desc` when sorting on the `_score`,
         * and defaults to `asc` when sorting on anything else.
         *
         * @param {string} order The `order` option can have the following values.
         * `asc`, `desc` to sort in ascending, descending order respectively.
         */
        order(order: 'asc' | 'desc'): this;

        /**
         * Elasticsearch supports sorting by array or multi-valued fields.
         * The `mode` option controls what array value is picked for sorting the
         * document it belongs to.
         * The `mode` option can have the following values:
         * - `min` - Pick the lowest value.
         * - `max` - Pick the highest value.
         * - `sum` - Use the sum of all values as sort value.
         *   Only applicable for number based array fields.
         * - `avg` - Use the average of all values as sort value.
         *   Only applicable for number based array fields.
         * - `median` - Use the median of all values as sort value.
         *   Only applicable for number based array fields.
         *
         * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`.
         */
        mode(mode: 'min' | 'max' | 'sum' | 'avg' | 'median'): this;

        /**
         * Defines on which nested object to sort. The actual sort field must be a direct
         * field inside this nested object. When sorting by nested field, this field
         * is mandatory.
         *
         * Note: This method has been deprecated in elasticsearch 6.1. From 6.1 and
         * later, use `nested` method instead.
         *
         * @param {string} path Nested object to sort on
         */
        nestedPath(path: string): this;

        /**
         * A filter that the inner objects inside the nested path should match with in order
         * for its field values to be taken into account by sorting. By default no
         * `nested_filter` is active.
         *
         * Note: This method has been deprecated in elasticsearch 6.1. From 6.1 and
         * later, use `nested` method instead.
         *
         * @param {Query} filterQuery
         * @throws {TypeError} If filter query is not an instance of `Query`
         */
        nestedFilter(filterQuery: Query): this;

        /**
         * Defines on which nested object to sort and the filter that the inner objects inside
         * the nested path should match with in order for its field values to be taken into
         * account by sorting
         *
         * Note: This method is incompatible with elasticsearch 6.0 and older.
         * Use it only with elasticsearch 6.1 and later.
         *
         * @param {Object} nested Nested config that contains path and filter
         * @param {string} nested.path Nested object to sort on
         * @param {Query} nested.filter Filter query
         */
        nested(nested: { path: string; filter: Query }): this;

        /**
         * The missing parameter specifies how docs which are missing the field should
         * be treated: The missing value can be set to `_last`, `_first`, or a custom value
         * (that will be used for missing docs as the sort value). The default is `_last`.
         *
         * @param {string|number} value
         */
        missing(value: string | number): this;

        /**
         * By default, the search request will fail if there is no mapping associated with
         * a field. The `unmapped_type` option allows to ignore fields that have no mapping
         * and not sort by them. The value of this parameter is used to determine what sort
         * values to emit.
         *
         * @param {string} type
         */
        unmappedType(type: string): this;

        /**
         * Sorts documents by distance of the geo point field from reference point.
         * If multiple reference points are specified, the final distance for a
         * document will then be `min`/`max`/`avg` (defined via `mode`) distance of all
         * points contained in the document to all points given in the sort request.
         *
         * @param {GeoPoint|Object|Array|string} geoPoint Reference point or array of
         * points to calculate distance from. Can be expressed using the `GeoPoint` class,
         * `Object` with `lat`, `lon` keys, as a string either `lat,lon` or geohash
         * or as Array with GeoJSON format `[lon, lat]`
         */
        geoDistance(geoPoint: GeoPoint | object | number[] | string): this;

        /**
         * Sets the distance calculation mode, `arc` or `plane`.
         * The `arc` calculation is the more accurate.
         * The `plane` is the faster but least accurate.
         *
         * @param {string} type
         * @throws {Error} If `type` is neither `plane` nor `arc`.
         */
        distanceType(type: 'arc' | 'plane'): this;

        /**
         * Sets the distance unit.  Valid values are:
         * mi (miles), in (inches), yd (yards),
         * km (kilometers), cm (centimeters), mm (millimeters),
         * ft(feet), NM(nauticalmiles)
         *
         * @param {string} unit Distance unit, default is `m`(meters).
         * @throws {Error} If Unit is outside the accepted set.
         */
        unit(unit: string): this;

        /**
         * Sorts based on custom script. When sorting on a field, scores are not computed.
         *
         * @param {Script} script
         * @throws {TypeError} If `script` is not an instance of `Script`
         */
        script(script: Script): this;

        /**
         * Sets the data type for field generated by script.
         *
         * @param {string} type
         */
        type(type: string): this;

        /**
         * Reverse the sort order. Valid during sort types: field, geo distance, and script.
         *
         * @param {boolean} reverse If sort should be in reverse order.
         */
        reverse(reverse: boolean): this;

        /**
         * Override default `toJSON` to return DSL representation for `sort` parameter.
         *
         * @override
         */
        toJSON(): object | string;
    }

    /**
     * Allows creating and configuring sort on specified field.
     *
     * @param {string=} field The field to sort on.
     * If a script is used to specify the sort order, `field` should be omitted.
     * @param {string=} order The `order` option can have the following values.
     * `asc`, `desc` to sort in ascending, descending order respectively.
     */
    export function sort(field?: string, order?: string): Sort;

    /**
     * A `rescore` request can help to improve precision by reordering just
     * the top (eg 100 - 500) documents returned by the `query` and `post_filter`
     * phases, using a secondary (usually more costly) algorithm, instead of
     * applying the costly algorithm to all documents in the index.
     * The rescore phase is not executed when sort is used.
     *
     * @param {number=} windowSize
     * @param {Query=} rescoreQuery
     */
    export class Rescore {
        constructor(windowSize?: number, rescoreQuery?: Query);

        /**
         * The number of docs which will be examined on each shard can be controlled
         * by the window_size parameter, which defaults to `from` and `size`.
         *
         * @param {number} windowSize
         */
        windowSize(windowSize: number): this;

        /**
         * The query to execute on the Top-K results by the `query` and `post_filter` phases.
         *
         * @param {Query} rescoreQuery
         * @throws {TypeError} If `rescoreQuery` is not an instance of `Query`
         */
        rescoreQuery(rescoreQuery: Query): this;

        /**
         * Control the relative importance of the original query.
         *
         * @param {number} weight Defaults to 1
         */
        queryWeight(weight: number): this;

        /**
         * Control the relative importance of the rescore query.
         *
         * @param {number} weight Defaults to 1
         */
        rescoreQueryWeight(weight: number): this;

        /**
         * Controls the way the scores are combined.
         *
         * @param {string} mode Can be one of `total`, `multiply`, `min`, `max`, `avg`.
         * Defaults to `total`.
         */
        scoreMode(mode: 'total' | 'multiply' | 'min' | 'max' | 'avg'): this;

        /**
         * Override default `toJSON` to return DSL representation for `rescore` request
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * A `rescore` request can help to improve precision by reordering just
     * the top (eg 100 - 500) documents returned by the `query` and `post_filter`
     * phases, using a secondary (usually more costly) algorithm, instead of
     * applying the costly algorithm to all documents in the index.
     * The rescore phase is not executed when sort is used.
     *
     * @param {number=} windowSize
     * @param {Query=} rescoreQuery
     */
    export function rescore(windowSize?: number, rescoreQuery?: Query): Rescore;

    /**
     * Inner hits returns per search hit in the search response additional
     * nested hits that caused a search hit to match in a different scope.
     * Inner hits can be used by defining an `inner_hits` definition on a
     * `nested`, `has_child` or `has_parent` query and filter.
     *
     * @param {string=} name The name to be used for the particular inner hit definition
     * in the response. Useful when multiple inner hits have been defined in a single
     * search request. The default depends in which query the inner hit is defined.
     */
    export class InnerHits {
        constructor(name?: string);

        /**
         * The name to be used for the particular inner hit definition
         * in the response. Useful when multiple inner hits have been defined in a single
         * search request. The default depends in which query the inner hit is defined.
         *
         * @param {number} name
         */
        name(name: number): this;

        /**
         * The offset from where the first hit to fetch for each `inner_hits` in the returned
         * regular search hits.
         *
         * @param {number} from
         */
        from(from: number): this;

        /**
         * The maximum number of hits to return per inner_hits.
         * By default the top three matching hits are returned.
         *
         * @param {number} size Defaults to 10.
         */
        size(size: number): this;

        /**
         * How the inner hits should be sorted per inner_hits.
         * By default the hits are sorted by the score.
         *
         * @param {Sort} sort
         * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
         */
        sort(sort: Sort): this;

        /**
         * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
         * The sort is defined on a per field level, with special field name for _score to
         * sort by score, and _doc to sort by index order.
         *
         * @param {Array<Sort>} sorts Array of sort
         * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
         */
        sorts(sorts: Sort[]): this;

        /**
         * Allows to highlight search results on one or more fields. The implementation
         * uses either the lucene `plain` highlighter, the fast vector highlighter (`fvh`)
         * or `postings` highlighter.
         *
         * Note: The `postings` highlighter has been removed in elasticsearch 6.0. The `unified`
         * highlighter outputs the same highlighting when `index_options` is set to `offsets`.
         *
         * @param {Highlight} highlight
         */
        highlight(highlight: Highlight): this;

        /**
         * Enables explanation for each hit on how its score was computed.
         *
         * @param {boolean} enable
         */
        explain(enable: boolean): this;

        /**
         * Allows to control how the `_source` field is returned with every hit.
         * You can turn off `_source` retrieval by passing `false`.
         * It also accepts one(string) or more wildcard(array) patterns to control
         * what parts of the `_source` should be returned
         * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
         *
         * @param {boolean|string|Array|Object} source
         */
        source(source: boolean | string | string[] | object): this;

        /**
         * Include specific stored fields
         *
         * @param {Array|string} fields
         */
        storedFields(fields: object | string): this;

        /**
         * Computes a document property dynamically based on the supplied `Script`.
         *
         * @param {string} scriptFieldName
         * @param {string|Script} script string or instance of `Script`
         */
        scriptField(scriptFieldName: string, script: string | Script): this;

        /**
         * Sets given dynamic document properties to be computed using supplied `Script`s.
         * Object should have `scriptFieldName` as key and `script` as the value.
         *
         * @param {object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
         */
        scriptFields(scriptFields: object): this;

        /**
         * Allows to return the doc value representation of a field for each hit.
         * Doc value fields can work on fields that are not stored.
         *
         * @param {Array<string>} fields
         */
        docvalueFields(fields: string[]): this;

        /**
         * Returns a version for each search hit.
         * @param {boolean} enable
         */
        version(enable: boolean): this;

        /**
         * Override default `toJSON` to return DSL representation for the inner hits request
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Inner hits returns per search hit in the search response additional
     * nested hits that caused a search hit to match in a different scope.
     * Inner hits can be used by defining an `inner_hits` definition on a
     * `nested`, `has_child` or `has_parent` query and filter.
     *
     * @param {string=} name The name to be used for the particular inner hit definition
     * in the response. Useful when multiple inner hits have been defined in a single
     * search request. The default depends in which query the inner hit is defined.
     */
    export function innerHits(name?: string): InnerHits;

    /**
     * Class supporting the Elasticsearch search template API.
     *
     * The `/_search/template` endpoint allows to use the mustache language to
     * pre render search requests, before they are executed and fill existing
     * templates with template parameters.
     *
     * @param {string=} type One of `inline`, `id`, `file`. `id` is also
     * aliased as `indexed`
     * @param {string|Object=} source Source of the search template.
     * This needs to be specified if optional argument `type` is passed.
     */
    export class SearchTemplate {
        constructor(type?: string, source?: string | object);

        /**
         * Sets the type of search template to be `inline` and specifies the query.
         *
         * @param {string|Query} query Either a `Query` object or a string.
         */
        inline(query: string | object): this;

        /**
         * Specify the indexed search template by `templateName` which will be
         * retrieved from cluster state.
         *
         * @param {string} templId The unique identifier for the indexed template
         */
        id(templId: string): this;

        /**
         * Specify the indexed search template by `templateName` which will be
         * retrieved from cluster state.
         *
         * Alias for `SearchTemplate.id`
         *
         * @param {string} templId The unique identifier for the indexed template
         */
        indexed(templId: string): this;

        /**
         * Specify the search template by filename stored in the scripts folder,
         * with `mustache` extension.
         *
         * @param {string} fileName The name of the search template stored as a file
         * in the scripts folder.
         * For file `config/scripts/storedTemplate.mustache`,
         * `fileName` should be `storedTemplate`
         */
        file(fileName: string): this;

        /**
         * Specifies any named parameters that are used to render the search template.
         *
         * @param {Object} params Named parameters to be used for rendering.
         */
        params(params: object): this;

        /**
         * Override default `toJSON` to return DSL representation for the Search Template.
         *
         * @override
         */
        toJSON(): object;
    }

    /**
     * Class supporting the Elasticsearch search template API.
     *
     * The `/_search/template` endpoint allows to use the mustache language to
     * pre render search requests, before they are executed and fill existing
     * templates with template parameters.
     *
     * @param {string=} type One of `inline`, `id`, `file`. `id` is also
     * aliased as `indexed`
     * @param {string|Object=} source Source of the search template.
     * This needs to be specified if optional argument `type` is passed.
     */
    export function searchTemplate(
        type?: string,
        source?: string | object
    ): SearchTemplate;

    export namespace recipes {
        /**
         * Recipe for the now removed `missing` query.
         * Can be accessed using `esb.recipes.missingQuery` OR `esb.cookMissingQuery`.
         *
         * @param {string} field The field which should be missing the value.
         */
        export function missingQuery(field: string): BoolQuery;

        /**
         * Recipe for random sort query. Takes a query and returns the same
         * wrapped in a random scoring query.
         * Can be accessed using `esb.recipes.randomSortQuery` OR `esb.cookRandomSortQuery`.
         *
         * @param {Query=} query The query to fetch documents for. Defaults to `match_all` query.
         * @param {number=} seed A seed value for the random score function.
         * @throws {TypeError} If `query` is not an instance of `Query`.
         */
        export function randomSortQuery(
            query?: Query,
            seed?: number
        ): FunctionScoreQuery;

        /**
         * Recipe for constructing a filter query using `bool` query.
         * Optionally, scoring can be enabled.
         * Can be accessed using `esb.recipes.filterQuery` OR `esb.cookFilterQuery`.
         *
         * @param {Query} query The query to fetch documents for.
         * @param {boolean=} scoring Optional flag for enabling/disabling scoring. Disabled by default.
         * If enabled, a score of `1.0` will be assigned to all documents.
         * @throws {TypeError} If `query` is not an instance of `Query`.
         */
        export function filterQuery(query: Query, scoring?: boolean): BoolQuery;
    }

    // Dunno how to define alias for namespaced functions

    /**
     * Recipe for the now removed `missing` query.
     * Can be accessed using `esb.recipes.missingQuery` OR `esb.cookMissingQuery`.
     *
     * @param {string} field The field which should be missing the value.
     */
    export function cookMissingQuery(field: string): BoolQuery;

    /**
     * Recipe for random sort query. Takes a query and returns the same
     * wrapped in a random scoring query.
     * Can be accessed using `esb.recipes.randomSortQuery` OR `esb.cookRandomSortQuery`.
     *
     * @param {Query=} query The query to fetch documents for. Defaults to `match_all` query.
     * @param {number=} seed A seed value for the random score function.
     * @throws {TypeError} If `query` is not an instance of `Query`.
     */
    export function cookRandomSortQuery(
        query?: Query,
        seed?: number
    ): FunctionScoreQuery;

    /**
     * Recipe for constructing a filter query using `bool` query.
     * Optionally, scoring can be enabled.
     * Can be accessed using `esb.recipes.filterQuery` OR `esb.cookFilterQuery`.
     *
     * @param {Query} query The query to fetch documents for.
     * @param {boolean=} scoring Optional flag for enabling/disabling scoring. Disabled by default.
     * If enabled, a score of `1.0` will be assigned to all documents.
     * @throws {TypeError} If `query` is not an instance of `Query`.
     */
    export function cookFilterQuery(query: Query, scoring?: boolean): BoolQuery;

    /**
     * Utility function to pretty print objects to console.
     * To be used in development.
     *
     * @param {Object} obj
     */
    export function prettyPrint(obj: any): void;
}
