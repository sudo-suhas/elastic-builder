'use strict';

const isNil = require('lodash.isnil');

const { Query } = require('../../core');

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

    // eslint-disable-next-line require-jsdoc
    constructor(queryType, queryString) {
        super(queryType);

        if (!isNil(queryString)) this._queryOpts.query = queryString;
    }

    /**
     * Set the analyzer to control which analyzer will perform the analysis process on the text
     *
     * @example
     * const qry = esb.matchPhraseQuery('message', 'this is a test')
     *     .analyzer('my_analyzer');
     *
     * @example
     * const qry = esb.multiMatchQuery(['first', 'last', '*.edge'], 'Jon')
     *     .type('cross_fields')
     *     .analyzer('standard');
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
     * @example
     * const qry = esb.commonTermsQuery('body', 'nelly the elephant as a cartoon')
     *     .minimumShouldMatch(2)
     *     .cutoffFrequency(0.001);
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
     * @example
     * const qry = esb.queryStringQuery()
     *     .query('city.\\*:(this AND that OR thus)')
     *     .useDisMax(true);
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
