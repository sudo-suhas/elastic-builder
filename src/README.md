# Source Guide
All good open source repositories have an excellent README guide or a website which
explains how to _use_ it. But most of them don't have any kind of guide for the source itself.
Although this is less likely to be useful for the average user, it can be quite useful for
anyone who is looking to contribute or perhaps wants to debug a weird behavior.

You absolutely don't _need_ to read this. But you could. If you wanted to.

## Project structure overview
All the source files written in ES6 are present in the `src` folder.

```js
// package.json snippet
{
  // ...
  // Files to be picked up by npm
  "files": [
    "browser/",
    "src/",
    "repl.js",
    "index.d.ts"
  ],
  // ...
}
```

These files are then packed into a minified `umd` module
for use in the browser and kept in the `browser` folder.
This is also used by the demo hosted on https://elastic-builder.js.org

The code in `src` folder doesn't use es6 imports. So it can be directly used without the transpiled code.
Earlier, the transpiled code used to jumble the documentation so there was an advantage to using
from `elastic-builder/src`. But now I have added the type definition so that advantage no longer applies.

Starting from the base folder `src`, `index.js` simply pulls in all the concrete classes and re-exports
them under the same object so that you can access all queries and aggregations. It also adds
helper methods so that the class, for example `MatchQuery` can be instantiated with `esb.matchQuery()`
thereby avoiding the `new` keyword. This means there are 2 ways of doing the same thing. While this is not ideal,
the reason for doing so because the documentation, type definitions declare classes and
it might be confusing to access them using only functions. I am open to rethinking this approach.
`recipes.js` has a few helper methods for augmenting the base queries and aggregations.
For example, although elasticsearch no longer supports the `missing` query, there is a helper recipe for that.
I am also considering adding a `bodybuilder` style bool query builder to the recipes.

The library uses inheritance and es6 class syntax quite heavily. The base classes for
request body search, queries, aggregations and other misc classes are present in `core`.
The queries, aggregations are organised to mirror the elasticsearch reference guide.
Whereever there is common behavior for multiple classes, the methods are moved to a base class.
Strictly speaking, all the base classes are instantiable.
But this is less likely to be useful and hence are not exported.
You could very easily override or extend any behavior for these classes.
Some classes have a relatively long inheritance chain.

```
Query -> FullTextQueryBase -> MonoFieldQueryBase -> MatchPhraseQueryBase -> MatchPhraseQuery
```
This can get a little confusing but I am hoping that the type definition solves
most of the woes.

Tests are written using `ava` and each file is independent. I am using macros heavily.
Probably harder to understand. But very good for reusing test code.
To be able to test with different node versions,
we need to use `babel` again. However, the `lib` files do not have source maps(not useful in prod) so cannot be used
to measure coverage. Earlier, I setup `ava` to use `babel-register` but with the sheer number of files,
this performed very poorly. So as suggested in a `ava` recipe, I setup pre-compilation step to transpile
tests to `_build` folder(not tracked in git).

You can pretty much ignore the `assets` folder.

## Release
I am using `release-it` for making releases. One of the key factors for doing this is to
auto generate release notes. I also looked into conventional changelog and am trying to follow that
for commits. On starting the release, it runs tests, builds `lib`, generates documentation(`docs` folder)
and creates the github release. I manually wait for all tests in travis to pass before running `npm publish`.
There are other options like semantic release which can take care of the entire workflow but
provide less flexibility. I am not yet completely comfortable with git branches and am using the `master`
branch itself for pushing commits. So I don't _always_ want to release when I push to master.

## Dependencies
For the project prod dependencies, I am using the modularised `lodash` libraries
along with `babel-runtime`. The reason for doing this, although quite unlikely,
is because if someone does use it, they shouldn't have to load 100 kb worth of `lodash`.
There are plugins available for only exporting what you use but the end user may not be aware of that.

