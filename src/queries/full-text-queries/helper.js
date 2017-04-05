'use strict';

const { inspect } = require('util');

const { util: { firstDigitPos }, consts: { REWRITE_METHOD_SET } } = require('../../core');

/**
 * Validate the rewrite method.
 *
 * @param {string} method
 * @param {string} paramName
 * @param {string} refUrl
 * @throws {Error} If the given rewrite method is not valid.
 */
exports.validateRewiteMethod = function validateRewiteMethod(method, paramName, refUrl) {
    if (!REWRITE_METHOD_SET.has(method)) {
        const rewriteMethodName = `${method.substring(0, firstDigitPos(method))}N`;
        if (!REWRITE_METHOD_SET.has(rewriteMethodName)) {
            console.log(`See ${refUrl}`);
            throw new Error(
                `The '${paramName}' parameter should belong to ${inspect(REWRITE_METHOD_SET)}`
            );
        }
    }
};
