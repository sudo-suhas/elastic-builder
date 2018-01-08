'use strict';

const has = require('lodash.has');
const isNil = require('lodash.isnil');

const SpanQueryBase = require('./span-query-base');

/**
 * Matches spans containing a term. The span term query maps to Lucene `SpanTermQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-term-query.html)
 *
 * @example
 * const qry = esb.spanTermQuery('user', 'kimchy');
 *
 * @example
 * const qry = esb.spanTermQuery()
 *     .field('user')
 *     .value('kimchy')
 *     .boost(2.0);
 *
 * @param {string=} field The document field to query against
 * @param {string|number=} value The query string
 *
 * @extends SpanQueryBase
 */
class SpanTermQuery extends SpanQueryBase {
    // This is extremely similar to ValueTermQueryBase
    // Maybe rename, move and reuse it?

    // eslint-disable-next-line require-jsdoc
    constructor(field, value) {
        super('span_term');

        if (!isNil(field)) this._field = field;
        if (!isNil(value)) this._queryOpts.value = value;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {SpanTermQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * Sets the query string.
     *
     * @param {string|number} queryVal
     * @returns {SpanTermQuery} returns `this` so that calls can be chained.
     */
    value(queryVal) {
        this._queryOpts.value = queryVal;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the Span term query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be required here.

        // Revisit this.. Smells a little bit
        if (!has(this._queryOpts, 'value')) {
            throw new Error('Value is required for Span term query!');
        }

        const qryOpts =
            Object.keys(this._queryOpts).length === 1
                ? this._queryOpts.value
                : this._queryOpts;
        return {
            [this.queryType]: {
                [this._field]: qryOpts
            }
        };
    }
}

module.exports = SpanTermQuery;
