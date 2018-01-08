'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    InnerHits,
    util: { checkType, invalidParam },
    consts: { NESTED_SCORE_MODE_SET }
} = require('../../core');

const invalidScoreModeParam = invalidParam(
    '',
    'score_mode',
    NESTED_SCORE_MODE_SET
);
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
 *
 * @extends Query
 */
class JoiningQueryBase extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType, refUrl, qry) {
        super(queryType);
        this.refUrl = refUrl;

        if (!isNil(qry)) this.query(qry);
    }

    /**
     * Sets the nested query to be executed.
     *
     * @param {Query} qry A valid `Query` object
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */
    query(qry) {
        checkType(qry, Query);

        this._queryOpts.query = qry;
        return this;
    }

    /**
     * Sets the scoring method.
     *
     * Valid values are:
     * - `none` - no scoring
     * - `max` - the highest score of all matched child documents is used
     * - `min` - the lowest score of all matched child documents is used
     * - `sum` - the sum the all the matched child documents is used
     * - `avg` - the default, the average of all matched child documents is used
     *
     * @example
     * const qry = esb.hasChildQuery(
     *     esb.termQuery('tag', 'something'),
     *     'blog_tag'
     * ).scoreMode('min');
     *
     * @param {string} mode Can be one of `none`, `sum`, `min`, `max`, `avg`.
     * Defaults to `avg` for `NestedQuery`, `none` for `HasChildQuery`.
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */
    scoreMode(mode) {
        if (isNil(mode)) invalidScoreModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (!NESTED_SCORE_MODE_SET.has(modeLower)) {
            invalidScoreModeParam(mode);
        }

        this._queryOpts.score_mode = modeLower;
        return this;
    }

    /**
     * When set to `true` will ignore an unmapped `path` and will not match any
     * documents for this query. When set to `false` (the default value) the query
     * will throw an exception if the path is not mapped.
     *
     * @param {boolean} enable `true` or `false`, `false` by default.
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */
    ignoreUnmapped(enable) {
        this._queryOpts.ignore_unmapped = enable;
        return this;
    }

    /**
     * Sets the inner hits options
     *
     * @param {InnerHits} innerHits A valid `InnerHits` object
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */
    innerHits(innerHits) {
        checkType(innerHits, InnerHits);

        this._queryOpts.inner_hits = innerHits;
        return this;
    }
}

module.exports = JoiningQueryBase;
