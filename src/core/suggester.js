'use strict';

const isNil = require('lodash.isnil');

const isEmpty = require('lodash.isempty');

/**
 * Base class implementation for all suggester types.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class should be extended and used, as validation against the class
 * type is present in various places.
 *
 * @param {string} suggesterType The type of suggester.
 * Can be one of `term`, `phrase`, `completion`
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `suggesterType` is empty
 */
class Suggester {
    // eslint-disable-next-line require-jsdoc
    constructor(suggesterType, name, field) {
        if (isEmpty(suggesterType))
            throw new Error('Suggester `suggesterType` cannot be empty');
        if (isEmpty(name)) throw new Error('Suggester `name` cannot be empty');

        this.name = name;
        this.suggesterType = suggesterType;

        this._body = {};
        this._opts = this._body[name] = {};
        this._suggestOpts = this._opts[suggesterType] = {};

        if (!isNil(field)) this._suggestOpts.field = field;
    }

    /**
     * Sets field to fetch the candidate suggestions from. This is a required option
     * that either needs to be set globally or per suggestion.
     *
     * @param {string} field a valid field name
     * @returns {Suggester} returns `this` so that calls can be chained
     */
    field(field) {
        this._suggestOpts.field = field;
        return this;
    }

    /**
     * Sets the number of suggestions to return (defaults to `5`).
     *
     * @param {number} size
     * @returns {Suggester} returns `this` so that calls can be chained.
     */
    size(size) {
        this._suggestOpts.size = size;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the `suggester`
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch DSL
     */
    toJSON() {
        return this._body;
    }
}

module.exports = Suggester;
