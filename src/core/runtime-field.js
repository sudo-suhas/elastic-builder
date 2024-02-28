'use strict';

const isNil = require('lodash.isnil');
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
     * @returns {void}
     */
    script(script) {
        this._body.script = {
            source: script
        };
        this._isScriptSet = true;
    }

    /**
     * Sets the type of the runtime field.
     * @param {string} type One of `boolean`, `composite`, `date`, `double`, `geo_point`, `ip`, `keyword`, `long`, `lookup`.
     * @returns {void}
     */
    type(type) {
        const typeLower = type.toLowerCase();
        if (!validType.includes(typeLower)) {
            throw new Error(`\`type\` must be one of ${validType.join(', ')}`);
        }
        this._body.type = typeLower;
        this._isTypeSet = true;
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
