'use strict';

const isNil = require('lodash.isnil');

const {
    util: { checkType }
} = require('../../core');

const { Query } = require('../../core');

/**
 * Filters documents that have fields that match any of the provided terms (**not analyzed**).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)
 *
 * @example
 * const qry = esb.constantScoreQuery(
 *     esb.termsQuery('user', ['kimchy', 'elasticsearch'])
 * );
 *
 * @example
 * const qry = esb.termsQuery('user')
 *     .index('users')
 *     .type('user')
 *     .id(2)
 *     .path('followers');
 *
 * @param {string=} field
 * @param {Array|string|number|boolean=} values
 *
 * @extends Query
 */
class TermsQuery extends Query {
    // TODO: The DSL is a mess. Think about cleaning up some.

    // eslint-disable-next-line require-jsdoc
    constructor(field, values) {
        super('terms');

        // Default assume user is not insane
        this._isTermsLookup = false;
        this._termsLookupOpts = {};
        this._values = [];

        if (!isNil(field)) this._field = field;
        if (!isNil(values)) {
            if (Array.isArray(values)) this.values(values);
            else this.value(values);
        }
    }

    /**
     * Private helper function to set a terms lookup option.
     *
     * @private
     * @param {string} key
     * @param {string|number|boolean} val
     */
    _setTermsLookupOpt(key, val) {
        this._isTermsLookup = true;
        this._termsLookupOpts[key] = val;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {TermsQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Append given value to list of values to run Terms Query with.
     *
     * @param {string|number|boolean} value
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    value(value) {
        this._values.push(value);
        return this;
    }

    /**
     * Specifies the values to run query for.
     *
     * @param {Array<string|number|boolean>} values Values to run query for.
     * @returns {TermsQuery} returns `this` so that calls can be chained
     * @throws {TypeError} If `values` is not an instance of Array
     */
    values(values) {
        checkType(values, Array);

        this._values = this._values.concat(values);
        return this;
    }

    /**
     * Convenience method for setting term lookup options.
     * Valid options are `index`, `type`, `id`, `path`and `routing`
     *
     * @param {Object} lookupOpts An object with any of the keys `index`,
     * `type`, `id`, `path` and `routing`.
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    termsLookup(lookupOpts) {
        checkType(lookupOpts, Object);

        this._isTermsLookup = true;
        Object.assign(this._termsLookupOpts, lookupOpts);
        return this;
    }

    /**
     * The index to fetch the term values from. Defaults to the current index.
     *
     * Note: The `index` parameter in the terms filter, used to look up terms in
     * a dedicated index is mandatory in elasticsearch 6.0. Previously, the
     * index defaulted to the index the query was executed on. In 6.0, this
     * index must be explicitly set in the request.
     *
     * @param {string} idx The index to fetch the term values from.
     * Defaults to the current index.
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    index(idx) {
        this._setTermsLookupOpt('index', idx);
        return this;
    }

    /**
     * The type to fetch the term values from.
     *
     * @param {string} type
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    type(type) {
        this._setTermsLookupOpt('type', type);
        return this;
    }

    /**
     * The id of the document to fetch the term values from.
     *
     * @param {string} id
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    id(id) {
        this._setTermsLookupOpt('id', id);
        return this;
    }

    /**
     * The field specified as path to fetch the actual values for the `terms` filter.
     *
     * @param {string} path
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    path(path) {
        this._setTermsLookupOpt('path', path);
        return this;
    }

    /**
     * A custom routing value to be used when retrieving the external terms doc.
     *
     * @param {string} routing
     * @returns {TermsQuery} returns `this` so that calls can be chained
     */
    routing(routing) {
        this._setTermsLookupOpt('routing', routing);
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the `terms` query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be required here.
        return {
            [this.queryType]: Object.assign({}, this._queryOpts, {
                [this._field]: this._isTermsLookup
                    ? this._termsLookupOpts
                    : this._values
            })
        };
    }
}

module.exports = TermsQuery;
