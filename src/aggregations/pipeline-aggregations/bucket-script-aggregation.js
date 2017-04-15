'use strict';

const { Script, util: { checkType } } = require('../../core');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

/**
 * A parent pipeline aggregation which executes a script which can perform
 * per bucket computations on specified metrics in the parent multi-bucket
 * aggregation. The specified metric must be numeric and the script must
 * return a numeric value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html)
 *
 * @extends PipelineAggregationBase
 */
class BucketScriptAggregation extends PipelineAggregationBase {
    /**
     * Creates an instance of `BucketScriptAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} bucketsPath The relative path of metric to aggregate over
     */
    constructor(name, bucketsPath) {
        super(name, 'bucket_script', bucketsPath);
    }

    /**
     * Sets script parameter for aggregation.
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

module.exports = BucketScriptAggregation;
