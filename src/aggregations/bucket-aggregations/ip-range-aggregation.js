'use strict';

const RangeAggregationBase = require('./range-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-iprange-aggregation.html';

/**
 * Dedicated range aggregation for IP typed fields.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/5current/search-aggregations-bucket-iprange-aggregation.html)
 *
 * @example
 * const agg = esb.ipRangeAggregation('ip_ranges', 'ip').ranges([
 *     { to: '10.0.0.5' },
 *     { from: '10.0.0.5' }
 * ]);
 *
 * @example
 * const agg = esb.ipRangeAggregation('ip_ranges', 'ip').ranges([
 *     { mask: '10.0.0.0/25' },
 *     { mask: '10.0.0.127/25' }
 * ]);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */
class IpRangeAggregation extends RangeAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'ip_range', field);
        // Variable name is misleading. Only one of these needs to be present.
        this._rangeRequiredKeys = ['from', 'to', 'mask'];
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on IpRangeAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in IpRangeAggregation');
    }
}

module.exports = IpRangeAggregation;
