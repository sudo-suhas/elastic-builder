'use strict';

exports.PipelineAggregationBase = require('./pipeline-aggregation-base');

exports.AvgBucketAggregation = require('./avg-bucket-aggregation');
exports.DerivativeAggregation = require('./derivative-aggregation');
exports.MaxBucketAggregation = require('./max-bucket-aggregation');
exports.MinBucketAggregation = require('./min-bucket-aggregation');
exports.SumBucketAggregation = require('./sum-bucket-aggregation');
exports.StatsBucketAggregation = require('./stats-bucket-aggregation');
exports.ExtendedStatsBucketAggregation = require('./extended-stats-bucket-aggregation');
exports.PercentilesBucketAggregation = require('./percentiles-bucket-aggregation');
exports.MovingAverageAggregation = require('./moving-average-aggregation');
exports.MovingFunctionAggregation = require('./moving-function-aggregation');
exports.CumulativeSumAggregation = require('./cumulative-sum-aggregation');
exports.BucketScriptAggregation = require('./bucket-script-aggregation');
exports.BucketSelectorAggregation = require('./bucket-selector-aggregation');
exports.SerialDifferencingAggregation = require('./serial-differencing-aggregation');
exports.BucketSortAggregation = require('./bucket-sort-aggregation');
