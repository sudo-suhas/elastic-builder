/* eslint-disable max-lines */
import { describe, test, expect } from 'vitest';
import {
    RequestBodySearch,
    requestBodySearch,
    MatchQuery,
    MatchPhraseQuery,
    TermQuery,
    BoolQuery,
    FunctionScoreQuery,
    TermsAggregation,
    TermSuggester,
    ScriptScoreFunction,
    Sort,
    Script,
    Highlight,
    Rescore,
    InnerHits,
    RuntimeField,
    KNN
} from '../../src';
import { recursiveToJSON } from '../../src/core/util';

const getInstance = () => new RequestBodySearch();

describe('RequestBodySearch', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('query()', () => {
                expect(() => getInstance().query(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('aggregation()', () => {
                expect(() => getInstance().aggregation(value)).toThrow(
                    new TypeError('Argument must be an instance of Aggregation')
                );
            });

            test('agg()', () => {
                expect(() => getInstance().agg(value)).toThrow(
                    new TypeError('Argument must be an instance of Aggregation')
                );
            });

            test('suggest()', () => {
                expect(() => getInstance().suggest(value)).toThrow(
                    new TypeError('Argument must be an instance of Suggester')
                );
            });

            test('sort()', () => {
                expect(() => getInstance().sort(value)).toThrow(
                    new TypeError('Argument must be an instance of Sort')
                );
            });

            test('scriptFields()', () => {
                expect(() => getInstance().scriptFields(value)).toThrow(
                    new TypeError('Argument must be an instance of Object')
                );
            });

            test('highlight()', () => {
                expect(() => getInstance().highlight(value)).toThrow(
                    new TypeError('Argument must be an instance of Highlight')
                );
            });

            test('rescore()', () => {
                expect(() => getInstance().rescore(value)).toThrow(
                    new TypeError('Argument must be an instance of Rescore')
                );
            });

            test('postFilter()', () => {
                expect(() => getInstance().postFilter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });

            test('kNN()', () => {
                expect(() => getInstance().kNN(value)).toThrow(
                    new TypeError('Argument must be an instance of KNN')
                );
            });
        });
    });

    describe('simple option setters', () => {
        test('sets query option', () => {
            const searchQry = new MatchQuery('desc', 'elastic builder');
            const result = requestBodySearch().query(searchQry).toJSON();
            expect(result).toEqual({
                query: searchQry.toJSON()
            });
        });

        test('sets timeout option', () => {
            const result = requestBodySearch().timeout('5s').toJSON();
            expect(result).toEqual({
                timeout: '5s'
            });
        });

        test('sets from option', () => {
            const result = requestBodySearch().from(10).toJSON();
            expect(result).toEqual({
                from: 10
            });
        });

        test('sets size option', () => {
            const result = requestBodySearch().size(10).toJSON();
            expect(result).toEqual({
                size: 10
            });
        });

        test('sets terminate_after option', () => {
            const result = requestBodySearch().terminateAfter(100).toJSON();
            expect(result).toEqual({
                terminate_after: 100
            });
        });

        test('sets track_scores option', () => {
            const result = requestBodySearch().trackScores(true).toJSON();
            expect(result).toEqual({
                track_scores: true
            });
        });

        test('sets track_total_hits option', () => {
            const result = requestBodySearch().trackTotalHits(true).toJSON();
            expect(result).toEqual({
                track_total_hits: true
            });
        });

        test('sets version option', () => {
            const result = requestBodySearch().version(true).toJSON();
            expect(result).toEqual({
                version: true
            });
        });

        test('sets explain option', () => {
            const result = requestBodySearch().explain(true).toJSON();
            expect(result).toEqual({
                explain: true
            });
        });

        test('sets highlight option', () => {
            const result = requestBodySearch()
                .highlight(new Highlight(['content']).type('plain', 'content'))
                .toJSON();
            expect(result).toEqual({
                highlight: new Highlight(['content'])
                    .type('plain', 'content')
                    .toJSON()
            });
        });

        test('sets post_filter option', () => {
            const filterQry = new BoolQuery()
                .filter(new TermQuery('user', 'Idan'))
                .filter(new TermQuery('level', 'INFO'));
            const result = requestBodySearch().postFilter(filterQry).toJSON();
            expect(result).toEqual({
                post_filter: filterQry.toJSON()
            });
        });

        test('sets rescore option', () => {
            const rescoreA = new Rescore(
                50,
                new MatchPhraseQuery('message', 'the quick brown').slop(2)
            )
                .queryWeight(0.7)
                .rescoreQueryWeight(1.2);
            const result = requestBodySearch().rescore(rescoreA).toJSON();
            expect(result).toEqual({
                rescore: rescoreA.toJSON()
            });
        });

        test('sets min_score option', () => {
            const result = requestBodySearch().minScore(0.5).toJSON();
            expect(result).toEqual({
                min_score: 0.5
            });
        });
    });

    describe('aggregation setters', () => {
        test('sets aggregation option (aggregation method)', () => {
            const aggA = new TermsAggregation('user_term_agg', 'user');
            const result = requestBodySearch().aggregation(aggA).toJSON();
            expect(result).toEqual({
                aggs: {
                    user_term_agg: {
                        terms: { field: 'user' }
                    }
                }
            });
        });

        test('sets aggregation option (agg method)', () => {
            const aggA = new TermsAggregation('user_term_agg', 'user');
            const result = requestBodySearch().agg(aggA).toJSON();
            expect(result).toEqual({
                aggs: {
                    user_term_agg: {
                        terms: { field: 'user' }
                    }
                }
            });
        });

        test('sets multiple aggs', () => {
            const aggA = new TermsAggregation('user_term_agg', 'user');
            const aggB = new TermsAggregation('keyword_term_agg', 'keyword');
            const value = new RequestBodySearch().agg(aggA).agg(aggB).toJSON();
            expect(value).toEqual({
                aggs: {
                    user_term_agg: {
                        terms: { field: 'user' }
                    },
                    keyword_term_agg: {
                        terms: { field: 'keyword' }
                    }
                }
            });
        });

        test('sets multiple aggs in a single call', () => {
            const aggA = new TermsAggregation('user_term_agg', 'user');
            const aggB = new TermsAggregation('keyword_term_agg', 'keyword');
            const value = new RequestBodySearch().aggs([aggA, aggB]).toJSON();
            expect(value).toEqual({
                aggs: {
                    user_term_agg: {
                        terms: { field: 'user' }
                    },
                    keyword_term_agg: {
                        terms: { field: 'keyword' }
                    }
                }
            });
        });

        test('sets aggs with nested', () => {
            const aggB = new TermsAggregation('keyword_term_agg', 'keyword');
            const nestedAgg = new TermsAggregation('user_term_agg', 'user').agg(
                aggB
            );
            const value = new RequestBodySearch().agg(nestedAgg).toJSON();
            expect(value).toEqual({
                aggs: {
                    user_term_agg: {
                        terms: { field: 'user' },
                        aggs: {
                            keyword_term_agg: {
                                terms: { field: 'keyword' }
                            }
                        }
                    }
                }
            });
        });
    });

    describe('suggest setters', () => {
        test('sets suggest option', () => {
            const suggest = new TermSuggester(
                'my-suggestion',
                'message',
                'tring out Elasticsearch'
            );
            const result = requestBodySearch().suggest(suggest).toJSON();
            expect(result).toEqual({
                suggest: suggest.toJSON()
            });
        });

        test('sets suggestText option', () => {
            const result = requestBodySearch()
                .suggestText('suggest-text')
                .toJSON();
            expect(result).toEqual({
                suggest: { text: 'suggest-text' }
            });
        });
    });

    describe('sort setters', () => {
        test('sets sort option', () => {
            const sortChannel = new Sort('channel', 'desc');
            const result = requestBodySearch().sort(sortChannel).toJSON();
            expect(result).toEqual({
                sort: [recursiveToJSON(sortChannel)]
            });
        });

        test('sets sorts option', () => {
            const sortChannel = new Sort('channel', 'desc');
            const sortCategories = new Sort('categories', 'desc');
            const result = requestBodySearch()
                .sorts([sortChannel, sortCategories])
                .toJSON();
            expect(result).toEqual({
                sort: [
                    recursiveToJSON(sortChannel),
                    recursiveToJSON(sortCategories)
                ]
            });
        });
    });

    describe('kNN setters', () => {
        test('sets kNN option with query vector builder', () => {
            const kNNVectorBuilder = new KNN('my_field', 5, 10)
                .similarity(0.6)
                .filter(new TermQuery('field', 'value'))
                .queryVectorBuilder('model_123', 'Sample model text');
            const result = requestBodySearch().kNN(kNNVectorBuilder).toJSON();
            expect(result).toEqual({
                knn: kNNVectorBuilder.toJSON()
            });
        });

        test('kNN setup query vector builder', () => {
            const kNNVectorBuilder = new KNN('my_field', 5, 10)
                .similarity(0.6)
                .filter(new TermQuery('field', 'value'))
                .queryVectorBuilder('model_123', 'Sample model text');
            const value = new RequestBodySearch()
                .kNN(kNNVectorBuilder)
                .toJSON();
            expect(value).toEqual({
                knn: {
                    field: 'my_field',
                    k: 5,
                    filter: [
                        {
                            term: {
                                field: 'value'
                            }
                        }
                    ],
                    num_candidates: 10,
                    query_vector_builder: {
                        text_embeddings: {
                            model_id: 'model_123',
                            model_text: 'Sample model text'
                        }
                    },
                    similarity: 0.6
                }
            });
        });

        test('kNN setup query vector', () => {
            const kNNVector = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            const value = new RequestBodySearch().kNN(kNNVector).toJSON();
            expect(value).toEqual({
                knn: {
                    field: 'my_field',
                    k: 5,
                    filter: [],
                    num_candidates: 10,
                    query_vector: [1, 2, 3]
                }
            });
        });

        test('kNN setup query vector array', () => {
            const kNNVector = new KNN('my_field', 5, 10).queryVector([1, 2, 3]);
            const kNNVectorBuilder = new KNN('my_field', 5, 10)
                .similarity(0.6)
                .filter(new TermQuery('field', 'value'))
                .queryVectorBuilder('model_123', 'Sample model text');
            const value = new RequestBodySearch()
                .kNN([kNNVector, kNNVectorBuilder])
                .toJSON();
            expect(value).toEqual({
                knn: [
                    {
                        field: 'my_field',
                        k: 5,
                        filter: [],
                        num_candidates: 10,
                        query_vector: [1, 2, 3]
                    },
                    {
                        field: 'my_field',
                        filter: [
                            {
                                term: {
                                    field: 'value'
                                }
                            }
                        ],
                        k: 5,
                        num_candidates: 10,
                        query_vector_builder: {
                            text_embeddings: {
                                model_id: 'model_123',
                                model_text: 'Sample model text'
                            }
                        },
                        similarity: 0.6
                    }
                ]
            });
        });
    });

    describe('source option variations', () => {
        test.each([
            {
                name: 'sets source(str) option',
                value: 'obj.*',
                expected: 'obj.*'
            },
            {
                name: 'sets source(bool) option',
                value: false,
                expected: false
            },
            {
                name: 'sets source(arr) option',
                value: ['obj1.*', 'obj2.*'],
                expected: ['obj1.*', 'obj2.*']
            },
            {
                name: 'sets source(obj) option',
                value: {
                    includes: ['obj1.*', 'obj2.*'],
                    excludes: ['*.description']
                },
                expected: {
                    includes: ['obj1.*', 'obj2.*'],
                    excludes: ['*.description']
                }
            }
        ])('$name', ({ value, expected }) => {
            const result = requestBodySearch().source(value).toJSON();
            expect(result).toEqual({
                _source: expected
            });
        });
    });

    describe('stored_fields option variations', () => {
        test.each([
            {
                name: 'sets stored_fields(str) option',
                value: '_none_',
                expected: '_none_'
            },
            {
                name: 'sets stored_fields(arr) option',
                value: ['user', 'postDate'],
                expected: ['user', 'postDate']
            }
        ])('$name', ({ value, expected }) => {
            const result = requestBodySearch().storedFields(value).toJSON();
            expect(result).toEqual({
                stored_fields: expected
            });
        });
    });

    describe('runtime mapping setters', () => {
        test('sets runtimeMapping option', () => {
            const runtimeFieldA = new RuntimeField(
                'keyword',
                "emit(doc['name'].value)"
            );
            const result = requestBodySearch()
                .runtimeMapping('test1', runtimeFieldA)
                .toJSON();
            expect(result).toEqual({
                runtime_mappings: {
                    test1: {
                        type: 'keyword',
                        script: {
                            source: "emit(doc['name'].value)"
                        }
                    }
                }
            });
        });

        test('sets runtimeMappings option', () => {
            const runtimeFieldA = new RuntimeField(
                'keyword',
                "emit(doc['name'].value)"
            );
            const runtimeFieldB = new RuntimeField(
                'boolean',
                "emit(doc['qty'].value > 10)"
            );
            const result = requestBodySearch()
                .runtimeMappings({ test1: runtimeFieldA, test2: runtimeFieldB })
                .toJSON();
            expect(result).toEqual({
                runtime_mappings: {
                    test1: {
                        type: 'keyword',
                        script: {
                            source: "emit(doc['name'].value)"
                        }
                    },
                    test2: {
                        type: 'boolean',
                        script: {
                            source: "emit(doc['qty'].value > 10)"
                        }
                    }
                }
            });
        });

        test('runtime mapping with lang and params', () => {
            const runtimeFieldC = new RuntimeField(
                'keyword',
                "emit(doc['my_field_name'].value * params.factor)"
            )
                .lang('painless')
                .params({ factor: 2.0 });
            const result = requestBodySearch()
                .runtimeMapping('test1', runtimeFieldC)
                .toJSON();
            expect(result).toEqual({
                runtime_mappings: {
                    test1: {
                        type: 'keyword',
                        script: {
                            lang: 'painless',
                            source: "emit(doc['my_field_name'].value * params.factor)",
                            params: {
                                factor: 2.0
                            }
                        }
                    }
                }
            });
        });
    });

    describe('script field setters', () => {
        test('sets scriptField option', () => {
            const scriptA = new Script(
                'inline',
                "doc['my_field_name'].value * 2"
            ).lang('painless');
            const result = requestBodySearch()
                .scriptField('test1', scriptA)
                .toJSON();
            expect(result).toEqual({
                script_fields: {
                    test1: { script: scriptA.toJSON() }
                }
            });
        });

        test('sets scriptFields option', () => {
            const scriptA = new Script(
                'inline',
                "doc['my_field_name'].value * 2"
            ).lang('painless');
            const scriptB = new Script(
                'inline',
                "doc['my_field_name'].value * factor"
            )
                .lang('painless')
                .params({ factor: 2.0 });
            const result = requestBodySearch()
                .scriptFields({
                    test1: scriptA,
                    test2: scriptB
                })
                .toJSON();
            expect(result).toEqual({
                script_fields: {
                    test1: { script: scriptA.toJSON() },
                    test2: { script: scriptB.toJSON() }
                }
            });
        });
    });

    describe('docvalue fields setter', () => {
        test('sets docvalueFields option', () => {
            const result = requestBodySearch()
                .docvalueFields(['test1', 'test2'])
                .toJSON();
            expect(result).toEqual({
                docvalue_fields: ['test1', 'test2']
            });
        });
    });

    describe('indices boost setters', () => {
        test('sets indicesBoost option', () => {
            const result = requestBodySearch()
                .indicesBoost('alias1', 1.4)
                .toJSON();
            expect(result).toEqual({
                indices_boost: [{ alias1: 1.4 }]
            });
        });

        test('sets indexBoost option', () => {
            const result = requestBodySearch()
                .indexBoost('alias1', 1.4)
                .toJSON();
            expect(result).toEqual({
                indices_boost: [{ alias1: 1.4 }]
            });
        });

        test('sets multiple indices_boost', () => {
            const value = new RequestBodySearch()
                .indicesBoost('alias1', 1.4)
                .indicesBoost('index*', 1.3)
                .toJSON();
            expect(value).toEqual({
                indices_boost: [{ alias1: 1.4 }, { 'index*': 1.3 }]
            });
        });
    });

    describe('collapse setter', () => {
        test('sets collapse option with field', () => {
            const result = requestBodySearch().collapse('user').toJSON();
            expect(result).toEqual({
                collapse: { field: 'user' }
            });
        });

        test('sets collapse with inner_hits option', () => {
            const innerHits = new InnerHits()
                .name('last_tweets')
                .size(5)
                .sort(new Sort('date', 'desc'));
            const result = requestBodySearch()
                .collapse(
                    'user',
                    new InnerHits()
                        .name('last_tweets')
                        .size(5)
                        .sort(new Sort('date', 'desc')),
                    4
                )
                .toJSON();
            expect(result).toEqual({
                collapse: {
                    field: 'user',
                    inner_hits: innerHits.toJSON(),
                    max_concurrent_group_searches: 4
                }
            });
        });
    });

    describe('searchAfter setter', () => {
        test('sets searchAfter option', () => {
            const result = requestBodySearch()
                .searchAfter([1463538857, 'tweet#654323'])
                .toJSON();
            expect(result).toEqual({
                search_after: [1463538857, 'tweet#654323']
            });
        });
    });

    describe('rescore handling', () => {
        test('sets two rescores as array', () => {
            const scoreScript = new Script(
                'inline',
                'Math.log10(doc.likes.value + 2)'
            );
            const rescoreA = new Rescore(
                50,
                new MatchPhraseQuery('message', 'the quick brown').slop(2)
            )
                .queryWeight(0.7)
                .rescoreQueryWeight(1.2);
            const rescoreB = new Rescore(
                10,
                new FunctionScoreQuery().function(
                    new ScriptScoreFunction(scoreScript)
                )
            ).scoreMode('multiply');

            const value = new RequestBodySearch()
                .rescore(rescoreA)
                .rescore(rescoreB)
                .toJSON();

            expect(value).toEqual({
                rescore: [
                    {
                        query: {
                            rescore_query: {
                                match_phrase: {
                                    message: {
                                        query: 'the quick brown',
                                        slop: 2
                                    }
                                }
                            },
                            query_weight: 0.7,
                            rescore_query_weight: 1.2
                        },
                        window_size: 50
                    },
                    {
                        query: {
                            rescore_query: {
                                function_score: {
                                    functions: [
                                        {
                                            script_score: {
                                                script: {
                                                    inline: 'Math.log10(doc.likes.value + 2)'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            score_mode: 'multiply'
                        },
                        window_size: 10
                    }
                ]
            });
        });

        test('adds third rescore to existing array', () => {
            const scoreScript = new Script(
                'inline',
                'Math.log10(doc.likes.value + 2)'
            );
            const rescoreA = new Rescore(
                50,
                new MatchPhraseQuery('message', 'the quick brown').slop(2)
            )
                .queryWeight(0.7)
                .rescoreQueryWeight(1.2);
            const rescoreB = new Rescore(
                10,
                new FunctionScoreQuery().function(
                    new ScriptScoreFunction(scoreScript)
                )
            ).scoreMode('multiply');
            const rescoreC = new Rescore(
                25,
                new MatchPhraseQuery('message', 'fox').slop(2)
            )
                .queryWeight(0.9)
                .rescoreQueryWeight(1.5);

            const value = new RequestBodySearch()
                .rescore(rescoreA)
                .rescore(rescoreB)
                .rescore(rescoreC)
                .toJSON();

            expect(value).toEqual({
                rescore: [
                    {
                        query: {
                            rescore_query: {
                                match_phrase: {
                                    message: {
                                        query: 'the quick brown',
                                        slop: 2
                                    }
                                }
                            },
                            query_weight: 0.7,
                            rescore_query_weight: 1.2
                        },
                        window_size: 50
                    },
                    {
                        query: {
                            rescore_query: {
                                function_score: {
                                    functions: [
                                        {
                                            script_score: {
                                                script: {
                                                    inline: 'Math.log10(doc.likes.value + 2)'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            score_mode: 'multiply'
                        },
                        window_size: 10
                    },
                    {
                        query: {
                            rescore_query: {
                                match_phrase: {
                                    message: {
                                        query: 'fox',
                                        slop: 2
                                    }
                                }
                            },
                            query_weight: 0.9,
                            rescore_query_weight: 1.5
                        },
                        window_size: 25
                    }
                ]
            });
        });
    });
});
