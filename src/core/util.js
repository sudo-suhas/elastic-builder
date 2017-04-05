'use strict';

const _ = require('lodash');

/**
 * Check if the object is instance of class type
 *
 * @param {Object} instance
 * @param {Class} type
 * @throws {TypeError} Object must be an instance of class type
 */
exports.checkType = function checktype(instance, type) {
    if (!(instance instanceof type)) {
        throw new TypeError(`Argument must be an instance of ${type.name}`);
    }
};

/**
 * Wrapper for calling constructor with given parameters
 *
 * @param {Class} Cls
 * @returns {function} Wrapper on constructor which creates an instance of given Class
 */
exports.constructorWrapper = function constructorWrapper(Cls) {
    return (...args) => new Cls(...args);
};

/**
 * Check if the number is in the given range.
 * Returns `true` is number is less than or equal to min, max.
 *
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
 * @param {string} str
 * @returns {number} Index of first digit in string.
 * `-1` if digit is not found in string
 */
exports.firstDigitPos = function firstDigitPos(str) {
    if (_.isEmpty(str)) return -1;

    const len = str.length;
    for (let idx = 0; idx < len; idx++) {
        // '0'.charCodeAt(0) => 48
        // '9'.charCodeAt(0) => 57
        if (between(str.charCodeAt(idx), 48, 57)) return idx;
    }

    return -1;
};
