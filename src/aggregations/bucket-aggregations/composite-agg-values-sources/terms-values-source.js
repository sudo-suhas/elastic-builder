'use strict';

const ValuesSourceBase = require('./values-source-base');

const REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_terms';

/**
 * `TermsValuesSource` is a source for the `CompositeAggregation` that handles
 * terms. It works very similar to a terms aggregation with a slightly different
 * syntax.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_terms)
 *
 * @example
 * const valueSrc = esb.CompositeAggregation.termsValuesSource('product').script({
 *   source: "doc['product'].value",
 *   lang: 'painless'
 * });
 *
 * @param {string} name
 * @param {string=} field The field to aggregate on
 *
 * @extends ValuesSourceBase
 */
class TermsValuesSource extends ValuesSourceBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super('terms', REF_URL, name, field);
    }
}

module.exports = TermsValuesSource;
