'use strict';

const SignificantAggregationBase = require('./significant-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html';

/**
 * An aggregation that returns interesting or unusual occurrences of terms in
 * a set.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.termsQuery('force', 'British Transport Police'))
 *     .agg(
 *         esb.significantTermsAggregation(
 *             'significantCrimeTypes',
 *             'crime_type'
 *         )
 *     );
 *
 * @example
 * // Use parent aggregation for segregated data analysis
 * const agg = esb.termsAggregation('forces', 'force').agg(
 *     esb.significantTermsAggregation('significantCrimeTypes', 'crime_type')
 * );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends SignificantAggregationBase
 */
class SignificantTermsAggregation extends SignificantAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'significant_terms', ES_REF_URL, field);
    }
}

module.exports = SignificantTermsAggregation;
