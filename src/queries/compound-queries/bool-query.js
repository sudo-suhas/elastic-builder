'use strict';

const has = require('lodash.has');
const head = require('lodash.head');
const omit = require('lodash.omit');

const {
    Query,
    util: { checkType, setDefault, recursiveToJSON }
} = require('../../core');

/**
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene `BooleanQuery`. It is built using one or more
 * boolean clauses, each clause with a typed occurrence.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
 *
 * @example
 * const qry = esb.boolQuery()
 *     .must(esb.termQuery('user', 'kimchy'))
 *     .filter(esb.termQuery('tag', 'tech'))
 *     .mustNot(esb.rangeQuery('age').gte(10).lte(20))
 *     .should([
 *         esb.termQuery('tag', 'wow'),
 *         esb.termQuery('tag', 'elasticsearch')
 *     ])
 *     .minimumShouldMatch(1)
 *     .boost(1.0);
 *
 * @extends Query
 */
class BoolQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('bool');
    }

    /**
     * Add given query to list of queries under given clause.
     *
     * @private
     * @param {string} clause
     * @param {Query} query
     * @throws {TypeError} If query is not an instance of `Query`
     */
    _addQuery(clause, query) {
        checkType(query, Query);

        this._queryOpts[clause].push(query);
    }

    /**
     * Add given query array or query to list of queries under given clause.
     *
     * @private
     * @param {string} clause
     * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
     * @throws {TypeError} If Array item or query is not an instance of `Query`
     */
    _addQueries(clause, queries) {
        setDefault(this._queryOpts, clause, []);

        if (Array.isArray(queries))
            queries.forEach(qry => this._addQuery(clause, qry));
        else this._addQuery(clause, queries);
    }

    /**
     * Adds `must` query to boolean container.
     * The clause (query) **must** appear in matching documents and will contribute to the score.
     *
     * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If Array item or query is not an instance of `Query`
     */
    must(queries) {
        this._addQueries('must', queries);
        return this;
    }

    /**
     * Adds `filter` query to boolean container.
     * The clause (query) **must** appear in matching documents. However unlike `must` the score
     * of the query will be ignored. Filter clauses are executed in filter context, meaning that
     * scoring is ignored and clauses are considered for caching.
     *
     * @example
     * // Assign score of `0` to all documents
     * const qry = esb.boolQuery().filter(esb.termQuery('status', 'active'));
     *
     * // Assign a score of `1.0` to all documents
     * const qry = esb.boolQuery()
     *     .must(esb.matchAllQuery())
     *     .filter(esb.termQuery('status', 'active'));
     *
     * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If Array item or query is not an instance of `Query`
     */
    filter(queries) {
        this._addQueries('filter', queries);
        return this;
    }

    /**
     * Adds `must_not` query to boolean container.
     * The clause (query) **must not** appear in the matching documents.
     * Clauses are executed in filter context meaning that scoring is ignored
     * and clauses are considered for caching. Because scoring is ignored,
     * a score of 0 for all documents is returned.
     *
     * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If Array item or query is not an instance of `Query`
     */
    mustNot(queries) {
        this._addQueries('must_not', queries);
        return this;
    }

    /**
     * Adds `should` query to boolean container.
     * The clause (query) **should** appear in the matching document. In a boolean query with
     * no must or filter clauses, one or more should clauses must match a document.
     * The minimum number of should clauses to match can be set using the
     * `minimum_should_match` parameter.
     *
     * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If Array item or query is not an instance of `Query`
     */
    should(queries) {
        this._addQueries('should', queries);
        return this;
    }

    /**
     * Enables or disables similarity coordinate scoring of documents
     * commoning the `CommonTermsQuery`. Default: `false`.
     *
     * **NOTE**: This has been removed in elasticsearch 6.0. If provided,
     * it will be ignored and a deprecation warning will be issued.
     *
     * @param {boolean} enable
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     */
    disableCoord(enable) {
        this._queryOpts.disable_coord = enable;
        return this;
    }

    /**
     * Sets the value controlling how many `should` clauses in the boolean
     * query should match. It can be an absolute value (2), a percentage (30%)
     * or a combination of both. By default no optional clauses are necessary for a match.
     * However, if the bool query is used in a filter context and it has `should` clauses then,
     * at least one `should` clause is required to match.
     *
     * @param {string|number} minimumShouldMatch An absolute value (2), a percentage (30%)
     * or a combination of both.
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     */
    minimumShouldMatch(minimumShouldMatch) {
        this._queryOpts.minimum_should_match = minimumShouldMatch;
        return this;
    }

    /**
     * Sets if the `Query` should be enhanced with a `MatchAllQuery` in order
     * to act as a pure exclude when only negative (mustNot) clauses exist. Default: true.
     *
     * @param {boolean} enable
     * @returns {BoolQuery} returns `this` so that calls can be chained.
     */
    adjustPureNegative(enable) {
        this._queryOpts.adjust_pure_negative = enable;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the `bool` compound query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        const clauseKeys = ['must', 'filter', 'must_not', 'should'];

        // Pick the clauses which have some queries
        const cleanQryOpts = clauseKeys
            .filter(clause => has(this._queryOpts, clause))
            .reduce(
                // Unwrap array and put into qryOpts if required
                (qryOpts, clause) => {
                    const clauseQueries = this._queryOpts[clause];
                    qryOpts[clause] = recursiveToJSON(
                        clauseQueries.length === 1
                            ? head(clauseQueries)
                            : clauseQueries
                    );
                    return qryOpts;
                },
                // initial value - all key-value except clauses
                omit(this._queryOpts, clauseKeys)
            );

        return {
            [this.queryType]: cleanQryOpts
        };
    }
}

module.exports = BoolQuery;
