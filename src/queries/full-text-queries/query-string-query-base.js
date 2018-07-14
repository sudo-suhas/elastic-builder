'use strict';

const isNil = require('lodash.isnil');

const {
    util: { checkType, setDefault, invalidParam }
} = require('../../core');
const FullTextQueryBase = require('./full-text-query-base');

const invalidOperatorParam = invalidParam('', 'operator', "'AND' or 'OR'");

/**
 * The `QueryStringQueryBase` provides support for common options used across
 * full text query implementations `QueryStringQuery` and `SimpleQueryStringQuery`.
 * A query that uses a query parser in order to parse its content.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html)
 *
 * @param {string} queryType
 * @param {string} refUrl
 * @param {string=} queryString The actual query to be parsed.
 *
 * @extends FullTextQueryBase
 */
class QueryStringQueryBase extends FullTextQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType, refUrl, queryString) {
        super(queryType, queryString);

        this._refUrl = refUrl;
    }

    /**
     * Appends given field to the list of fields to search against.
     * Fields can be specified with wildcards.
     *
     * Individual fields can be boosted with the caret (^) notation.
     * Example - `"subject^3"`
     *
     * @example
     * const qry = esb.queryStringQuery('this AND that OR thus')
     *     .field('city.*')
     *     .useDisMax(true);
     *
     * @example
     * const qry = esb.simpleQueryStringQuery('foo bar -baz').field('content');
     *
     * @param {string} field One of the fields to be queried
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    field(field) {
        setDefault(this._queryOpts, 'fields', []);

        this._queryOpts.fields.push(field);
        return this;
    }

    /**
     * Appends given fields to the list of fields to search against.
     * Fields can be specified with wildcards.
     *
     * Individual fields can be boosted with the caret (^) notation.
     * Example - `[ "subject^3", "message" ]`
     *
     * @example
     * const qry = esb.queryStringQuery('this AND that')
     *     .fields(['content', 'name'])
     *
     * @example
     * const qry = esb.simpleQueryStringQuery('foo bar baz')
     *     .fields(['content', 'name.*^5']);
     *
     * @param {Array<string>} fields The fields to be queried
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    fields(fields) {
        checkType(fields, Array);
        setDefault(this._queryOpts, 'fields', []);

        this._queryOpts.fields = this._queryOpts.fields.concat(fields);
        return this;
    }

    /**
     * The default operator used if no explicit operator is specified.
     * For example, with a default operator of `OR`, the query `capital of Hungary`
     * is translated to `capital OR of OR Hungary`, and with default operator of AND,
     * the same query is translated to `capital AND of AND Hungary`.
     * The default value is OR.
     *
     * @param {string} operator Can be `AND`/`OR`. Default is `OR`.
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    defaultOperator(operator) {
        if (isNil(operator)) invalidOperatorParam(operator, this._refUrl);

        const operatorUpper = operator.toUpperCase();
        if (operatorUpper !== 'AND' && operatorUpper !== 'OR') {
            invalidOperatorParam(operator, this._refUrl);
        }

        this._queryOpts.default_operator = operatorUpper;
        return this;
    }

    /**
     * By default, wildcards terms in a query string are not analyzed.
     * By setting this value to `true`, a best effort will be made to analyze those as well.
     *
     * @param {boolean} enable
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    analyzeWildcard(enable) {
        this._queryOpts.analyze_wildcard = enable;
        return this;
    }

    /**
     * Sets the `lenient` parameter which allows to ignore exceptions caused
     * by data-type mismatches such as trying to query a numeric field with a
     * text query string when set to `true`.
     *
     * @param {boolean} enable Defaules to `false`
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    lenient(enable) {
        this._queryOpts.lenient = enable;
        return this;
    }

    /**
     * A suffix to append to fields for quoted parts of the query string.
     * This allows to use a field that has a different analysis chain for exact matching.
     *
     * @param {string} suffix
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    quoteFieldSuffix(suffix) {
        this._queryOpts.quote_field_suffix = suffix;
        return this;
    }

    /**
     * Perform the query on all fields detected in the mapping that can be queried.
     * Will be used by default when the `_all` field is disabled and
     * no `default_field` is specified (either in the index settings or
     * in the request body) and no `fields` are specified.
     * @param {boolean} enable
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */
    allFields(enable) {
        this._queryOpts.all_fields = enable;
        return this;
    }
}

module.exports = QueryStringQueryBase;
