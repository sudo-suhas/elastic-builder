'use strict';

const isNil = require('lodash.isnil');

const ScoreFunction = require('./score-function');

const {
    util: { recursiveToJSON }
} = require('../../../core');

/**
 * The `weight` score allows you to multiply the score by the provided `weight`.
 * This can sometimes be desired since boost value set on specific queries gets
 * normalized, while for this score function it does not.
 * The number value is of type float.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-weight)
 *
 * @example
 * const scoreFunc = esb.weightScoreFunction(42);
 *
 * @param {number=} weight The weight of this score function.
 * @extends ScoreFunction
 */
class WeightScoreFunction extends ScoreFunction {
    // eslint-disable-next-line require-jsdoc
    constructor(weight) {
        /*
            null to `super` is intentional.
            The following is a valid score function
            It doesn't have a name field
            {
                "filter": { "match": { "test": "cat" } },
                "weight": 42
            }
        */
        super(null);

        if (!isNil(weight)) this._body.weight = weight;
    }

    /**
     * Overrides default `toJSON` to return DSL representation of the score function
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._body);
    }
}

module.exports = WeightScoreFunction;
