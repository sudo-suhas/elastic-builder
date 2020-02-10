'use strict';

const isNil = require('lodash.isnil');

const {
    util: { checkType, invalidParam },
    consts: { MULTI_MATCH_TYPE }
} = require('../../core');
const FullTextQueryBase = require('./full-text-query-base');
const { validateRewiteMethod } = require('../helper');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html';

const invalidTypeParam = invalidParam(ES_REF_URL, 'type', MULTI_MATCH_TYPE);
const invalidOperatorParam = invalidParam(
    ES_REF_URL,
    'operator',
    "'and' or 'or'"
);
const invalidBehaviorParam = invalidParam(
    ES_REF_URL,
    'behavior',
    "'all' or 'none'"
);

/**
 * A `MultiMatchQuery` query builds further on top of the
 * `MultiMatchQuery` by allowing multiple fields to be specified.
 * The idea here is to allow to more easily build a concise match type query
 * over multiple fields instead of using a relatively more expressive query
 * by using multiple match queries within a bool query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html)
 *
 * @example
 * const qry = esb.multiMatchQuery(['subject', 'message'], 'this is a test');
 *
 * @param {Array<string>|string=} fields The fields to be queried
 * @param {string=} queryString The query string
 *
 * @extends FullTextQueryBase
 */
class MultiMatchQuery extends FullTextQueryBase {
    // Extremely similar to match query.
    // mixins are one way to go about it.
    // repeating code for now

    // eslint-disable-next-line require-jsdoc
    constructor(fields, queryString) {
        super('multi_match', queryString);

        // This field is required
        // Avoid checking for key in `this.field`
        this._queryOpts.fields = [];

        if (!isNil(fields)) {
            if (Array.isArray(fields)) this.fields(fields);
            else this.field(fields);
        }
    }

    /**
     * Appends given field to the list of fields to search against.
     * Fields can be specified with wildcards.
     * Individual fields can be boosted with the caret (^) notation.
     * Example - `"subject^3"`
     *
     * @param {string} field One of the fields to be queried
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._queryOpts.fields.push(field);
        return this;
    }

    /**
     * Appends given fields to the list of fields to search against.
     * Fields can be specified with wildcards.
     * Individual fields can be boosted with the caret (^) notation.
     *
     * @example
     * // Boost individual fields with caret `^` notation
     * const qry = esb.multiMatchQuery(['subject^3', 'message'], 'this is a test');
     *
     * @example
     * // Specify fields with wildcards
     * const qry = esb.multiMatchQuery(['title', '*_name'], 'Will Smith');
     *
     * @param {Array<string>} fields The fields to be queried
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    fields(fields) {
        checkType(fields, Array);

        this._queryOpts.fields = this._queryOpts.fields.concat(fields);
        return this;
    }

    /**
     * Sets the type of multi match query. Valid values are:
     * - `best_fields` - (default) Finds documents which match any field,
     * but uses the `_score` from the best field.
     *
     * - `most_fields` - Finds documents which match any field and combines
     * the `_score` from each field.
     *
     * - `cross_fields` - Treats fields with the same `analyzer` as though
     * they were one big field. Looks for each word in *any* field
     *
     * - `phrase` - Runs a `match_phrase` query on each field and combines
     * the `_score` from each field.
     *
     * - `phrase_prefix` - Runs a `match_phrase_prefix` query on each field
     * and combines the `_score` from each field.
     *
     * - `bool_prefix` - (added in v7.2) Creates a match_bool_prefix query on each field and
     * combines the _score from each field.
     *
     * @example
     * // Find the single best matching field
     * const qry = esb.multiMatchQuery(['subject', 'message'], 'brown fox')
     *     .type('best_fields')
     *     .tieBreaker(0.3);
     *
     * @example
     * // Query multiple fields analyzed differently for the same text
     * const qry = esb.multiMatchQuery(
     *     ['title', 'title.original', 'title.shingles'],
     *     'quick brown fox'
     * ).type('most_fields');
     *
     * @example
     * // Run a `match_phrase_prefix` query on multiple fields
     * const qry = esb.multiMatchQuery(
     *     ['subject', 'message'],
     *     'quick brown f'
     * ).type('phrase_prefix');
     *
     * @example
     * // All terms must be present in at least one field for document to match
     * const qry = esb.multiMatchQuery(['first_name', 'last_name'], 'Will Smith')
     *     .type('cross_fields')
     *     .operator('and');
     *
     * @param {string} type Can be one of `best_fields`, `most_fields`,
     * `cross_fields`, `phrase`, `phrase_prefix` and `bool_prefix`. Default is
     * `best_fields`.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    type(type) {
        if (isNil(type)) invalidTypeParam(type);

        const typeLower = type.toLowerCase();
        if (!MULTI_MATCH_TYPE.has(typeLower)) invalidTypeParam(type);

        this._queryOpts.type = typeLower;
        return this;
    }

    /**
     * The tie breaker value. The tie breaker capability allows results
     * that include the same term in multiple fields to be judged better than
     * results that include this term in only the best of those multiple
     * fields, without confusing this with the better case of two different
     * terms in the multiple fields. Default: `0.0`.
     *
     * @param {number} factor
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    tieBreaker(factor) {
        this._queryOpts.tie_breaker = factor;
        return this;
    }

    /**
     * The operator to be used in the boolean query which is constructed
     * by analyzing the text provided. The `operator` flag can be set to `or` or
     * `and` to control the boolean clauses (defaults to `or`).
     *
     * @param {string} operator Can be `and`/`or`. Default is `or`.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
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
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    lenient(enable) {
        this._queryOpts.lenient = enable;
        return this;
    }

    // phrase_slop is a synonym for slop.
    // haven't added method for it..

    /**
     * Configures the `slop`(default is 0) for matching terms in any order.
     * Transposed terms have a slop of 2.
     *
     * @param {number} slop A positive integer value, defaults is 0.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    slop(slop) {
        this._queryOpts.slop = slop;
        return this;
    }

    /**
     * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
     * the number of one character changes that need to be made to one string to make it
     * the same as another string.
     *
     * The `fuzziness` parameter cannot be used with the `phrase`, `phrase_prefix`
     * or `cross_fields` type.
     *
     * @param {number|string} factor Can be specified either as a number, or the maximum
     * number of edits, or as `AUTO` which generates an edit distance based on the length
     * of the term.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    fuzziness(factor) {
        this._queryOpts.fuzziness = factor;
        return this;
    }

    /**
     * Sets the prefix length for a fuzzy prefix `MultiMatchQuery`
     *
     * @param {number} len
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    prefixLength(len) {
        this._queryOpts.prefix_length = len;
        return this;
    }

    /**
     * Sets the max expansions for a fuzzy prefix `MultiMatchQuery`
     *
     * @param {number} limit
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
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
     * This is an advanced option, use with care.
     *
     * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
     * `constant_score_filter` (synonyms for `constant_score`) have been removed
     * in elasticsearch 6.0.
     *
     * @param {string} method The rewrite method as a string.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
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
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `fuzzy_rewrite` method is not valid.
     */
    fuzzyRewrite(method) {
        validateRewiteMethod(method, 'fuzzy_rewrite', ES_REF_URL);

        this._queryOpts.fuzzy_rewrite = method;
        return this;
    }

    /**
     * If the analyzer used removes all tokens in a query like a `stop` filter does,
     * the default behavior is to match no documents at all. In order to change that
     * the `zero_terms_query` option can be used, which accepts `none` (default) and `all`
     * which corresponds to a `match_all` query.
     *
     * @param {string} behavior A no match action, `all` or `none`. Default is `none`.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    zeroTermsQuery(behavior) {
        if (isNil(behavior)) invalidBehaviorParam(behavior);

        const behaviorLower = behavior.toLowerCase();
        if (behaviorLower !== 'all' && behaviorLower !== 'none') {
            invalidBehaviorParam(behavior);
        }

        this._queryOpts.zero_terms_query = behavior;
        return this;
    }

    /**
     * Allows specifying an absolute or relative document frequency where high frequency
     * terms are moved into an optional subquery and are only scored if one of the
     * low frequency (below the cutoff) terms in the case of an `or` operator or
     * all of the low frequency terms in the case of an `and` operator match.
     *
     * @param {number} frequency It can either be relative to the total number of documents
     * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
     * @returns {MultiMatchQuery} returns `this` so that calls can be chained.
     */
    cutoffFrequency(frequency) {
        this._queryOpts.cutoff_frequency = frequency;
        return this;
    }
}

module.exports = MultiMatchQuery;
