'use strict';

const MonoFieldQueryBase = require('./mono-field-query-base');

class NeuralQuery extends MonoFieldQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field, queryString) {
        const reservedEmbeddingFieldEnding = '_retake_embedding';

        super('neural', `${field}${reservedEmbeddingFieldEnding}`, {
            query_text: queryString
        });
    }
}

module.exports = NeuralQuery;
