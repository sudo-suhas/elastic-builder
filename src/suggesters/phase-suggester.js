'use strict';

const isNil = require('lodash.isnil');

const {
    consts: { SMOOTHING_MODEL_SET },
    util: { invalidParam }
} = require('../core');

const AnalyzedSuggesterBase = require('./analyzed-suggester-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-phrase.html';

const invalidSmoothingModeParam = invalidParam(
    ES_REF_URL,
    'suggest_mode',
    SMOOTHING_MODEL_SET
);

/**
 * The phrase suggester adds additional logic on top of the `term` suggester
 * to select entire corrected phrases instead of individual tokens weighted
 * based on `ngram-language` models. In practice this suggester will be able
 * to make better decisions about which tokens to pick based on co-occurrence
 * and frequencies.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-phrase.html)
 *
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 * @param {string=} txt A string to get suggestions for.
 *
 * @throws {Error} if `name` is empty
 *
 * @extends AnalyzedSuggesterBase
 */
class PhraseSuggester extends AnalyzedSuggesterBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field, txt) {
        super('phrase', name, field, txt);

        this._collatePrune = null;
    }

    /**
     * Sets max size of the n-grams (shingles) in the `field`. If the field
     * doesn't contain n-grams (shingles) this should be omitted or set to `1`.
     *
     * Note: Elasticsearch tries to detect the gram size based on
     * the specified `field`. If the field uses a `shingle` filter the `gram_size`
     * is set to the `max_shingle_size` if not explicitly set.
     * @param {number} size Max size of the n-grams (shingles) in the `field`.
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    gramSize(size) {
        this._opts.gram_size = size;
        return this;
    }

    /**
     * Sets the likelihood of a term being a misspelled even if the term exists
     * in the dictionary. The default is `0.95` corresponding to 5% of the
     * real words are misspelled.
     *
     * @param {number} factor Likelihood of a term being misspelled. Defaults to `0.95`
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    realWordErrorLikelihood(factor) {
        this._opts.real_word_error_likelihood = factor;
        return this;
    }

    /**
     * Sets the confidence level defines a factor applied to the input phrases score
     * which is used as a threshold for other suggest candidates. Only candidates
     * that score higher than the threshold will be included in the result.
     * For instance a confidence level of `1.0` will only return suggestions
     * that score higher than the input phrase. If set to `0.0` the top N candidates
     * are returned. The default is `1.0`.
     *
     * @param {number} level Factor applied to the input phrases score, used as
     * a threshold for other suggest candidates.
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    confidence(level) {
        this._opts.confidence = level;
        return this;
    }

    /**
     * Sets the maximum percentage of the terms that at most considered to be
     * misspellings in order to form a correction. This method accepts a float
     * value in the range `[0..1)` as a fraction of the actual query terms or a
     * number `>=1` as an absolute number of query terms. The default is set
     * to `1.0` which corresponds to that only corrections with at most
     * 1 misspelled term are returned. Note that setting this too high can
     * negatively impact performance. Low values like 1 or 2 are recommended
     * otherwise the time spend in suggest calls might exceed the time spend
     * in query execution.
     *
     * @param {number} limit The maximum percentage of the terms that at most considered
     * to be misspellings in order to form a correction.
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    maxErrors(limit) {
        this._opts.max_errors = limit;
        return this;
    }

    /**
     * Sets the separator that is used to separate terms in the bigram field.
     * If not set the whitespace character is used as a separator.
     *
     * @param {string} sep The separator that is used to separate terms in the
     * bigram field.
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    separator(sep) {
        this._opts.separator = sep;
        return this;
    }

    /**
     * Sets up suggestion highlighting. If not provided then no `highlighted` field
     * is returned. If provided must contain exactly `pre_tag` and `post_tag` which
     * are wrapped around the changed tokens. If multiple tokens in a row are changed
     * the entire phrase of changed tokens is wrapped rather than each token.
     *
     * @param {string} preTag Pre-tag to wrap token
     * @param {string} postTag Post-tag to wrap token
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    highlight(preTag, postTag) {
        this._opts.highlight = { pre_tag: preTag, post_tag: postTag };
        return this;
    }

    /**
     * Checks each suggestion against the specified `query` to prune suggestions
     * for which no matching docs exist in the index. The collate query for
     * a suggestion is run only on the local shard from which the suggestion
     * has been generated from. The `query` must be specified, and it is run
     * as a [`template` query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-template-query.html).
     *
     * The current suggestion is automatically made available as the
     * `{{suggestion}}` variable, which should be used in your query.
     * Additionally, you can specify a `prune` to control if all phrase
     * suggestions will be returned, when set to `true` the suggestions will
     * have an additional option `collate_match`, which will be true if matching
     * documents for the phrase was found, `false` otherwise. The default value
     * for prune is `false`.
     *
     * @param {SearchTemplate} searchTempl The `query` to prune suggestions for which
     * no matching docs exist in the index. It is specified as a `template` query.
     * @param {boolean=} prune When set to `true`, the suggestions will
     * have an additional option `collate_match`, which will be true if matching
     * documents for the phrase was found, `false` otherwise. The default value
     * for prune is `false`.
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    collate(searchTempl, prune = null) {
        // Add an instance check here?
        this._opts.collate = searchTempl;
        // Weird special case, prune needs to be introduces into
        // the DSL repr for search template
        this._collatePrune = prune;
        return this;
    }

    /**
     * Sets the smoothing model to balance weight between infrequent grams
     * (grams (shingles) are not existing in the index) and frequent grams
     * (appear at least once in the index).
     *
     * Three possible values can be specified:
     *   - `stupid_backoff`: a simple backoff model that backs off to lower order
     *     n-gram models if the higher order count is 0 and discounts the lower order
     *     n-gram model by a constant factor. The default `discount` is `0.4`.
     *     Stupid Backoff is the default model
     *   - `laplace`: a smoothing model that uses an additive smoothing where a
     *     constant (typically `1.0` or smaller) is added to all counts to balance weights,
     *     The default `alpha` is `0.5`.
     *   - `linear_interpolation`: a smoothing model that takes the weighted mean of the
     *     unigrams, bigrams and trigrams based on user supplied weights (lambdas).
     *     Linear Interpolation doesn’t have any default values.
     *     All parameters (`trigram_lambda`, `bigram_lambda`, `unigram_lambda`)
     *     must be supplied.
     *
     * @param {string} model One of `stupid_backoff`, `laplace`, `linear_interpolation`
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    smoothing(model) {
        if (isNil(model)) invalidSmoothingModeParam(model);

        const modelLower = model.toLowerCase();
        if (!SMOOTHING_MODEL_SET.has(modelLower)) {
            invalidSmoothingModeParam(model);
        }

        this._opts.suggest_mode = modelLower;
        return this;
    }

    /**
     * Sets the given list of candicate generators which produce a list of possible terms
     * per term in the given text. Each of the generators in the list are
     * called per term in the original text.
     *
     * The output of the generators is subsequently scored in combination with the
     * candidates from the other terms to for suggestion candidates.
     *
     * @param {Array<DirectGenerator>|DirectGenerator} dirGen Array of `DirectGenerator`
     * instances or a single instance of `DirectGenerator`
     * @returns {PhraseSuggester} returns `this` so that calls can be chained.
     */
    directGenerator(dirGen) {
        // TODO: Do instance checks on `dirGen`
        if (Array.isArray(dirGen)) {
            this._opts.direct_generator = dirGen;
        } else {
            this._opts.direct_generator = [dirGen];
        }

        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `phrase suggester`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch DSL
     */
    toJSON() {
        const json = super.toJSON();

        if (!isNil(this._collatePrune)) json.collate.prune = this._collatePrune;

        return json;
    }
}

module.exports = PhraseSuggester;
