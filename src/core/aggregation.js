'use strict';

const has = require('lodash.has');
const isEmpty = require('lodash.isempty');

const { checkType, recursiveToJSON } = require('./util');

/**
 * Base class implementation for all aggregation types.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class should be extended and used, as validation against the class
 * type is present in various places.
 *
 * @param {string} name
 * @param {string} aggType Type of aggregation
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `aggType` is empty
 */
class Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType) {
        if (isEmpty(aggType))
            throw new Error('Aggregation `aggType` cannot be empty');

        this._name = name;
        this.aggType = aggType;

        this._aggs = {};
        this._aggsDef = this._aggs[aggType] = {};
        this._nestedAggs = [];
    }

    // TODO: Investigate case when getter for aggregation will be required

    /**
     * Sets name for aggregation.
     *
     * @param {string} name returns `this` so that calls can be chained.
     * @returns {Aggregation}
     */
    name(name) {
        this._name = name;
        return this;
    }

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
     * Sets multiple nested aggregation items.
     * This method accepts an array to set multiple nested aggregations in one call.
     *
     * @param {Array<Aggregation>} aggs Array of valid {@link Aggregation} items
     * @returns {Aggregation} returns `this` so that calls can be chained.
     * @throws {TypeError} If `aggs` is not an instance of `Array`
     * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
     */
    aggregations(aggs) {
        checkType(aggs, Array);

        aggs.forEach(agg => this.aggregation(agg));

        return this;
    }

    /**
     * Sets multiple nested aggregation items.
     * Alias for method `aggregations`
     *
     * @param {Array<Aggregation>} aggs Array of valid {@link Aggregation} items
     * @returns {Aggregation} returns `this` so that calls can be chained.
     * @throws {TypeError} If `aggs` is not an instance of `Array`
     * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
     */
    aggs(aggs) {
        return this.aggregations(aggs);
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
     * Internal helper function for determining the aggregation name.
     *
     * @returns {string} Aggregation name
     * @private
     */
    _aggsName() {
        if (!isEmpty(this._name)) return this._name;

        if (has(this._aggsDef, 'field')) {
            return `agg_${this.aggType}_${this._aggsDef.field}`;
        }

        // At this point, it would be difficult to construct a unique
        // aggregation name. Error out.
        throw new Error('Aggregation name could not be determined');
    }

    /**
     * Build and returns DSL representation of the `Aggregation` class instance.
     *
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    getDSL() {
        return this.toJSON();
    }

    /**
     * Override default `toJSON` to return DSL representation for the `aggregation` query.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        const mainAggs = recursiveToJSON(this._aggs);

        if (!isEmpty(this._nestedAggs)) {
            mainAggs.aggs = Object.assign(
                {},
                ...recursiveToJSON(this._nestedAggs)
            );
        }

        return { [this._aggsName()]: mainAggs };
    }
}

module.exports = Aggregation;
