'use strict';

const { inspect } = require('../core/inspect');

const {
    util: { firstDigitPos },
    consts: { REWRITE_METHOD_SET }
} = require('../core');

/**
 * Validate the rewrite method.
 *
 * @private
 * @param {string} method
 * @param {string} paramName
 * @param {string} refUrl
 * @throws {Error} If the given rewrite method is not valid.
 */
exports.validateRewiteMethod = function validateRewiteMethod(
    method,
    paramName,
    refUrl
) {
    // NOTE: This does not check for lower case comparison.
    if (!REWRITE_METHOD_SET.has(method)) {
        const rewriteMethodName = `${method.substring(
            0,
            firstDigitPos(method)
        )}N`;
        if (!REWRITE_METHOD_SET.has(rewriteMethodName)) {
            console.log(`See ${refUrl}`);
            console.warn(`Got '${paramName}' - ${method}`);
            throw new Error(
                `The '${paramName}' parameter should belong to ${inspect(
                    REWRITE_METHOD_SET
                )}`
            );
        }
    }
};
