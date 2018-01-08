'use strict';

const isNil = require('lodash.isnil');

/**
 * A shape which has already been indexed in another index and/or index
 * type. This is particularly useful for when you have a pre-defined list of
 * shapes which are useful to your application and you want to reference this
 * using a logical name (for example 'New Zealand') rather than having to
 * provide their coordinates each time.
 *
 * @example
 * const shape = esb.indexedShape('DEU', 'countries')
 *     .index('shapes')
 *     .path('location');
 *
 * const shape = esb.indexedShape()
 *     .id('DEU')
 *     .type('countries')
 *     .index('shapes')
 *     .path('location');
 *
 * @param {string=} id The document id of the shape.
 * @param {string=} type The name of the type where the shape is indexed.
 */
class IndexedShape {
    // eslint-disable-next-line require-jsdoc
    constructor(id, type) {
        this._body = {};

        if (!isNil(id)) this._body.id = id;
        if (!isNil(type)) this._body.type = type;
    }

    /**
     * Sets the ID of the document that containing the pre-indexed shape.
     *
     * @param {string} id The document id of the shape.
     * @returns {IndexedShape} returns `this` so that calls can be chained.
     */
    id(id) {
        this._body.id = id;
        return this;
    }

    /**
     * Sets the index type where the pre-indexed shape is.
     *
     * @param {string} type The name of the type where the shape is indexed.
     * @returns {IndexedShape} returns `this` so that calls can be chained.
     */
    type(type) {
        this._body.type = type;
        return this;
    }

    /**
     * Sets the name of the index where the pre-indexed shape is. Defaults to `shapes`.
     *
     * @param {string} index A valid index name
     * @returns {IndexedShape} returns `this` so that calls can be chained.
     */
    index(index) {
        this._body.index = index;
        return this;
    }

    /**
     * Sets the field specified as path containing the pre-indexed shape.
     * Defaults to `shape`.
     *
     * @param {string} path field name.
     * @returns {IndexedShape} returns `this` so that calls can be chained.
     */
    path(path) {
        this._body.path = path;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation of the geo shape
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return this._body;
    }
}

module.exports = IndexedShape;
