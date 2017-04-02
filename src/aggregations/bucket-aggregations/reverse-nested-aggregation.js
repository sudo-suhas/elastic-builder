'use strict';

const BucketAggregationBase = require('./bucket-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * on parent docs from nested documents. Effectively this
 * aggregation can break out of the nested block structure and
 * link to other nested structures or the root document,
 * which allows nesting other aggregations that aren’t part of
 * the nested object in a nested aggregation.
 *
 * The `reverse_nested` aggregation must be defined inside a nested aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html)
 *
 * @extends BucketAggregationBase
 */
class ReverseNestedAggregation extends BucketAggregationBase {

    /**
     * Creates an instance of `ReverseNestedAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} path Defines to what nested object field should be joined back.
     * The default is empty, which means that it joins back to the root / main document
     * level.
     * @returns {ReverseNestedAggregation} returns `this` so that calls can be chained
     */
    constructor(name, path) {
        super(name, 'reverse_nested');

        path && this.path(path);

        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ReverseNestedAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in ReverseNestedAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ReverseNestedAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in ReverseNestedAggregation');
    }

    /**
     * Sets the level to join back for subsequent aggregations in a multiple
     * layered nested object types
     *
     * @param {string} path Defines to what nested object field should be joined back.
     * The default is empty, which means that it joins back to the root / main document
     * level.
     * @returns {ReverseNestedAggregation} returns `this` so that calls can be chained
     */
    path(path) {
        this._aggsDef.path = path;
        return this;
    }
}

module.exports = ReverseNestedAggregation;
