'use strict';

const ValueTermQueryBase = require('./value-term-query-base');

/**
 * The `term` query finds documents that contain the *exact* term specified
 * in the inverted index.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)
 *
 * @example
 * const termQry = bob.termQuery('user', 'Kimchy');
 *
 * @extends ValueTermQueryBase
 */
class TermQuery extends ValueTermQueryBase {

    /**
     * Creates an instance of `TermQuery`.
     *
     * @param {string=} field
     * @param {string|number=} queryVal
     */
    constructor(field, queryVal) {
        super('term', field, queryVal);
    }
}

module.exports = TermQuery;
