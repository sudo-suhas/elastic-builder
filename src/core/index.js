'use strict';

// TODO: Deal with this!
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

exports.GeoShape = require('./geo-shape');

exports.IndexedShape = require('./indexed-shape');

exports.Sort = require('./sort');

exports.Rescore = require('./rescore');

exports.InnerHits = require('./inner-hits');

exports.consts = require('./consts');

exports.util = require('./util');
