'use strict';

const isNil = require('lodash.isnil');
const isObject = require('lodash.isobject');

const {
    util: { invalidParam, setDefault }
} = require('../../core');

const MonoFieldQueryBase = require('./mono-field-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html';

const invalidLowFreqOpParam = invalidParam(
    ES_REF_URL,
    'low_freq_operator',
    "'and' or 'or'"
);
const invalidHighFreqOpParam = invalidParam(
    ES_REF_URL,
    'high_freq_operator',
    "'and' or 'or'"
);

/**
 * The `common` terms query is a modern alternative to stopwords which
 * improves the precision and recall of search results (by taking
 * stopwords into account), without sacrificing performance.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-common-terms-query.html)
 *
 * @example
 * const qry = esb.commonTermsQuery('body','this is bonsai cool')
 *     .cutoffFrequency(0.001);
 *
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends MonoFieldQueryBase
 */
class CommonTermsQuery extends MonoFieldQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, queryString) {
        super('common', field, queryString);
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */
    _warn(msg) {
        console.warn(`[CommonTermsQuery] ${msg}`);
    }

    /**
     * Print warning messages to not mix Geo Point representations
     * @private
     */
    _warnMixedRepr() {
        this._warn('Do not mix with other representation!');
        this._warn('Overwriting.');
    }

    /**
     * Check the instance for object representation of Geo Point.
     * If representation is null, new object is initialised.
     * If it is not null, warning is logged and point is overwritten.
     * @private
     */
    _checkMinMatchRepr() {
        if (
            !setDefault(this._queryOpts, 'minimum_should_match', {}) &&
            !isObject(this._queryOpts.minimum_should_match)
        ) {
            this._warnMixedRepr();
            this._queryOpts.minimum_should_match = {};
        }
    }

    /**
     * Allows specifying an absolute or relative document frequency where high frequency
     * terms are moved into an optional subquery and are only scored if one of the
     * low frequency (below the cutoff) terms in the case of an `or` operator or
     * all of the low frequency terms in the case of an `and` operator match.
     *
     * @param {number} frequency It can either be relative to the total number of documents
     * if in the range `[0..1)` or absolute if greater or equal to `1.0`.
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    cutoffFrequency(frequency) {
        this._queryOpts.cutoff_frequency = frequency;
        return this;
    }

    /**
     * The operator to be used on low frequency terms in the boolean query
     * which is constructed by analyzing the text provided. The `operator` flag
     * can be set to `or` or `and` to control the boolean clauses (defaults to `or`).
     *
     * @example
     * const qry = esb.commonTermsQuery('body', 'nelly the elephant as a cartoon')
     *     .lowFreqOperator('and')
     *     .cutoffFrequency(0.001);
     *
     * @param {string} operator Can be `and`/`or`. Default is `or`.
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    lowFreqOperator(operator) {
        if (isNil(operator)) invalidLowFreqOpParam(operator);

        const operatorLower = operator.toLowerCase();
        if (operatorLower !== 'and' && operatorLower !== 'or') {
            invalidLowFreqOpParam(operator);
        }

        this._queryOpts.low_freq_operator = operatorLower;
        return this;
    }

    /**
     * The operator to be used on high frequency terms in the boolean query
     * which is constructed by analyzing the text provided. The `operator` flag
     * can be set to `or` or `and` to control the boolean clauses (defaults to `or`).
     *
     * @param {string} operator Can be `and`/`or`. Default is `or`.
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    highFreqOperator(operator) {
        if (isNil(operator)) invalidHighFreqOpParam(operator);

        const operatorLower = operator.toLowerCase();
        if (operatorLower !== 'and' && operatorLower !== 'or') {
            invalidHighFreqOpParam(operator);
        }

        this._queryOpts.high_freq_operator = operatorLower;
        return this;
    }

    /**
     * Sets the value controlling how many "should" clauses in the resulting boolean
     * query should match for low frequency terms. It can be an absolute value (2),
     * a percentage (30%) or a combination of both.
     *
     * @example
     * const qry = esb.commonTermsQuery('body', 'nelly the elephant as a cartoon')
     *     .lowFreq(2)
     *     .highFreq(3)
     *     .cutoffFrequency(0.001);
     *
     * @param {string|number} lowFreqMinMatch
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    lowFreq(lowFreqMinMatch) {
        this._checkMinMatchRepr();

        this._queryOpts.minimum_should_match.low_freq = lowFreqMinMatch;
        return this;
    }

    /**
     * Sets the value controlling how many "should" clauses in the resulting boolean
     * query should match for high frequency terms. It can be an absolute value (2),
     * a percentage (30%) or a combination of both.
     *
     * @example
     * const qry = esb.commonTermsQuery('body', 'nelly the elephant as a cartoon')
     *     .lowFreq(2)
     *     .highFreq(3)
     *     .cutoffFrequency(0.001);
     *
     * @param {string|number} highFreqMinMatch
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    highFreq(highFreqMinMatch) {
        this._checkMinMatchRepr();

        this._queryOpts.minimum_should_match.high_freq = highFreqMinMatch;
        return this;
    }

    /**
     * Enables or disables similarity coordinate scoring of documents
     * commoning the `CommonTermsQuery`. Default: `false`.
     *
     * **NOTE**: This has been removed in elasticsearch 6.0. If provided,
     * it will be ignored and a deprecation warning will be issued.
     *
     * @param {boolean} enable
     * @returns {CommonTermsQuery} returns `this` so that calls can be chained.
     */
    disableCoord(enable) {
        this._queryOpts.disable_coord = enable;
        return this;
    }
}

module.exports = CommonTermsQuery;
