'use strict';

const { util: { checkType } } = require('../../core');

const Script = require('../../script-types/script');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-selector-aggregation.html';

/**
 * A parent pipeline aggregation which executes a script which determines whether
 * the current bucket will be retained in the parent multi-bucket aggregation.
 * The specified metric must be numeric and the script must return a boolean value.
 * If the script language is expression then a numeric return value is permitted.
 * In this case 0.0 will be evaluated as false and all other values will evaluate to true.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-selector-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class BucketSelectorAggregation extends PipelineAggregationBase {

    /**
     * Creates an instance of `BucketSelectorAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'bucket_selector', bucketsPath);
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on BucketSelectorAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in BucketSelectorAggregation');
    }

    /**
     * Sets script parameter for aggregation. Required.
     *
     * @param {Script} script
     * @returns {BucketScriptAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        checkType(script, Script);
        this._aggsDef.script = script;
        return this;
    }
}

module.exports = BucketSelectorAggregation;
