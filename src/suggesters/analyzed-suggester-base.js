'use strict';

const isNil = require('lodash.isnil');

const { Suggester } = require('../core');

/**
 * The `AnalyzedSuggesterBase` provides support for common options used
 * in `TermSuggester` and `PhraseSuggester`.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} suggesterType The type of suggester.
 * Can be one of `term`, `phrase`
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 * @param {string=} txt A string to get suggestions for.
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `suggesterType` is empty
 *
 * @extends Suggester
 */
class AnalyzedSuggesterBase extends Suggester {
    // eslint-disable-next-line require-jsdoc
    constructor(suggesterType, name, field, txt) {
        super(suggesterType, name, field);

        if (!isNil(txt)) this._opts.text = txt;
    }

    /**
     * Sets the text to get suggestions for. If not set, the global
     * suggestion text will be used.
     *
     * @param {string} txt A string to get suggestions for.
     * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
     */
    text(txt) {
        this._opts.text = txt;
        return this;
    }

    /**
     * Sets the analyzer to analyse the suggest text with. Defaults to
     * the search analyzer of the suggest field.
     *
     * @param {string} analyzer The analyzer to analyse the suggest text with.
     * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
     */
    analyzer(analyzer) {
        this._suggestOpts.analyzer = analyzer;
        return this;
    }

    /**
     * Sets the maximum number of suggestions to be retrieved from each individual shard.
     * During the reduce phase only the top N suggestions are returned based on the `size`
     * option. Defaults to the `size` option. Setting this to a value higher than the `size`
     * can be useful in order to get a more accurate document frequency for spelling
     * corrections at the cost of performance. Due to the fact that terms are partitioned
     * amongst shards, the shard level document frequencies of spelling corrections
     * may not be precise. Increasing this will make these document frequencies
     * more precise.
     *
     * @param {number} size
     * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
     */
    shardSize(size) {
        this._suggestOpts.shard_size = size;
        return this;
    }
}

module.exports = AnalyzedSuggesterBase;
