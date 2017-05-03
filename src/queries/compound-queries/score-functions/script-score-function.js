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
