'use strict';

const MonoFieldQueryBase = require('./mono-field-query-base');

class NeuralQuery extends MonoFieldQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, queryString) {
        super('neural', field, { query_text: queryString });
    }
}

module.exports = NeuralQuery;
