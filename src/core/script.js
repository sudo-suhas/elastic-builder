'use strict';

const isNil = require('lodash.isnil');

/**
 * Class supporting the Elasticsearch scripting API.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-using.html)
 *
 * Note: `inline` script type was deprecated in [elasticsearch v5.0](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/breaking_50_scripting.html).
 * `source` should be used instead. And similarly for `stored` scripts, type
 * `id` must be used instead. `file` scripts were removed as part of the
 * breaking changes in [elasticsearch v6.0](https://www.elastic.co/guide/en/elasticsearch/reference/6.0/breaking_60_scripting_changes.html#_file_scripts_removed)
 *
 * @param {string=} type One of `inline`, `stored`, `file`, `source`, `id`.
 * @param {string=} source Source of the script.
 * This needs to be specified if optional argument `type` is passed.
 *
 * @example
 * const script = esb.script('inline', "doc['my_field'] * multiplier")
 *     .lang('expression')
 *     .params({ multiplier: 2 });
 *
 * // cat "log(_score * 2) + my_modifier" > config/scripts/calculate-score.groovy
 * const script = esb.script()
 *     .lang('groovy')
 *     .file('calculate-score')
 *     .params({ my_modifier: 2 });
 */
class Script {
    // eslint-disable-next-line require-jsdoc
    constructor(type, source) {
        this._isTypeSet = false;
        this._body = {};

        // NOTE: Script syntax changed in elasticsearch 5.6 to use `id`/`source`
        // instead of `inline`/`source`/`file`. This needs to be handled
        // somehow.
        if (!isNil(type) && !isNil(source)) {
            const typeLower = type.toLowerCase();

            switch (typeLower) {
                case 'inline':
                    this.inline(source);
                    break;

                case 'source':
                    this.source(source);
                    break;

                case 'stored':
                    this.stored(source);
                    break;

                case 'id':
                    this.id(source);
                    break;

                case 'file':
                    this.file(source);
                    break;

                default:
                    throw new Error(
                        '`type` must be one of `inline`, `stored`, `file`'
                    );
            }
        }
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */
    _warn(msg) {
        console.warn(`[Script] ${msg}`);
    }

    /**
     * Print warning messages to not mix `Script` source
     *
     * @private
     */
    _checkMixedRepr() {
        if (!this._isTypeSet) return;

        this._warn(
            'Script source(`inline`/`source`/`stored`/`id`/`file`) was already specified!'
        );
        this._warn('Overwriting.');

        delete this._body.inline;
        delete this._body.source;
        delete this._body.stored;
        delete this._body.id;
        delete this._body.file;
    }

    /**
     * Sets the type of script to be `inline` and specifies the source of the script.
     *
     * Note: This type was deprecated in elasticsearch v5.0. Use `source`
     * instead if you are using elasticsearch `>= 5.0`.
     *
     * @param {string} scriptCode
     * @returns {Script} returns `this` so that calls can be chained.
     */
    inline(scriptCode) {
        this._checkMixedRepr();

        this._body.inline = scriptCode;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Sets the type of script to be `source` and specifies the source of the script.
     *
     * Note: `source` is an alias for the `inline` type which was deprecated
     * in elasticsearch v5.0. So this type is supported only in versions
     * `>= 5.0`.
     *
     * @param {string} scriptCode
     * @returns {Script} returns `this` so that calls can be chained.
     */
    source(scriptCode) {
        this._checkMixedRepr();

        this._body.source = scriptCode;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Specify the `stored` script by `id` which will be retrieved from cluster state.
     *
     * Note: This type was deprecated in elasticsearch v5.0. Use `id`
     * instead if you are using elasticsearch `>= 5.0`.
     *
     * @param {string} scriptId The unique identifier for the stored script.
     * @returns {Script} returns `this` so that calls can be chained.
     */
    stored(scriptId) {
        this._checkMixedRepr();

        this._body.stored = scriptId;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Specify the stored script to be used by it's `id` which will be retrieved
     * from cluster state.
     *
     * Note: `id` is an alias for the `stored` type which was deprecated in
     * elasticsearch v5.0. So this type is supported only in versions `>= 5.0`.
     *
     * @param {string} scriptId The unique identifier for the stored script.
     * @returns {Script} returns `this` so that calls can be chained.
     */
    id(scriptId) {
        this._checkMixedRepr();

        this._body.id = scriptId;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Specify the `file` script by stored as a file in the scripts folder.
     *
     * Note: File scripts have been removed in elasticsearch 6.0. Instead, use
     * stored scripts.
     *
     * @param {string} fileName The name of the script stored as a file in the scripts folder.
     * For script file `config/scripts/calculate-score.groovy`,
     * `fileName` should be `calculate-score`
     * @returns {Script} returns `this` so that calls can be chained.
     */
    file(fileName) {
        this._checkMixedRepr();

        this._body.file = fileName;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Specifies the language the script is written in. Defaults to `painless` but
     * may be set to any of languages listed in [Scripting](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html).
     * The default language may be changed in the `elasticsearch.yml` config file by setting
     * `script.default_lang` to the appropriate language.
     *
     * For a `file` script,  it should correspond with the script file suffix.
     * `groovy` for `config/scripts/calculate-score.groovy`.
     *
     * Note: The Groovy, JavaScript, and Python scripting languages were
     * deprecated in elasticsearch 5.0 and removed in 6.0. Use painless instead.
     *
     * @param {string} lang The language for the script.
     * @returns {Script} returns `this` so that calls can be chained.
     */
    lang(lang) {
        this._body.lang = lang;
        return this;
    }

    /**
     * Specifies any named parameters that are passed into the script as variables.
     *
     * @param {Object} params Named parameters to be passed to script.
     * @returns {Script} returns `this` so that calls can be chained.
     */
    params(params) {
        this._body.params = params;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `script`.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be needed here
        return this._body;
    }
}

module.exports = Script;
