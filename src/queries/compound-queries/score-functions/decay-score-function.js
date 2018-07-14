'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam, recursiveToJSON }
} = require('../../../core');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-decay';

const ScoreFunction = require('./score-function');

const invalidModeParam = invalidParam(
    ES_REF_URL,
    'mode',
    "'linear', 'exp' or 'gauss'"
);

/**
 * Decay functions score a document with a function that decays depending on
 * the distance of a numeric field value of the document from a user given
 * origin. This is similar to a range query, but with smooth edges instead of
 * boxes.
 *
 * Supported decay functions are: `linear`, `exp`, and `gauss`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-decay)
 *
 * If no `mode` is supplied, `gauss` will be used.
 *
 * @example
 * // Defaults to decay function `gauss`
 * const decayFunc = esb.decayScoreFunction()
 *     .field('location') // field is a geo_point
 *     .origin('11, 12') // geo format
 *     .scale('2km')
 *     .offset('0km')
 *     .decay(0.33);
 *
 * @example
 * const decayFunc = esb.decayScoreFunction('gauss', 'date')
 *     .origin('2013-09-17')
 *     .scale('10d')
 *     .offset('5d')
 *     .decay(0.5);
 *
 * @param {string=} mode Can be one of `linear`, `exp`, and `gauss`.
 * Defaults to `gauss`.
 * @param {string=} field the document field to run decay function against.
 *
 * @extends ScoreFunction
 */
class DecayScoreFunction extends ScoreFunction {
    // eslint-disable-next-line require-jsdoc
    constructor(mode = 'gauss', field) {
        super(mode);

        if (!isNil(field)) this._field = field;
    }

    /**
     * Set the decay mode.
     *
     * @param {string} mode  Can be one of `linear`, `exp`, and `gauss`.
     * Defaults to `gauss`.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    mode(mode) {
        if (isNil(mode)) invalidModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (
            modeLower !== 'linear' &&
            modeLower !== 'exp' &&
            modeLower !== 'gauss'
        ) {
            invalidModeParam(mode);
        }

        this._name = mode;
        return this;
    }

    /**
     * Sets the decay mode to linear.
     * Alias for `mode('linear')`
     *
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    linear() {
        this._name = 'linear';
        return this;
    }

    /**
     * Sets the decay mode to exp.
     * Alias for `mode('exp')`
     *
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    exp() {
        this._name = 'exp';
        return this;
    }

    /**
     * Sets the decay mode to gauss.
     * Alias for `mode('gauss')`
     *
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    gauss() {
        this._name = 'gauss';
        return this;
    }

    /**
     * Sets the document field to run decay function against.
     *
     * @param {string} field the document field to run decay function against.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    field(field) {
        this._field = field;
        return this;
    }

    /**
     * The point of origin used for calculating distance. Must be given as a number
     * for numeric field, date for date fields and geo point for geo fields.
     * Required for geo and numeric field. For date fields the default is `now`.
     * Date math (for example `now-1h`) is supported for origin.
     *
     * @param {number|string|Object} origin A valid origin value for the field type.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    origin(origin) {
        this._opts.origin = origin;
        return this;
    }

    /**
     * Required for all types. Defines the distance from origin + offset at which
     * the computed score will equal decay parameter. For geo fields: Can be defined
     * as number+unit (`1km`, `12m`,…). Default unit is meters. For date fields: Can be
     * defined as a number+unit (`1h`, `10d`,…). Default unit is milliseconds.
     * For numeric field: Any number.
     *
     * @param {number|string} scale A valid scale value for the field type.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    scale(scale) {
        this._opts.scale = scale;
        return this;
    }

    /**
     * If an `offset` is defined, the decay function will only compute the decay function
     * for documents with a distance greater that the defined offset. The default is `0`.
     *
     * @param {number|string} offset A valid offset value for the field type.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    offset(offset) {
        this._opts.offset = offset;
        return this;
    }

    /**
     * The `decay` parameter defines how documents are scored at the distance given at `scale`.
     * If no `decay` is defined, documents at the distance `scale` will be scored `0.5`.
     *
     * @param {number} decay A decay value as a double.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */
    decay(decay) {
        this._opts.decay = decay;
        return this;
    }

    /**
     * Overrides default `toJSON` to return DSL representation of the decay score function
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // TODO: If mode/field is not set throw an error.
        const repr = Object.assign(
            { [this._name]: { [this._field]: this._opts } },
            this._body
        );
        return recursiveToJSON(repr);
    }
}

module.exports = DecayScoreFunction;
