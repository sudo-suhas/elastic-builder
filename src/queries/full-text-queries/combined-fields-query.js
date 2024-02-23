'use strict';

const isNil = require('lodash.isnil');

const {
    util: { checkType, invalidParam }
} = require('../../core');
const FullTextQueryBase = require('./full-text-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-combined-fields-query.html';

const invalidOperatorParam = invalidParam(
    ES_REF_URL,
    'operator',
    "'and' or 'or'"
);
const invalidZeroTermsQueryParam = invalidParam(
    ES_REF_URL,
    'zero_terms_query',
    "'all' or 'none'"
);

/**
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-combined-fields-query.html)
 *
 * @example
 * const qry = esb.combinedFieldsQuery(['subject', 'message'], 'this is a test');
 *
 * @param {Array<string>|string=} fields The fields to be queried
 * @param {string=} queryString The query string
 *
 * @extends FullTextQueryBase
 */
class CombinedFieldsQuery extends FullTextQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(fields, queryString) {
        super('combined_fields', queryString);

        // This field is required
        // Avoid checking for key in `this.field`
        this._queryOpts.fields = [];

        if (!isNil(fields)) {
            if (Array.isArray(fields)) this.fields(fields);
            else this.field(fields);
        }
    }

    /**
     * Appends given field to the list of fields to search against.
     * Fields can be specified with wildcards.
     * Individual fields can be boosted with the caret (^) notation.
     * Example - `"subject^3"`
     *
     * @param {string} field One of the fields to be queried
     * @returns {CombinedFieldsQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._queryOpts.fields.push(field);
        return this;
    }

    /**
     * Appends given fields to the list of fields to search against.
     * Fields can be specified with wildcards.
     * Individual fields can be boosted with the caret (^) notation.
     *
     * @example
     * // Boost individual fields with caret `^` notation
     * const qry = esb.combinedFieldsQuery(['subject^3', 'message'], 'this is a test');
     *
     * @example
     * // Specify fields with wildcards
     * const qry = esb.combinedFieldsQuery(['title', '*_name'], 'Will Smith');
     *
     * @param {Array<string>} fields The fields to be queried
     * @returns {CombinedFieldsQuery} returns `this` so that calls can be chained.
     */
    fields(fields) {
        checkType(fields, Array);

        this._queryOpts.fields = this._queryOpts.fields.concat(fields);
        return this;
    }

    /**
     * If true, match phrase queries are automatically created for multi-term synonyms.
     *
     * @param {boolean} enable Defaults to `true`
     * @returns {CombinedFieldsQuery} returns `this` so that calls can be chained.
     */
    autoGenerateSynonymsPhraseQuery(enable) {
        this._queryOpts.auto_generate_synonyms_phrase_query = enable;
        return this;
    }

    /**
     * The operator to be used in the boolean query which is constructed
     * by analyzing the text provided. The `operator` flag can be set to `or` or
     * `and` to control the boolean clauses (defaults to `or`).
     *
     * @param {string} operator Can be `and`/`or`. Default is `or`.
     * @returns {CombinedFieldsQuery} returns `this` so that calls can be chained.
     */
    operator(operator) {
        if (isNil(operator)) invalidOperatorParam(operator);

        const operatorLower = operator.toLowerCase();
        if (operatorLower !== 'and' && operatorLower !== 'or') {
            invalidOperatorParam(operator);
        }

        this._queryOpts.operator = operatorLower;
        return this;
    }

    /**
     * If the analyzer used removes all tokens in a query like a `stop` filter does,
     * the default behavior is to match no documents at all. In order to change that
     * the `zero_terms_query` option can be used, which accepts `none` (default) and `all`
     * which corresponds to a `match_all` query.
     *
     * @example
     * const qry = esb.combinedFieldsQuery('message', 'to be or not to be')
     *     .operator('and')
     *     .zeroTermsQuery('all');
     *
     * @param {string} behavior A no match action, `all` or `none`. Default is `none`.
     * @returns {CombinedFieldsQuery} returns `this` so that calls can be chained.
     */
    zeroTermsQuery(behavior) {
        if (isNil(behavior)) invalidZeroTermsQueryParam(behavior);

        const behaviorLower = behavior.toLowerCase();
        if (behaviorLower !== 'all' && behaviorLower !== 'none') {
            invalidZeroTermsQueryParam(behavior);
        }

        this._queryOpts.zero_terms_query = behaviorLower;
        return this;
    }
}

module.exports = CombinedFieldsQuery;
