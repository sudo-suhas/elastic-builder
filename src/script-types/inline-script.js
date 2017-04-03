'use strict';

const Script = require('./script');

// TODO: Add documentation

/* eslint-disable require-jsdoc */

class InlineScript extends Script {

    constructor(code, lang, params) {
        super('inline', code, lang, params);
    }
}

module.exports = InlineScript;
