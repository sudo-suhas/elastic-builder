'use strict';

const {
    Query,
    Script,
    util: { checkType }
} = require('../../core');

const TermsAggregationBase = require('./terms-aggregation-base');

/**
 * The `SignificantAggregationBase` provides support for common options used
 * in `SignificantTermsAggregation` and `SignificantTextAggregation`.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends TermsAggregationBase
 */
class SignificantAggregationBase extends TermsAggregationBase {
    /**
     * Use JLH score as significance score.
     *
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    jlh() {
        // I am guessing here
        // Reference is not clear on usage
        this._aggsDef.jlh = {};
        return this;
    }

    /**
     * Use `mutual_information` as significance score
     *
     * @param {boolean=} includeNegatives Default `true`. If set to `false`,
     * filters out the terms that appear less often in the subset than in
     * documents outside the subset
     * @param {boolean=} backgroundIsSuperset `true`(default) if the documents in the bucket
     * are also contained in the background. If instead you defined a custom background filter
     * that represents a different set of documents that you want to compare to, pass `false`
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    mutualInformation(includeNegatives = true, backgroundIsSuperset = true) {
        this._aggsDef.mutual_information = {
            include_negatives: includeNegatives,
            background_is_superset: backgroundIsSuperset
        };
        return this;
    }

    /**
     * Use `chi_square` as significance score
     *
     * @param {boolean} includeNegatives Default `true`. If set to `false`,
     * filters out the terms that appear less often in the subset than in
     * documents outside the subset
     * @param {boolean} backgroundIsSuperset `true`(default) if the documents in the bucket
     * are also contained in the background. If instead you defined a custom background filter
     * that represents a different set of documents that you want to compare to, pass `false`
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    chiSquare(includeNegatives = true, backgroundIsSuperset = true) {
        this._aggsDef.chi_square = {
            include_negatives: includeNegatives,
            background_is_superset: backgroundIsSuperset
        };
        return this;
    }

    /**
     * Sets `gnd`, google normalized score to be used as significance score.
     *
     * @param {boolean} backgroundIsSuperset `true`(default) if the documents in the bucket
     * are also contained in the background. If instead you defined a custom background filter
     * that represents a different set of documents that you want to compare to, pass `false`
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    gnd(backgroundIsSuperset = true) {
        this._aggsDef.gnd = {
            background_is_superset: backgroundIsSuperset
        };
        return this;
    }

    /**
     * Use a simple calculation of the number of documents in the foreground sample with a term
     * divided by the number of documents in the background with the term. By default this
     * produces a score greater than zero and less than one.
     *
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    percentage() {
        this._aggsDef.percentage = {};
        return this;
    }

    /**
     * Sets script for customized score calculation.
     *
     * @param {Script} script
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    scriptHeuristic(script) {
        checkType(script, Script);

        this._aggsDef.script_heuristic = { script };
        return this;
    }

    /**
     * Sets the `background_filter` to narrow the scope of statistical information
     * for background term frequencies instead of using the entire index.
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *     .query(esb.matchQuery('text', 'madrid'))
     *     .agg(
     *         esb.significantAggregationBase('tags', 'tag').backgroundFilter(
     *             esb.termQuery('text', 'spain')
     *         )
     *     );
     *
     * @param {Query} filterQuery Filter query
     * @returns {SignificantAggregationBase} returns `this` so that calls can be chained
     */
    backgroundFilter(filterQuery) {
        checkType(filterQuery, Query);

        this._aggsDef.background_filter = filterQuery;
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SignificantAggregationBase
     */
    script() {
        console.log(`Please refer ${this._refUrl}`);
        throw new Error(`script is not supported in ${this.constructor.name}`);
    }
}

module.exports = SignificantAggregationBase;
