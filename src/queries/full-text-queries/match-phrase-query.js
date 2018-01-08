'use strict';

const MatchPhraseQueryBase = require('./match-phrase-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html';

/**
 * The `match_phrase` query analyzes the text and creates a `phrase` query out of
 * the analyzed text.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)
 *
 * @example
 * const qry = esb.matchPhraseQuery('message', 'to be or not to be');
 *
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends MatchPhraseQueryBase
 */
class MatchPhraseQuery extends MatchPhraseQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, queryString) {
        super('match_phrase', ES_REF_URL, field, queryString);
    }
}

module.exports = MatchPhraseQuery;
