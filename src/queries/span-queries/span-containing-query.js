'use strict';

const SpanLittleBigQueryBase = require('./span-little-big-query-base');

/**
 * Returns matches which enclose another span query. The span containing query
 * maps to Lucene `SpanContainingQuery`.
 *
 * Matching spans from big that contain matches from little are returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-containing-query.html)
 *
 * @example
 * const spanQry = esb.spanContainingQuery()
 *     .little(esb.spanTermQuery('field1', 'foo'))
 *     .big(esb.spanNearQuery()
 *         .clauses([
 *             esb.spanTermQuery('field1', 'bar'),
 *             esb.spanTermQuery('field1', 'baz')
 *         ])
 *         .slop(5)
 *         .inOrder(true))
 *
 * @extends SpanLittleBigQueryBase
 */
class SpanContainingQuery extends SpanLittleBigQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('span_containing');
    }
}

module.exports = SpanContainingQuery;
