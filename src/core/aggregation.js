'use strict';

const _ = require('lodash');

const { checkType } = require('./util');

/**
 * Base class implementation for all aggregation types.
 */
class Aggregation {

    /**
     * Creates an instance of `Aggregation`
     *
     * @param {string} name
     * @param {string} type Type of aggregation
     * @returns {Aggregation}
     */
    constructor(name, type) {
        // TODO: Throw error if name or type is not present.
        this.name = name;
        this.type = type;

        this._aggs = {};
        this._aggsDef = this._aggs[type] = {};
        this._nestedAggs = [];

        return this;
    }

    // TODO: Investigate case when getter for aggregation will be required

    /**
     * Sets nested aggregations.
     * This method can be called multiple times in order to set multiple nested aggregations.
     *
     * @param {Aggregation} agg Any valid {@link Aggregation}
     * @returns {Aggregation} returns `this` so that calls can be chained.
     * @throws {TypeError} If `agg` is not an instance of `Aggregation`
     */
    aggregation(agg) {
        checkType(agg, Aggregation);

        // Possible to check for Global aggregation?
        // Global aggregation can only be at the top level.

        this._nestedAggs.push(agg);

        return this;
    }

    /**
     * Sets nested aggregation.
     * This method can be called multiple times in order to set multiple nested aggregations.
     *
     * @param {Aggregation} agg Any valid {@link Aggregation}
     * @returns {Aggregation} returns `this` so that calls can be chained.
     */
    agg(agg) {
        return this.aggregation(agg);
    }

    /**
     * You can associate a piece of metadata with individual aggregations at request time
     * that will be returned in place at response time.
     *
     * @param {Object} meta
     * @returns {Aggregation} returns `this` so that calls can be chained.
     */
    meta(meta) {
        this._aggs.meta = meta;
        return this;
    }

    /**
     * Build and returns DSL representation of the Aggregation class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    getDSL() {
        const repr = {
            [this.name]: this._aggs
        };

        if (!_.isEmpty(this._nestedAggs)) {
            const nestedAggsRepr = repr.aggs = {};
            for (const aggs of this._nestedAggs) nestedAggsRepr[aggs.name] = aggs.getDSL();
        }

        return repr;
    }

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object}
     */
    toJSON() {
        return this.getDSL();
    }
}

module.exports = Aggregation;
