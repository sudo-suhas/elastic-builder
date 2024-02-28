'use strict';

const { Script } = require('../../core');
const MetricsAggregationBase = require('./metrics-aggregation-base');
const isNil = require('lodash.isnil');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-weight-avg-aggregation.html';

/**
 * A single-value metrics aggregation that computes the weighted average of numeric values that are extracted from the aggregated documents.
 * These values can be extracted either from specific numeric fields in the documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-weight-avg-aggregation.html)
 *
 * Added in Elasticsearch v6.4.0
 * [Release notes](https://www.elastic.co/guide/en/elasticsearch/reference/6.4/release-notes-6.4.0.html)
 *
 * As a formula, a weighted average is ∑(value * weight) / ∑(weight)
 *
 * @example
 * // Compute the average grade over all documents, weighing by teacher score.
 * const agg = esb.weightedAverageAggregation('avg_grade', 'grade', 'teacher_score');
 *
 * @example
 * // Compute the average grade where the weight is calculated by a script.
 * // Filling in missing values as '10'.
 * const agg = esb.weightedAverageAggregation('avg_grade', 'grade')
 *      .weight(esb.script('inline', "doc['teacher_score'].value").lang('painless'), 10)
 * );
 *
 * @example
 * // Compute the average grade, weighted by teacher score, filling in missing values.
 * const agg = esb.weightedAverageAggregation('avg_grade').value('grade', 5).weight('teacher_score', 10));
 *
 * @example
 * // Compute the average grade over all documents, weighing by teacher score.
 * const agg = esb.weightedAverageAggregation('avg_grade').value('grade').weight('teacher_score');
 *
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} value The field or script to use as the value
 * @param {string=} weight The field or script to use as the weight
 *
 * @extends MetricsAggregationBase
 */
class WeightedAverageAggregation extends MetricsAggregationBase {
    /**
     * Creates an instance of `WeightedAverageAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} value The field or script to be used as the value.
     * @param {string=} weight The field or script to be used as the weighting.
     */
    constructor(name, value, weight) {
        super(name, 'weighted_avg');

        this._aggsDef.value = {};
        this._aggsDef.weight = {};

        if (!isNil(value)) {
            this.value(value);
        }

        if (!isNil(weight)) {
            this.weight(weight);
        }
    }

    /**
     * Sets the value
     *
     * @param {string | Script} value Field name or script to use as the value.
     *
     * @param {number=} missing Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     * @returns {WeightedAverageAggregation} returns `this` so that calls can be chained
     */
    value(value, missing) {
        if (typeof value !== 'string' && !(value instanceof Script)) {
            throw new TypeError(
                'Value must be either a string or instanceof Script'
            );
        }

        if (value instanceof Script) {
            if (this._aggsDef.value.field) {
                delete this._aggsDef.value.field;
            }
            this._aggsDef.value.script = value;
        } else {
            if (this._aggsDef.value.script) {
                delete this._aggsDef.value.script;
            }
            this._aggsDef.value.field = value;
        }

        if (!isNil(missing)) {
            this._aggsDef.value.missing = missing;
        }

        return this;
    }

    /**
     * Sets the weight
     *
     * @param {string | Script} weight Field name or script to use as the weight.
     * @param {number=} missing Sets the missing parameter which defines how documents
     * that are missing a value should be treated.
     * @returns {WeightedAverageAggregation} returns `this` so that calls can be chained
     */
    weight(weight, missing) {
        if (typeof weight !== 'string' && !(weight instanceof Script)) {
            throw new TypeError(
                'Weight must be either a string or instanceof Script'
            );
        }

        if (weight instanceof Script) {
            if (this._aggsDef.weight.field) {
                delete this._aggsDef.weight.field;
            }
            this._aggsDef.weight.script = weight;
        } else {
            if (this._aggsDef.weight.script) {
                delete this._aggsDef.weight.script;
            }
            this._aggsDef.weight.field = weight;
        }

        if (!isNil(missing)) {
            this._aggsDef.weight.missing = missing;
        }

        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on WeightedAverageAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'script is not supported in WeightedAverageAggregation'
        );
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on WeightedAverageAggregation
     */
    missing() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'missing is not supported in WeightedAverageAggregation'
        );
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on WeightedAverageAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in WeightedAverageAggregation');
    }
}

module.exports = WeightedAverageAggregation;
