'use strict';

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html';

/**
 * A parent pipeline aggregation which executes a script which can perform
 * per bucket computations on specified metrics in the parent multi-bucket
 * aggregation. The specified metric must be numeric and the script must
 * return a numeric value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html)
 *
 * @example
 * const reqBody = bob.requestBodySearch()
 *     .agg(
 *         bob.dateHistogramAggregation('sales_per_month', 'date', 'month')
 *             .agg(bob.sumAggregation('total_sales', 'price'))
 *             .agg(
 *                 bob.filterAggregation('t-shirts')
 *                     .filter(bob.termQuery('type', 't-shirt'))
 *                     .agg(bob.sumAggregation('sales', 'price'))
 *             )
 *             .agg(
 *                 bob.bucketScriptAggregation('t-shirt-percentage')
 *                     .bucketsPath({
 *                         tShirtSales: 't-shirts>sales',
 *                         totalSales: 'total_sales'
 *                     })
 *                     .script('params.tShirtSales / params.totalSales * 100')
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */
class BucketScriptAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath) {
        super(name, 'bucket_script', ES_REF_URL, bucketsPath);
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @param {Script|string} script
     * @returns {BucketScriptAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        this._aggsDef.script = script;
        return this;
    }
}

module.exports = BucketScriptAggregation;
