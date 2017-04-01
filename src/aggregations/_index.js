'use strict';

// Not used in favor of explicit exports.
// IDE seems to handle those better

// const _ = require('lodash');

// const { util: { lowercaseFirstLetter, constructorWrapper } } = require('../core');

// const metricsAggs = require('./metrics-aggregations'),
//     bucketAggs = require('./bucket-aggregations');

// /* === Metrics Aggregations === */
// for (const clsName in metricsAggs) {
//     if (!_.has(metricsAggs, clsName)) continue;

//     exports[clsName] = metricsAggs[clsName];
//     exports[lowercaseFirstLetter(clsName)] = constructorWrapper(metricsAggs[clsName]);
// }

// /* === Bucket Aggregations === */
// for (const clsName in bucketAggs) {
//     if (!_.has(bucketAggs, clsName)) continue;

//     exports[clsName] = bucketAggs[clsName];
//     exports[lowercaseFirstLetter(clsName)] = constructorWrapper(bucketAggs[clsName]);
// }
