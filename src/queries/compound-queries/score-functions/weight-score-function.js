'use strict';

const ScoreFunction = require('./score-function');

/**
 * The `weight` score allows you to multiply the score by the provided `weight`.
 * This can sometimes be desired since boost value set on specific queries gets
 * normalized, while for this score function it does not.
 * The number value is of type float.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-weight)
 *
 * @example
 * const scoreFunc = bob.weightScoreFunction().weight(42);
 *
 * @param {string} name
 */
class WeightScoreFunction extends ScoreFunction {}

module.exports = WeightScoreFunction;
