'use strict';

const Script = require('./script');

// TODO: Add documentation

/* eslint-disable require-jsdoc */

class FileScript extends Script {

    constructor(code, lang, params) {
        super('file', code, lang, params);
    }
}

module.exports = FileScript;
