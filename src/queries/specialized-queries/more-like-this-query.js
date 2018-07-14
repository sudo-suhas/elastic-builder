'use strict';

const has = require('lodash.has');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * The More Like This Query (MLT Query) finds documents that are "like" a given set
 * of documents. In order to do so, MLT selects a set of representative terms of
 * these input documents, forms a query using these terms, executes the query and
 * returns the results. The user controls the input documents, how the terms should
 * be selected and how the query is formed.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html)
 *
 * @example
 * // Ask for documents that are similar to a provided piece of text
 * const qry = esb.moreLikeThisQuery()
 *     .fields(['title', 'description'])
 *     .like('Once upon a time')
 *     .minTermFreq(1)
 *     .maxQueryTerms(12);
 *
 * @example
 * // Mixing texts with documents already existing in the index
 * const qry = esb.moreLikeThisQuery()
 *     .fields(['title', 'description'])
 *     .like({ _index: 'imdb', _type: 'movies', _id: '1' })
 *     .like({ _index: 'imdb', _type: 'movies', _id: '2' })
 *     .like('and potentially some more text here as well')
 *     .minTermFreq(1)
 *     .maxQueryTerms(12);
 *
 * @example
 * // Provide documents not present in the index
 * const qry = esb.moreLikeThisQuery()
 *     .fields(['name.first', 'name.last'])
 *     .like([
 *         {
 *             _index: 'marvel',
 *             _type: 'quotes',
 *             doc: {
 *                 name: { first: 'Ben', last: 'Grimm' },
 *                 tweet: "You got no idea what I'd... what I'd give to be invisible."
 *             }
 *         },
 *         { _index: 'marvel', _type: 'quotes', _id: '2' }
 *     ])
 *     .minTermFreq(1)
 *     .maxQueryTerms(12);
 *
 * @extends Query
 */
class MoreLikeThisQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('more_like_this');
    }

    /**
     *
     * @private
     * @param {string} clauseType
     * @param {string|Object|Array} clauses
     */
    _setSearchClause(clauseType, clauses) {
        // Replace the field. Don't care about previous contents
        if (Array.isArray(clauses)) this._queryOpts[clauseType] = clauses;
        else if (!has(this._queryOpts, clauseType)) {
            // Keep the single `like` without array.
            this._queryOpts[clauseType] = clauses;
        } else {
            // Wrap the single `like` in an array
            if (!Array.isArray(this._queryOpts[clauseType])) {
                this._queryOpts[clauseType] = [this._queryOpts[clauseType]];
            }
            // Append to array
            this._queryOpts[clauseType].push(clauses);
        }
    }

    /**
     * Sets the list of fields to fetch and analyze the text from. Defaults to
     * the `_all` field for free text and to all possible fields for document inputs.
     *
     * @param {Array<string>} fields Array of fields to search against
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    fields(fields) {
        checkType(fields, Array);

        this._queryOpts.fields = fields;
        return this;
    }

    /**
     * Sets the search clause for the query. It is the only required parameter of the MLT query
     * and follows a versatile syntax, in which the user can specify free form text and/or
     * a single or multiple documents (see examples above). The syntax to specify documents
     * is similar to the one used by the [Multi GET API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html).
     * When specifying documents, the text is fetched from fields unless overridden
     * in each document request. The text is analyzed by the analyzer at the field,
     * but could also be overridden. The syntax to override the analyzer at the
     * field follows a similar syntax to the `per_field_analyzer` parameter of the
     * [Term Vectors API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html#docs-termvectors-per-field-analyzer).
     * Additionally, to provide documents not necessarily present in the index,
     * [artificial documents](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html#docs-termvectors-artificial-doc)
     * are also supported.
     *
     * If string or object is passed, it is
     * appended to the list. If an array is passed, it replaces the existing list.
     *
     * @param {string|Object|Array} like Can be passed as a string,
     * Object representing indexed document, or array of string/objects.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    like(like) {
        this._setSearchClause('like', like);
        return this;
    }

    /**
     * The `unlike` parameter is used in conjunction with `like` in order not to
     * select terms found in a chosen set of documents. In other words, we could ask
     * for documents `like`: "Apple", but `unlike`: "cake crumble tree".
     * The syntax is the same as like.
     *
     * @param {string|Object|Array} unlike Can be passed as a string,
     * Object representing indexed document, or array of string/objects.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    unlike(unlike) {
        this._setSearchClause('unlike', unlike);
        return this;
    }

    /**
     * Sets the text to find documents like it.
     *
     * Note: This parameter has been removed in elasticsearch 6.0. Use `like`
     * instead.
     *
     * @param {string} txt The text to find documents like it.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    likeText(txt) {
        this._queryOpts.like_text = txt;
        return this;
    }

    /**
     * Sets the list of `ids` for the documents with syntax similar to
     * the [Multi GET API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html).
     *
     * Note: This parameter has been removed in elasticsearch 6.0. Use `like`
     * instead.
     *
     * @param {Array<string>} ids
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    ids(ids) {
        checkType(ids, Array);

        this._queryOpts.ids = ids;
        return this;
    }

    /**
     * Sets the list of `docs` for the documents with syntax similar to
     * the [Multi GET API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html).
     *
     * Note: This parameter has been removed in elasticsearch 6.0. Use `like`
     * instead.
     *
     * @param {Array<Object>} docs
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    docs(docs) {
        checkType(docs, Array);

        this._queryOpts.docs = docs;
        return this;
    }

    /**
     * Sets the maximum number of query terms that will be selected.
     * Increasing this value gives greater accuracy at the expense of query execution speed.
     * Defaults to `25`.
     *
     * @param {number} termsLimit The maximum number of query terms that will be selected.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    maxQueryTerms(termsLimit) {
        this._queryOpts.max_query_terms = termsLimit;
        return this;
    }

    /**
     * Sets the minimum term frequency below which the terms will be ignored from
     * the input document Defaults to 2.
     *
     * @param {number} termFreqLimit
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    minTermFreq(termFreqLimit) {
        this._queryOpts.min_term_freq = termFreqLimit;
        return this;
    }

    /**
     * Sets the minimum document frequency below which the terms will be ignored
     * from the input document. Defaults to `5`.
     *
     * @param {number} docFreqLimit The minimum document frequency
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    minDocFreq(docFreqLimit) {
        this._queryOpts.min_doc_freq = docFreqLimit;
        return this;
    }

    /**
     * Sets the maximum document frequency above which the terms will be ignored
     * from the input document. Defaults to unbounded (`0`).
     *
     * @param {number} docFreqLimit The minimum document frequency
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    maxDocFreq(docFreqLimit) {
        this._queryOpts.max_doc_freq = docFreqLimit;
        return this;
    }

    /**
     * Sets the minimum word length below which the terms will be ignored.
     * Defaults to `0`.
     *
     * @param {number} wordLenLimit
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    minWordLength(wordLenLimit) {
        this._queryOpts.min_word_length = wordLenLimit;
        return this;
    }

    /**
     * Sets the maximum word length above which the terms will be ignored.
     * Defaults to unbounded (`0`).
     *
     * @param {number} wordLenLimit
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    maxWordLength(wordLenLimit) {
        this._queryOpts.max_word_length = wordLenLimit;
        return this;
    }

    /**
     * Sets the array of stop words. Any word in this set is considered
     * "uninteresting" and ignored.
     *
     * @param {Array<string>} words Array of stop words.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained
     */
    stopWords(words) {
        this._queryOpts.stop_words = words;
        return this;
    }

    /**
     * Set the analyzer to control which analyzer will perform the analysis process on the text.
     * Defaults to the analyzer associated with the first field in `fields`.
     *
     * @param {string} analyzer A valid text analyzer.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained.
     */
    analyzer(analyzer) {
        this._queryOpts.analyzer = analyzer;
        return this;
    }

    /**
     * Sets the value controlling how many `should` clauses in the boolean
     * query should match. It can be an absolute value (2), a percentage (30%)
     * or a combination of both. (Defaults to `"30%"`).
     *
     * @param {string|number} minimumShouldMatch An absolute value (`2`), a percentage (`30%`)
     * or a combination of both.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained.
     */
    minimumShouldMatch(minimumShouldMatch) {
        this._queryOpts.minimum_should_match = minimumShouldMatch;
        return this;
    }

    /**
     * Sets the boost factor to use when boosting terms.
     * Defaults to deactivated (`0`).
     *
     * @param {number} boost A positive value to boost terms.
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained.
     */
    boostTerms(boost) {
        this._queryOpts.boost_terms = boost;
        return this;
    }

    /**
     * Specifies whether the input documents should also be included in the
     * search results returned. Defaults to `false`.
     *
     * @param {boolean} enable
     * @returns {MoreLikeThisQuery} returns `this` so that calls can be chained.
     */
    include(enable) {
        this._queryOpts.include = enable;
        return this;
    }
}

module.exports = MoreLikeThisQuery;
