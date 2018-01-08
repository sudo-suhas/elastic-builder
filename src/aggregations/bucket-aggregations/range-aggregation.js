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
 * @example
 * const agg = esb.rangeAggregation('price_ranges', 'price').ranges([
 *     { to: 50 },
 *     { from: 50, to: 100 },
 *     { from: 100 }
 * ]);
 *
 * @example
 * const agg = esb.rangeAggregation('price_ranges')
 *     .script(esb.script('inline', "doc['price'].value").lang('painless'))
 *     .ranges([{ to: 50 }, { from: 50, to: 100 }, { from: 100 }]);
 *
 * @example
 * // Value script for on-the-fly conversion before aggregation
 * const agg = esb.rangeAggregation('price_ranges', 'price')
 *     .script(
 *         esb.script('inline', '_value * params.conversion_rate')
 *             .lang('painless')
 *             .params({ conversion_rate: 0.8 })
 *     )
 *     .ranges([{ to: 50 }, { from: 50, to: 100 }, { from: 100 }]);
 *
 * @example
 * // Compute statistics over the prices in each price range
 * const agg = esb.rangeAggregation('price_ranges', 'price')
 *     .ranges([{ to: 50 }, { from: 50, to: 100 }, { from: 100 }])
 *     // Passing price to Stats Aggregation is optional(same value source)
 *     .agg(esb.statsAggregation('price_stats', 'price'));
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */
class RangeAggregation extends RangeAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'range', field);
    }
}

module.exports = RangeAggregation;
