'use strict';

const { Query } = require('../../core');

/**
 * Interface-like class used to group and identify various implementations of Span queries.
 */
class SpanQueryBase extends Query {}

module.exports = SpanQueryBase;
