'use strict';

const { isNil } = require('lodash');
const validType = [
    'boolean',
    'composite',
    'date',
    'double',
    'geo_point',
    'ip',
    'keyword',
    'long',
    'lookup'
];

/**
 * Class supporting the Elasticsearch runtime field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/runtime.html)
 *
 * Added in Elasticsearch v7.11.0
 * [Release note](https://www.elastic.co/guide/en/elasticsearch/reference/7.11/release-notes-7.11.0.html)
 *
 * @param {string=} type One of `boolean`, `composite`, `date`, `double`, `geo_point`, `ip`, `keyword`, `long`, `lookup`.
 * @param {string=} script Source of the script.
 *
 * @example
 * const field = esb.runtimeField('keyword', `emit(doc['sessionId'].value + '::' + doc['name'].value)`);
 */
class RuntimeField {
    // eslint-disable-next-line require-jsdoc
    constructor(type, script) {
        this._body = {};
        this._isTypeSet = false;
        this._isScriptSet = false;

        if (!isNil(type)) {
            this.type(type);
        }

        if (!isNil(script)) {
            this.script(script);
        }
    }

    /**
     * Sets the source of the script.
     * @param {string} script
     * @returns {RuntimeField} returns `this` so that calls can be chained.
     */
    script(script) {
        this._body.script = {
            source: script
        };
        this._isScriptSet = true;
        return this;
    }

    /**
     * Sets the type of the runtime field.
     * @param {string} type One of `boolean`, `composite`, `date`, `double`, `geo_point`, `ip`, `keyword`, `long`, `lookup`.
     * @returns {RuntimeField} returns `this` so that calls can be chained.
     */
    type(type) {
        const typeLower = type.toLowerCase();
        if (!validType.includes(typeLower)) {
            throw new Error(`\`type\` must be one of ${validType.join(', ')}`);
        }
        this._body.type = typeLower;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Specifies the language the script is written in. Defaults to `painless` but
     * may be set to any of languages listed in [Scripting](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html).
     *
     * @param {string} lang The language for the script.
     * @returns {RuntimeField} returns `this` so that calls can be chained.
     */
    lang(lang) {
        if (!isNil(this._body.script)) {
            this._body.script.lang = lang;
        }
        return this;
    }

    /**
     * Specifies any named parameters that are passed into the script as variables.
     *
     * @param {Object} params Named parameters to be passed to script.
     * @returns {RuntimeField} returns `this` so that calls can be chained.
     */
    params(params) {
        if (!isNil(this._body.script)) {
            this._body.script.params = params;
        }
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `script`.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        if (!this._isTypeSet) {
            throw new Error('`type` should be set');
        }

        if (!this._isScriptSet) {
            throw new Error('`script` should be set');
        }

        return this._body;
    }
}

module.exports = RuntimeField;
