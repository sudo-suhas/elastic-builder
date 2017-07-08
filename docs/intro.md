https://github.com/sudo-suhas/elastic-builder

`elastic-builder` is a library for easily building elasticsearch request body for search.
It implements the builder syntax for building complex queries combining queries and aggregations.

What's Included:
  * [Request Body Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)
  * [Queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
  * [Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)
  * [Suggesters](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html)
  * [Search Template](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html)

The complete library documentation is present here.

There are two ways to use the classes for constructing queries:

```js
// Import the library
const bob = require('elastic-builder'); // the builder

// Use `new` keyword for constructor instances of class
const requestBody = new bob.RequestBodySearch()
    .query(new bob.MatchQuery('message', 'this is a test'));

// Or use helper methods which construct the object without need for the `new` keyword
const requestBody = bob.requestBodySearch()
    .query(bob.matchQuery('message', 'this is a test'));

// Build the request body
requestBody.toJSON()
{
   "query": {
     "match": {
       "message": "this is a test"
     }
   }
 }
```

**Demo** - https://elastic-builder.js.org/

**ProTip:** The source is transpiled using babel for compatibility with older versions of node and used by default.
But this is not required in node env 6 and above. You can directly use the `src` files:

```js
const bob = require('elastic-builder/src');
```

This module is heavily influenced by [elastic.js](https://github.com/fullscale/elastic.js)(not maintained anymore).
