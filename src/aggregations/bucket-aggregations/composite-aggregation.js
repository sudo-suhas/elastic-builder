'use strict';

const {
    Aggregation,
    util: { checkType, constructorWrapper }
} = require('../../core');

const {
    ValuesSourceBase,
    TermsValuesSource,
    HistogramValuesSource,
    DateHistogramValuesSource
} = require('./composite-agg-values-sources');

/**
 * CompositeAggregation is a multi-bucket values source based aggregation that
 * can be used to calculate unique composite values from source documents.
 *
 * Unlike the other multi-bucket aggregation the composite aggregation can be
 * used to paginate **all** buckets from a multi-level aggregation efficiently.
 * This aggregation provides a way to stream **all** buckets of a specific
 * aggregation similarly to what scroll does for documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *   .agg(
 *     esb.compositeAggregation('my_buckets')
 *       .sources(
 *         esb.CompositeAggregation.termsValuesSource('product', 'product')
 *       )
 *   )
 *
 * NOTE: This query was added in elasticsearch v6.1.
 *
 * @param {string} name a valid aggregation name
 *
 * @extends Aggregation
 */
class CompositeAggregation extends Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        super(name, 'composite');

        this._aggsDef.sources = [];
    }

    /**
     * Specifies the Composite Aggregation values sources to use in the
     * aggregation.
     *
     * @example
     * const { CompositeAggregation } = esb;
     * const reqBody = esb.requestBodySearch()
     *   .agg(
     *     esb.compositeAggregation('my_buckets')
     *       .sources(
     *         CompositeAggregation.dateHistogramValuesSource(
     *           'date',
     *           'timestamp',
     *           '1d'
     *         ),
     *         CompositeAggregation.termsValuesSource('product', 'product')
     *       )
     *   );
     *
     * @param {...ValuesSourceBase} sources
     * @returns {CompositeAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If any of the rest parameters `sources` is not an
     * instance of `ValuesSourceBase`
     */
    sources(...sources) {
        sources.forEach(valueSrc => checkType(valueSrc, ValuesSourceBase));

        this._aggsDef.sources = this._aggsDef.sources.concat(sources);
        return this;
    }

    /**
     * Defines how many composite buckets should be returned. Each composite
     * bucket is considered as a single bucket so setting a size of 10 will
     * return the first 10 composite buckets created from the values source. The
     * response contains the values for each composite bucket in an array
     * containing the values extracted from each value source.
     *
     * @param {number} size
     * @returns {CompositeAggregation} returns `this` so that calls can be chained
     */
    size(size) {
        this._aggsDef.size = size;
        return this;
    }

    /**
     * The `after` parameter can be used to retrieve the composite buckets that
     * are after the last composite buckets returned in a previous round.
     *
     * @example
     * const { CompositeAggregation } = esb;
     * const reqBody = esb.requestBodySearch().agg(
     *   esb.compositeAggregation('my_buckets')
     *     .size(2)
     *     .sources(
     *       CompositeAggregation.dateHistogramValuesSource(
     *         'date',
     *         'timestamp',
     *         '1d'
     *       ).order('desc'),
     *       CompositeAggregation.termsValuesSource('product', 'product').order('asc')
     *     )
     *     .after({ date: 1494288000000, product: 'mad max' })
     * );
     *
     * @param {Object} afterKey
     * @returns {CompositeAggregation} returns `this` so that calls can be chained
     */
    after(afterKey) {
        this._aggsDef.after = afterKey;
        return this;
    }
}

CompositeAggregation.TermsValuesSource = TermsValuesSource;
CompositeAggregation.termsValuesSource = constructorWrapper(TermsValuesSource);

CompositeAggregation.HistogramValuesSource = HistogramValuesSource;
CompositeAggregation.histogramValuesSource = constructorWrapper(
    HistogramValuesSource
);

CompositeAggregation.DateHistogramValuesSource = DateHistogramValuesSource;
CompositeAggregation.dateHistogramValuesSource = constructorWrapper(
    DateHistogramValuesSource
);

module.exports = CompositeAggregation;
