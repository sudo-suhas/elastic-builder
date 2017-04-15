'use strict';

const has = require('lodash.has'),
    forEach = require('lodash.foreach');

const Sort = require('./sort'),
    Highlight = require('./highlight');

const { checkType, recursiveToJSON } = require('./util');

/**
 * Inner hits returns per search hit in the search response additional
 * nested hits that caused a search hit to match in a different scope.
 * Inner hits can be used by defining an `inner_hits` definition on a
 * `nested`, `has_child` or `has_parent` query and filter.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-inner-hits.html)
 */
class InnerHits {

    /**
     * Creates an instance of `InnerHits`
     */
    constructor() {
        // Maybe accept some optional parameter?
        this._body = {};
    }

    /**
     * he offset from where the first hit to fetch for each `inner_hits` in the returned
     * regular search hits.
     *
     * @param {number} from
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    from(from) {
        this._body.from = from;
        return this;
    }

    /**
     * The maximum number of hits to return per inner_hits.
     * By default the top three matching hits are returned.
     *
     * @param {number} size Defaults to 10.
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    size(size) {
        this._body.size = size;
        return this;
    }

    /**
     * How the inner hits should be sorted per inner_hits.
     * By default the hits are sorted by the score.
     *
     * @param {Sort} sort
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
     */
    sort(sort) {
        checkType(sort, Sort);
        if (!has(this._body, 'sort')) this._body.sort = [];

        this._body.sort.push(sort);
        return this;
    }

    /**
     * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
     * The sort is defined on a per field level, with special field name for _score to
     * sort by score, and _doc to sort by index order.
     *
     * @param {Array<Sort>} sorts Arry of sort
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
     */
    sorts(sorts) {
        forEach(sorts, sort => this.sort(sort));
        return this;
    }

    /**
     * Allows to highlight search results on one or more fields. The implementation
     * uses either the lucene `plain` highlighter, the fast vector highlighter (`fvh`)
     * or `postings` highlighter.
     *
     * @param {Highlight} highlight
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    highlight(highlight) {
        checkType(highlight, Highlight);

        this._body.highlight = highlight;
        return this;
    }

    /**
     * Enables explanation for each hit on how its score was computed.
     *
     * @param {boolean} enable
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    explain(enable) {
        this._body.explain = enable;
        return this;
    }

    /**
     * Allows to control how the `_source` field is returned with every hit.
     * You can turn off `_source` retrieval by passing `false`.
     * It also accepts one(string) or more wildcard(array) patterns to control
     * what parts of the `_source` should be returned
     * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
     *
     * @param {boolean|string|Array|Object} source
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    source(source) {
        this._body._source = source;
        return this;
    }

    /**
     * Computes a document property dynamically based on the supplied `Script`.
     *
     * @param {string} scriptFieldName
     * @param {string|Script} script string or instance of `Script`
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    scriptField(scriptFieldName, script) {
        if (!has(this._body, 'script_fields')) this._body.script_fields = {};

        this._body.script_fields[scriptFieldName] = { script };
        return this;
    }

    /**
     * Allows to return the doc value representation of a field for each hit.
     * Doc value fields can work on fields that are not stored.
     *
     * @param {Array} fields
     * @returns {RequestBodySearch} returns `this` so that calls can be chained
     */
    docvalueFields(fields) {
        this._body.docvalue_fields = fields;
        return this;
    }

    /**
     * Returns a version for each search hit.
     *
     * @param {boolean} enable
     * @returns {RequestBodySearch} returns `this` so that calls can be chained.
     */
    version(enable) {
        this._body.version = enable;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the inner hits request
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._body);
    }
}

module.exports = InnerHits;
