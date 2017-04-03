'use strict';

/**
 * Core class modules
 *
 * @module elastic-builder/core
 */

// Base classes

exports.RequestBodySearch = require('./request-body-search');

exports.Aggregation = require('./aggregation');

exports.Query = require('./query');

exports.Highlight = require('./highlight');

exports.GeoPoint = require('./geo-point');

exports.Sort = require('./sort');

exports.Rescore = require('./rescore');

exports.InnerHits = require('./inner-hits');

exports.consts = require('./consts');

exports.util = require('./util');
