'use strict';

const _ = require('lodash');

const { checkType } = require('./util');

/**
 * Base class implementation for all aggregation types.
 */
class Aggregation {

    /**
     * Creates an instance of Aggregation
     *
     * @param {string} name
     * @returns {Aggregation}
     */
    constructor(name) {
        this._aggs = {};
        this._nestedAggs = [];
        this.name = name;
        return this;
    }

    // TODO: Investigate case when getter for aggregation will be required

    /**
     * Sets nested aggregations.
     * This method can be called multiple times in order to set multiple nested aggregations.
     *
     * @param {Aggregation} aggs Any valid {@link Aggregation}
     * @returns {Aggregation} returns `this` so that calls can be chained.
     */
    aggregations(aggs) {
        checkType(aggs, Aggregation);

        this._nestedAggs.push(aggs);

        return this;
    }

    /**
     * Sets nested aggregation.
     * This method can be called multiple times in order to set multiple nested aggregations.
     *
     * @param {Aggregation} aggs Any valid {@link Aggregation}
     * @returns {Aggregation} returns `this` so that calls can be chained.
     */
    aggs(aggs) {
        return this.aggregation(aggs);
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
