import * as esb from '../';

new esb.RequestBodySearch().query(new esb.MatchQuery('message', 'this is a test')).toJSON();

esb
    .requestBodySearch()
    .query(
        esb
            .boolQuery()
            .must(esb.matchQuery('last_name', 'smith'))
            .filter(esb.rangeQuery('age').gt(30))
    );

// Multi Match Query
esb
    .requestBodySearch()
    .query(
        esb
            .multiMatchQuery(['title', 'body'], 'Quick brown fox')
            .type('best_fields')
            .tieBreaker(0.3)
            .minimumShouldMatch('30%')
    );

// Aggregation
esb.requestBodySearch().size(0).agg(esb.termsAggregation('popular_colors', 'color'));

// Nested Aggregation
esb
    .requestBodySearch()
    .size(0)
    .agg(
        esb
            .termsAggregation('colors', 'color')
            .agg(esb.avgAggregation('avg_price', 'price'))
            .agg(esb.termsAggregation('make', 'make'))
    );

new esb.TermsAggregation('countries', 'artist.country')
    .order('rock>playback_stats.avg', 'desc')
    .agg(
        new esb.FilterAggregation('rock', new esb.TermQuery('genre', 'rock')).agg(
            new esb.StatsAggregation('playback_stats', 'play_count')
        )
    )
    .toJSON();

// Sort
esb
    .requestBodySearch()
    .query(esb.boolQuery().filter(esb.termQuery('message', 'test')))
    .sort(esb.sort('timestamp', 'desc'))
    .sorts([
        esb.sort('channel', 'desc'),
        esb.sort('categories', 'desc'),
        // The order defaults to desc when sorting on the _score,
        // and defaults to asc when sorting on anything else.
        esb.sort('content'),
        esb.sort('price').order('desc').mode('avg')
    ]);

// From / size
esb.requestBodySearch().query(esb.matchAllQuery()).size(5).from(10);

esb.recipes.filterQuery(esb.matchQuery('message', 'this is a test'))

