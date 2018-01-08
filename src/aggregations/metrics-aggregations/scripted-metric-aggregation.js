'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html';

/**
 * A metric aggregation that executes using scripts to provide a metric output.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html)
 *
 * Aggregation that keeps track and returns the minimum value among numeric
 * values extracted from the aggregated documents.
 *
 * @example
 * const agg = esb.scriptedMetricAggregation('profit')
 *     .initScript('params._agg.transactions = []')
 *     .mapScript(
 *         "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)"
 *     )
 *     .combineScript(
 *         'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit'
 *     )
 *     .reduceScript(
 *         'double profit = 0; for (a in params._aggs) { profit += a } return profit'
 *     );
 *
 * @example
 * // Specify using file scripts
 * const agg = esb.scriptedMetricAggregation('profit')
 *     .initScript(esb.script('file', 'my_init_script'))
 *     .mapScript(esb.script('file', 'my_map_script'))
 *     .combineScript(esb.script('file', 'my_combine_script'))
 *     // script parameters for `init`, `map` and `combine` scripts must be
 *     // specified in a global params object so that
 *     // it can be shared between the scripts
 *     .params({ field: 'amount', _agg: {} })
 *     .reduceScript(esb.script('file', 'my_reduce_script'));
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends MetricsAggregationBase
 */
class ScriptedMetricAggregation extends MetricsAggregationBase {
    // eslint-disable-next-line require-jsdoc
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
        throw new Error(
            'missing is not supported in ScriptedMetricAggregation'
        );
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
        this._aggsDef.combine_script = combineScript;
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
        this._aggsDef.reduce_script = reduceScript;
        return this;
    }

    /**
     * Sets the params for scripts.
     *
     * Optional object whose contents will be passed as variables to
     * the init_script, map_script and combine_script
     *
     * If you specify script parameters then you must specify `"_agg": {}`.
     *
     * @param {Object} params Object passed to init, map and combine script. Default value - `{ "_agg": {} }`
     * @returns {ScriptedMetricAggregation} returns `this` so that calls can be chained
     */
    params(params) {
        // TODO: If sure, add validation to see that _agg: {} is present in params
        this._aggsDef.params = params;
        return this;
    }
}

module.exports = ScriptedMetricAggregation;
