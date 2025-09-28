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

// Combined Fields Query
esb
    .requestBodySearch()
    .query(
        esb
            .combinedFieldsQuery(['title', 'body'], 'Quick brown fox')
            .operator('and')
            .autoGenerateSynonymsPhraseQuery(true)
            .zeroTermsQuery('all')
    );

// Combined Fields Query with single field
esb
    .requestBodySearch()
    .query(
        esb
            .combinedFieldsQuery('title', 'Quick brown fox')
            .field('description')
            .fields(['tags', 'content^2'])
    );

// Combined Fields Query - class constructor
new esb.CombinedFieldsQuery(['title', 'content'], 'search terms')
    .operator('or')
    .autoGenerateSynonymsPhraseQuery(false)
    .toJSON();

// Percolate Query
esb
    .requestBodySearch()
    .query(
        esb
            .percolateQuery('query', 'people')
            .document({ name: 'Will Smith' })
            .documents([{ name: 'Willow Smith'}, { name: 'Jaden Smith' }])
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

