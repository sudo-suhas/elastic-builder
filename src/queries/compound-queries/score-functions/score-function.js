'use strict';

const {
    Query,
    util: { checkType, recursiveToJSON }
} = require('../../../core');

/**
 * `ScoreFunction` provides support for common options used across
 * various `ScoreFunction` implementations.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#score-functions)
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name
 */
class ScoreFunction {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        this._name = name;

        // Filter, weight go here
        this._body = {};
        // Score Function specific options go here
        this._opts = {};
    }

    /**
     * Adds a filter query whose matching documents will have the score function applied.
     *
     * @param {Query} filterQry A valid `Query` object.
     * @returns {ScoreFunction} returns `this` so that calls can be chained.
     */
    filter(filterQry) {
        checkType(filterQry, Query);

        this._body.filter = filterQry;
        return this;
    }

    /**
     * Sets the weight of the score function
     *
     * @param {number} weight The weight of this score function.
     * @returns {ScoreFunction} returns `this` so that calls can be chained.
     */
    weight(weight) {
        this._body.weight = weight;
        return this;
    }

    /**
     * Overrides default `toJSON` to return DSL representation of the score function
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        const repr = Object.assign({ [this._name]: this._opts }, this._body);
        return recursiveToJSON(repr);
    }
}

module.exports = ScoreFunction;
