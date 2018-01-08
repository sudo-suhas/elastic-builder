'use strict';

const { Query } = require('../core');

/**
 * The most simple query, which matches all documents, giving them all a `_score` of `1.0`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
 *
 * @example
 * const qry = esb.matchAllQuery().boost(1.2);
 *
 * @extends Query
 */
class MatchAllQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('match_all');
    }
}

module.exports = MatchAllQuery;
