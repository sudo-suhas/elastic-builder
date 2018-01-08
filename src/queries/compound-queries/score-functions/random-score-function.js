'use strict';

const ScoreFunction = require('./score-function');

/**
 * The `random_score` generates scores using a hash of the `_uid` field,
 * with a `seed` for variation. If `seed` is not specified, the current time is used.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-random)
 *
 * @example
 * const scoreFunc = esb.randomScoreFunction().seed(299792458);
 *
 * @extends ScoreFunction
 */
class RandomScoreFunction extends ScoreFunction {
    // eslint-disable-next-line require-jsdoc
    constructor() {
        super('random_score');
    }

    /**
     * Sets random seed value.
     *
     * @param {number} seed A seed value.
     * @returns {RandomScoreFunction} returns `this` so that calls can be chained.
     */
    seed(seed) {
        this._opts.seed = seed;
        return this;
    }
}

module.exports = RandomScoreFunction;
