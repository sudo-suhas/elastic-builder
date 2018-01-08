'use strict';

const MultiTermQueryBase = require('./multi-term-query-base');

/**
 * The fuzzy query generates all possible matching terms that are within
 * the maximum edit distance specified in `fuzziness` and then checks
 * the term dictionary to find out which of those generated terms
 * actually exist in the index.
 *
 * The fuzzy query uses similarity based on Levenshtein edit distance.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html)
 *
 * @example
 * const qry = esb.fuzzyQuery('user', 'ki');
 *
 * @example
 * // More advanced settings
 * const qry = esb.fuzzyQuery('user', 'ki')
 *     .fuzziness(2)
 *     .prefixLength(0)
 *     .maxExpansions(100)
 *     .boost(1.0);
 *
 * @param {string=} field
 * @param {string|number=} value
 *
 * @extends MultiTermQueryBase
 */
class FuzzyQuery extends MultiTermQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, value) {
        super('fuzzy', field, value);
    }

    /**
     * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
     * the number of one character changes that need to be made to one string to make it
     * the same as another string.
     *
     * @param {number|string} factor Can be specified either as a number, or the maximum
     * number of edits, or as `AUTO` which generates an edit distance based on the length
     * of the term.
     * @returns {FuzzyQuery} returns `this` so that calls can be chained.
     */
    fuzziness(factor) {
        this._queryOpts.fuzziness = factor;
        return this;
    }

    /**
     * The number of initial characters which will not be “fuzzified”.
     * This helps to reduce the number of terms which must be examined. Defaults to `0`.
     *
     * @param {number} len Characters to skip fuzzy for. Defaults to `0`.
     * @returns {FuzzyQuery} returns `this` so that calls can be chained.
     */
    prefixLength(len) {
        this._queryOpts.prefix_length = len;
        return this;
    }

    /**
     * The maximum number of terms that the fuzzy query will expand to. Defaults to `50`.
     *
     * @param {number} limit Limit for fuzzy query expansion. Defaults to `50`.
     * @returns {FuzzyQuery} returns `this` so that calls can be chained.
     */
    maxExpansions(limit) {
        this._queryOpts.max_expansions = limit;
        return this;
    }

    /**
     * Transpositions (`ab` → `ba`) are allowed by default but can be disabled
     * by setting `transpositions` to false.
     *
     * @param {boolean} enable
     * @returns {FuzzyQuery} returns `this` so that calls can be chained.
     */
    transpositions(enable) {
        this._queryOpts.transpositions = enable;
        return this;
    }
}

module.exports = FuzzyQuery;
