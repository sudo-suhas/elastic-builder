import { describe, test, expect } from 'vitest';
import * as esb from '../src';

describe('RequestBodySearch', () => {
    const exports = [
        { name: 'RequestBodySearch', value: esb.RequestBodySearch },
        { name: 'requestBodySearch', value: esb.requestBodySearch }
    ];

    exports.forEach(tc => {
        test(`${tc.name} is exported`, () => {
            expect(tc.value).toBeTruthy();
        });
    });
});

describe('Queries', () => {
    const queryExports = [
        // Basic Queries
        { Class: 'MatchAllQuery', factory: 'matchAllQuery' },
        { Class: 'MatchNoneQuery', factory: 'matchNoneQuery' },
        // Full Text Queries
        { Class: 'MatchQuery', factory: 'matchQuery' },
        { Class: 'MatchPhraseQuery', factory: 'matchPhraseQuery' },
        { Class: 'MatchPhrasePrefixQuery', factory: 'matchPhrasePrefixQuery' },
        { Class: 'MultiMatchQuery', factory: 'multiMatchQuery' },
        { Class: 'CommonTermsQuery', factory: 'commonTermsQuery' },
        { Class: 'QueryStringQuery', factory: 'queryStringQuery' },
        { Class: 'SimpleQueryStringQuery', factory: 'simpleQueryStringQuery' },
        // Term Level Queries
        { Class: 'TermQuery', factory: 'termQuery' },
        { Class: 'TermsQuery', factory: 'termsQuery' },
        { Class: 'TermsSetQuery', factory: 'termsSetQuery' },
        { Class: 'RangeQuery', factory: 'rangeQuery' },
        { Class: 'ExistsQuery', factory: 'existsQuery' },
        { Class: 'PrefixQuery', factory: 'prefixQuery' },
        { Class: 'WildcardQuery', factory: 'wildcardQuery' },
        { Class: 'RegexpQuery', factory: 'regexpQuery' },
        { Class: 'FuzzyQuery', factory: 'fuzzyQuery' },
        { Class: 'TypeQuery', factory: 'typeQuery' },
        { Class: 'IdsQuery', factory: 'idsQuery' },
        // Compound Queries
        { Class: 'ConstantScoreQuery', factory: 'constantScoreQuery' },
        { Class: 'BoolQuery', factory: 'boolQuery' },
        { Class: 'DisMaxQuery', factory: 'disMaxQuery' },
        { Class: 'FunctionScoreQuery', factory: 'functionScoreQuery' },
        { Class: 'BoostingQuery', factory: 'boostingQuery' },
        // Joining Queries
        { Class: 'NestedQuery', factory: 'nestedQuery' },
        { Class: 'HasChildQuery', factory: 'hasChildQuery' },
        { Class: 'HasParentQuery', factory: 'hasParentQuery' },
        { Class: 'ParentIdQuery', factory: 'parentIdQuery' },
        // Geo Queries
        { Class: 'GeoShapeQuery', factory: 'geoShapeQuery' },
        { Class: 'GeoBoundingBoxQuery', factory: 'geoBoundingBoxQuery' },
        { Class: 'GeoDistanceQuery', factory: 'geoDistanceQuery' },
        { Class: 'GeoPolygonQuery', factory: 'geoPolygonQuery' },
        // Specialized Queries
        { Class: 'MoreLikeThisQuery', factory: 'moreLikeThisQuery' },
        { Class: 'ScriptQuery', factory: 'scriptQuery' },
        { Class: 'ScriptScoreQuery', factory: 'scriptScoreQuery' },
        { Class: 'PercolateQuery', factory: 'percolateQuery' },
        { Class: 'DistanceFeatureQuery', factory: 'distanceFeatureQuery' },
        // Span Queries
        { Class: 'SpanTermQuery', factory: 'spanTermQuery' },
        { Class: 'SpanMultiTermQuery', factory: 'spanMultiTermQuery' },
        { Class: 'SpanFirstQuery', factory: 'spanFirstQuery' },
        { Class: 'SpanNearQuery', factory: 'spanNearQuery' },
        { Class: 'SpanOrQuery', factory: 'spanOrQuery' },
        { Class: 'SpanNotQuery', factory: 'spanNotQuery' },
        { Class: 'SpanContainingQuery', factory: 'spanContainingQuery' },
        { Class: 'SpanWithinQuery', factory: 'spanWithinQuery' },
        { Class: 'SpanFieldMaskingQuery', factory: 'spanFieldMaskingQuery' },
        // Vector Queries
        { Class: 'SparseVectorQuery', factory: 'sparseVectorQuery' },
        { Class: 'SemanticQuery', factory: 'semanticQuery' }
    ];

    queryExports.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(esb[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            const factoryResult = esb[tc.factory]();
            expect(factoryResult).toBeTruthy();
        });
    });
});

describe('Aggregations', () => {
    const aggregationExports = [
        // Metrics Aggregations
        { Class: 'AvgAggregation', factory: 'avgAggregation' },
        { Class: 'CardinalityAggregation', factory: 'cardinalityAggregation' },
        {
            Class: 'ExtendedStatsAggregation',
            factory: 'extendedStatsAggregation'
        },
        { Class: 'GeoBoundsAggregation', factory: 'geoBoundsAggregation' },
        { Class: 'GeoCentroidAggregation', factory: 'geoCentroidAggregation' },
        { Class: 'MaxAggregation', factory: 'maxAggregation' },
        { Class: 'MinAggregation', factory: 'minAggregation' },
        { Class: 'PercentilesAggregation', factory: 'percentilesAggregation' },
        {
            Class: 'PercentileRanksAggregation',
            factory: 'percentileRanksAggregation'
        },
        {
            Class: 'ScriptedMetricAggregation',
            factory: 'scriptedMetricAggregation'
        },
        { Class: 'StatsAggregation', factory: 'statsAggregation' },
        { Class: 'SumAggregation', factory: 'sumAggregation' },
        { Class: 'TopHitsAggregation', factory: 'topHitsAggregation' },
        { Class: 'ValueCountAggregation', factory: 'valueCountAggregation' },
        // Bucket Aggregations
        {
            Class: 'AdjacencyMatrixAggregation',
            factory: 'adjacencyMatrixAggregation'
        },
        { Class: 'ChildrenAggregation', factory: 'childrenAggregation' },
        { Class: 'CompositeAggregation', factory: 'compositeAggregation' },
        {
            Class: 'DateHistogramAggregation',
            factory: 'dateHistogramAggregation'
        },
        {
            Class: 'AutoDateHistogramAggregation',
            factory: 'autoDateHistogramAggregation'
        },
        {
            Class: 'VariableWidthHistogramAggregation',
            factory: 'variableWidthHistogramAggregation'
        },
        { Class: 'DateRangeAggregation', factory: 'dateRangeAggregation' },
        {
            Class: 'DiversifiedSamplerAggregation',
            factory: 'diversifiedSamplerAggregation'
        },
        { Class: 'FilterAggregation', factory: 'filterAggregation' },
        { Class: 'FiltersAggregation', factory: 'filtersAggregation' },
        { Class: 'GeoDistanceAggregation', factory: 'geoDistanceAggregation' },
        { Class: 'GeoHashGridAggregation', factory: 'geoHashGridAggregation' },
        { Class: 'GeoHexGridAggregation', factory: 'geoHexGridAggregation' },
        { Class: 'GeoTileGridAggregation', factory: 'geoTileGridAggregation' },
        { Class: 'GlobalAggregation', factory: 'globalAggregation' },
        { Class: 'HistogramAggregation', factory: 'histogramAggregation' },
        { Class: 'IpRangeAggregation', factory: 'ipRangeAggregation' },
        { Class: 'MissingAggregation', factory: 'missingAggregation' },
        { Class: 'NestedAggregation', factory: 'nestedAggregation' },
        { Class: 'ParentAggregation', factory: 'parentAggregation' },
        { Class: 'RangeAggregation', factory: 'rangeAggregation' },
        { Class: 'RareTermsAggregation', factory: 'rareTermsAggregation' },
        {
            Class: 'ReverseNestedAggregation',
            factory: 'reverseNestedAggregation'
        },
        { Class: 'SamplerAggregation', factory: 'samplerAggregation' },
        {
            Class: 'SignificantTermsAggregation',
            factory: 'significantTermsAggregation'
        },
        {
            Class: 'SignificantTextAggregation',
            factory: 'significantTextAggregation'
        },
        { Class: 'TermsAggregation', factory: 'termsAggregation' },
        // Pipeline Aggregations
        { Class: 'AvgBucketAggregation', factory: 'avgBucketAggregation' },
        { Class: 'DerivativeAggregation', factory: 'derivativeAggregation' },
        { Class: 'MaxBucketAggregation', factory: 'maxBucketAggregation' },
        { Class: 'MinBucketAggregation', factory: 'minBucketAggregation' },
        { Class: 'SumBucketAggregation', factory: 'sumBucketAggregation' },
        { Class: 'StatsBucketAggregation', factory: 'statsBucketAggregation' },
        {
            Class: 'ExtendedStatsBucketAggregation',
            factory: 'extendedStatsBucketAggregation'
        },
        {
            Class: 'PercentilesBucketAggregation',
            factory: 'percentilesBucketAggregation'
        },
        {
            Class: 'MovingAverageAggregation',
            factory: 'movingAverageAggregation'
        },
        {
            Class: 'MovingFunctionAggregation',
            factory: 'movingFunctionAggregation'
        },
        {
            Class: 'CumulativeSumAggregation',
            factory: 'cumulativeSumAggregation'
        },
        {
            Class: 'BucketScriptAggregation',
            factory: 'bucketScriptAggregation'
        },
        {
            Class: 'BucketSelectorAggregation',
            factory: 'bucketSelectorAggregation'
        },
        { Class: 'BucketSortAggregation', factory: 'bucketSortAggregation' },
        {
            Class: 'SerialDifferencingAggregation',
            factory: 'serialDifferencingAggregation'
        },
        // Matrix Aggregations
        { Class: 'MatrixStatsAggregation', factory: 'matrixStatsAggregation' }
    ];

    aggregationExports.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(esb[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            expect(esb[tc.factory]).toBeTruthy();
        });
    });
});

describe('Composite Aggregation values sources', () => {
    const valuesSources = [
        { Class: 'TermsValuesSource', factory: 'termsValuesSource' },
        { Class: 'HistogramValuesSource', factory: 'histogramValuesSource' },
        {
            Class: 'DateHistogramValuesSource',
            factory: 'dateHistogramValuesSource'
        }
    ];

    const { CompositeAggregation } = esb;

    valuesSources.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(CompositeAggregation[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            expect(CompositeAggregation[tc.factory]).toBeTruthy();
        });
    });
});

describe('Suggesters', () => {
    const suggesterExports = [
        { Class: 'TermSuggester', factory: 'termSuggester' },
        { Class: 'DirectGenerator', factory: 'directGenerator' },
        { Class: 'PhraseSuggester', factory: 'phraseSuggester' },
        { Class: 'CompletionSuggester', factory: 'completionSuggester' }
    ];

    suggesterExports.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(esb[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            expect(esb[tc.factory]).toBeTruthy();
        });
    });
});

describe('Score Functions', () => {
    const scoreFunctionExports = [
        { Class: 'ScriptScoreFunction', factory: 'scriptScoreFunction' },
        { Class: 'WeightScoreFunction', factory: 'weightScoreFunction' },
        { Class: 'RandomScoreFunction', factory: 'randomScoreFunction' },
        {
            Class: 'FieldValueFactorFunction',
            factory: 'fieldValueFactorFunction'
        },
        { Class: 'DecayScoreFunction', factory: 'decayScoreFunction' }
    ];

    scoreFunctionExports.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(esb[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            expect(esb[tc.factory]).toBeTruthy();
        });
    });
});

describe('Miscellaneous', () => {
    const miscExports = [
        { Class: 'Highlight', factory: 'highlight' },
        { Class: 'Script', factory: 'script' },
        { Class: 'GeoPoint', factory: 'geoPoint' },
        { Class: 'GeoShape', factory: 'geoShape' },
        { Class: 'IndexedShape', factory: 'indexedShape' },
        { Class: 'Sort', factory: 'sort' },
        { Class: 'Rescore', factory: 'rescore' },
        { Class: 'InnerHits', factory: 'innerHits' },
        { Class: 'SearchTemplate', factory: 'searchTemplate' }
    ];

    miscExports.forEach(tc => {
        test(`${tc.Class} is exported`, () => {
            expect(esb[tc.Class]).toBeTruthy();
        });

        test(`${tc.factory} factory is exported`, () => {
            expect(esb[tc.factory]).toBeTruthy();
        });
    });

    test('recipes is exported', () => {
        expect(esb.recipes).toBeTruthy();
    });

    const recipeExports = [
        { method: 'missingQuery', cook: 'cookMissingQuery' },
        { method: 'randomSortQuery', cook: 'cookRandomSortQuery' },
        { method: 'filterQuery', cook: 'cookFilterQuery' }
    ];

    recipeExports.forEach(tc => {
        test(`recipes.${tc.method} is exported`, () => {
            expect(esb.recipes[tc.method]).toBeTruthy();
        });

        test(`${tc.cook} is exported`, () => {
            expect(esb[tc.cook]).toBeTruthy();
        });
    });

    test('prettyPrint is exported', () => {
        expect(esb.prettyPrint).toBeTruthy();
    });

    test('prettyPrint calls toJSON', () => {
        let toJSONCalled = false;
        esb.prettyPrint({
            toJSON() {
                toJSONCalled = true;
                return true;
            }
        });
        expect(toJSONCalled).toBe(true);
    });
});
