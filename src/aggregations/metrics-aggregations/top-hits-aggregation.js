'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base'),
    {
        Highlight,
        Sort,
        util: { checkType, setDefault }
    } = require('../../core');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html';

/**
 * A `top_hits` metric aggregator keeps track of the most relevant document being
 * aggregated. This aggregator is intended to be used as a sub aggregator, so that
 * the top matching documents can be aggregated per bucket.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)
 *
 * `top_hits` metric aggregator keeps track of the most relevant document being
 * aggregated.
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top_tags', 'type')
 *             .size(3)
 *             .agg(
 *                 esb.topHitsAggregation('top_sales_hits')
 *                     .sort(esb.sort('date', 'desc'))
 *                     .source({ includes: ['date', 'price'] })
 *                     .size(1)
 *             )
 *     )
 *     .size(0);
 *
 * @example
 * // Field collapsing(logically groups a result set into
 * // groups and per group returns top documents)
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('body', 'elections'))
 *     .agg(
 *         esb.termsAggregation('top-sites', 'domain')
 *             .order('top_hit', 'desc')
 *             .agg(esb.topHitsAggregation('top_tags_hits'))
 *             .agg(
 *                 esb.maxAggregation('top_hit').script(
 *                     esb.script('inline', '_score')
 *                 )
 *             )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends MetricsAggregationBase
 */
class TopHitsAggregation extends MetricsAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'top_hits');
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
     * @override
     * @throws {Error} This method cannot be called on TopHitsAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in TopHitsAggregation');
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
     * How the top matching hits should be sorted. Allows to add sort on specific field.
     * The sort can be reversed as well. The sort is defined on a per field level,
     * with special field name for `_score` to sort by score, and `_doc` to sort by
     * index order.
     *
     * @param {Sort} sort How the top matching hits should be sorted.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
     */
    sort(sort) {
        checkType(sort, Sort);

        setDefault(this._aggsDef, 'sort', []);

        this._aggsDef.sort.push(sort);
        return this;
    }

    /**
     * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
     * The sort is defined on a per field level, with special field name for _score to
     * sort by score, and _doc to sort by index order.
     *
     * @param {Array<Sort>} sorts Arry of sort How the top matching hits should be sorted.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained.
     * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
     */
    sorts(sorts) {
        sorts.forEach(sort => this.sort(sort));
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
     * Allows to control how the `_source` field is returned with every hit.
     * You can turn off `_source` retrieval by passing `false`.
     * It also accepts one(string) or more wildcard(array) patterns to control
     * what parts of the `_source` should be returned
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
        setDefault(this._aggsDef, 'script_fields', {});

        this._aggsDef.script_fields[scriptFieldName] = { script };
        return this;
    }

    /**
     * Sets given dynamic document properties to be computed using supplied `Script`s.
     *
     * Object should have `scriptFieldName` as key and `script` as the value.
     *
     * @param {Object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    scriptFields(scriptFields) {
        checkType(scriptFields, Object);

        Object.keys(scriptFields).forEach(scriptFieldName =>
            this.scriptField(scriptFieldName, scriptFields[scriptFieldName])
        );

        return this;
    }

    /**
     * Allows to return the doc value representation of a field for each hit.
     * Doc value fields can work on fields that are not stored.
     *
     * @param {Array<string>} fields
     * @returns {TopHitsAggregation} returns `this` so that calls can be chained
     */
    docvalueFields(fields) {
        this._aggsDef.docvalue_fields = fields;
        return this;
    }
}

module.exports = TopHitsAggregation;
