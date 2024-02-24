'use strict';

const { Query } = require('../../core');
const isNil = require('lodash.isnil');

/**
 * The rank_feature query boosts the relevance score on the numeric value of
 * document with a rank_feature/rank_features field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html)
 *
 * NOTE: This query was added in elasticsearch v7.0.
 *
 * @example
 * const query = new RankFeatureQuery('rank_feature_field');
 *   query
 *       .linear()
 *       .toJSON();
 * @param {string} field The field inside the document to be used in the query
 * @extends Query
 */
class RankFeatureQuery extends Query {
    /**
     * @param {string} field The field inside the document to be used in the query
     */
    constructor(field) {
        super('rank_feature');
        if (!isNil(field)) this._queryOpts.field = field;
    }

    /**
     * Sets the field for the `rank_feature` query
     * @param {string} fieldName Name of the field inside the document
     * @returns {RankFeatureQuery} Instance of the distance feature query
     */
    field(fieldName) {
        this._queryOpts.field = fieldName;
        return this;
    }

    /**
     * Linear function to boost relevance scores based on the value of the rank feature field
     * @returns {RankFeatureQuery}
     */
    linear() {
        this._queryOpts.linear = {};
        return this;
    }

    /**
     * Saturation function to boost relevance scores based on the value of the rank feature field.
     * Uses a default pivot value computed by Elasticsearch.
     * @returns {RankFeatureQuery}
     */
    saturation() {
        this._queryOpts.saturation = {};
        return this;
    }

    /**
     * Saturation function to boost relevance scores based on the value of the rank feature field.
     * @param {number} pivot
     * @returns {RankFeatureQuery}
     */
    saturationPivot(pivot) {
        this._queryOpts.saturation = {};
        this._queryOpts.saturation.pivot = pivot;
        return this;
    }

    /**
     * The log function gives a score equal to log(scaling_factor + S), where S
     * is the value of the rank feature field and scaling_factor is a configurable
     * scaling factor.
     * @param {number} scaling_factor
     * @returns {RankFeatureQuery}
     */
    log(scalingFactor) {
        this._queryOpts.log = {};
        this._queryOpts.log.scaling_factor = scalingFactor;
        return this;
    }

    /**
     * The sigmoid function extends the saturation function with a configurable exponent.
     * @param {number} pivot
     * @param {number} exponent
     * @returns {RankFeatureQuery}
     */
    sigmoid(pivot, exponent) {
        this._queryOpts.sigmoid = {};
        this._queryOpts.sigmoid.pivot = pivot;
        this._queryOpts.sigmoid.exponent = exponent;
        return this;
    }
}

module.exports = RankFeatureQuery;
