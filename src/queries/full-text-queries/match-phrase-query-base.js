'use strict';

const MonoFieldQueryBase = require('./mono-field-query-base');

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
 *
 * @extends MonoFieldQueryBase
 */
class MatchPhraseQueryBase extends MonoFieldQueryBase {
    // eslint-disable-next-line require-jsdoc
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
        throw new Error(
            `minimumShouldMatch is not supported in ${this.constructor.name}`
        );
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
