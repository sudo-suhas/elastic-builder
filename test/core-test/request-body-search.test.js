import test from 'ava';
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
    InnerHits
} from '../../src';
import { illegalParamType, makeSetsOptionMacro } from '../_macros';

const setsOption = makeSetsOptionMacro(requestBodySearch);

const searchQry = new MatchQuery('desc', 'elastic builder');
const filterQry = new BoolQuery()
    .filter(new TermQuery('user', 'Idan'))
    .filter(new TermQuery('level', 'INFO'));

const aggA = new TermsAggregation('user_term_agg', 'user');
const aggB = new TermsAggregation('keyword_term_agg', 'keyword');

const suggest = new TermSuggester('my-suggestion', 'message', 'tring out Elasticsearch');

const sortChannel = new Sort('channel', 'desc');
const sortCategories = new Sort('categories', 'desc');

const scriptA = new Script('inline', "doc['my_field_name'].value * 2").lang('painless');
const scriptB = new Script('inline', "doc['my_field_name'].value * factor")
    .lang('painless')
    .params({ factor: 2.0 });
const scoreScript = new Script('inline', 'Math.log10(doc.likes.value + 2)');

const rescoreA = new Rescore(50, new MatchPhraseQuery('message', 'the quick brown').slop(2))
    .queryWeight(0.7)
    .rescoreQueryWeight(1.2);
const rescoreB = new Rescore(
    10,
    new FunctionScoreQuery().function(new ScriptScoreFunction(scoreScript))
).scoreMode('multiply');
const rescoreC = new Rescore(25, new MatchPhraseQuery('message', 'fox').slop(2))
    .queryWeight(0.9)
    .rescoreQueryWeight(1.5);

const innerHits = new InnerHits().name('last_tweets').size(5).sort(new Sort('date', 'desc'));

const instance = new RequestBodySearch();

test(illegalParamType, instance, 'query', 'Query');
test(illegalParamType, instance, 'aggregation', 'Aggregation');
test(illegalParamType, instance, 'agg', 'Aggregation');
test(illegalParamType, instance, 'suggest', 'Suggester');
test(illegalParamType, instance, 'sort', 'Sort');
test(illegalParamType, instance, 'scriptFields', 'Object');
test(illegalParamType, instance, 'highlight', 'Highlight');
test(illegalParamType, instance, 'rescore', 'Rescore');
test(illegalParamType, instance, 'postFilter', 'Query');
test(setsOption, 'query', { param: searchQry });
test(setsOption, 'aggregation', { param: aggA, keyName: 'aggs' });
test(setsOption, 'agg', { param: aggA, keyName: 'aggs' });
test(setsOption, 'suggest', { param: suggest });
test(setsOption, 'suggestText', {
    param: 'suggest-text',
    keyName: 'suggest',
    propValue: { text: 'suggest-text' }
});
test(setsOption, 'timeout', { param: '5s' });
test(setsOption, 'from', { param: 10 });
test(setsOption, 'size', { param: 10 });
test(setsOption, 'terminateAfter', { param: 100 });
test(setsOption, 'sort', {
    param: sortChannel,
    propValue: [sortChannel]
});
test(setsOption, 'sorts', {
    param: [sortChannel, sortCategories],
    spread: false,
    keyName: 'sort'
});
test(setsOption, 'trackScores', { param: true });
test(setsOption, 'version', { param: true });
test(setsOption, 'explain', { param: true });
test(setsOption, 'highlight', { param: new Highlight(['content']).type('plain', 'content') });
test('sets source(str) option', setsOption, 'source', { param: 'obj.*', keyName: '_source' });
test('sets source(bool) option', setsOption, 'source', { param: false, keyName: '_source' });
test('sets source(arr) option', setsOption, 'source', {
    param: ['obj1.*', 'obj2.*'],
    spread: false,
    keyName: '_source'
});
test('sets source(obj) option', setsOption, 'source', {
    param: {
        includes: ['obj1.*', 'obj2.*'],
        excludes: ['*.description']
    },
    keyName: '_source'
});
test('sets stored_fields(str) option', setsOption, 'storedFields', { param: '_none_' });
test('sets stored_fields(arr) option', setsOption, 'storedFields', {
    param: ['user', 'postDate'],
    spread: false
});
test(setsOption, 'scriptField', {
    param: ['test1', scriptA],
    propValue: { test1: { script: scriptA } },
    keyName: 'script_fields'
});
test(setsOption, 'scriptFields', {
    param: {
        test1: scriptA,
        test2: scriptB
    },
    propValue: {
        test1: { script: scriptA },
        test2: { script: scriptB }
    }
});
test(setsOption, 'docvalueFields', { param: ['test1', 'test2'], spread: false });
test(setsOption, 'postFilter', { param: filterQry });
test(setsOption, 'rescore', { param: rescoreA });
test(setsOption, 'indicesBoost', { param: ['alias1', 1.4], propValue: [{ alias1: 1.4 }] });
test(setsOption, 'indexBoost', {
    param: ['alias1', 1.4],
    propValue: [{ alias1: 1.4 }],
    keyName: 'indices_boost'
});
test(setsOption, 'minScore', { param: 0.5 });
test(setsOption, 'collapse', { param: 'user', propValue: { field: 'user' } });
test('sets collapse with inner_hits option', setsOption, 'collapse', {
    param: ['user', new InnerHits().name('last_tweets').size(5).sort(new Sort('date', 'desc')), 4],
    propValue: { field: 'user', inner_hits: innerHits, max_concurrent_group_searches: 4 }
});
test(setsOption, 'searchAfter', { param: [1463538857, 'tweet#654323'], spread: false });

// agg, aggregation
test('sets multiple aggs', t => {
    const value = new RequestBodySearch().agg(aggA).agg(aggB).toJSON();
    const expected = {
        aggs: {
            user_term_agg: {
                terms: { field: 'user' }
            },
            keyword_term_agg: {
                terms: { field: 'keyword' }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('sets multiple aggs in a single call', t => {
    const value = new RequestBodySearch().aggs([aggA, aggB]).toJSON();
    const expected = {
        aggs: {
            user_term_agg: {
                terms: { field: 'user' }
            },
            keyword_term_agg: {
                terms: { field: 'keyword' }
            }
        }
    };
    t.deepEqual(value, expected);
});

test('sets aggs with nested', t => {
    const nestedAgg = new TermsAggregation('user_term_agg', 'user').agg(aggB);
    const value = new RequestBodySearch().agg(nestedAgg).toJSON();
    const expected = {
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
    };
    t.deepEqual(value, expected);
});

test('sets multiple rescore', t => {
    const value = new RequestBodySearch().rescore(rescoreA).rescore(rescoreB);
    const expected = {
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
                            script_score: {
                                script: { inline: 'Math.log10(doc.likes.value + 2)' }
                            }
                        }
                    },
                    score_mode: 'multiply'
                },
                window_size: 10
            }
        ]
    };
    t.deepEqual(value.toJSON(), expected);

    value.rescore(rescoreC);
    expected.rescore.push({
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
    });
    t.deepEqual(value.toJSON(), expected);
});

test('sets multiple indices_boost', t => {
    const value = new RequestBodySearch()
        .indicesBoost('alias1', 1.4)
        .indicesBoost('index*', 1.3)
        .toJSON();
    const expected = {
        indices_boost: [{ alias1: 1.4 }, { 'index*': 1.3 }]
    };
    t.deepEqual(value, expected);
});
