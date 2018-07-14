'use strict';

const isNil = require('lodash.isnil');

const {
    util: { checkType }
} = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Wrapper to allow span queries to participate in composite single-field
 * span queries by lying about their search field. The span field masking
 * query maps to Lucene's `SpanFieldMaskingQuery`.
 *
 * This can be used to support queries like span-near or span-or across
 * different fields, which is not ordinarily permitted.
 *
 * Span field masking query is invaluable in conjunction with multi-fields
 * when same content is indexed with multiple analyzers. For instance we
 * could index a field with the standard analyzer which breaks text up into
 * words, and again with the english analyzer which stems words into their root form.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-field-masking-query.html)
 *
 * @param {string=} field
 * @param {SpanQueryBase=} spanQry Any other span type query
 *
 * @example
 * const spanQry = esb.spanNearQuery()
 *     .clauses([
 *         esb.spanTermQuery('text', 'quick brown'),
 *         esb.spanFieldMaskingQuery()
 *             .field('text')
 *             .query(esb.spanTermQuery('text.stems', 'fox'))
 *     ])
 *     .slop(5)
 *     .inOrder(false);
 *
 * @extends SpanQueryBase
 */
class SpanFieldMaskingQuery extends SpanQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, spanQry) {
        super('field_masking_span');

        if (!isNil(field)) this._queryOpts.field = field;
        if (!isNil(spanQry)) this.query(spanQry);
    }

    /**
     * Sets the span query.
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanFieldMaskingQuery} returns `this` so that calls can be chained.
     */
    query(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.query = spanQry;
        return this;
    }

    /**
     * Sets the field to mask.
     *
     * @param {string} field
     * @returns {SpanFieldMaskingQuery} returns `this` so that calls can be chained.
     */
    field(field) {
        this._queryOpts.field = field;
        return this;
    }
}

module.exports = SpanFieldMaskingQuery;
