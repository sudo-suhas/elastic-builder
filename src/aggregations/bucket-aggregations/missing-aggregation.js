'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html';

/**
 * A field data based single bucket aggregation, that creates a bucket of all
 * documents in the current document set context that are missing a field value
 * (effectively, missing a field or having the configured NULL value set).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html)
 *
 * @extends BucketAggregationBase
 */
class MissingAggregation extends BucketAggregationBase {
    /**
     * Creates an instance of `MissingAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'missing', field);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ChildrenAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in ChildrenAggregation');
    }
}

module.exports = MissingAggregation;
