'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    Script,
    util: { checkType }
} = require('../../core');

/**
 * A query allowing to define scripts as queries.
 * They are typically used in a filter context.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-query.html)
 *
 * @example
 * const scriptQry = esb.scriptQuery(esb.script()
 *  .lang('painless')
 *  .inline("doc['num1'].value > 1"))
 *
 * // Use in filter context
 * const qry = esb.boolQuery().must(scriptQry);
 *
 * @param {Script=} script
 *
 * @extends Query
 */
class ScriptQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(script) {
        super('script');

        if (!isNil(script)) this.script(script);
    }

    /**
     * Sets the `script` for query.
     *
     * @param {Script} script
     * @returns {ScriptQuery} returns `this` so that calls can be chained.
     */
    script(script) {
        checkType(script, Script);

        this._queryOpts.script = script;
        return this;
    }
}

module.exports = ScriptQuery;
