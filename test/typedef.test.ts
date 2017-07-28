import * as bob from '../';

new bob.RequestBodySearch().query(new bob.MatchQuery('message', 'this is a test')).toJSON();

bob
    .requestBodySearch()
    .query(
        bob
            .boolQuery()
            .must(bob.matchQuery('last_name', 'smith'))
            .filter(bob.rangeQuery('age').gt(30))
    );

// Multi Match Query
bob
    .requestBodySearch()
    .query(
        bob
            .multiMatchQuery(['title', 'body'], 'Quick brown fox')
            .type('best_fields')
            .tieBreaker(0.3)
            .minimumShouldMatch('30%')
    );

// Aggregation
bob.requestBodySearch().size(0).agg(bob.termsAggregation('popular_colors', 'color'));

// Nested Aggregation
bob
    .requestBodySearch()
    .size(0)
    .agg(
        bob
            .termsAggregation('colors', 'color')
            .agg(bob.avgAggregation('avg_price', 'price'))
            .agg(bob.termsAggregation('make', 'make'))
    );

new bob.TermsAggregation('countries', 'artist.country')
    .order('rock>playback_stats.avg', 'desc')
    .agg(
        new bob.FilterAggregation('rock', new bob.TermQuery('genre', 'rock')).agg(
            new bob.StatsAggregation('playback_stats', 'play_count')
        )
    )
    .toJSON();

// Sort
bob
    .requestBodySearch()
    .query(bob.boolQuery().filter(bob.termQuery('message', 'test')))
    .sort(bob.sort('timestamp', 'desc'))
    .sorts([
        bob.sort('channel', 'desc'),
        bob.sort('categories', 'desc'),
        // The order defaults to desc when sorting on the _score,
        // and defaults to asc when sorting on anything else.
        bob.sort('content'),
        bob.sort('price').order('desc').mode('avg')
    ]);

// From / size
bob.requestBodySearch().query(bob.matchAllQuery()).size(5).from(10);

bob.recipes.filterQuery(bob.matchQuery('message', 'this is a test'))

