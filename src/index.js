'use strict';

/*
    DON'T LOOK AT ME!!! I AM HIDEOUS :-{ I USED TO BE SHORT AND CONSISE

    const aggregations = require('./aggregations'),
        queries = require('./queries'),
        scriptTypes = require('./script-types'),
        { Highlight, GeoPoint, util: { constructorWrapper } } = require('./core');

    // The builder
    const bob = {
        Highlight,
        highlight: constructorWrapper(Highlight),
        GeoPoint,
        geoPoint: constructorWrapper(GeoPoint)
    };

    Object.assign(bob, aggregations, queries, scriptTypes);

    module.exports = bob;

    BUT THEN IDE WAS LIKE 'I HAVE NO IDEA WHAT YOU ARE TALKING ABOUT'
    SO I ENDED UP LIKE THIS. OH IDE.. THE THINGS I DO FOR YOU...
*/

const { Highlight, GeoPoint, util: { constructorWrapper } } = require('./core');

const { InlineScript, StoredScript, FileScript } = require('./script-types');

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
} = require('./aggregations/metrics-aggregations');

const {
    ChildrenAggregation,
    DateHistogramAggregation,
    DateRangeAggregation,
    DiversifiedSamplerAggregation,
    FilterAggregation,
    FiltersAggregation,
    GeoDistanceAggregation,
    GeoHashGridAggregation,
    GlobalAggregation,
    HistogramAggregation,
    IpRangeAggregation,
    MissingAggregation,
    NestedAggregation,
    RangeAggregation,
    ReverseNestedAggregation,
    SamplerAggregation,
    SignificantTermsAggregation,
    TermsAggregation
} = require('./aggregations/bucket-aggregations');

const {
    AvgBucketAggregation,
    DerivativeAggregation,
    MaxBucketAggregation,
    MinBucketAggregation,
    SumBucketAggregation,
    StatsBucketAggregation,
    ExtendedStatsBucketAggregation,
    PercentilesBucketAggregation,
    MovingAverageAggregation,
    CumulativeSumAggregation,
    BucketScriptAggregation,
    BucketSelectorAggregation,
    SerialDifferencingAggregation
} = require('./aggregations/pipeline-aggregations');

const { MatrixStatsAggregation } = require('./aggregations/matrix-aggregations');

/* ============ ============ ============ */
/* ======== Metrics Aggregations ======== */
/* ============ ============ ============ */
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

/* ============ ============ ============ */
/* ========= Bucket Aggregations ======== */
/* ============ ============ ============ */
exports.ChildrenAggregation = ChildrenAggregation;
exports.childrenAggregation = constructorWrapper(ChildrenAggregation);

exports.DateHistogramAggregation = DateHistogramAggregation;
exports.dateHistogramAggregation = constructorWrapper(DateHistogramAggregation);

exports.DateRangeAggregation = DateRangeAggregation;
exports.dateRangeAggregation = constructorWrapper(DateRangeAggregation);

exports.DiversifiedSamplerAggregation = DiversifiedSamplerAggregation;
exports.diversifiedSamplerAggregation = constructorWrapper(DiversifiedSamplerAggregation);

exports.FilterAggregation = FilterAggregation;
exports.filterAggregation = constructorWrapper(FilterAggregation);

exports.FiltersAggregation = FiltersAggregation;
exports.filtersAggregation = constructorWrapper(FiltersAggregation);

exports.GeoDistanceAggregation = GeoDistanceAggregation;
exports.geoDistanceAggregation = constructorWrapper(GeoDistanceAggregation);

exports.GeoHashGridAggregation = GeoHashGridAggregation;
exports.geoHashGridAggregation = constructorWrapper(GeoHashGridAggregation);

exports.GlobalAggregation = GlobalAggregation;
exports.globalAggregation = constructorWrapper(GlobalAggregation);

exports.HistogramAggregation = HistogramAggregation;
exports.histogramAggregation = constructorWrapper(HistogramAggregation);

exports.IpRangeAggregation = IpRangeAggregation;
exports.ipRangeAggregation = constructorWrapper(IpRangeAggregation);

exports.MissingAggregation = MissingAggregation;
exports.missingAggregation = constructorWrapper(MissingAggregation);

exports.NestedAggregation = NestedAggregation;
exports.nestedAggregation = constructorWrapper(NestedAggregation);

exports.RangeAggregation = RangeAggregation;
exports.rangeAggregation = constructorWrapper(RangeAggregation);

exports.ReverseNestedAggregation = ReverseNestedAggregation;
exports.reverseNestedAggregation = constructorWrapper(ReverseNestedAggregation);

exports.SamplerAggregation = SamplerAggregation;
exports.samplerAggregation = constructorWrapper(SamplerAggregation);

exports.SignificantTermsAggregation = SignificantTermsAggregation;
exports.significantTermsAggregation = constructorWrapper(SignificantTermsAggregation);

exports.TermsAggregation = TermsAggregation;
exports.termsAggregation = constructorWrapper(TermsAggregation);

/* ============ ============ ============ */
/* ======== Pipeline Aggregations ======= */
/* ============ ============ ============ */
exports.AvgBucketAggregation = AvgBucketAggregation;
exports.avgBucketAggregation = constructorWrapper(AvgBucketAggregation);

exports.DerivativeAggregation = DerivativeAggregation;
exports.derivativeAggregation = constructorWrapper(DerivativeAggregation);

exports.MaxBucketAggregation = MaxBucketAggregation;
exports.maxBucketAggregation = constructorWrapper(MaxBucketAggregation);

exports.MinBucketAggregation = MinBucketAggregation;
exports.minBucketAggregation = constructorWrapper(MinBucketAggregation);

exports.SumBucketAggregation = SumBucketAggregation;
exports.sumBucketAggregation = constructorWrapper(SumBucketAggregation);

exports.StatsBucketAggregation = StatsBucketAggregation;
exports.statsBucketAggregation = constructorWrapper(StatsBucketAggregation);

exports.ExtendedStatsBucketAggregation = ExtendedStatsBucketAggregation;
exports.extendedStatsBucketAggregation = constructorWrapper(ExtendedStatsBucketAggregation);

exports.PercentilesBucketAggregation = PercentilesBucketAggregation;
exports.percentilesBucketAggregation = constructorWrapper(PercentilesBucketAggregation);

exports.MovingAverageAggregation = MovingAverageAggregation;
exports.movingAverageAggregation = constructorWrapper(MovingAverageAggregation);

exports.CumulativeSumAggregation = CumulativeSumAggregation;
exports.cumulativeSumAggregation = constructorWrapper(CumulativeSumAggregation);

exports.BucketScriptAggregation = BucketScriptAggregation;
exports.bucketScriptAggregation = constructorWrapper(BucketScriptAggregation);

exports.BucketSelectorAggregation = BucketSelectorAggregation;
exports.bucketSelectorAggregation = constructorWrapper(BucketSelectorAggregation);

exports.SerialDifferencingAggregation = SerialDifferencingAggregation;
exports.serialDifferencingAggregation = constructorWrapper(SerialDifferencingAggregation);

/* ============ ============ ============ */
/* ========= Matrix Aggregations ======== */
/* ============ ============ ============ */
exports.MatrixStatsAggregation = MatrixStatsAggregation;
exports.MatrixStatsAggregation = constructorWrapper(MatrixStatsAggregation);

/* ============ ============ ============ */
/* ============ Script Types ============  */
/* ============ ============ ============ */
exports.InlineScript = InlineScript;
exports.inlineScript = constructorWrapper(InlineScript);

exports.StoredScript = StoredScript;
exports.storedScript = constructorWrapper(StoredScript);

exports.FileScript = FileScript;
exports.fileScript = constructorWrapper(FileScript);

/* ============ ============ ============ */
/* ============ Miscellaneous ===========  */
/* ============ ============ ============ */
exports.Highlight = Highlight;
exports.highlight = constructorWrapper(Highlight);

exports.GeoPoint = GeoPoint;
exports.geoPoint = constructorWrapper(GeoPoint);
