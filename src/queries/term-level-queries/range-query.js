'use strict';

const isNil = require('lodash.isnil');

const {
    util: { invalidParam },
    consts: { GEO_RELATION_SET }
} = require('../../core');

const MultiTermQueryBase = require('./multi-term-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html';

const invalidRelationParam = invalidParam(
    ES_REF_URL,
    'relation',
    GEO_RELATION_SET
);

/**
 * Matches documents with fields that have terms within a certain range.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 *
 * @param {string=} field
 *
 * @example
 * const qry = esb.rangeQuery('age')
 *     .gte(10)
 *     .lte(20)
 *     .boost(2.0);
 *
 * @example
 * const qry = esb.rangeQuery('date').gte('now-1d/d').lt('now/d');
 *
 * @extends MultiTermQueryBase
 */
class RangeQuery extends MultiTermQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        super('range', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on RangeQuery
     */
    value() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('value is not supported in RangeQuery');
    }

    /**
     * Greater-than or equal to
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    gte(val) {
        this._queryOpts.gte = val;
        return this;
    }

    /**
     * Less-than or equal to
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    lte(val) {
        this._queryOpts.lte = val;
        return this;
    }

    /**
     * Greater-than
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    gt(val) {
        this._queryOpts.gt = val;
        return this;
    }

    /**
     * Less-than
     *
     * @param {string|number} val
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    lt(val) {
        this._queryOpts.lt = val;
        return this;
    }

    /**
     * The lower bound. Defaults to start from the first.
     *
     * @param {string|number} val The lower bound value, type depends on field type
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    from(val) {
        this._queryOpts.from = val;
        return this;
    }

    /**
     * The upper bound. Defaults to unbounded.
     *
     * @param {string|number} val The upper bound value, type depends on field type
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    to(val) {
        this._queryOpts.to = val;
        return this;
    }

    /**
     * Should the first from (if set) be inclusive or not. Defaults to `true`
     *
     * @param {boolean} enable `true` to include, `false` to exclude
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    includeLower(enable) {
        this._queryOpts.include_lower = enable;
        return this;
    }

    /**
     * Should the last to (if set) be inclusive or not. Defaults to `true`.
     *
     * @param {boolean} enable `true` to include, `false` to exclude
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    includeUpper(enable) {
        this._queryOpts.include_upper = enable;
        return this;
    }

    /**
     * Time Zone to be applied to any range query related to dates.
     *
     * @param {string} zone
     * @returns {RangeQuery} returns `this` so that calls can be chained.
     */
    timeZone(zone) {
        this._queryOpts.time_zone = zone;
        return this;
    }

    /**
     * Sets the format expression for parsing the upper and lower bounds.
     * If no format is specified, then it will use the first format specified in the field mapping.
     *
     * @example
     * const qry = esb.rangeQuery('born')
     *     .gte('01/01/2012')
     *     .lte('2013')
     *     .format('dd/MM/yyyy||yyyy');
     *
     * @param {string} fmt Format for parsing upper and lower bounds.
     * @returns {RangeQuery} returns `this` so that calls can be chained
     */
    format(fmt) {
        this._queryOpts.format = fmt;
        return this;
    }

    /**
     * Sets the relationship between Query and indexed data
     * that will be used to determine if a Document should be matched or not.
     *
     * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
     * or `INTERSECTS`(default)
     * @returns {RangeQuery} returns `this` so that calls can be chained
     */
    relation(relation) {
        if (isNil(relation)) invalidRelationParam(relation);

        const relationUpper = relation.toUpperCase();
        if (!GEO_RELATION_SET.has(relationUpper)) {
            invalidRelationParam(relation);
        }

        this._queryOpts.relation = relationUpper;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the `range` query
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        // recursiveToJSON doesn't seem to be required here.
        return {
            [this.queryType]: {
                [this._field]: this._queryOpts
            }
        };
    }
}

module.exports = RangeQuery;
