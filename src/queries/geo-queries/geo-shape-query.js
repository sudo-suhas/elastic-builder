'use strict';

const isNil = require('lodash.isnil');

const {
    GeoShape,
    IndexedShape,
    util: { checkType, invalidParam },
    consts: { GEO_RELATION_SET }
} = require('../../core');

const GeoQueryBase = require('./geo-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-shape-query.html';

const invalidRelationParam = invalidParam(
    ES_REF_URL,
    'relation',
    GEO_RELATION_SET
);

/**
 * Filter documents indexed using the `geo_shape` type. Requires
 * the `geo_shape` Mapping.
 *
 * The `geo_shape` query uses the same grid square representation as
 * the `geo_shape` mapping to find documents that have a shape that
 * intersects with the query shape. It will also use the same PrefixTree
 * configuration as defined for the field mapping.
 *
 * The query supports two ways of defining the query shape, either by
 * providing a whole shape definition, or by referencing the name of
 * a shape pre-indexed in another index.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-shape-query.html)
 *
 * @example
 * const geoQry = esb.geoShapeQuery('location')
 *     .shape(esb.geoShape()
 *         .type('envelope')
 *         .coordinates([[13.0, 53.0], [14.0, 52.0]]))
 *     .relation('within');
 *
 * @example
 * // Pre-indexed shape
 * const geoQry = esb.geoShapeQuery()
 *     .field('location')
 *     .indexedShape(esb.indexedShape()
 *         .id('DEU')
 *         .type('countries')
 *         .index('shapes')
 *         .path('location'))
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
 */
class GeoShapeQuery extends GeoQueryBase {
    // eslint-disable-next-line require-jsdoc
    constructor(field) {
        super('geo_shape', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoShapeQuery
     */
    validationMethod() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('validationMethod is not supported in GeoShapeQuery');
    }

    /**
     * Sets the shape definition for the geo query.
     *
     * @param {GeoShape} shape
     * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If given `shape` is not an instance of `GeoShape`
     */
    shape(shape) {
        checkType(shape, GeoShape);

        this._fieldOpts.shape = shape;
        return this;
    }

    /**
     * Sets the reference name of a shape pre-indexed in another index.
     *
     * @param {IndexedShape} shape
     * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If given `shape` is not an instance of `IndexedShape`
     */
    indexedShape(shape) {
        checkType(shape, IndexedShape);

        this._fieldOpts.indexed_shape = shape;
        return this;
    }

    /**
     * Sets the relationship between Query and indexed data
     * that will be used to determine if a Document should be matched or not.
     *
     * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
     * or `INTERSECTS`(default)
     * @returns {GeoShapeQuery} returns `this` so that calls can be chained
     */
    relation(relation) {
        if (isNil(relation)) invalidRelationParam(relation);

        const relationUpper = relation.toUpperCase();
        if (!GEO_RELATION_SET.has(relationUpper)) {
            invalidRelationParam(relation);
        }

        this._fieldOpts.relation = relationUpper;
        return this;
    }

    /**
     * When set to `true` will ignore an unmapped `path` and will not match any
     * documents for this query. When set to `false` (the default value) the query
     * will throw an exception if the path is not mapped.
     *
     * @param {boolean} enable `true` or `false`, `false` by default.
     * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
     */
    ignoreUnmapped(enable) {
        this._queryOpts.ignore_unmapped = enable;
        return this;
    }
}

module.exports = GeoShapeQuery;
