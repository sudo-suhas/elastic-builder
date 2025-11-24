'use strict';

/**
 * Checks if value is null or undefined.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is null or undefined, else false.
 */
exports.isNil = function isNil(value) {
    return value === null || value === undefined;
};

/**
 * Checks if value is a string.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is a string, else false.
 */
exports.isString = function isString(value) {
    return typeof value === 'string';
};

/**
 * Checks if value is an object type (not null, not an array).
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is an object, else false.
 */
exports.isObject = function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Checks if object has a direct property (own property).
 *
 * @param {Object} object The object to check.
 * @param {string} key The property name to check.
 * @returns {boolean} Returns true if object has the property, else false.
 */
exports.has = function has(object, key) {
    return object != null && Object.prototype.hasOwnProperty.call(object, key);
};

/**
 * Checks if object has a property (including inherited properties).
 *
 * @param {Object} object The object to check.
 * @param {string} key The property name to check.
 * @returns {boolean} Returns true if object has the property, else false.
 */
exports.hasIn = function hasIn(object, key) {
    return object != null && key in object;
};

/**
 * Creates a new object excluding specified keys.
 *
 * @param {Object} object The source object.
 * @param {Array<string>} keys The keys to exclude.
 * @returns {Object} Returns the new object with specified keys omitted.
 */
exports.omit = function omit(object, keys) {
    if (object == null) return {};
    const result = {};
    const keysToOmit = new Set(keys);
    for (const key in object) {
        if (
            Object.prototype.hasOwnProperty.call(object, key) &&
            !keysToOmit.has(key)
        ) {
            result[key] = object[key];
        }
    }
    return result;
};

/**
 * Checks if value is empty (null, undefined, empty string, empty array, or empty object).
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if value is empty, else false.
 */
exports.isEmpty = function isEmpty(value) {
    if (value == null) return true;
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
};

/**
 * Gets the first element of an array.
 *
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of array.
 */
exports.head = function head(array) {
    return array != null ? array[0] : undefined;
};
