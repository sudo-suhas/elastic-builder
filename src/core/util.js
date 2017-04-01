'use strict';

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
 * Change first character of given string to lowercase.
 * ExampleClass -> exampleClass
 *
 * @param {string} str
 * @return {string}
 */
exports.lowercaseFirstLetter = function lowercaseFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
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
