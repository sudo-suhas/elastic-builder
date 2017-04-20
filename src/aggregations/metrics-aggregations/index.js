'use strict';

exports.MetricsAggregationBase = require('./metrics-aggregation-base');

exports.AvgAggregation = require('./avg-aggregation');
exports.CardinalityAggregation = require('./cardinality-aggregation');
exports.ExtendedStatsAggregation = require('./extended-stats-aggregation');
exports.GeoBoundsAggregation = require('./geo-bounds-aggregation');
exports.GeoCentroidAggregation = require('./geo-centroid-aggregation');
exports.MaxAggregation = require('./max-aggregation');
exports.MinAggregation = require('./min-aggregation');
exports.PercentilesAggregation = require('./percentiles-aggregation');
exports.PercentileRanksAggregation = require('./percentile-ranks-aggregation');
exports.ScriptedMetricAggregation = require('./scripted-metric-aggregation');
exports.StatsAggregation = require('./stats-aggregation');
exports.SumAggregation = require('./sum-aggregation');
exports.TopHitsAggregation = require('./top-hits-aggregation');
exports.ValueCountAggregation = require('./value-count-aggregation');
