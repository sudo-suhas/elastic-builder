import test from 'ava';
import * as bob from '../src';

test('request body search is exported', t => {
    t.truthy(bob.RequestBodySearch);
    t.truthy(bob.requestBodySearch);
});

/* eslint-disable max-statements */
test('queries are exported', t => {
    /* ============ ============ ============ */
    /* ============== Queries =============== */
    /* ============ ============ ============ */
    t.truthy(bob.MatchAllQuery);
    t.truthy(bob.matchAllQuery);

    t.truthy(bob.MatchNoneQuery);
    t.truthy(bob.matchNoneQuery);

    /* ============ ============ ============ */
    /* ========== Full Text Queries ========= */
    /* ============ ============ ============ */
    t.truthy(bob.MatchQuery);
    t.truthy(bob.matchQuery);

    t.truthy(bob.MatchPhraseQuery);
    t.truthy(bob.matchPhraseQuery);

    t.truthy(bob.MatchPhrasePrefixQuery);
    t.truthy(bob.matchPhrasePrefixQuery);

    t.truthy(bob.MultiMatchQuery);
    t.truthy(bob.multiMatchQuery);

    t.truthy(bob.CommonTermsQuery);
    t.truthy(bob.commonTermsQuery);

    t.truthy(bob.QueryStringQuery);
    t.truthy(bob.queryStringQuery);

    t.truthy(bob.SimpleQueryStringQuery);
    t.truthy(bob.simpleQueryStringQuery);

    /* ============ ============ ============ */
    /* ========= Term Level Queries ========= */
    /* ============ ============ ============ */
    t.truthy(bob.TermQuery);
    t.truthy(bob.termQuery);

    t.truthy(bob.TermsQuery);
    t.truthy(bob.termsQuery);

    t.truthy(bob.RangeQuery);
    t.truthy(bob.rangeQuery);

    t.truthy(bob.ExistsQuery);
    t.truthy(bob.existsQuery);

    t.truthy(bob.PrefixQuery);
    t.truthy(bob.prefixQuery);

    t.truthy(bob.WildcardQuery);
    t.truthy(bob.wildcardQuery);

    t.truthy(bob.RegexpQuery);
    t.truthy(bob.regexpQuery);

    t.truthy(bob.FuzzyQuery);
    t.truthy(bob.fuzzyQuery);

    t.truthy(bob.TypeQuery);
    t.truthy(bob.typeQuery);

    t.truthy(bob.IdsQuery);
    t.truthy(bob.idsQuery);

    /* ============ ============ ============ */
    /* ========== Compound Queries ========== */
    /* ============ ============ ============ */
    t.truthy(bob.ConstantScoreQuery);
    t.truthy(bob.constantScoreQuery);

    t.truthy(bob.BoolQuery);
    t.truthy(bob.boolQuery);

    t.truthy(bob.DisMaxQuery);
    t.truthy(bob.disMaxQuery);

    t.truthy(bob.FunctionScoreQuery);
    t.truthy(bob.functionScoreQuery);

    t.truthy(bob.BoostingQuery);
    t.truthy(bob.boostingQuery);

    /* ============ ============ ============ */
    /* =========== Joining Queries ========== */
    /* ============ ============ ============ */
    t.truthy(bob.NestedQuery);
    t.truthy(bob.nestedQuery);

    t.truthy(bob.HasChildQuery);
    t.truthy(bob.hasChildQuery);

    t.truthy(bob.HasParentQuery);
    t.truthy(bob.hasParentQuery);

    t.truthy(bob.ParentIdQuery);
    t.truthy(bob.parentIdQuery);

    /* ============ ============ ============ */
    /* ============ Geo Queries ============= */
    /* ============ ============ ============ */
    t.truthy(bob.GeoShapeQuery);
    t.truthy(bob.geoShapeQuery);

    t.truthy(bob.GeoBoundingBoxQuery);
    t.truthy(bob.geoBoundingBoxQuery);

    t.truthy(bob.GeoDistanceQuery);
    t.truthy(bob.geoDistanceQuery);

    t.truthy(bob.GeoPolygonQuery);
    t.truthy(bob.geoPolygonQuery);

    /* ============ ============ ============ */
    /* ======== Specialized Queries ========= */
    /* ============ ============ ============ */
    t.truthy(bob.MoreLikeThisQuery);
    t.truthy(bob.moreLikeThisQuery);

    t.truthy(bob.ScriptQuery);
    t.truthy(bob.scriptQuery);

    t.truthy(bob.PercolateQuery);
    t.truthy(bob.percolateQuery);

    /* ============ ============ ============ */
    /* ============ Span Queries ============ */
    /* ============ ============ ============ */
    t.truthy(bob.SpanTermQuery);
    t.truthy(bob.spanTermQuery);

    t.truthy(bob.SpanMultiTermQuery);
    t.truthy(bob.spanMultiTermQuery);

    t.truthy(bob.SpanFirstQuery);
    t.truthy(bob.spanFirstQuery);

    t.truthy(bob.SpanNearQuery);
    t.truthy(bob.spanNearQuery);

    t.truthy(bob.SpanOrQuery);
    t.truthy(bob.spanOrQuery);

    t.truthy(bob.SpanNotQuery);
    t.truthy(bob.spanNotQuery);

    t.truthy(bob.SpanContainingQuery);
    t.truthy(bob.spanContainingQuery);

    t.truthy(bob.SpanWithinQuery);
    t.truthy(bob.spanWithinQuery);

    t.truthy(bob.SpanFieldMaskingQuery);
    t.truthy(bob.spanFieldMaskingQuery);
});

test('aggregations are exported', t => {
    /* ============ ============ ============ */
    /* ======== Metrics Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(bob.AvgAggregation);
    t.truthy(bob.avgAggregation);

    t.truthy(bob.CardinalityAggregation);
    t.truthy(bob.cardinalityAggregation);

    t.truthy(bob.ExtendedStatsAggregation);
    t.truthy(bob.extendedStatsAggregation);

    t.truthy(bob.GeoBoundsAggregation);
    t.truthy(bob.geoBoundsAggregation);

    t.truthy(bob.GeoCentroidAggregation);
    t.truthy(bob.geoCentroidAggregation);

    t.truthy(bob.MaxAggregation);
    t.truthy(bob.maxAggregation);

    t.truthy(bob.MinAggregation);
    t.truthy(bob.minAggregation);

    t.truthy(bob.PercentilesAggregation);
    t.truthy(bob.percentilesAggregation);

    t.truthy(bob.PercentileRanksAggregation);
    t.truthy(bob.percentileRanksAggregation);

    t.truthy(bob.ScriptedMetricAggregation);
    t.truthy(bob.scriptedMetricAggregation);

    t.truthy(bob.StatsAggregation);
    t.truthy(bob.statsAggregation);

    t.truthy(bob.SumAggregation);
    t.truthy(bob.sumAggregation);

    t.truthy(bob.TopHitsAggregation);
    t.truthy(bob.topHitsAggregation);

    t.truthy(bob.ValueCountAggregation);
    t.truthy(bob.valueCountAggregation);

    /* ============ ============ ============ */
    /* ========= Bucket Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(bob.AdjacencyMatrixAggregation);
    t.truthy(bob.adjacencyMatrixAggregation);

    t.truthy(bob.ChildrenAggregation);
    t.truthy(bob.childrenAggregation);

    t.truthy(bob.DateHistogramAggregation);
    t.truthy(bob.dateHistogramAggregation);

    t.truthy(bob.DateRangeAggregation);
    t.truthy(bob.dateRangeAggregation);

    t.truthy(bob.DiversifiedSamplerAggregation);
    t.truthy(bob.diversifiedSamplerAggregation);

    t.truthy(bob.FilterAggregation);
    t.truthy(bob.filterAggregation);

    t.truthy(bob.FiltersAggregation);
    t.truthy(bob.filtersAggregation);

    t.truthy(bob.GeoDistanceAggregation);
    t.truthy(bob.geoDistanceAggregation);

    t.truthy(bob.GeoHashGridAggregation);
    t.truthy(bob.geoHashGridAggregation);

    t.truthy(bob.GlobalAggregation);
    t.truthy(bob.globalAggregation);

    t.truthy(bob.HistogramAggregation);
    t.truthy(bob.histogramAggregation);

    t.truthy(bob.IpRangeAggregation);
    t.truthy(bob.ipRangeAggregation);

    t.truthy(bob.MissingAggregation);
    t.truthy(bob.missingAggregation);

    t.truthy(bob.NestedAggregation);
    t.truthy(bob.nestedAggregation);

    t.truthy(bob.RangeAggregation);
    t.truthy(bob.rangeAggregation);

    t.truthy(bob.ReverseNestedAggregation);
    t.truthy(bob.reverseNestedAggregation);

    t.truthy(bob.SamplerAggregation);
    t.truthy(bob.samplerAggregation);

    t.truthy(bob.SignificantTermsAggregation);
    t.truthy(bob.significantTermsAggregation);

    t.truthy(bob.TermsAggregation);
    t.truthy(bob.termsAggregation);

    /* ============ ============ ============ */
    /* ======== Pipeline Aggregations ======= */
    /* ============ ============ ============ */
    t.truthy(bob.AvgBucketAggregation);
    t.truthy(bob.avgBucketAggregation);

    t.truthy(bob.DerivativeAggregation);
    t.truthy(bob.derivativeAggregation);

    t.truthy(bob.MaxBucketAggregation);
    t.truthy(bob.maxBucketAggregation);

    t.truthy(bob.MinBucketAggregation);
    t.truthy(bob.minBucketAggregation);

    t.truthy(bob.SumBucketAggregation);
    t.truthy(bob.sumBucketAggregation);

    t.truthy(bob.StatsBucketAggregation);
    t.truthy(bob.statsBucketAggregation);

    t.truthy(bob.ExtendedStatsBucketAggregation);
    t.truthy(bob.extendedStatsBucketAggregation);

    t.truthy(bob.PercentilesBucketAggregation);
    t.truthy(bob.percentilesBucketAggregation);

    t.truthy(bob.MovingAverageAggregation);
    t.truthy(bob.movingAverageAggregation);

    t.truthy(bob.CumulativeSumAggregation);
    t.truthy(bob.cumulativeSumAggregation);

    t.truthy(bob.BucketScriptAggregation);
    t.truthy(bob.bucketScriptAggregation);

    t.truthy(bob.BucketSelectorAggregation);
    t.truthy(bob.bucketSelectorAggregation);

    t.truthy(bob.SerialDifferencingAggregation);
    t.truthy(bob.serialDifferencingAggregation);

    /* ============ ============ ============ */
    /* ========= Matrix Aggregations ======== */
    /* ============ ============ ============ */
    t.truthy(bob.MatrixStatsAggregation);
    t.truthy(bob.matrixStatsAggregation);
});

test('suggesters are exported', t => {
    t.truthy(bob.TermSuggester);
    t.truthy(bob.termSuggester);

    t.truthy(bob.DirectGenerator);
    t.truthy(bob.directGenerator);

    t.truthy(bob.PhraseSuggester);
    t.truthy(bob.phraseSuggester);

    t.truthy(bob.CompletionSuggester);
    t.truthy(bob.completionSuggester);
});

test('score functions are exported', t => {
    /* ============ ============ ============ */
    /* ========== Score Functions =========== */
    /* ============ ============ ============ */
    t.truthy(bob.ScriptScoreFunction);
    t.truthy(bob.scriptScoreFunction);

    t.truthy(bob.WeightScoreFunction);
    t.truthy(bob.weightScoreFunction);

    t.truthy(bob.RandomScoreFunction);
    t.truthy(bob.randomScoreFunction);

    t.truthy(bob.FieldValueFactorFunction);
    t.truthy(bob.fieldValueFactorFunction);

    t.truthy(bob.DecayScoreFunction);
    t.truthy(bob.decayScoreFunction);
});

test('misc are exported', t => {
    /* ============ ============ ============ */
    /* ============ Miscellaneous ===========  */
    /* ============ ============ ============ */
    t.truthy(bob.recipes);
    t.truthy(bob.recipes.missingQuery);
    t.truthy(bob.recipes.randomSortQuery);
    t.truthy(bob.recipes.filterQuery);
    t.truthy(bob.cookMissingQuery);
    t.truthy(bob.cookRandomSortQuery);
    t.truthy(bob.cookFilterQuery);

    t.truthy(bob.Highlight);
    t.truthy(bob.highlight);

    t.truthy(bob.Script);
    t.truthy(bob.script);

    t.truthy(bob.GeoPoint);
    t.truthy(bob.geoPoint);

    t.truthy(bob.GeoShape);
    t.truthy(bob.geoShape);

    t.truthy(bob.IndexedShape);
    t.truthy(bob.indexedShape);

    t.truthy(bob.Sort);
    t.truthy(bob.sort);

    t.truthy(bob.Rescore);
    t.truthy(bob.rescore);

    t.truthy(bob.InnerHits);
    t.truthy(bob.innerHits);

    t.truthy(bob.SearchTemplate);
    t.truthy(bob.searchTemplate);

    t.truthy(bob.prettyPrint);
});

test('pretty print calls toJSON', t => {
    bob.prettyPrint({
        toJSON() {
            t.pass();
            return true;
        }
    });
});
/* eslint-enable */

// TODO: Test prettyPrint logs to console
