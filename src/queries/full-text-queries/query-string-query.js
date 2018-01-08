'use strict';

const QueryStringQueryBase = require('./query-string-query-base');
const { validateRewiteMethod } = require('../helper');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html';

/**
 * A query that uses a query parser in order to parse its content.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html)
 *
 * @example
 * const qry = esb.queryStringQuery('this AND that OR thus')
 *     .defaultField('content');
 *
 * @param {string=} queryString The actual query to be parsed.
 *
 * @extends QueryStringQueryBase
 */
class QueryStringQuery extends QueryStringQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(queryString) {
        super('query_string', ES_REF_URL, queryString);
    }

    /**
     * The default field for query terms if no prefix field is specified.
     * Defaults to the `index.query.default_field` index settings, which
     * in turn defaults to `_all`.
     *
     * @param {string} field
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    defaultField(field) {
        this._queryOpts.default_field = field;
        return this;
    }

    /**
     * When set, `*` or `?` are allowed as the first character. Defaults to `true`.
     *
     * @param {boolean} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    allowLeadingWildcard(enable) {
        this._queryOpts.allow_leading_wildcard = enable;
        return this;
    }

    /**
     * Set to true to enable position increments in result queries. Defaults to true.
     *
     * @param {boolean} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    enablePositionIncrements(enable) {
        this._queryOpts.enable_position_increments = enable;
        return this;
    }

    /**
     * Controls the number of terms fuzzy queries will expand to. Defaults to `50`.
     *
     * @param {number} limit
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    fuzzyMaxExpansions(limit) {
        this._queryOpts.fuzzy_max_expansions = limit;
        return this;
    }

    /**
     * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
     * the number of one character changes that need to be made to one string to make it
     * the same as another string. Defaults to `AUTO`.
     *
     * @param {number|string} factor Can be specified either as a number, or the maximum
     * number of edits, or as `AUTO` which generates an edit distance based on the length
     * of the term. Defaults to `AUTO`.
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    fuzziness(factor) {
        this._queryOpts.fuzziness = factor;
        return this;
    }

    /**
     * Set the prefix length for fuzzy queries. Default is `0`.
     *
     * @param {number} len
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    fuzzyPrefixLength(len) {
        this._queryOpts.fuzzy_prefix_length = len;
        return this;
    }

    /**
     * Sets the rewrite method. Valid values are:
     * - `constant_score` - tries to pick the best constant-score rewrite
     *  method based on term and document counts from the query.
     *  Synonyms - `constant_score_auto`, `constant_score_filter`
     *
     * - `scoring_boolean` - translates each term into boolean should and
     *  keeps the scores as computed by the query
     *
     * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
     *  are computed.
     *
     * - `constant_score_filter` - first creates a private Filter, by visiting
     *  each term in sequence and marking all docs for that term
     *
     * - `top_terms_boost_N` - first translates each term into boolean should
     *  and scores are only computed as the boost using the top N
     *  scoring terms. Replace N with an integer value.
     *
     * - `top_terms_N` - first translates each term into boolean should
     *  and keeps the scores as computed by the query. Only the top N
     *  scoring terms are used. Replace N with an integer value.
     *
     * Default is `constant_score`.
     *
     * This is an advanced option, use with care.
     *
     * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
     * `constant_score_filter` (synonyms for `constant_score`) have been removed
     * in elasticsearch 6.0.
     *
     * @param {string} method The rewrite method as a string.
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `rewrite` method is not valid.
     */
    rewrite(method) {
        validateRewiteMethod(method, 'rewrite', ES_REF_URL);

        this._queryOpts.rewrite = method;
        return this;
    }

    /**
     * Sets the fuzzy rewrite method. Valid values are:
     * - `constant_score` - tries to pick the best constant-score rewrite
     *  method based on term and document counts from the query.
     *  Synonyms - `constant_score_auto`, `constant_score_filter`
     *
     * - `scoring_boolean` - translates each term into boolean should and
     *  keeps the scores as computed by the query
     *
     * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
     *  are computed.
     *
     * - `constant_score_filter` - first creates a private Filter, by visiting
     *  each term in sequence and marking all docs for that term
     *
     * - `top_terms_boost_N` - first translates each term into boolean should
     *  and scores are only computed as the boost using the top N
     *  scoring terms. Replace N with an integer value.
     *
     * - `top_terms_N` - first translates each term into boolean should
     *  and keeps the scores as computed by the query. Only the top N
     *  scoring terms are used. Replace N with an integer value.
     *
     * Default is `constant_score`.
     *
     * This is an advanced option, use with care.
     *
     * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
     * `constant_score_filter` (synonyms for `constant_score`) have been removed
     * in elasticsearch 6.0.
     *
     * @param {string} method The rewrite method as a string.
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
     */
    fuzzyRewrite(method) {
        validateRewiteMethod(method, 'fuzzy_rewrite', ES_REF_URL);

        this._queryOpts.fuzzy_rewrite = method;
        return this;
    }

    /**
     * Sets the default slop for phrases. If zero, then exact phrase matches are required.
     * Default value is 0.
     *
     * @param {number} slop A positive integer value, defaults is 0.
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    phraseSlop(slop) {
        this._queryOpts.phrase_slop = slop;
        return this;
    }

    /**
     * Auto generate phrase queries. Defaults to `false`.
     *
     * Note: This parameter has been removed in elasticsearch 6.0. If provided,
     * it will be ignored and issue a deprecation warning.
     *
     * @param {boolean} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    autoGeneratePhraseQueries(enable) {
        this._queryOpts.auto_generate_phrase_queries = enable;
        return this;
    }

    /**
     * Limit on how many automaton states regexp queries are allowed to create.
     * This protects against too-difficult (e.g. exponentially hard) regexps.
     * Defaults to 10000.
     *
     * @param {number} limit
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    maxDeterminizedStates(limit) {
        this._queryOpts.max_determinized_states = limit;
        return this;
    }

    /**
     * Time Zone to be applied to any range query related to dates.
     *
     * @param {string} zone
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    timeZone(zone) {
        this._queryOpts.time_zone = zone;
        return this;
    }

    /**
     * Whether query text should be split on whitespace prior to analysis.
     * Instead the queryparser would parse around only real operators.
     * Default is `false`. It is not allowed to set this option to `false`
     * if `auto_generate_phrase_queries` is already set to `true`.
     *
     * Note: This parameter has been removed in elasticsearch 6.0. If provided,
     * it will be ignored and issue a deprecation warning. The `query_string`
     * query now splits on operator only.
     *
     * @param {string} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    splitOnWhitespace(enable) {
        this._queryOpts.split_on_whitespace = enable;
        return this;
    }

    /**
     * Should the queries be combined using `dis_max` (set it to `true`),
     * or a bool query (set it to `false`). Defaults to `true`.
     *
     * Note: This parameter has been removed in elasticsearch 6.0. If provided,
     * it will be ignored and issue a deprecation warning. The `tie_breaker`
     * parameter must be used instead.
     *
     * @example
     * const qry = esb.queryStringQuery('this AND that OR thus')
     *     .fields(['content', 'name^5'])
     *     .useDisMax(true);
     *
     * @param {boolean} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    useDisMax(enable) {
        this._queryOpts.use_dis_max = enable;
        return this;
    }

    /**
     * When using `dis_max`, the disjunction max tie breaker. Defaults to `0`.
     *
     * @param {number} factor
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    tieBreaker(factor) {
        this._queryOpts.tie_breaker = factor;
        return this;
    }

    /**
     * Sets the quote analyzer name used to analyze the `query`
     * when in quoted text.
     *
     * @param {string} analyzer A valid analyzer name.
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    quoteAnalyzer(analyzer) {
        this._queryOpts.quote_analyzer = analyzer;
        return this;
    }

    /**
     * If they query string should be escaped or not.
     *
     * @param {boolean} enable
     * @returns {QueryStringQuery} returns `this` so that calls can be chained.
     */
    escape(enable) {
        this._queryOpts.escape = enable;
        return this;
    }
}

module.exports = QueryStringQuery;
