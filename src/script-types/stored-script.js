'use strict';

const Script = require('./script');

// TODO: Add documentation

/* eslint-disable require-jsdoc */

class StoredScript extends Script {

    constructor(code, lang, params) {
        super('stored', code, lang, params);
    }
}

module.exports = StoredScript;
