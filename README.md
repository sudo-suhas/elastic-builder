# elastic-builder
A Node.js implementation of the [Elasticsearch](http://www.elasticsearch.org/) DSL for use with the [official elasticsearch javascript client](http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/index.html) with builder syntax.

![elastic-builder](assets/elastic-builder.png)

**Check out the [API reference documentation](http://elastic-builder.js.org/docs).**

## Elasticsearch compatibility
`elastic-builder` supports 5.x query DSL. For older versions of the DSL, you can try
[`elastic.js`](https://github.com/ErwanPigneul/elastic.js)
or [`bodybuilder`](https://github.com/danpaz/bodybuilder)

## Install
```
npm install elastic-builder --save
```

## Usage
```js
const bob = require('elastic-builder');

const requestBody = bob.requestBodySearch()
    .query(bob.matchQuery('message', 'this is a test'));

// OR

const requestBody = new bob.RequestBodySearch()
    .query(new bob.MatchQuery('message', 'this is a test'));

// bob.prettyPrint(requestBody)
// {
//   "query": {
//     "match": {
//       "message": "this is a test"
//     }
//   }
// }

// requestBody.toJSON()
// {
//   "query": {
//     "match": {
//       "message": "this is a test"
//     }
//   }
// }
```

For each class, `MyClass`, a utility function `myClass` has been provided which
contructs the object for us without the need for `new` keyword.

## REPL
Try it out on the command line using the node REPL:

```
# Start the repl
node ./node_modules/elastic-builder/repl.js
# The builder is available in the context variable bodybuilder
bob > bob.prettyPrint(bob.requestBodySearch().query(bob.matchQuery('message', 'this is a test')));
```

## Motivation
Elasticsearch only provides a low level client for making requests.
[`elastic.js`](https://github.com/fullscale/elastic.js) was a popular library for building the request search body.
However, this project is not being maintained nor is the [fork](https://github.com/ErwanPigneul/elastic.js).
There were [several changes](https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking_50_search_changes.html)
in the 5.0 release which make the older libraries unusable.

This library is a port of `elastic.js` to es6 with elasticsearch 5.3 compatibility.

## API Reference
API documentation was generated using [documentation.js](https://github.com/documentationjs/documentation)
It can be accessed here - http://elastic-builder.js.org/docs

Dcoumentation is a WIP. See [roadmap](roadmap.md).

## Examples

```js
// Bool query
const requestBody = bob.requestBodySearch()
    .query(
        bob.boolQuery()
            .must(bob.matchQuery('last_name', 'smith'))
            .filter(bob.rangeQuery('age').gt(30))
    )
// requestBody.toJSON()
// {
//     "query" : {
//         "bool" : {
//             "must" : {
//                 "match" : {
//                     "last_name" : "smith"
//                 }
//             },
//             "filter" : {
//                 "range" : {
//                     "age" : { "gt" : 30 }
//                 }
//             }
//         }
//     }
// }

// Multi Match Query
const requestBody = bob.requestBodySearch()
    .query(
        bob.multiMatchQuery(['title', 'body'], 'Quick brown fox')
            .type('best_fields')
            .tieBreaker(0.3)
            .minimumShouldMatch('30%')
    );
// requestBody.toJSON()
// {
//     "multi_match": {
//         "query": "Quick brown fox",
//         "type":  "best_fields",
//         "fields": [ "title", "body" ],
//         "tie_breaker": 0.3,
//         "minimum_should_match": "30%"
//     }
// }

// Aggregation
const requestBody = bob.requestBodySearch()
    .size(0)
    .agg(bob.termsAggregation('popular_colors', 'color'));
// requestBody.toJSON()
// {
//     "size" : 0,
//     "aggs" : {
//         "popular_colors" : {
//             "terms" : {
//               "field" : "color"
//             }
//         }
//     }
// }

// Nested Aggregation
const requestBody = bob.requestBodySearch()
    .size(0)
    .agg(
        bob.termsAggregation('colors', 'color')
            .agg(bob.avgAggregation('avg_price', 'price'))
            .agg(bob.termsAggregation('make', 'make'))
    );
// requestBody.toJSON()
// {
//    "size" : 0,
//    "aggs": {
//       "colors": {
//          "terms": {
//             "field": "color"
//          },
//          "aggs": {
//             "avg_price": {
//                "avg": {
//                   "field": "price"
//                }
//             },
//             "make": {
//                 "terms": {
//                     "field": "make"
//                 }
//             }
//          }
//       }
//    }
// }
```

## Validation
`elastic-builder` provides lightweight validation where ever possible:

```
$ node repl.js
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
Tests are yet to be added. See [roadmap](roadmap.md).

## Credits
`elastic-builder` is heavily inspired by [`elastic.js`](https://github.com/fullscale/elastic.js)
and the [fork](https://github.com/ErwanPigneul/elastic.js) by Erwan Pigneul.

[bodybuilder](https://github.com/danpaz/bodybuilder) for documentation style, build setup, demo page.

## License
MIT
