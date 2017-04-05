'use strict';

const MatchPhraseQueryBase = require('./match-phrase-query-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html';

/**
 * The `match_phrase` query analyzes the text and creates a `phrase` query out of
 * the analyzed text.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)
 *
 * @extends MatchPhraseQueryBase
 */
class MatchPhraseQuery extends MatchPhraseQueryBase {

    /**
     * Creates an instance of `MatchPhraseQuery`
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    constructor(field, queryString) {
        super('match_phrase', ES_REF_URL, field, queryString);
    }
}

module.exports = MatchPhraseQuery;
