'use strict';

const ValueTermQueryBase = require('./value-term-query-base');

/**
 * Query for regular expression term queries. Elasticsearch will apply the regexp
 * to the terms produced by the tokenizer for that field, and not to the original
 * text of the field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html)
 *
 * @extends ValueTermQueryBase
 */
class RegexpQuery extends ValueTermQueryBase {

    /**
     * Creates an instance of `RegexpQuery`.
     *
     * @param {string=} field
     * @param {string|number=} value
     */
    constructor(field, value) {
        super('regexp', field, value);
    }

    /**
     * Set special flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     *
     * @param {string} flags `|` separated flags. Possible flags are `ALL` (default),
     * `ANYSTRING`, `COMPLEMENT`, `EMPTY`, `INTERSECTION`, `INTERVAL`, or `NONE`.
     * @returns {RegexpQuery} returns `this` so that calls can be chained.
     */
    flags(flags) {
        this._queryOpts.flags = flags;
        return this;
    }
}

module.exports = RegexpQuery;
