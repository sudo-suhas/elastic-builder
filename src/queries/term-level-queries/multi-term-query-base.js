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
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends ValueTermQueryBase
 */
class MultiTermQueryBase extends ValueTermQueryBase {}

module.exports = MultiTermQueryBase;
