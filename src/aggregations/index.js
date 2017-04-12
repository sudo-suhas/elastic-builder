'use strict';

// Not used in favor of explicit exports.
// IDE seems to handle those better

// const _ = require('lodash');

// const { util: { constructorWrapper } } = require('../core');

// const metricsAggs = require('./metrics-aggregations'),
//     bucketAggs = require('./bucket-aggregations');

// /* === Metrics Aggregations === */
// for (const clsName in metricsAggs) {
//     if (!has(metricsAggs, clsName)) continue;

//     exports[clsName] = metricsAggs[clsName];
//     exports[_.lowerFirst(clsName)] = constructorWrapper(metricsAggs[clsName]);
// }

// /* === Bucket Aggregations === */
// for (const clsName in bucketAggs) {
//     if (!has(bucketAggs, clsName)) continue;

//     exports[clsName] = bucketAggs[clsName];
//     exports[_.lowerFirst(clsName)] = constructorWrapper(bucketAggs[clsName]);
// }

exports.metricsAggregations = require('./metrics-aggregations');

exports.bucketAggregations = require('./bucket-aggregations');

exports.pipelineAggregations = require('./pipeline-aggregations');

exports.matrixAggregations = require('./matrix-aggregations');
