'use strict';

const MonoFieldQueryBase = require('./mono-field-query-base');

/**
 * The `MatchPhraseQueryBase` provides support for common options used across
 * various bucket match phrase query implementations.
 *
 * @extends MonoFieldQueryBase
 */
class MatchPhraseQueryBase extends MonoFieldQueryBase {
    /**
     * Creates an instance of `MatchPhraseQueryBase`
     *
     * @param {string} queryType
     * @param {string} refUrl
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    constructor(queryType, refUrl, field, queryString) {
        super(queryType, field, queryString);

        this._refUrl = refUrl;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on `MatchPhraseQueryBase`
     */
    minimumShouldMatch() {
        console.log(`Please refer ${this._refUrl}`);
        throw new Error('`minimum_should_match` is not supported in ${this.constructor.name}');
    }

    /**
     * Configures the `slop`(default is 0) for matching terms in any order.
     * Transposed terms have a slop of 2.
     *
     * @param {number} slop A positive integer value, defaults is 0.
     * @returns {MatchPhraseQueryBase} returns `this` so that calls can be chained.
     */
    slop(slop) {
        this._queryOpts.slop = slop;
        return this;
    }
}

module.exports = MatchPhraseQueryBase;
