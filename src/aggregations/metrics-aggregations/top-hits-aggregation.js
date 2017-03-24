'use strict';

const _ = require('lodash');

const MetricsAggregation = require('./metrics-aggregation'),
    { Highlight, Script, util: { checkType } } = require('../../core');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html';

/**
 * A top_hits metric aggregator keeps track of the most relevant document being
 * aggregated. This aggregator is intended to be used as a sub aggregator, so that
 * the top matching documents can be aggregated per bucket.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)
 *
 * top_hits metric aggregator keeps track of the most relevant document being
 * aggregated.
 *
 * @extends MetricsAggregation
 */
class TopHitsAggregation extends MetricsAggregation {

    /**
     * Creates an instance of TopHitsAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    constructor(name) {
        super(name, 'top_hits');
        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on TopHitsAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in TopHitsAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on TopHitsAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in TopHitsAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on TopHitsAggregation
     */
    missing() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('missing is not supported in TopHitsAggregation');
    }

    /**
     * Sets the offset for fetching result.
     *
     * @param {number} from The offset from the first result you want to fetch.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    from(from) {
        this._aggsDef.from = from;
        return this;
    }

    /**
     * Sets the maximum number of top matching hits to return per bucket.
     *
     * @param {number} size The numer of aggregation entries to be returned per bucket.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * How the top matching hits should be sorted.
     * By default the hits are sorted by the score of the main query.
     *
     * @param {number} sort How the top matching hits should be sorted.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    sort(sort) {
        this._aggsDef.dort = sort;
        return this;
    }

    /**
     * Enables score computation and tracking during sorting.
     * By default, sorting scores are not computed.
     *
     * @param {boolean} trackScores If scores should be computed and tracked. Defaults to false.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    trackScores(trackScores) {
        this._aggsDef.track_scores = trackScores;
        return this;
    }

    /**
     * Enable/Disable returning version number for each hit.
     *
     * @param {boolean} version true to enable, false to disable
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    version(version) {
        this._aggsDef.version = version;
        return this;
    }

    /**
     * Enable/Disable explanation of score for each hit.
     *
     * @param {boolean} explain true to enable, false to disable
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    explain(explain) {
        this._aggsDef.explain = explain;
        return this;
    }

    /**
     * Performs highlighting based on the `Highlight` settings.
     *
     * @param {Highlight} highlight
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    highlight(highlight) {
        checkType(highlight, Highlight);
        this._aggsDef.highlight = highlight;
        return this;
    }

    /**
     * Allows to control how the _source field is returned with every hit.
     * You can turn off _source retrieval by passing `false`.
     * It also accepts one(string) or more wildcard(array) patterns to control
     * what parts of the _source should be returned
     * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
     *
     * @param {boolean|string|Array|Object} source
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    source(source) {
        this._aggsDef._source = source;
        return this;
    }

    /**
     * The stored_fields parameter is about fields that are explicitly marked as stored in the mapping.
     * Selectively load specific stored fields for each document represented by a search hit
     * using array of stored fields.
     * An empty array will cause only the _id and _type for each hit to be returned.
     * To disable the stored fields (and metadata fields) entirely use: '_none_'
     *
     * @param {Array|string} fields
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    storedFields(fields) {
        this._aggsDef.stored_fields = fields;
        return this;
    }

    /**
     * Computes a document property dynamically based on the supplied `Script`.
     *
     * @param {string} scriptFieldName
     * @param {string|Script} script string or instance of `Script`
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    scriptField(scriptFieldName, script) {
        if (!_.has(this._aggsDef, 'script_fields')) this._aggsDef.script_fields = {};

        this._aggsDef.script_fields[scriptFieldName] = { script };
        return this;
    }

    /**
     * Allows to return the doc value representation of a field for each hit.
     * Doc value fields can work on fields that are not stored.
     *
     * @param {Array} fields
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    docvalueFields(fields) {
        this._aggsDef.docvalue_fields = fields;
        return this;
    }
}

module.exports = TopHitsAggregation;
