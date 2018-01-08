'use strict';

const isNil = require('lodash.isnil');

const ScoreFunction = require('./score-function');

/**
 * The `script_score` function allows you to wrap another query and customize
 * the scoring of it optionally with a computation derived from other numeric
 * field values in the doc using a script expression.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-script-score)
 *
 * @example
 * const scoreFunc = esb.scriptScoreFunction(
 *     esb.script('inline', "_score * doc['my_numeric_field'].value")
 *         .lang('painless')
 * );
 *
 * @example
 * // Script with parameters
 * const scoreFunc = esb.scriptScoreFunction(
 *     esb.script(
 *         'inline',
 *         "_score * doc['my_numeric_field'].value / Math.pow(params.param1, params.param2)"
 *     )
 *         .lang('painless')
 *         .params({ param1: 'value1', param2: 'value2' })
 * );
 *
 * @param {Script|string} script
 *
 * @extends ScoreFunction
 */
class ScriptScoreFunction extends ScoreFunction {
    // eslint-disable-next-line require-jsdoc
    constructor(script) {
        super('script_score');

        if (!isNil(script)) this._opts.script = script;
    }

    /**
     *
     * @param {Script|string} script
     * @returns {ScriptScoreFunction} returns `this` so that calls can be chained.
     */
    script(script) {
        this._opts.script = script;
        return this;
    }
}

module.exports = ScriptScoreFunction;
