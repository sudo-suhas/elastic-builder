'use strict';

const RangeAggregationBase = require('./range-aggregation-base');

/**
 * A multi-bucket value source based aggregation that enables the user to
 * define a set of ranges - each representing a bucket. During the aggregation
 * process, the values extracted from each document will be checked against each
 * bucket range and "bucket" the relevant/matching document.
 *
 * Note that this aggregration includes the from value and excludes the to
 * value for each range.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html)
 *
 * @extends RangeAggregationBase
 */
class RangeAggregation extends RangeAggregationBase {

    /**
     * Creates an instance of `RangeAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'range', field);
    }
}

module.exports = RangeAggregation;
