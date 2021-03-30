'use strict';

const MultiTermQueryBase = require('./multi-term-query-base');
const { validateRewiteMethod } = require('../helper');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html';

/**
 * Query for regular expression term queries. Elasticsearch will apply the regexp
 * to the terms produced by the tokenizer for that field, and not to the original
 * text of the field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html)
 *
 * @example
 * const qry = esb.regexpQuery('name.first', 's.*y').boost(1.2);
 *
 * @param {string=} field
 * @param {string|number=} value
 *
 * @extends MultiTermQueryBase
 */
class RegexpQuery extends MultiTermQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, value) {
        super('regexp', field, value);
    }

    /**
     * Set special flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     *
     * @example
     * const qry = esb.regexpQuery('name.first', 's.*y')
     *     .flags('INTERSECTION|COMPLEMENT|EMPTY');
     *
     * @param {string} flags `|` separated flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     * @returns {RegexpQuery} returns `this` so that calls can be chained.
     */
    flags(flags) {
        this._queryOpts.flags = flags;
        return this;
    }

    /**
     * Allow case insensitive matching or not (added in 7.10.0).
     * Defaults to false.
     *
     * @example
     * const qry = esb.regexpQuery('name.first', 's.*y')
     *     .caseInsensitive(true);
     *
     * @param {boolean} caseInsensitive
     * @returns {RegexpQuery} returns `this` so that calls can be chained.
     */
    caseInsensitive(caseInsensitive) {
        this._queryOpts.case_insensitive = caseInsensitive;
        return this;
    }

    /**
     * Limit on how many automaton states regexp queries are allowed to create.
     * This protects against too-difficult (e.g. exponentially hard) regexps.
     * Defaults to 10000.
     *
     * @example
     * const qry = esb.regexpQuery('name.first', 's.*y')
     *     .flags('INTERSECTION|COMPLEMENT|EMPTY')
     *     .maxDeterminizedStates(20000);
     *
     * @param {number} limit
     * @returns {RegexpQuery} returns `this` so that calls can be chained.
     */
    maxDeterminizedStates(limit) {
        this._queryOpts.max_determinized_states = limit;
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
     * @returns {RegexpQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `rewrite` method is not valid.
     */
    rewrite(method) {
        validateRewiteMethod(method, 'rewrite', ES_REF_URL);

        this._queryOpts.rewrite = method;
        return this;
    }
}

module.exports = RegexpQuery;
