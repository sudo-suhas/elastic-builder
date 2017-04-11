'use strict';

const ValueTermQueryBase = require('./value-term-query-base');

/**
 * Interface-like class used to group and identify various implementations of
 * multi term queries:
 *
 * - Wildcard Query
 * - Fuzzy Query
 * - Prefix Query
 * - Range Query
 * - Regexp Query
 *
 * @extends ValueTermQueryBase
 */
class MultiTermQueryBase extends ValueTermQueryBase {}

module.exports = MultiTermQueryBase;
