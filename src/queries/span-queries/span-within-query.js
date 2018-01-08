'use strict';

const SpanLittleBigQueryBase = require('./span-little-big-query-base');

/**
 * Returns matches which are enclosed inside another span query. The span within
 * query maps to Lucene `SpanWithinQuery`.
 *
 * Matching spans from `little` that are enclosed within `big` are returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-containing-query.html)
 *
 * @example
 * const spanQry = esb.spanWithinQuery()
 *     .little(esb.spanTermQuery('field1', 'foo'))
 *     .big(esb.spanNearQuery()
 *         .clauses([
 *             esb.spanTermQuery('field1', 'bar'),
 *             esb.spanTermQuery('field1', 'baz')
 *         ])
 *         .slop(5)
 *         .inOrder(true));
 *
 * @extends SpanLittleBigQueryBase
 */
class SpanWithinQuery extends SpanLittleBigQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('span_within');
    }
}

module.exports = SpanWithinQuery;
