'use strict';

const { inspect } = require('util');

const isEmpty = require('lodash.isempty'),
    isObject = require('lodash.isobject'),
    map = require('lodash.map'),
    hasIn = require('lodash.hasin');

/**
 * Check if the object is instance of class type
 *
 * @private
 * @param {Object} instance
 * @param {Class} type
 * @throws {TypeError} Object must be an instance of class type
 */
exports.checkType = function checktype(instance, type) {
    if (!(instance instanceof type)) {
        console.warn(`${inspect(instance)} is of the type ${typeof instance}`);
        throw new TypeError(`Argument must be an instance of ${type.name}`);
    }
};

/**
 * Wrapper for calling constructor with given parameters
 *
 * @private
 * @param {function(new:T, ...*)} Cls The class constructor.
 * @returns {function(...*): T} Wrapper of the class constructor which creates an instance of given Class
 * @template T
 */
exports.constructorWrapper = function constructorWrapper(Cls) {
    return (...args) => new Cls(...args);
};

/**
 * Check if the number is in the given range.
 * Returns `true` is number is less than or equal to min, max.
 *
 * @private
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {Boolean} `true` if in range, `false` otherwise
 */
function between(num, min, max) {
    return num >= min && num <= max;
}

/**
 * Finds and returns the first position of first digit in string
 *
 * @private
 * @param {string} str
 * @returns {number} Index of first digit in string.
 * `-1` if digit is not found in string
 */
exports.firstDigitPos = function firstDigitPos(str) {
    if (isEmpty(str)) return -1;

    const len = str.length;
    for (let idx = 0; idx < len; idx++) {
        // '0'.charCodeAt(0) => 48
        // '9'.charCodeAt(0) => 57
        if (between(str.charCodeAt(idx), 48, 57)) return idx;
    }

    return -1;
};

/**
 * Convert class object to JSON by recursively calling `toJSON` on the class members.
 *
 * @private
 * @param {*} obj
 * @returns {Object} JSON representation of class.
 */
exports.recursiveToJSON = function recursiveToJSON(obj) {
    if (!isObject(obj)) return obj;

    if (Array.isArray(obj)) return map(obj, recursiveToJSON);

    if (hasIn(obj, 'toJSON') && obj.constructor !== Object) {
        return recursiveToJSON(obj.toJSON());
    }

    const json = {};
    for (const key of Object.keys(obj)) {
        json[key] = recursiveToJSON(obj[key]);
    }

    return json;
};
