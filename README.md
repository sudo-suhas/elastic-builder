# elastic-builder

[![Build Status](https://travis-ci.org/sudo-suhas/elastic-builder.svg?branch=master)](https://travis-ci.org/sudo-suhas/elastic-builder)
[![Coverage Status](https://coveralls.io/repos/github/sudo-suhas/elastic-builder/badge.svg?branch=master)](https://coveralls.io/github/sudo-suhas/elastic-builder?branch=master)

A Node.js implementation of the [Elasticsearch](http://www.elasticsearch.org/) DSL for use with the [official elasticsearch javascript client](http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/index.html) with builder syntax.

![elastic-builder](assets/elastic-builder.png)

**Check out the [API reference documentation](http://elastic-builder.js.org/docs).**

elastic-builder includes TypeScript definition for superior development experience.

## Elasticsearch compatibility
`elastic-builder` was built for 5.x query DSL. However, the library should be usable with
2.x as well. For older versions of the DSL, you can try
[`elastic.js`](https://github.com/ErwanPigneul/elastic.js)
or [`bodybuilder`](https://github.com/danpaz/bodybuilder)

`elastic-builder` is also 100% compatible with elasticsearch 6.0(alpha).
Although there were [breaking changes](https://www.elastic.co/guide/en/elasticsearch/reference/master/breaking_60_search_changes.html),
all deprecated queries, features in 5.0 were avoided or not implemented.

## Install
```
npm install elastic-builder --save
```

## Usage
```js
const bob = require('elastic-builder'); // the builder

const requestBody = bob.requestBodySearch()
    .query(bob.matchQuery('message', 'this is a test'));

// OR

const requestBody = new bob.RequestBodySearch()
    .query(new bob.MatchQuery('message', 'this is a test'));

requestBody.toJSON() // or print to console - bob.prettyPrint(requestBody)
{
  "query": {
    "match": {
      "message": "this is a test"
    }
  }
}
```

For each class, `MyClass`, a utility function `myClass` has been provided which
contructs the object for us without the need for `new` keyword.

## REPL
Try it out on the command line using the node REPL:

```
# Start the repl
node ./node_modules/elastic-builder/repl.js
# The builder is available in the context variable bob
elastic-builder > bob.prettyPrint(bob.requestBodySearch().query(bob.matchQuery('message', 'this is a test')));
```

## Motivation
Elasticsearch only provides a low level client for making requests.
[`elastic.js`](https://github.com/fullscale/elastic.js) was a relatively popular library for building the request search body.
However, this project is not being maintained nor is the [fork](https://github.com/ErwanPigneul/elastic.js).
There were [several changes](https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking_50_search_changes.html)
in the 5.0 release which make the older libraries unusable.

This library is a port of `elastic.js` to es6 with elasticsearch 5.x compatibility.

## API Reference
API reference can be accessed here - http://elastic-builder.js.org/docs.
The docs include examples ported from the [official elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html).

API documentation was generated using [documentation.js](https://github.com/documentationjs/documentation).
It is being hosted with help from this awesome project - https://github.com/js-org/dns.js.org

## Recipes
The library has a few helper recipes:
- [Missing query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html#_literal_missing_literal_query)
- [Random sort query](https://www.elastic.co/guide/en/elasticsearch/reference/5.3/query-dsl-function-score-query.html#function-random)
- [Filter query](https://www.elastic.co/guide/en/elasticsearch/reference/5.3/query-dsl-bool-query.html)

```js
const qry = bob.cookMissingQuery('user');

qry.toJSON();
{
  "bool": {
    "must_not": {
      "exists": { "field": "user" }
    }
  }
}
```

Check out the [reference docs](http://elastic-builder.js.org/docs#recipes) for more examples.

If you have any recipes, please do share or better yet, create a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) :smile:.

## Changelog
[releases](https://github.com/sudo-suhas/elastic-builder/releases)

## Examples

```js
// Bool query
const requestBody = bob.requestBodySearch()
    .query(
        bob.boolQuery()
            .must(bob.matchQuery('last_name', 'smith'))
            .filter(bob.rangeQuery('age').gt(30))
    )
requestBody.toJSON()
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
const requestBody = bob.requestBodySearch()
    .query(
        bob.multiMatchQuery(['title', 'body'], 'Quick brown fox')
            .type('best_fields')
            .tieBreaker(0.3)
            .minimumShouldMatch('30%')
    );
requestBody.toJSON()
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
const requestBody = bob.requestBodySearch()
    .size(0)
    .agg(bob.termsAggregation('popular_colors', 'color'));
requestBody.toJSON()
{
  "size": 0,
  "aggs": {
    "popular_colors": {
      "terms": { "field": "color" }
    }
  }
}

// Nested Aggregation
const requestBody = bob.requestBodySearch()
    .size(0)
    .agg(
        bob.termsAggregation('colors', 'color')
            .agg(bob.avgAggregation('avg_price', 'price'))
            .agg(bob.termsAggregation('make', 'make'))
    );
requestBody.toJSON()
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
const agg = new bob.TermsAggregation('countries', 'artist.country')
    .order('rock>playback_stats.avg', 'desc')
    .agg(
        new bob.FilterAggregation(
            'rock',
            new bob.TermQuery('genre', 'rock')
        ).agg(new bob.StatsAggregation('playback_stats', 'play_count'))
    )
    .toJSON();
agg.toJSON()
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
const requestBody = bob.requestBodySearch()
    .query(
        bob.boolQuery()
            .filter(bob.termQuery('message', 'test'))
    )
    .sort(bob.sort('timestamp', 'desc'))
    .sorts([
        bob.sort('channel', 'desc'),
        bob.sort('categories', 'desc'),
        // The order defaults to desc when sorting on the _score,
        // and defaults to asc when sorting on anything else.
        bob.sort('content'),
        bob.sort('price').order('desc').mode('avg')
    ]);
requestBody.toJSON()
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
const requestBody = bob.requestBodySearch()
    .query(bob.matchAllQuery())
    .size(5)
    .from(10);
requestBody.toJSON()
{
  "query": { "match_all": {} },
  "size": 5,
  "from": 10
}
```
For more examples, check out the [reference docs](https://elastic-builder.js.org/docs/).

## Validation
`elastic-builder` provides lightweight validation where ever possible:

```
$ node ./node_modules/elastic-builder/repl.js
elastic-builder > bob.multiMatchQuery().field('title').field('body').query('Quick brown fox').type('bwst_fields')
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
`elastic-builder` is heavily inspired by [`elastic.js`](https://github.com/fullscale/elastic.js)
and the [fork](https://github.com/ErwanPigneul/elastic.js) by Erwan Pigneul.

[bodybuilder](https://github.com/danpaz/bodybuilder) for documentation style, build setup, demo page.

## License
MIT
