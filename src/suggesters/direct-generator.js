'use strict';

const isNil = require('lodash.isnil');

const {
    consts: { SUGGEST_MODE_SET },
    util: { invalidParam }
} = require('../core');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-phrase.html#_direct_generators';

const invalidSuggestModeParam = invalidParam(
    ES_REF_URL,
    'suggest_mode',
    SUGGEST_MODE_SET
);

/**
 * The `phrase` suggester uses candidate generators to produce a list of possible
 * terms per term in the given text. A single candidate generator is similar
 * to a `term` suggester called for each individual term in the text. The output
 * of the generators is subsequently scored in combination with the candidates
 * from the other terms to for suggestion candidates.
 *
 * The Phrase suggest API accepts a list of generators under the key `direct_generator`
 * each of the generators in the list are called per term in the original text.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-phrase.html#_direct_generators)
 *
 * @param {string=} field The field to fetch the candidate suggestions from.
 */
class DirectGenerator {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        this._body = {};

        if (!isNil(field)) this._body.field = field;
    }

    /**
     * Sets field to fetch the candidate suggestions from. This is a required option
     * that either needs to be set globally or per suggestion.
     *
     * @param {string} field a valid field name
     * @returns {DirectGenerator} returns `this` so that calls can be chained
     */
    field(field) {
        this._body.field = field;
        return this;
    }

    /**
     * Sets the number of suggestions to return (defaults to `5`).
     *
     * @param {number} size
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    size(size) {
        this._body.size = size;
        return this;
    }

    /**
     * Sets the suggest mode which controls what suggestions are included
     * or controls for what suggest text terms, suggestions should be suggested.
     *  All values other than `always` can be thought of as an optimization to
     * generate fewer suggestions to test on each shard and are not rechecked
     * when combining the suggestions generated on each shard. Thus `missing`
     * will generate suggestions for terms on shards that do not contain them
     * even other shards do contain them. Those should be filtered out
     * using `confidence`.
     *
     * Three possible values can be specified:
     *   - `missing`: Only provide suggestions for suggest text terms that
     *     are not in the index. This is the default.
     *   - `popular`:  Only suggest suggestions that occur in more docs
     *     than the original suggest text term.
     *   - `always`: Suggest any matching suggestions based on terms in the suggest text.
     *
     * @param {string} mode Can be `missing`, `popular` or `always`
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     * @throws {Error} If `mode` is not one of `missing`, `popular` or `always`.
     */
    suggestMode(mode) {
        if (isNil(mode)) invalidSuggestModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (!SUGGEST_MODE_SET.has(modeLower)) {
            invalidSuggestModeParam(mode);
        }

        this._body.suggest_mode = modeLower;
        return this;
    }

    /**
     * Sets the maximum edit distance candidate suggestions can have
     * in order to be considered as a suggestion. Can only be a value
     * between 1 and 2. Any other value result in an bad request
     * error being thrown. Defaults to 2.
     *
     * @param {number} maxEdits Value between 1 and 2. Defaults to 2.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    maxEdits(maxEdits) {
        this._body.max_edits = maxEdits;
        return this;
    }

    /**
     * Sets the number of minimal prefix characters that must match in order
     * to be a candidate suggestions. Defaults to 1.
     *
     * Increasing this number improves spellcheck performance.
     * Usually misspellings don't occur in the beginning of terms.
     *
     * @param {number} len The number of minimal prefix characters that must match in order
     * to be a candidate suggestions. Defaults to 1.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    prefixLength(len) {
        this._body.prefix_length = len;
        return this;
    }

    /**
     * Sets the minimum length a suggest text term must have in order to be included.
     * Defaults to 4.
     *
     * @param {number} len The minimum length a suggest text term must have in order
     * to be included. Defaults to 4.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    minWordLength(len) {
        this._body.min_word_length = len;
        return this;
    }

    /**
     * Sets factor that is used to multiply with the `shards_size` in order to inspect
     * more candidate spell corrections on the shard level.
     * Can improve accuracy at the cost of performance. Defaults to 5.
     *
     * @param {number} maxInspections Factor used to multiple with `shards_size` in
     * order to inspect more candidate spell corrections on the shard level.
     * Defaults to 5
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    maxInspections(maxInspections) {
        this._body.max_inspections = maxInspections;
        return this;
    }

    /**
     * Sets the minimal threshold in number of documents a suggestion should appear in.
     * This can be specified as an absolute number or as a relative percentage of
     * number of documents. This can improve quality by only suggesting high
     * frequency terms. Defaults to 0f and is not enabled. If a value higher than 1
     * is specified then the number cannot be fractional. The shard level document
     * frequencies are used for this option.
     *
     * @param {number} limit Threshold in number of documents a suggestion
     * should appear in. Defaults to 0f and is not enabled.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    minDocFreq(limit) {
        this._body.min_doc_freq = limit;
        return this;
    }

    /**
     * Sets the maximum threshold in number of documents a suggest text token can
     * exist in order to be included. Can be a relative percentage number (e.g 0.4)
     * or an absolute number to represent document frequencies. If an value higher
     * than 1 is specified then fractional can not be specified. Defaults to 0.01f.
     * This can be used to exclude high frequency terms from being spellchecked.
     * High frequency terms are usually spelled correctly on top of this also
     * improves the spellcheck performance. The shard level document frequencies are
     * used for this option.
     *
     * @param {number} limit Maximum threshold in number of documents a suggest text
     * token can exist in order to be included. Defaults to 0.01f.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    maxTermFreq(limit) {
        this._body.max_term_freq = limit;
        return this;
    }

    /**
     * Sets the filter (analyzer) that is applied to each of the tokens passed to this
     * candidate generator. This filter is applied to the original token before
     * candidates are generated.
     *
     * @param {string} filter a filter (analyzer) that is applied to each of the
     * tokens passed to this candidate generator.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    preFilter(filter) {
        this._body.pre_filter = filter;
        return this;
    }

    /**
     * Sets the filter (analyzer) that is applied to each of the generated tokens
     * before they are passed to the actual phrase scorer.
     *
     * @param {string} filter a filter (analyzer) that is applied to each of the
     * generated tokens before they are passed to the actual phrase scorer.
     * @returns {DirectGenerator} returns `this` so that calls can be chained.
     */
    postFilter(filter) {
        this._body.post_filter = filter;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `direct_generator`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch DSL
     */
    toJSON() {
        return this._body;
    }
}

module.exports = DirectGenerator;
