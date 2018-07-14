'use strict';

const isNil = require('lodash.isnil');

const {
    MatchAllQuery,
    termLevelQueries: { ExistsQuery },
    compoundQueries: {
        BoolQuery,
        FunctionScoreQuery,
        scoreFunctions: { RandomScoreFunction }
    }
} = require('./queries');

const {
    Query,
    util: { checkType }
} = require('./core');

/**
 * Recipe for the now removed `missing` query.
 *
 * Can be accessed using `esb.recipes.missingQuery` OR `esb.cookMissingQuery`.
 *
 * [Elasticsearch refererence](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html#_literal_missing_literal_query)
 *
 * @example
 * const qry = esb.cookMissingQuery('user');
 *
 * qry.toJSON();
 * {
 *   "bool": {
 *     "must_not": {
 *       "exists": {
 *         "field": "user"
 *       }
 *     }
 *   }
 * }
 *
 * @param {string} field The field which should be missing the value.
 * @returns {BoolQuery} A boolean query with a `must_not` `exists` clause is returned.
 */
exports.missingQuery = function missingQuery(field) {
    return new BoolQuery().mustNot(new ExistsQuery(field));
};

/**
 * Recipe for random sort query. Takes a query and returns the same
 * wrapped in a random scoring query.
 *
 * Can be accessed using `esb.recipes.randomSortQuery` OR `esb.cookRandomSortQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-random)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.cookRandomSortQuery(esb.rangeQuery('age').gte(10)))
 *     .size(100);
 *
 * reqBody.toJSON();
 * {
 *   "query": {
 *     "function_score": {
 *       "query": {
 *         "range": { "age": { "gte": 10 } }
 *       },
 *       "random_score": {}
 *     }
 *   },
 *   "size": 100
 * }
 *
 * @param {Query=} query The query to fetch documents for. Defaults to `match_all` query.
 * @param {number=} seed A seed value for the random score function.
 * @returns {FunctionScoreQuery} A `function_score` query with random sort applied
 * @throws {TypeError} If `query` is not an instance of `Query`.
 */
exports.randomSortQuery = function randomSortQuery(
    query = new MatchAllQuery(),
    seed
) {
    checkType(query, Query);
    const func = new RandomScoreFunction();
    return new FunctionScoreQuery()
        .query(query)
        .function(isNil(seed) ? func : func.seed(seed));
};

/**
 * Recipe for constructing a filter query using `bool` query.
 * Optionally, scoring can be enabled.
 *
 * Can be accessed using `esb.recipes.filterQuery` OR `esb.cookFilterQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
 *
 * @example
 * const boolQry = esb.cookFilterQuery(esb.termQuery('status', 'active'), true);
 * boolQry.toJSON();
 * {
 *   "bool": {
 *     "must": { "match_all": {} },
 *     "filter": {
 *       "term": { "status": "active" }
 *     }
 *   }
 * }
 *
 * @param {Query} query The query to fetch documents for.
 * @param {boolean=} scoring Optional flag for enabling/disabling scoring. Disabled by default.
 * If enabled, a score of `1.0` will be assigned to all documents.
 * @returns {BoolQuery} A `bool` query with a `filter` clause is returned.
 * @throws {TypeError} If `query` is not an instance of `Query`.
 */
exports.filterQuery = function filterQuery(query, scoring = false) {
    checkType(query, Query);

    const boolQry = new BoolQuery().filter(query);
    return scoring === true ? boolQry.must(new MatchAllQuery()) : boolQry;
};
