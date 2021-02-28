'use strict';

const isObject = require('lodash.isobject');

const {
    Suggester,
    util: { setDefault }
} = require('../core');

/**
 * The completion suggester provides auto-complete/search-as-you-type
 * functionality. This is a navigational feature to guide users to relevant
 * results as they are typing, improving search precision. It is not meant
 * for spell correction or did-you-mean functionality like the term or
 * phrase suggesters.
 *
 * Ideally, auto-complete functionality should be as fast as a user types to
 * provide instant feedback relevant to what a user has already typed in.
 * Hence, completion suggester is optimized for speed. The suggester uses
 * data structures that enable fast lookups, but are costly to build
 * and are stored in-memory.
 *
 * Elasticsearch reference
 *   - [Completion Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html)
 *   - [Context Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/suggester-context.html)
 *
 * @example
 * const suggest = esb.completionSuggester('song-suggest', 'suggest').prefix('nir');
 *
 * @example
 * const suggest = new esb.CompletionSuggester('place_suggestion', 'suggest')
 *     .prefix('tim')
 *     .size(10)
 *     .contexts('place_type', ['cafe', 'restaurants']);
 *
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 *
 * @throws {Error} if `name` is empty
 *
 * @extends Suggester
 */
class CompletionSuggester extends Suggester {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super('completion', name, field);
    }

    /**
     * Sets the `prefix` for the `CompletionSuggester` query.
     *
     * @param {string} prefix
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    prefix(prefix) {
        this._opts.prefix = prefix;
        return this;
    }

    /**
     * Sets whether duplicate suggestions should be filtered out (defaults to false).
     *
     * NOTE: This option was added in elasticsearch v6.1.
     *
     * @param {boolean} skip Enable/disable skipping duplicates
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    skipDuplicates(skip = true) {
        this._suggestOpts.skip_duplicates = skip;
        return this;
    }

    /**
     * Check that the object property `this._suggestOpts.fuzzy` is an object.
     * Set empty object if required.
     *
     * @private
     */
    _checkFuzzy() {
        if (!isObject(this._suggestOpts.fuzzy)) {
            this._suggestOpts.fuzzy = {};
        }
    }

    /**
     * Sets the `fuzzy` parameter. Can be customised with specific fuzzy parameters.
     *
     * @param {boolean|Object=} fuzzy Enable/disable `fuzzy` using boolean or
     * object(with params)
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    fuzzy(fuzzy = true) {
        this._suggestOpts.fuzzy = fuzzy;
        return this;
    }

    /**
     * Sets the `fuzziness` parameter which is interpreted as a Levenshtein Edit Distance —
     * the number of one character changes that need to be made to one string to make it
     * the same as another string.
     *
     * @example
     * const suggest = esb.completionSuggester('song-suggest', 'suggest')
     *     .prefix('nor')
     *     .fuzziness(2);
     *
     * @param {number|string} factor Can be specified either as a number, or the maximum
     * number of edits, or as `AUTO` which generates an edit distance based on the length
     * of the term.
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    fuzziness(factor) {
        this._checkFuzzy();

        this._suggestOpts.fuzzy.fuzziness = factor;
        return this;
    }

    /**
     * Transpositions (`ab` → `ba`) are allowed by default but can be disabled
     * by setting `transpositions` to false.
     *
     * @param {boolean} enable
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    transpositions(enable) {
        this._checkFuzzy();

        this._suggestOpts.fuzzy.transpositions = enable;
        return this;
    }

    /**
     * Sets the minimum length of the input before fuzzy suggestions are returned,
     * defaults 3
     *
     * @param {number} len Minimum length of the input before fuzzy suggestions
     * are returned, defaults 3
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    minLength(len) {
        this._checkFuzzy();

        this._suggestOpts.fuzzy.min_length = len;
        return this;
    }

    /**
     * The number of initial characters which will not be "fuzzified".
     * This helps to reduce the number of terms which must be examined. Defaults to `1`.
     *
     * @param {number} len Characters to skip fuzzy for. Defaults to `1`.
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    prefixLength(len) {
        this._checkFuzzy();

        this._suggestOpts.fuzzy.prefix_length = len;
        return this;
    }

    /**
     * If `true`, all measurements (like fuzzy edit distance, transpositions,
     * and lengths) are measured in Unicode code points instead of in bytes.
     * This is slightly slower than raw bytes, so it is set to `false` by default.
     *
     * @param {boolean} enable Measure in Unicode code points instead of in bytes.
     * `false` by default.
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    unicodeAware(enable) {
        this._checkFuzzy();

        this._suggestOpts.fuzzy.unicode_aware = enable;
        return this;
    }

    /**
     * Sets the regular expression for completion suggester which supports regex queries.
     *
     * @example
     * const suggest = esb.completionSuggester('song-suggest', 'suggest')
     *     .regex('n[ever|i]r');
     *
     * @param {string} expr Regular expression
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    regex(expr) {
        this._opts.regex = expr;
        return this;
    }

    /**
     * Set special flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     *
     * @param {string} flags `|` separated flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    flags(flags) {
        setDefault(this._suggestOpts, 'regex', {});

        this._suggestOpts.regex.flags = flags;
        return this;
    }

    /**
     * Limit on how many automaton states regexp queries are allowed to create.
     * This protects against too-difficult (e.g. exponentially hard) regexps.
     * Defaults to 10000. You can raise this limit to allow more complex regular
     * expressions to execute.
     *
     * @param {number} limit
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    maxDeterminizedStates(limit) {
        setDefault(this._suggestOpts, 'regex', {});

        this._suggestOpts.regex.max_determinized_states = limit;
        return this;
    }

    /**
     * The completion suggester considers all documents in the index, but it is often
     * desirable to serve suggestions filtered and/or boosted by some criteria.
     *
     * To achieve suggestion filtering and/or boosting, you can add context mappings
     * while configuring a completion field. You can define multiple context mappings
     * for a completion field. Every context mapping has a unique name and a type.
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/suggester-context.html)
     *
     * @example
     * const suggest = new esb.CompletionSuggester('place_suggestion', 'suggest')
     *     .prefix('tim')
     *     .size(10)
     *     .contexts('place_type', [
     *         { context: 'cafe' },
     *         { context: 'restaurants', boost: 2 }
     *     ]);
     *
     * @example
     * // Suggestions can be filtered and boosted with respect to how close they
     * // are to one or more geo points. The following filters suggestions that
     * // fall within the area represented by the encoded geohash of a geo point:
     * const suggest = new esb.CompletionSuggester('place_suggestion', 'suggest')
     *     .prefix('tim')
     *     .size(10)
     *     .contexts('location', { lat: 43.662, lon: -79.38 });
     *
     * @example
     * // Suggestions that are within an area represented by a geohash can also be
     * // boosted higher than others
     * const suggest = new esb.CompletionSuggester('place_suggestion', 'suggest')
     *     .prefix('tim')
     *     .size(10)
     *     .contexts('location', [
     *         {
     *             lat: 43.6624803,
     *             lon: -79.3863353,
     *             precision: 2
     *         },
     *         {
     *             context: {
     *                 lat: 43.6624803,
     *                 lon: -79.3863353
     *             },
     *             boost: 2
     *         }
     *     ]);
     *
     * @param {string} name
     * @param {Array|Object} ctx
     * @returns {CompletionSuggester} returns `this` so that calls can be chained.
     */
    contexts(name, ctx) {
        // This whole feature is bizzare!
        // Not very happy with the implementation.
        setDefault(this._suggestOpts, 'contexts', {});

        this._suggestOpts.contexts[name] = ctx;
        return this;
    }
}

module.exports = CompletionSuggester;
