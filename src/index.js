/* eslint-disable max-lines */

'use strict';

const {
    RequestBodySearch,
    Highlight,
    Script,
    GeoPoint,
    GeoShape,
    IndexedShape,
    Sort,
    Rescore,
    InnerHits,
    SearchTemplate,
    Query,
    util: { constructorWrapper }
} = require('./core');

const {
    MatchAllQuery,
    MatchNoneQuery,
    fullTextQueries: {
        MatchQuery,
        MatchPhraseQuery,
        MatchPhrasePrefixQuery,
        MultiMatchQuery,
        CommonTermsQuery,
        QueryStringQuery,
        SimpleQueryStringQuery
    },
    termLevelQueries: {
        TermQuery,
        TermsQuery,
        TermsSetQuery,
        RangeQuery,
        ExistsQuery,
        PrefixQuery,
        WildcardQuery,
        RegexpQuery,
        FuzzyQuery,
        TypeQuery,
        IdsQuery
    },
    compoundQueries: {
        ConstantScoreQuery,
        BoolQuery,
        DisMaxQuery,
        FunctionScoreQuery,
        BoostingQuery,
        scoreFunctions: {
            ScriptScoreFunction,
            WeightScoreFunction,
            RandomScoreFunction,
            FieldValueFactorFunction,
            DecayScoreFunction
        }
    },
    joiningQueries: {
        NestedQuery,
        HasChildQuery,
        HasParentQuery,
        ParentIdQuery
    },
    geoQueries: {
        GeoShapeQuery,
        GeoBoundingBoxQuery,
        GeoDistanceQuery,
        GeoPolygonQuery
    },
    specializedQueries: {
        MoreLikeThisQuery,
        ScriptQuery,
        PercolateQuery,
        DistanceFeatureQuery
    },
    spanQueries: {
        SpanTermQuery,
        SpanMultiTermQuery,
        SpanFirstQuery,
        SpanNearQuery,
        SpanOrQuery,
        SpanNotQuery,
        SpanContainingQuery,
        SpanWithinQuery,
        SpanFieldMaskingQuery
    }
} = require('./queries');

const {
    metricsAggregations: {
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
    },
    bucketAggregations: {
        AdjacencyMatrixAggregation,
        ChildrenAggregation,
        CompositeAggregation,
        DateHistogramAggregation,
        AutoDateHistogramAggregation,
        VariableWidthHistogramAggregation,
        DateRangeAggregation,
        DiversifiedSamplerAggregation,
        FilterAggregation,
        FiltersAggregation,
        GeoDistanceAggregation,
        GeoHashGridAggregation,
        GeoHexGridAggregation,
        GeoTileGridAggregation,
        GlobalAggregation,
        HistogramAggregation,
        IpRangeAggregation,
        MissingAggregation,
        NestedAggregation,
        ParentAggregation,
        RangeAggregation,
        RareTermsAggregation,
        ReverseNestedAggregation,
        SamplerAggregation,
        SignificantTermsAggregation,
        SignificantTextAggregation,
        TermsAggregation
    },
    pipelineAggregations: {
        AvgBucketAggregation,
        DerivativeAggregation,
        MaxBucketAggregation,
        MinBucketAggregation,
        SumBucketAggregation,
        StatsBucketAggregation,
        ExtendedStatsBucketAggregation,
        PercentilesBucketAggregation,
        MovingAverageAggregation,
        MovingFunctionAggregation,
        CumulativeSumAggregation,
        BucketScriptAggregation,
        BucketSelectorAggregation,
        SerialDifferencingAggregation,
        BucketSortAggregation
    },
    matrixAggregations: { MatrixStatsAggregation }
} = require('./aggregations');

const {
    TermSuggester,
    DirectGenerator,
    PhraseSuggester,
    CompletionSuggester
} = require('./suggesters');

const recipes = require('./recipes');

exports.RequestBodySearch = RequestBodySearch;
exports.requestBodySearch = constructorWrapper(RequestBodySearch);

/* ============ ============ ============ */
/* ============== Queries =============== */
/* ============ ============ ============ */
exports.Query = Query;
exports.query = constructorWrapper(Query);

exports.MatchAllQuery = MatchAllQuery;
exports.matchAllQuery = constructorWrapper(MatchAllQuery);

exports.MatchNoneQuery = MatchNoneQuery;
exports.matchNoneQuery = constructorWrapper(MatchNoneQuery);

/* ============ ============ ============ */
/* ========== Full Text Queries ========= */
/* ============ ============ ============ */
exports.MatchQuery = MatchQuery;
exports.matchQuery = constructorWrapper(MatchQuery);

exports.MatchPhraseQuery = MatchPhraseQuery;
exports.matchPhraseQuery = constructorWrapper(MatchPhraseQuery);

exports.MatchPhrasePrefixQuery = MatchPhrasePrefixQuery;
exports.matchPhrasePrefixQuery = constructorWrapper(MatchPhrasePrefixQuery);

exports.MultiMatchQuery = MultiMatchQuery;
exports.multiMatchQuery = constructorWrapper(MultiMatchQuery);

exports.CommonTermsQuery = CommonTermsQuery;
exports.commonTermsQuery = constructorWrapper(CommonTermsQuery);

exports.QueryStringQuery = QueryStringQuery;
exports.queryStringQuery = constructorWrapper(QueryStringQuery);

exports.SimpleQueryStringQuery = SimpleQueryStringQuery;
exports.simpleQueryStringQuery = constructorWrapper(SimpleQueryStringQuery);

/* ============ ============ ============ */
/* ========= Term Level Queries ========= */
/* ============ ============ ============ */
exports.TermQuery = TermQuery;
exports.termQuery = constructorWrapper(TermQuery);

exports.TermsQuery = TermsQuery;
exports.termsQuery = constructorWrapper(TermsQuery);

exports.TermsSetQuery = TermsSetQuery;
exports.termsSetQuery = constructorWrapper(TermsSetQuery);

exports.RangeQuery = RangeQuery;
exports.rangeQuery = constructorWrapper(RangeQuery);

exports.ExistsQuery = ExistsQuery;
exports.existsQuery = constructorWrapper(ExistsQuery);

exports.PrefixQuery = PrefixQuery;
exports.prefixQuery = constructorWrapper(PrefixQuery);

exports.WildcardQuery = WildcardQuery;
exports.wildcardQuery = constructorWrapper(WildcardQuery);

exports.RegexpQuery = RegexpQuery;
exports.regexpQuery = constructorWrapper(RegexpQuery);

exports.FuzzyQuery = FuzzyQuery;
exports.fuzzyQuery = constructorWrapper(FuzzyQuery);

exports.TypeQuery = TypeQuery;
exports.typeQuery = constructorWrapper(TypeQuery);

exports.IdsQuery = IdsQuery;
exports.idsQuery = constructorWrapper(IdsQuery);

/* ============ ============ ============ */
/* ========== Compound Queries ========== */
/* ============ ============ ============ */
exports.ConstantScoreQuery = ConstantScoreQuery;
exports.constantScoreQuery = constructorWrapper(ConstantScoreQuery);

exports.BoolQuery = BoolQuery;
exports.boolQuery = constructorWrapper(BoolQuery);

exports.DisMaxQuery = DisMaxQuery;
exports.disMaxQuery = constructorWrapper(DisMaxQuery);

exports.FunctionScoreQuery = FunctionScoreQuery;
exports.functionScoreQuery = constructorWrapper(FunctionScoreQuery);

exports.BoostingQuery = BoostingQuery;
exports.boostingQuery = constructorWrapper(BoostingQuery);

/* ============ ============ ============ */
/* =========== Joining Queries ========== */
/* ============ ============ ============ */
exports.NestedQuery = NestedQuery;
exports.nestedQuery = constructorWrapper(NestedQuery);

exports.HasChildQuery = HasChildQuery;
exports.hasChildQuery = constructorWrapper(HasChildQuery);

exports.HasParentQuery = HasParentQuery;
exports.hasParentQuery = constructorWrapper(HasParentQuery);

exports.ParentIdQuery = ParentIdQuery;
exports.parentIdQuery = constructorWrapper(ParentIdQuery);

/* ============ ============ ============ */
/* ============ Geo Queries ============= */
/* ============ ============ ============ */
exports.GeoShapeQuery = GeoShapeQuery;
exports.geoShapeQuery = constructorWrapper(GeoShapeQuery);

exports.GeoBoundingBoxQuery = GeoBoundingBoxQuery;
exports.geoBoundingBoxQuery = constructorWrapper(GeoBoundingBoxQuery);

exports.GeoDistanceQuery = GeoDistanceQuery;
exports.geoDistanceQuery = constructorWrapper(GeoDistanceQuery);

exports.GeoPolygonQuery = GeoPolygonQuery;
exports.geoPolygonQuery = constructorWrapper(GeoPolygonQuery);

/* ============ ============ ============ */
/* ======== Specialized Queries ========= */
/* ============ ============ ============ */
exports.MoreLikeThisQuery = MoreLikeThisQuery;
exports.moreLikeThisQuery = constructorWrapper(MoreLikeThisQuery);

exports.ScriptQuery = ScriptQuery;
exports.scriptQuery = constructorWrapper(ScriptQuery);

exports.PercolateQuery = PercolateQuery;
exports.percolateQuery = constructorWrapper(PercolateQuery);

exports.DistanceFeatureQuery = DistanceFeatureQuery;
exports.distanceFeatureQuery = constructorWrapper(DistanceFeatureQuery);

/* ============ ============ ============ */
/* ============ Span Queries ============ */
/* ============ ============ ============ */
exports.SpanTermQuery = SpanTermQuery;
exports.spanTermQuery = constructorWrapper(SpanTermQuery);

exports.SpanMultiTermQuery = SpanMultiTermQuery;
exports.spanMultiTermQuery = constructorWrapper(SpanMultiTermQuery);

exports.SpanFirstQuery = SpanFirstQuery;
exports.spanFirstQuery = constructorWrapper(SpanFirstQuery);

exports.SpanNearQuery = SpanNearQuery;
exports.spanNearQuery = constructorWrapper(SpanNearQuery);

exports.SpanOrQuery = SpanOrQuery;
exports.spanOrQuery = constructorWrapper(SpanOrQuery);

exports.SpanNotQuery = SpanNotQuery;
exports.spanNotQuery = constructorWrapper(SpanNotQuery);

exports.SpanContainingQuery = SpanContainingQuery;
exports.spanContainingQuery = constructorWrapper(SpanContainingQuery);

exports.SpanWithinQuery = SpanWithinQuery;
exports.spanWithinQuery = constructorWrapper(SpanWithinQuery);

exports.SpanFieldMaskingQuery = SpanFieldMaskingQuery;
exports.spanFieldMaskingQuery = constructorWrapper(SpanFieldMaskingQuery);
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
exports.percentileRanksAggregation = constructorWrapper(
    PercentileRanksAggregation
);

exports.ScriptedMetricAggregation = ScriptedMetricAggregation;
exports.scriptedMetricAggregation = constructorWrapper(
    ScriptedMetricAggregation
);

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
exports.AdjacencyMatrixAggregation = AdjacencyMatrixAggregation;
exports.adjacencyMatrixAggregation = constructorWrapper(
    AdjacencyMatrixAggregation
);

exports.ChildrenAggregation = ChildrenAggregation;
exports.childrenAggregation = constructorWrapper(ChildrenAggregation);

exports.CompositeAggregation = CompositeAggregation;
exports.compositeAggregation = constructorWrapper(CompositeAggregation);

exports.DateHistogramAggregation = DateHistogramAggregation;
exports.dateHistogramAggregation = constructorWrapper(DateHistogramAggregation);

exports.AutoDateHistogramAggregation = AutoDateHistogramAggregation;
exports.autoDateHistogramAggregation = constructorWrapper(
    AutoDateHistogramAggregation
);

exports.VariableWidthHistogramAggregation = VariableWidthHistogramAggregation;
exports.variableWidthHistogramAggregation = constructorWrapper(
    VariableWidthHistogramAggregation
);

exports.DateRangeAggregation = DateRangeAggregation;
exports.dateRangeAggregation = constructorWrapper(DateRangeAggregation);

exports.DiversifiedSamplerAggregation = DiversifiedSamplerAggregation;
exports.diversifiedSamplerAggregation = constructorWrapper(
    DiversifiedSamplerAggregation
);

exports.FilterAggregation = FilterAggregation;
exports.filterAggregation = constructorWrapper(FilterAggregation);

exports.FiltersAggregation = FiltersAggregation;
exports.filtersAggregation = constructorWrapper(FiltersAggregation);

exports.GeoDistanceAggregation = GeoDistanceAggregation;
exports.geoDistanceAggregation = constructorWrapper(GeoDistanceAggregation);

exports.GeoHashGridAggregation = GeoHashGridAggregation;
exports.geoHashGridAggregation = constructorWrapper(GeoHashGridAggregation);

exports.GeoHexGridAggregation = GeoHexGridAggregation;
exports.geoHexGridAggregation = constructorWrapper(GeoHexGridAggregation);

exports.GeoTileGridAggregation = GeoTileGridAggregation;
exports.geoTileGridAggregation = constructorWrapper(GeoTileGridAggregation);

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

exports.ParentAggregation = ParentAggregation;
exports.parentAggregation = constructorWrapper(ParentAggregation);

exports.RangeAggregation = RangeAggregation;
exports.rangeAggregation = constructorWrapper(RangeAggregation);

exports.RareTermsAggregation = RareTermsAggregation;
exports.rareTermsAggregation = constructorWrapper(RareTermsAggregation);

exports.ReverseNestedAggregation = ReverseNestedAggregation;
exports.reverseNestedAggregation = constructorWrapper(ReverseNestedAggregation);

exports.SamplerAggregation = SamplerAggregation;
exports.samplerAggregation = constructorWrapper(SamplerAggregation);

exports.SignificantTermsAggregation = SignificantTermsAggregation;
exports.significantTermsAggregation = constructorWrapper(
    SignificantTermsAggregation
);

exports.SignificantTextAggregation = SignificantTextAggregation;
exports.significantTextAggregation = constructorWrapper(
    SignificantTextAggregation
);

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

exports.BucketSortAggregation = BucketSortAggregation;
exports.bucketSortAggregation = constructorWrapper(BucketSortAggregation);

exports.SumBucketAggregation = SumBucketAggregation;
exports.sumBucketAggregation = constructorWrapper(SumBucketAggregation);

exports.StatsBucketAggregation = StatsBucketAggregation;
exports.statsBucketAggregation = constructorWrapper(StatsBucketAggregation);

exports.ExtendedStatsBucketAggregation = ExtendedStatsBucketAggregation;
exports.extendedStatsBucketAggregation = constructorWrapper(
    ExtendedStatsBucketAggregation
);

exports.PercentilesBucketAggregation = PercentilesBucketAggregation;
exports.percentilesBucketAggregation = constructorWrapper(
    PercentilesBucketAggregation
);

exports.MovingAverageAggregation = MovingAverageAggregation;
exports.movingAverageAggregation = constructorWrapper(MovingAverageAggregation);

exports.MovingFunctionAggregation = MovingFunctionAggregation;
exports.movingFunctionAggregation = constructorWrapper(
    MovingFunctionAggregation
);

exports.CumulativeSumAggregation = CumulativeSumAggregation;
exports.cumulativeSumAggregation = constructorWrapper(CumulativeSumAggregation);

exports.BucketScriptAggregation = BucketScriptAggregation;
exports.bucketScriptAggregation = constructorWrapper(BucketScriptAggregation);

exports.BucketSelectorAggregation = BucketSelectorAggregation;
exports.bucketSelectorAggregation = constructorWrapper(
    BucketSelectorAggregation
);

exports.SerialDifferencingAggregation = SerialDifferencingAggregation;
exports.serialDifferencingAggregation = constructorWrapper(
    SerialDifferencingAggregation
);

/* ============ ============ ============ */
/* ========= Matrix Aggregations ======== */
/* ============ ============ ============ */
exports.MatrixStatsAggregation = MatrixStatsAggregation;
exports.matrixStatsAggregation = constructorWrapper(MatrixStatsAggregation);

/* ============ ============ ============ */
/* ========== Score Functions =========== */
/* ============ ============ ============ */
exports.ScriptScoreFunction = ScriptScoreFunction;
exports.scriptScoreFunction = constructorWrapper(ScriptScoreFunction);

exports.WeightScoreFunction = WeightScoreFunction;
exports.weightScoreFunction = constructorWrapper(WeightScoreFunction);

exports.RandomScoreFunction = RandomScoreFunction;
exports.randomScoreFunction = constructorWrapper(RandomScoreFunction);

exports.FieldValueFactorFunction = FieldValueFactorFunction;
exports.fieldValueFactorFunction = constructorWrapper(FieldValueFactorFunction);

exports.DecayScoreFunction = DecayScoreFunction;
exports.decayScoreFunction = constructorWrapper(DecayScoreFunction);

/* ============ ============ ============ */
/* ============= Suggesters ============= */
/* ============ ============ ============ */

exports.TermSuggester = TermSuggester;
exports.termSuggester = constructorWrapper(TermSuggester);

exports.DirectGenerator = DirectGenerator;
exports.directGenerator = constructorWrapper(DirectGenerator);

exports.PhraseSuggester = PhraseSuggester;
exports.phraseSuggester = constructorWrapper(PhraseSuggester);

exports.CompletionSuggester = CompletionSuggester;
exports.completionSuggester = constructorWrapper(CompletionSuggester);

/* ============ ============ ============ */
/* ============== Recipes =============== */
/* ============ ============ ============ */

/**
 * Helper recipes for common query use cases.
 *
 * If you have any recipes, please do share or better yet, create a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).
 *
 * Recipes:
 * - [`missingQuery`](/#missingquery)
 * - [`randomSortQuery`](/#randomsortquery)
 * - [`filterQuery`](/#filterquery)
 *
 * These can be accessed under the `recipes` namespace or
 * using the `cook[Recipe Name]` alias for ease of use.
 *
 * @example
 * // `recipes` namespace
 * const qry = esb.recipes.missingQuery('user');
 *
 * @example
 * // `cookMissingQuery` alias
 * const qry = esb.cookMissingQuery('user');
 */
exports.recipes = recipes;
exports.cookMissingQuery = recipes.missingQuery;
exports.cookRandomSortQuery = recipes.randomSortQuery;
exports.cookFilterQuery = recipes.filterQuery;

/* ============ ============ ============ */
/* ============ Miscellaneous =========== */
/* ============ ============ ============ */
exports.Highlight = Highlight;
exports.highlight = constructorWrapper(Highlight);

exports.Script = Script;
exports.script = constructorWrapper(Script);

exports.GeoPoint = GeoPoint;
exports.geoPoint = constructorWrapper(GeoPoint);

exports.GeoShape = GeoShape;
exports.geoShape = constructorWrapper(GeoShape);

exports.IndexedShape = IndexedShape;
exports.indexedShape = constructorWrapper(IndexedShape);

exports.Sort = Sort;
exports.sort = constructorWrapper(Sort);

exports.Rescore = Rescore;
exports.rescore = constructorWrapper(Rescore);

exports.InnerHits = InnerHits;
exports.innerHits = constructorWrapper(InnerHits);

exports.SearchTemplate = SearchTemplate;
exports.searchTemplate = constructorWrapper(SearchTemplate);

exports.prettyPrint = function prettyPrint(obj) {
    console.log(JSON.stringify(obj, null, 2));
};

/* eslint-enable */
