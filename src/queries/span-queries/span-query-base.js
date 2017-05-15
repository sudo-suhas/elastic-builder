'use strict';

const { Query } = require('../../core');

/**
 * Interface-like class used to group and identify various implementations of Span queries.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends Query
 */
class SpanQueryBase extends Query {}

module.exports = SpanQueryBase;
