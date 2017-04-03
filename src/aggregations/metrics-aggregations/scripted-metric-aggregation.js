'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html';

/**
 * A metric aggregation that executes using scripts to provide a metric output.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html)
 *
 * Aggregation that keeps track and returns the minimum value among numeric
 * values extracted from the aggregated documents.
 *
 * @extends MetricsAggregationBase
 */
class ScriptedMetricAggregation extends MetricsAggregationBase {

    /**
     * Creates an instance of `ScriptedMetricAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     */
    constructor(name) {
        super(name, 'scripted_metric');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ScriptedMetricAggregation
     */
    field() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('field is not supported in ScriptedMetricAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ScriptedMetricAggregation
     */
    script() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('script is not supported in ScriptedMetricAggregation');
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ScriptedMetricAggregation
     */
    missing() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('missing is not supported in ScriptedMetricAggregation');
    }

    /**
     * Sets the initialization script.
     *
     * Executed prior to any collection of documents. Allows the aggregation to set up any initial state.
     *
     * @param {string|Script} initScript The initialization script. Can be a string or an Script instance
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    initScript(initScript) {
        this._aggsDef.init_script = initScript;
        return this;
    }

    /**
     * Sets the map script. This is the only required script.
     *
     * Executed once per document collected.
     * If no combine_script is specified, the resulting state needs to be stored in an object named _agg.
     *
     * @param {string|Script} mapScript The map script. Can be a string or an Script instance
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    mapScript(mapScript) {
        this._aggsDef.map_script = mapScript;
        return this;
    }

    /**
     * Sets the combine phase script.
     *
     * Executed once on each shard after document collection is complete.
     * Allows the aggregation to consolidate the state returned from each shard.
     * If a combine_script is not provided the combine phase will return the aggregation variable.
     *
     * @param {string|Script} combineScript The combine script. Can be a string or an Script instance
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    combineScript(combineScript) {
        this._aggsDef.map_script = combineScript;
        return this;
    }

    /**
     * Sets the reduce phase script.
     *
     * Executed once on the coordinating node after all shards have returned their results.
     * The script is provided with access to a variable _aggs
     * which is an array of the result of the combine_script on each shard.
     * If a reduce_script is not provided the reduce phase will return the _aggs variable.
     *
     * @param {string|Script} reduceScript The combine script. Can be a string or an Script instance
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    reduceScript(reduceScript) {
        this._aggsDef.map_script = reduceScript;
        return this;
    }

    /**
     * Sets the params for scripts.
     *
     * Optional object whose contents will be passed as variables to
     * the init_script, map_script and combine_script
     *
     * @param {Object} params Object passed to init, map and combine script. Default value - `{ "_agg": {} }`
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    params(params) {
        this._aggsDef.params = params;
        return this;
    }
}

module.exports = ScriptedMetricAggregation;
