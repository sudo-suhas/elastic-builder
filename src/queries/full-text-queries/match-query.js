'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam }
} = require('../../core');
const MonoFieldQueryBase = require('./mono-field-query-base');
const { validateRewiteMethod } = require('../helper');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html';

const invalidOperatorParam = invalidParam(
    ES_REF_URL,
    'operator',
    "'and' or 'or'"
);
const invalidZeroTermsQueryParam = invalidParam(
    ES_REF_URL,
    'zero_terms_query',
    "'all' or 'none'"
);

/**
 * `match` query accepts text/numerics/dates, analyzes them, and constructs a query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)
 *
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @example
 * const matchQry = esb.matchQuery('message', 'to be or not to be');
 *
 * @example
 * // Providing additional parameters:
 * const qry = esb.matchQuery('message', 'this is a test').operator('and');
 *
 * @extends MonoFieldQueryBase
 */
class MatchQuery extends MonoFieldQueryBase {
    // NOTE: Did not add methods for `slop`, `phrase_slop` and `type`.
    // These are deprecated.

    // eslint-disable-next-line require-jsdoc
    constructor(field, queryString) {
        super('match', field, queryString);
    }

    /**
     * The operator to be used in the boolean query which is constructed
     * by analyzing the text provided. The `operator` flag can be set to `or` or
     * `and` to control the boolean clauses (defaults to `or`).
     *
     * @param {string} operator Can be `and`/`or`. Default is `or`.
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    operator(operator) {
        if (isNil(operator)) invalidOperatorParam(operator);

        const operatorLower = operator.toLowerCase();
        if (operatorLower !== 'and' && operatorLower !== 'or') {
            invalidOperatorParam(operator);
        }

        this._queryOpts.operator = operatorLower;
        return this;
    }

    /**
     * Sets the `lenient` parameter which allows to ignore exceptions caused
     * by data-type mismatches such as trying to query a numeric field with a
     * text query string when set to `true`.
     *
     * @param {boolean} enable Defaules to `false`
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    lenient(enable) {
        this._queryOpts.lenient = enable;
        return this;
    }

    /**
     * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
     * the number of one character changes that need to be made to one string to make it
     * the same as another string.
     *
     * @param {number|string} factor Can be specified either as a number, or the maximum
     * number of edits, or as `AUTO` which generates an edit distance based on the length
     * of the term.
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    fuzziness(factor) {
        this._queryOpts.fuzziness = factor;
        return this;
    }

    /**
     * Sets the prefix length for a fuzzy prefix `MatchQuery`
     *
     * @param {number} len
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    prefixLength(len) {
        this._queryOpts.prefix_length = len;
        return this;
    }

    /**
     * Sets the max expansions for a fuzzy prefix `MatchQuery`
     *
     * @param {number} limit
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    maxExpansions(limit) {
        this._queryOpts.max_expansions = limit;
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
     * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
     * `constant_score_filter` (synonyms for `constant_score`) have been removed
     * in elasticsearch 6.0.
     *
     * This is an advanced option, use with care.
     *
     * @param {string} method The rewrite method as a string.
     * @returns {MatchQuery} returns `this` so that calls can be chained.
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
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
     */
    fuzzyRewrite(method) {
        validateRewiteMethod(method, 'fuzzy_rewrite', ES_REF_URL);

        this._queryOpts.fuzzy_rewrite = method;
        return this;
    }

    /**
     * Fuzzy transpositions (`ab` → `ba`) are allowed by default but can be disabled
     * by setting `fuzzy_transpositions` to false.
     * @param {boolean} enable
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    fuzzyTranspositions(enable) {
        this._queryOpts.fuzzy_transpositions = enable;
        return this;
    }

    /**
     * If the analyzer used removes all tokens in a query like a `stop` filter does,
     * the default behavior is to match no documents at all. In order to change that
     * the `zero_terms_query` option can be used, which accepts `none` (default) and `all`
     * which corresponds to a `match_all` query.
     *
     * @example
     * const qry = esb.matchQuery('message', 'to be or not to be')
     *     .operator('and')
     *     .zeroTermsQuery('all');
     *
     * @param {string} behavior A no match action, `all` or `none`. Default is `none`.
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    zeroTermsQuery(behavior) {
        if (isNil(behavior)) invalidZeroTermsQueryParam(behavior);

        const behaviorLower = behavior.toLowerCase();
        if (behaviorLower !== 'all' && behaviorLower !== 'none') {
            invalidZeroTermsQueryParam(behavior);
        }

        this._queryOpts.zero_terms_query = behaviorLower;
        return this;
    }

    /**
     * Allows specifying an absolute or relative document frequency where high frequency
     * terms are moved into an optional subquery and are only scored if one of the
     * low frequency (below the cutoff) terms in the case of an `or` operator or
     * all of the low frequency terms in the case of an `and` operator match.
     *
     * @example
     * const qry = esb.matchQuery('message', 'to be or not to be')
     *     .cutoffFrequency(0.001);
     *
     * @param {number} frequency It can either be relative to the total number of documents
     * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
     * @returns {MatchQuery} returns `this` so that calls can be chained.
     */
    cutoffFrequency(frequency) {
        this._queryOpts.cutoff_frequency = frequency;
        return this;
    }
}

module.exports = MatchQuery;
