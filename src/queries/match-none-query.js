'use strict';

const { Query } = require('../core');

/**
 * The inverse of the `match_all` query, which matches no documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
 *
 * @extends Query
 */
class MatchNoneQuery extends Query {
    /**
     * Creates an instance of `MatchNoneQuery`
     */
    constructor() {
        super('match_none');
    }
}

module.exports = MatchNoneQuery;
