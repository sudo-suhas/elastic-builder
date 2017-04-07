'use strict';

const { inspect } = require('util');

const _ = require('lodash');

const {
    Query,
    InnerHits,
    util: { checkType },
    consts: { NESTED_SCORE_MODE_SET }
} = require('../../core');

/**
 * The `JoiningQueryBase` provides support for common options used across
 * various joining query implementations.
 *
 * @extends Query
 */
class JoiningQueryBase extends Query {

    /**
     * Creates an instance of `JoiningQueryBase`
     *
     * @param {string} type
     * @param {Query=} qry A valid `Query` object
     */
    constructor(type, refUrl, qry) {
        super(type);
        this.refUrl = refUrl;

        if (!_.isNil(qry)) this.query(qry);
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
     * @param {string} mode Can be one of `none`, `sum`, `min`, `max`, `avg`.
     * Defaults to `avg` for `NestedQuery`, `none` for `HasChildQuery`.
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */
    scoreMode(mode) {
        if (!NESTED_SCORE_MODE_SET.has(mode)) {
            console.log(`See ${this.refUrl}`);
            console.warn(`Got 'score_mode' - ${mode}`);
            throw new Error(
                `The 'score_mode' parameter should belong to ${inspect(NESTED_SCORE_MODE_SET)}`
            );
        }

        this._queryOpts.score_mode = mode;
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
        checkType(InnerHits);

        this._queryOpts.inner_hits = innerHits;
        return this;
    }

}

module.exports = JoiningQueryBase;
