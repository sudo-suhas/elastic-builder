'use strict';

const { Query } = require('../../core');
const _ = require('../../_');

/**
 * The semantic query enables you to perform semantic search on data stored in a semantic_text field.
 * Semantic search uses dense vector representations to capture the meaning and context of search terms,
 * providing more relevant results compared to traditional keyword-based search methods.
 *
 * Requires Elasticsearch v9.0+ (Stack 9 / Serverless) where the `semantic` query is available.
 *
 * [Elasticsearch reference](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-semantic-query)
 *
 * @example
 * const qry = esb.semanticQuery('title_semantic', 'mountain lake').boost(2);
 *
 * @extends Query
 */
class SemanticQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(field, query) {
        super('semantic');
        if (!_.isNil(field)) this._queryOpts.field = field;
        if (!_.isNil(query)) this._queryOpts.query = query;
    }

    /**
     * Sets the semantic field to query.
     * @param {string} field The `semantic_text` field name.
     * @returns {SemanticQuery}
     */
    field(field) {
        this._queryOpts.field = field;
        return this;
    }

    /**
     * Sets the semantic query text.
     * @param {string} query The query text.
     * @returns {SemanticQuery}
     */
    query(query) {
        this._queryOpts.query = query;
        return this;
    }
}

module.exports = SemanticQuery;
