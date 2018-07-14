'use strict';

const {
    util: { checkType }
} = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Matches the union of its span clauses. The span or query maps to Lucene `SpanOrQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-or-query.html)
 *
 * @example
 * const spanQry = esb.spanOrQuery()
 *     .clauses([
 *         esb.spanTermQuery('field', 'value1'),
 *         esb.spanTermQuery('field', 'value2'),
 *         esb.spanTermQuery('field', 'value3')
 *     ]);
 *
 * @extends SpanQueryBase
 */
class SpanOrQuery extends SpanQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('span_or');
    }

    /**
     * Sets the clauses element which is a list of one or more other span type queries.
     *
     * @param {Array<SpanQueryBase>} clauses
     * @returns {SpanOrQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
     * any member of the array is not an instance of `SpanQueryBase`.
     */
    clauses(clauses) {
        checkType(clauses, Array);
        clauses.forEach(clause => checkType(clause, SpanQueryBase));

        this._queryOpts.clauses = clauses;
        return this;
    }
}

module.exports = SpanOrQuery;
