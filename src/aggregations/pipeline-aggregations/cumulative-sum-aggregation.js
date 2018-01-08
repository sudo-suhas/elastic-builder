'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html';

/**
 * A parent pipeline aggregation which calculates the cumulative sum of
 * a specified metric in a parent histogram (or date_histogram) aggregation.
 * The specified metric must be numeric and the enclosing histogram must
 * have min_doc_count set to 0 (default for histogram aggregations).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date', 'month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.cumulativeSumAggregation('cumulative_sales', 'sales'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class CumulativeSumAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'cumulative_sum', ES_REF_URL, bucketsPath);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on CumulativeSumAggregation
     */
    gapPolicy() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error(
            'gapPolicy is not supported in CumulativeSumAggregation'
        );
    }
}

module.exports = CumulativeSumAggregation;
