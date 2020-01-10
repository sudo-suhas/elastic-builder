'use strict';

const QueryStringQueryBase = require('./query-string-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html';

/**
 * A query that uses the `SimpleQueryParser` to parse its context.
 * Unlike the regular `query_string` query, the `simple_query_string` query
 * will never throw an exception, and discards invalid parts of the query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html)
 *
 * @example
 * const qry = esb.simpleQueryStringQuery(
 *     '"fried eggs" +(eggplant | potato) -frittata'
 * )
 *     .analyzer('snowball')
 *     .fields(['body^5', '_all'])
 *     .defaultOperator('and');
 *
 * @param {string=} queryString The query string
 *
 * @extends QueryStringQueryBase
 */
class SimpleQueryStringQuery extends QueryStringQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(queryString) {
        super('simple_query_string', ES_REF_URL, queryString);
    }

    /**
     * `simple_query_string` support multiple flags to specify which parsing features
     * should be enabled. It is specified as a `|`-delimited string.
     *
     * @example
     * const qry = esb.simpleQueryStringQuery('foo | bar + baz*')
     *     .flags('OR|AND|PREFIX');
     *
     * @param {string} flags `|` delimited string. The available flags are: `ALL`, `NONE`,
     * `AND`, `OR`, `NOT`, `PREFIX`, `PHRASE`, `PRECEDENCE`, `ESCAPE`, `WHITESPACE`,
     * `FUZZY`, `NEAR`, and `SLOP`.
     * @returns {SimpleQueryStringQuery} returns `this` so that calls can be chained.
     */
    flags(flags) {
        this._queryOpts.flags = flags;
        return this;
    }
}

module.exports = SimpleQueryStringQuery;
