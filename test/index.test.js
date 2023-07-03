import test from 'ava';
import * as esb from '../src';

test('request body search is exported', t => {
    t.truthy(esb.RequestBodySearch);
    t.truthy(esb.requestBodySearch);
});

/* eslint-disable max-statements */
test('queries are exported', t => {
    /* ============ ============ ============ */
    /* ============== Queries =============== */
    /* ============ ============ ============ */
    t.truthy(esb.MatchAllQuery);
    t.truthy(esb.matchAllQuery);

    t.truthy(esb.MatchNoneQuery);
    t.truthy(esb.matchNoneQuery);

    /* ============ ============ ============ */
    /* ========== Full Text Queries ========= */
    /* ============ ============ ============ */
    t.truthy(esb.MatchQuery);
    t.truthy(esb.matchQuery);

    t.truthy(esb.MatchPhraseQuery);
    t.truthy(esb.matchPhraseQuery);

    t.truthy(esb.MatchPhrasePrefixQuery);
    t.truthy(esb.matchPhrasePrefixQuery);

    t.truthy(esb.MultiMatchQuery);
    t.truthy(esb.multiMatchQuery);

    t.truthy(esb.CommonTermsQuery);
    t.truthy(esb.commonTermsQuery);

    t.truthy(esb.QueryStringQuery);
    t.truthy(esb.queryStringQuery);

    t.truthy(esb.SimpleQueryStringQuery);
    t.truthy(esb.simpleQueryStringQuery);

    /* ============ ============ ============ */
    /* ========= Term Level Queries ========= */
    /* ============ ============ ============ */
    t.truthy(esb.TermQuery);
    t.truthy(esb.termQuery);

    t.truthy(esb.TermsQuery);
    t.truthy(esb.termsQuery);

    t.truthy(esb.TermsSetQuery);
    t.truthy(esb.termsSetQuery);

    t.truthy(esb.RangeQuery);
    t.truthy(esb.rangeQuery);

    t.truthy(esb.ExistsQuery);
    t.truthy(esb.existsQuery);

    t.truthy(esb.PrefixQuery);
    t.truthy(esb.prefixQuery);

    t.truthy(esb.WildcardQuery);
    t.truthy(esb.wildcardQuery);

    t.truthy(esb.RegexpQuery);
    t.truthy(esb.regexpQuery);

    t.truthy(esb.FuzzyQuery);
    t.truthy(esb.fuzzyQuery);

    t.truthy(esb.TypeQuery);
    t.truthy(esb.typeQuery);

    t.truthy(esb.IdsQuery);
    t.truthy(esb.idsQuery);

    /* ============ ============ ============ */
    /* ========== Compound Queries ========== */
    /* ============ ============ ============ */
    t.truthy(esb.ConstantScoreQuery);
    t.truthy(esb.constantScoreQuery);

    t.truthy(esb.BoolQuery);
    t.truthy(esb.boolQuery);

    t.truthy(esb.DisMaxQuery);
    t.truthy(esb.disMaxQuery);

    t.truthy(esb.FunctionScoreQuery);
    t.truthy(esb.functionScoreQuery);

    t.truthy(esb.BoostingQuery);
    t.truthy(esb.boostingQuery);

    /* ============ ============ ============ */
    /* =========== Joining Queries ========== */
    /* ============ ============ ============ */
    t.truthy(esb.NestedQuery);
    t.truthy(esb.nestedQuery);

    t.truthy(esb.HasChildQuery);
    t.truthy(esb.hasChildQuery);

    t.truthy(esb.HasParentQuery);
    t.truthy(esb.hasParentQuery);

    t.truthy(esb.ParentIdQuery);
    t.truthy(esb.parentIdQuery);

    /* ============ ============ ============ */
    /* ============ Geo Queries ============= */
    /* ============ ============ ============ */
    t.truthy(esb.GeoShapeQuery);
    t.truthy(esb.geoShapeQuery);

    t.truthy(esb.GeoBoundingBoxQuery);
    t.truthy(esb.geoBoundingBoxQuery);

    t.truthy(esb.GeoDistanceQuery);
    t.truthy(esb.geoDistanceQuery);

    t.truthy(esb.GeoPolygonQuery);
    t.truthy(esb.geoPolygonQuery);

    /* ============ ============ ============ */
    /* ======== Specialized Queries ========= */
    /* ============ ============ ============ */
    t.truthy(esb.MoreLikeThisQuery);
    t.truthy(esb.moreLikeThisQuery);

    t.truthy(esb.ScriptQuery);
    t.truthy(esb.scriptQuery);

    t.truthy(esb.PercolateQuery);
    t.truthy(esb.percolateQuery);

    t.truthy(esb.DistanceFeatureQuery);
    t.truthy(esb.distanceFeatureQuery);

    /* ============ ============ ============ */
    /* ============ Span Queries ============ */
    /* ============ ============ ============ */
    t.truthy(esb.SpanTermQuery);
    t.truthy(esb.spanTermQuery);

    t.truthy(esb.SpanMultiTermQuery);
    t.truthy(esb.spanMultiTermQuery);

    t.truthy(esb.SpanFirstQuery);
    t.truthy(esb.spanFirstQuery);

    t.truthy(esb.SpanNearQuery);
    t.truthy(esb.spanNearQuery);

    t.truthy(esb.SpanOrQuery);
    t.truthy(esb.spanOrQuery);

    t.truthy(esb.SpanNotQuery);
    t.truthy(esb.spanNotQuery);

    t.truthy(esb.SpanContainingQuery);
    t.truthy(esb.spanContainingQuery);

    t.truthy(esb.SpanWithinQuery);
    t.truthy(esb.spanWithinQuery);

    t.truthy(esb.SpanFieldMaskingQuery);
    t.truthy(esb.spanFieldMaskingQuery);
});

test('aggregations are exported', t => {
    /* ============ ============ ============ */
    /* ======== Metrics Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(esb.AvgAggregation);
    t.truthy(esb.avgAggregation);

    t.truthy(esb.CardinalityAggregation);
    t.truthy(esb.cardinalityAggregation);

    t.truthy(esb.ExtendedStatsAggregation);
    t.truthy(esb.extendedStatsAggregation);

    t.truthy(esb.GeoBoundsAggregation);
    t.truthy(esb.geoBoundsAggregation);

    t.truthy(esb.GeoCentroidAggregation);
    t.truthy(esb.geoCentroidAggregation);

    t.truthy(esb.MaxAggregation);
    t.truthy(esb.maxAggregation);

    t.truthy(esb.MinAggregation);
    t.truthy(esb.minAggregation);

    t.truthy(esb.PercentilesAggregation);
    t.truthy(esb.percentilesAggregation);

    t.truthy(esb.PercentileRanksAggregation);
    t.truthy(esb.percentileRanksAggregation);

    t.truthy(esb.ScriptedMetricAggregation);
    t.truthy(esb.scriptedMetricAggregation);

    t.truthy(esb.StatsAggregation);
    t.truthy(esb.statsAggregation);

    t.truthy(esb.SumAggregation);
    t.truthy(esb.sumAggregation);

    t.truthy(esb.TopHitsAggregation);
    t.truthy(esb.topHitsAggregation);

    t.truthy(esb.ValueCountAggregation);
    t.truthy(esb.valueCountAggregation);

    /* ============ ============ ============ */
    /* ========= Bucket Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(esb.AdjacencyMatrixAggregation);
    t.truthy(esb.adjacencyMatrixAggregation);

    t.truthy(esb.ChildrenAggregation);
    t.truthy(esb.childrenAggregation);

    t.truthy(esb.CompositeAggregation);
    t.truthy(esb.compositeAggregation);

    t.truthy(esb.DateHistogramAggregation);
    t.truthy(esb.dateHistogramAggregation);

    t.truthy(esb.AutoDateHistogramAggregation);
    t.truthy(esb.autoDateHistogramAggregation);

    t.truthy(esb.VariableWidthHistogramAggregation);
    t.truthy(esb.variableWidthHistogramAggregation);

    t.truthy(esb.DateRangeAggregation);
    t.truthy(esb.dateRangeAggregation);

    t.truthy(esb.DiversifiedSamplerAggregation);
    t.truthy(esb.diversifiedSamplerAggregation);

    t.truthy(esb.FilterAggregation);
    t.truthy(esb.filterAggregation);

    t.truthy(esb.FiltersAggregation);
    t.truthy(esb.filtersAggregation);

    t.truthy(esb.GeoDistanceAggregation);
    t.truthy(esb.geoDistanceAggregation);

    t.truthy(esb.GeoHashGridAggregation);
    t.truthy(esb.geoHashGridAggregation);

    t.truthy(esb.GeoHexGridAggregation);
    t.truthy(esb.geoHexGridAggregation);

    t.truthy(esb.GeoTileGridAggregation);
    t.truthy(esb.geoTileGridAggregation);

    t.truthy(esb.GlobalAggregation);
    t.truthy(esb.globalAggregation);

    t.truthy(esb.HistogramAggregation);
    t.truthy(esb.histogramAggregation);

    t.truthy(esb.IpRangeAggregation);
    t.truthy(esb.ipRangeAggregation);

    t.truthy(esb.MissingAggregation);
    t.truthy(esb.missingAggregation);

    t.truthy(esb.NestedAggregation);
    t.truthy(esb.nestedAggregation);

    t.truthy(esb.ParentAggregation);
    t.truthy(esb.parentAggregation);

    t.truthy(esb.RangeAggregation);
    t.truthy(esb.rangeAggregation);

    t.truthy(esb.RareTermsAggregation);
    t.truthy(esb.rareTermsAggregation);

    t.truthy(esb.ReverseNestedAggregation);
    t.truthy(esb.reverseNestedAggregation);

    t.truthy(esb.SamplerAggregation);
    t.truthy(esb.samplerAggregation);

    t.truthy(esb.SignificantTermsAggregation);
    t.truthy(esb.significantTermsAggregation);

    t.truthy(esb.SignificantTextAggregation);
    t.truthy(esb.significantTextAggregation);

    t.truthy(esb.TermsAggregation);
    t.truthy(esb.termsAggregation);

    /* ============ ============ ============ */
    /* ======== Pipeline Aggregations ======= */
    /* ============ ============ ============ */
    t.truthy(esb.AvgBucketAggregation);
    t.truthy(esb.avgBucketAggregation);

    t.truthy(esb.DerivativeAggregation);
    t.truthy(esb.derivativeAggregation);

    t.truthy(esb.MaxBucketAggregation);
    t.truthy(esb.maxBucketAggregation);

    t.truthy(esb.MinBucketAggregation);
    t.truthy(esb.minBucketAggregation);

    t.truthy(esb.SumBucketAggregation);
    t.truthy(esb.sumBucketAggregation);

    t.truthy(esb.StatsBucketAggregation);
    t.truthy(esb.statsBucketAggregation);

    t.truthy(esb.ExtendedStatsBucketAggregation);
    t.truthy(esb.extendedStatsBucketAggregation);

    t.truthy(esb.PercentilesBucketAggregation);
    t.truthy(esb.percentilesBucketAggregation);

    t.truthy(esb.MovingAverageAggregation);
    t.truthy(esb.movingAverageAggregation);

    t.truthy(esb.MovingFunctionAggregation);
    t.truthy(esb.movingFunctionAggregation);

    t.truthy(esb.CumulativeSumAggregation);
    t.truthy(esb.cumulativeSumAggregation);

    t.truthy(esb.BucketScriptAggregation);
    t.truthy(esb.bucketScriptAggregation);

    t.truthy(esb.BucketSelectorAggregation);
    t.truthy(esb.bucketSelectorAggregation);

    t.truthy(esb.BucketSortAggregation);
    t.truthy(esb.bucketSortAggregation);

    t.truthy(esb.SerialDifferencingAggregation);
    t.truthy(esb.serialDifferencingAggregation);

    /* ============ ============ ============ */
    /* ========= Matrix Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(esb.MatrixStatsAggregation);
    t.truthy(esb.matrixStatsAggregation);
});

test('Composite Aggregation values sources are exported', t => {
    const { CompositeAggregation } = esb;
    t.truthy(CompositeAggregation.TermsValuesSource);
    t.truthy(CompositeAggregation.termsValuesSource);

    t.truthy(CompositeAggregation.HistogramValuesSource);
    t.truthy(CompositeAggregation.histogramValuesSource);

    t.truthy(CompositeAggregation.DateHistogramValuesSource);
    t.truthy(CompositeAggregation.dateHistogramValuesSource);
});

test('suggesters are exported', t => {
    t.truthy(esb.TermSuggester);
    t.truthy(esb.termSuggester);

    t.truthy(esb.DirectGenerator);
    t.truthy(esb.directGenerator);

    t.truthy(esb.PhraseSuggester);
    t.truthy(esb.phraseSuggester);

    t.truthy(esb.CompletionSuggester);
    t.truthy(esb.completionSuggester);
});

test('score functions are exported', t => {
    /* ============ ============ ============ */
    /* ========== Score Functions =========== */
    /* ============ ============ ============ */
    t.truthy(esb.ScriptScoreFunction);
    t.truthy(esb.scriptScoreFunction);

    t.truthy(esb.WeightScoreFunction);
    t.truthy(esb.weightScoreFunction);

    t.truthy(esb.RandomScoreFunction);
    t.truthy(esb.randomScoreFunction);

    t.truthy(esb.FieldValueFactorFunction);
    t.truthy(esb.fieldValueFactorFunction);

    t.truthy(esb.DecayScoreFunction);
    t.truthy(esb.decayScoreFunction);
});

test('misc are exported', t => {
    /* ============ ============ ============ */
    /* ============ Miscellaneous ===========  */
    /* ============ ============ ============ */
    t.truthy(esb.recipes);
    t.truthy(esb.recipes.missingQuery);
    t.truthy(esb.recipes.randomSortQuery);
    t.truthy(esb.recipes.filterQuery);
    t.truthy(esb.cookMissingQuery);
    t.truthy(esb.cookRandomSortQuery);
    t.truthy(esb.cookFilterQuery);

    t.truthy(esb.Highlight);
    t.truthy(esb.highlight);

    t.truthy(esb.Script);
    t.truthy(esb.script);

    t.truthy(esb.GeoPoint);
    t.truthy(esb.geoPoint);

    t.truthy(esb.GeoShape);
    t.truthy(esb.geoShape);

    t.truthy(esb.IndexedShape);
    t.truthy(esb.indexedShape);

    t.truthy(esb.Sort);
    t.truthy(esb.sort);

    t.truthy(esb.Rescore);
    t.truthy(esb.rescore);

    t.truthy(esb.InnerHits);
    t.truthy(esb.innerHits);

    t.truthy(esb.SearchTemplate);
    t.truthy(esb.searchTemplate);

    t.truthy(esb.prettyPrint);
});

test('pretty print calls toJSON', t => {
    esb.prettyPrint({
        toJSON() {
            t.pass();
            return true;
        }
    });
});
/* eslint-enable */
