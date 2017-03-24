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
 * Wrapper for calling constructor with given parameters
 *
 * @param {Class} Cls
 * @returns {Object} an instance of given Class
 */
exports.constructorWrapper = Cls => (...args) => new Cls(...args);
