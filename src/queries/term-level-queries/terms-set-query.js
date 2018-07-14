'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * Returns any documents that match with at least one or more of the provided
 * terms. The terms are not analyzed and thus must match exactly. The number of
 * terms that must match varies per document and is either controlled by a
 * minimum should match field or computed per document in a minimum should match
 * script.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html)
 *
 * NOTE: This query was added in elasticsearch v6.1.
 *
 * @example
 * const qry = esb.termsSetQuery('codes', ['abc', 'def', 'ghi'])
 *     .minimumShouldMatchField('required_matches')
 *
 * @param {string=} field
 * @param {Array<string|number|boolean>|string|number=} terms
 *
 * @extends Query
 */
class TermsSetQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(field, terms) {
        super('terms_set');

        this._queryOpts.terms = [];

        if (!isNil(field)) this._field = field;
        if (!isNil(terms)) {
            if (Array.isArray(terms)) this.terms(terms);
            else this.term(terms);
        }
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {TermsSetQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Append given term to set of terms to run Terms Set Query with.
     *
     * @param {string|number|boolean} term
     * @returns {TermsSetQuery} returns `this` so that calls can be chained
     */
    term(term) {
        this._queryOpts.terms.push(term);
        return this;
    }

    /**
     * Specifies the terms to run query for.
     *
     * @param {Array<string|number|boolean>} terms Terms set to run query for.
     * @returns {TermsSetQuery} returns `this` so that calls can be chained
     * @throws {TypeError} If `terms` is not an instance of Array
     */
    terms(terms) {
        checkType(terms, Array);

        this._queryOpts.terms = this._queryOpts.terms.concat(terms);
        return this;
    }

    /**
     * Controls the number of terms that must match per document.
     *
     * @param {string} fieldName
     * @returns {TermsSetQuery} returns `this` so that calls can be chained
     */
    minimumShouldMatchField(fieldName) {
        this._queryOpts.minimum_should_match_field = fieldName;
        return this;
    }

    /**
     * Sets the `script` for query. It controls how many terms are required to
     * match in a more dynamic way.
     *
     * The `params.num_terms` parameter is available in the script to indicate
     * the number of terms that have been specified.
     *
     * @example
     * const qry = esb.termsSetQuery('codes', ['abc', 'def', 'ghi'])
     *     .minimumShouldMatchScript({
     *         source: "Math.min(params.num_terms, doc['required_matches'].value)"
     *     })
     *
     * @param {Script|string|Object} script
     * @returns {ScriptQuery} returns `this` so that calls can be chained.
     */
    minimumShouldMatchScript(script) {
        this._queryOpts.minimum_should_match_script = script;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the term level query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return {
            [this.queryType]: { [this._field]: this._queryOpts }
        };
    }
}

module.exports = TermsSetQuery;
