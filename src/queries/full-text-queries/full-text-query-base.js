'use strict';

const isNil = require('lodash.isnil');

const { Query } = require('../../core');

/**
 * The `FullTextQueryBase` provides support for common options used across
 * various full text query implementations.
 *
 * @extends Query
 */
class FullTextQueryBase extends Query {
    /*
        Common options:
        analyzer - applicable on all
        minimum_should_match - applicable on all except Match Phrase and Match Phrase Prefix
        query - applicable on all
    */

    /**
     * Creates and instance of `FullTextQueryBase`
     *
     * @param {string} queryType
     * @param {string=} queryString The query string
     */
    constructor(queryType, queryString) {
        super(queryType);

        if (!isNil(queryString)) this._queryOpts.query = queryString;
    }

    /**
     * Set the analyzer to control which analyzer will perform the analysis process on the text
     *
     * @param {string} analyzer
     * @returns {FullTextQueryBase} returns `this` so that calls can be chained.
     */
    analyzer(analyzer) {
        this._queryOpts.analyzer = analyzer;
        return this;
    }

    /**
     * Sets the value controlling how many "should" clauses in the resulting boolean
     * query should match. It can be an absolute value (2), a percentage (30%)
     * or a combination of both. For Common Terms Query when specifying different
     * `minimum_should_match` for low and high frequency terms, an object with the
     * keys `low_freq` and `high_freq` can be used.
     *
     * @param {string|number|Object} minimumShouldMatch
     * Note: Object notation can only be used with Common Terms Query.
     * @returns {FullTextQueryBase} returns `this` so that calls can be chained.
     */
    minimumShouldMatch(minimumShouldMatch) {
        this._queryOpts.minimum_should_match = minimumShouldMatch;
        return this;
    }

    /**
     * Sets the query string.
     *
     * @param {string} queryString
     * @returns {FullTextQueryBase} returns `this` so that calls can be chained.
     */
    query(queryString) {
        this._queryOpts.query = queryString;
        return this;
    }
}

module.exports = FullTextQueryBase;
