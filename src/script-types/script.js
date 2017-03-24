'use strict';

const _ = require('lodash');

// TODO: Add documentation

/* eslint-disable require-jsdoc */

class Script {
    constructor(type, code, lang, params) {
        this._type = type;
        this._code = code;
        this._lang = lang;
        this._params = params;
    }

    code(code) {
        this._code = code;
        return this;
    }

    lang(lang) {
        this._lang = lang;
        return this;
    }

    params(params) {
        this._params = params;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object}
     */
    toJSON() {
        const repr = {
            [this._type]: this._code
        };

        if (!_.isEmpty(this._lang)) repr.lang = this._lang;
        if (!_.isEmpty(this._params)) repr.params = this._params;

        return repr;
    }
}

module.exports = Script;
