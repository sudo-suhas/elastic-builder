# elastic-builder

[![npm version][version-badge]][package] [![Build Status][build-badge]][build]
[![Coverage Status][coverage-badge]][coverage]
[![semantic-release][semantic-release-badge]][semantic-release]

A Node.js implementation of the [Elasticsearch][elasticsearch] DSL for use with
the [official elasticsearch javascript client][es-js-client] with builder
syntax.

![elastic-builder](elastic-builder.png)

**Check out the [API reference documentation][api-docs].**

Relevant blog post:
https://blog.logrocket.com/elasticsearch-query-body-builder-node-js/

elastic-builder includes TypeScript definition for superior development
experience.

## Elasticsearch compatibility

`elastic-builder` was built for 5.x query DSL. However, the library should be
usable with 2.x as well. For older versions of the DSL, you can try
[`elastic.js`][elastic-js-fork] or [`bodybuilder`][bodybuilder]

`elastic-builder` is also compatible with elasticsearch 6.0(alpha) for the most
part. However, there are some [breaking changes][es-6-breaking-changes] which
have been called out in the docs(ex: [`Script.file`][api-docs-script-file].

What's Included:

- [Request Body Search][es-search-request-body]
- [Queries][es-query-dsl]
- [Aggregations][es-search-aggregations]
- [Suggesters][es-search-suggesters]
- [Search Template][es-search-template.html]

## Install

```
npm install elastic-builder --save
```

## Usage

```js
const esb = require('elastic-builder'); // the builder

const requestBody = esb.requestBodySearch()
  .query(esb.matchQuery('message', 'this is a test'));

// OR

const requestBody = new esb.RequestBodySearch().query(
  new esb.MatchQuery('message', 'this is a test')
);

requestBody.toJSON(); // or print to console - esb.prettyPrint(requestBody)
{
  "query": {
    "match": {
      "message": "this is a test"
    }
  }
}
```

For each class, `MyClass`, a utility function `myClass` has been provided which
constructs the object for us without the need for `new` keyword.

## REPL

Try it out on the command line using the node REPL:

```
# Start the repl
node ./node_modules/elastic-builder/repl.js
# The builder is available in the context variable esb
elastic-builder > esb.prettyPrint(
...   esb.requestBodySearch()
...     .query(esb.matchQuery('message', 'this is a test'))
... );
{
  "query": {
    "match": {
      "message": "this is a test"
    }
  }
}
```

## Motivation

Elasticsearch only provides a low level client for making requests.
[`elastic.js`][elastic-js] was a relatively popular library for building the
request search body. However, this project is not being maintained nor is the
[fork][elastic-js-fork]. There were [several changes][es-5-breaking-changes] in
the 5.0 release which make the older libraries unusable.

This library is a port of `elastic.js` to es6 with elasticsearch 5.x
compatibility.

## API Reference

API reference can be accessed here - https://elastic-builder.js.org/docs. The
docs include examples ported from the [official elasticsearch
reference][es-reference].

API documentation was generated using [documentation.js][documentation-js]. It
is being hosted with help from this awesome project -
https://github.com/js-org/dns.js.org

## Recipes

The library has a few helper recipes:

- [Missing query][es-missing-query]
- [Random sort query][es-random-score-query]
- [Filter query][es-filter-query]

```js
const qry = esb.cookMissingQuery('user');

qry.toJSON();
{
  "bool": {
    "must_not": {
      "exists": { "field": "user" }
    }
  }
}
```

Check out the [reference docs][api-docs-recipes] for more examples.

If you have any recipes, please do share or better yet, create a [pull
request][create-pull-request] :smile:.

## Changelog

[releases][releases]

## Examples

**Usage with official elasticsearch client:**

```js
'use strict';

const elasticsearch = require('elasticsearch');
const esb = require('elastic-builder');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const requestBody = esb
  .requestBodySearch()
  .query(esb.matchQuery('body', 'elasticsearch'));

client
  .search({
    index: 'twitter',
    type: 'tweets',
    body: requestBody.toJSON()
  })
  .then(resp => {
    const hits = resp.hits.hits;
  })
  .catch(err => {
    console.trace(err.message);
  });
```

```js
// Bool query
const requestBody = esb.requestBodySearch().query(
  esb.boolQuery()
    .must(esb.matchQuery('last_name', 'smith'))
    .filter(esb.rangeQuery('age').gt(30))
);
requestBody.toJSON();
{
  "query": {
    "bool": {
      "must": {
        "match": { "last_name": "smith" }
      },
      "filter": {
        "range": { "age": { "gt": 30 } }
      }
    }
  }
}

// Multi Match Query
const requestBody = esb.requestBodySearch().query(
  esb.multiMatchQuery(['title', 'body'], 'Quick brown fox')
    .type('best_fields')
    .tieBreaker(0.3)
    .minimumShouldMatch('30%')
);
requestBody.toJSON();
{
  "multi_match": {
    "query": "Quick brown fox",
    "type": "best_fields",
    "fields": ["title", "body"],
    "tie_breaker": 0.3,
    "minimum_should_match": "30%"
  }
}

// Aggregation
const requestBody = esb.requestBodySearch()
  .size(0)
  .agg(esb.termsAggregation('popular_colors', 'color'));
requestBody.toJSON();
{
  "size": 0,
  "aggs": {
    "popular_colors": {
      "terms": { "field": "color" }
    }
  }
}

// Nested Aggregation
const requestBody = esb.requestBodySearch()
  .size(0)
  .agg(
    esb.termsAggregation('colors', 'color')
      .agg(esb.avgAggregation('avg_price', 'price'))
      .agg(esb.termsAggregation('make', 'make'))
  );
requestBody.toJSON();
{
  "size": 0,
  "aggs": {
    "colors": {
      "terms": { "field": "color" },
      "aggs": {
        "avg_price": {
          "avg": { "field": "price" }
        },
        "make": {
          "terms": { "field": "make" }
        }
      }
    }
  }
}

// If you prefer using the `new` keyword
const agg = new esb.TermsAggregation('countries', 'artist.country')
  .order('rock>playback_stats.avg', 'desc')
  .agg(
    new esb.FilterAggregation('rock', new esb.TermQuery('genre', 'rock')).agg(
      new esb.StatsAggregation('playback_stats', 'play_count')
    )
  );
agg.toJSON();
{
  "countries": {
    "terms": {
      "field": "artist.country",
      "order": { "rock>playback_stats.avg": "desc" }
    },
    "aggs": {
      "rock": {
        "filter": {
          "term": { "genre": "rock" }
        },
        "aggs": {
          "playback_stats": {
            "stats": { "field": "play_count" }
          }
        }
      }
    }
  }
}

// Sort
const requestBody = esb.requestBodySearch()
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
requestBody.toJSON();
{
  "query": {
    "bool": {
      "filter": {
        "term": { "message": "test" }
      }
    }
  },
  "sort": [
    { "timestamp": { "order": "desc" } },
    { "channel": { "order": "desc" } },
    { "categories": { "order": "desc" } },
    "content",
    { "price": { "order": "desc", "mode": "avg" } }
  ]
}

// From / size
const requestBody = esb.requestBodySearch()
  .query(esb.matchAllQuery())
  .size(5)
  .from(10);
requestBody.toJSON();
{
  "query": { "match_all": {} },
  "size": 5,
  "from": 10
}
```

For more examples, check out the [reference docs][api-docs].

## Validation

`elastic-builder` provides lightweight validation where ever possible:

```
$ node ./node_modules/elastic-builder/repl.js
elastic-builder > esb.multiMatchQuery().field('title').field('body').query('Quick brown fox').type('bwst_fields')
See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
Got 'type' - bwst_fields
Error: The 'type' parameter should belong to Set {
  'best_fields',
  'most_fields',
  'cross_fields',
  'phrase',
  'phrase_prefix' }
    at MultiMatchQuery.type (E:\Projects\repos\elastic-builder\lib\queries\full-text-queries\multi-match-query.js:134:23)
    at repl:1:77
    at ContextifyScript.Script.runInContext (vm.js:35:29)
    at REPLServer.defaultEval (repl.js:342:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:538:10)
    at emitOne (events.js:96:13)
    at REPLServer.emit (events.js:188:7)
    at REPLServer.Interface._onLine (readline.js:239:10)
```

## Tests

Run unit tests:

```
npm test
```

## Credits

`elastic-builder` is heavily inspired by [`elastic.js`][elastic-js] and the
[fork][elastic-js-fork] by Erwan Pigneul.

[`bodybuilder`][bodybuilder] for documentation style, build setup, demo page.

## License

MIT © [Suhas Karanth][sudo-suhas]

[version-badge]: https://badge.fury.io/js/elastic-builder.svg
[package]: https://www.npmjs.com/package/elastic-builder
[build-badge]:
  https://github.com/sudo-suhas/elastic-builder/actions/workflows/build.yml/badge.svg
[build]: https://github.com/sudo-suhas/elastic-builder/actions/workflows/build.yml
[coverage-badge]:
  https://coveralls.io/repos/github/sudo-suhas/elastic-builder/badge.svg?branch=master
[coverage]: https://coveralls.io/github/sudo-suhas/elastic-builder?branch=master
[semantic-release-badge]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[elasticsearch]: https://www.elasticsearch.org/
[es-js-client]:
  https://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/index.html
[es-reference]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
[es-5-breaking-changes]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking_50_search_changes.html
[es-6-breaking-changes]:
  https://www.elastic.co/guide/en/elasticsearch/reference/master/breaking_60_search_changes.html
[es-search-request-body]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html
[es-query-dsl]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
[es-missing-query]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html#_literal_missing_literal_query
[es-random-score-query]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-random
[es-filter-query]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
[es-search-aggregations]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
[es-search-suggesters]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html
[es-search-template.html]:
  https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
[api-docs]: https://elastic-builder.js.org/docs
[api-docs-recipes]: https://elastic-builder.js.org/docs#recipes
[api-docs-script-file]: https://elastic-builder.js.org/docs/#scriptfile
[releases]: https://github.com/sudo-suhas/elastic-builder/releases
[elastic-js]: https://github.com/fullscale/elastic.js
[elastic-js-fork]: https://github.com/ErwanPigneul/elastic.js
[bodybuilder]: https://github.com/danpaz/bodybuilder
[documentation-js]: https://github.com/documentationjs/documentation
[create-pull-request]:
  https://help.github.com/articles/creating-a-pull-request-from-a-fork/
[sudo-suhas]: https://github.com/sudo-suhas
