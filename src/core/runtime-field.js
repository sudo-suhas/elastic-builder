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

class RuntimeField {
    constructor(type, script, name) {
        this._body = {};
        this._name = name;
        this._isTypeSet = false;
        this._isScriptSet = false;

        if (!isNil(type)) {
            this.type(type);
        }

        if (!isNil(script)) {
            this.script(script);
        }
    }

    name(name) {
        this._name = name;
    }

    script(script) {
        this._body.script = {
            source: script
        };
        this._isScriptSet = true;
    }

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
