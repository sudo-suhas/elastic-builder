'use strict';

const { util: { constructorWrapper } } = require('../core');

const {
    AvgAggregation,
    CardinalityAggregation,
    ExtendedStatsAggregation,
    GeoBoundsAggregation,
    GeoCentroidAggregation,
    MaxAggregation,
    MinAggregation,
    PercentilesAggregation,
    PercentileRanksAggregation,
    ScriptedMetricAggregation,
    StatsAggregation,
    SumAggregation,
    TopHitsAggregation,
    ValueCountAggregation
} = require('./metrics-aggregations');

/* === Metrics Aggregations === */
exports.AvgAggregation = AvgAggregation;
exports.avgAggregation = constructorWrapper(AvgAggregation);

exports.CardinalityAggregation = CardinalityAggregation;
exports.cardinalityAggregation = constructorWrapper(CardinalityAggregation);

exports.ExtendedStatsAggregation = ExtendedStatsAggregation;
exports.extendedStatsAggregation = constructorWrapper(ExtendedStatsAggregation);

exports.GeoBoundsAggregation = GeoBoundsAggregation;
exports.geoBoundsAggregation = constructorWrapper(GeoBoundsAggregation);

exports.GeoCentroidAggregation = GeoCentroidAggregation;
exports.geoCentroidAggregation = constructorWrapper(GeoCentroidAggregation);

exports.MaxAggregation = MaxAggregation;
exports.maxAggregation = constructorWrapper(MaxAggregation);

exports.MinAggregation = MinAggregation;
exports.minAggregation = constructorWrapper(MinAggregation);

exports.PercentilesAggregation = PercentilesAggregation;
exports.percentilesAggregation = constructorWrapper(PercentilesAggregation);

exports.PercentileRanksAggregation = PercentileRanksAggregation;
exports.percentileRanksAggregation = constructorWrapper(PercentileRanksAggregation);

exports.ScriptedMetricAggregation = ScriptedMetricAggregation;
exports.scriptedMetricAggregation = constructorWrapper(ScriptedMetricAggregation);

exports.StatsAggregation = StatsAggregation;
exports.statsAggregation = constructorWrapper(StatsAggregation);

exports.SumAggregation = SumAggregation;
exports.sumAggregation = constructorWrapper(SumAggregation);

exports.TopHitsAggregation = TopHitsAggregation;
exports.topHitsAggregation = constructorWrapper(TopHitsAggregation);

exports.ValueCountAggregation = ValueCountAggregation;
exports.valueCountAggregation = constructorWrapper(ValueCountAggregation);
