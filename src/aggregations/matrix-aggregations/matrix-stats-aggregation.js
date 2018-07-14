'use strict';

const isNil = require('lodash.isnil');

const {
    Aggregation,
    util: { checkType }
} = require('../../core');

/**
 * The `matrix_stats` aggregation is a numeric aggregation that computes
 * statistics over a set of document fields
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-matrix-stats-aggregation.html)
 *
 * @example
 * const agg = esb.matrixStatsAggregation('matrixstats', ['poverty', 'income']);
 *
 * @param {string} name A valid aggregation name
 * @param {Array=} fields Array of fields
 *
 * @extends Aggregation
 */
class MatrixStatsAggregation extends Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name, fields) {
        super(name, 'matrix_stats');

        if (!isNil(fields)) this.fields(fields);
    }

    /**
     * The `fields` setting defines the set of fields (as an array) for computing
     * the statistics.
     *
     * @example
     * const agg = esb.matrixStatsAggregation('matrixstats')
     *     .fields(['poverty', 'income']);
     *
     * @param {Array<string>} fields Array of fields
     * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
     */
    fields(fields) {
        checkType(fields, Array);

        this._aggsDef.fields = fields;
        return this;
    }

    /**
     * The `mode` parameter controls what array value the aggregation will use for
     * array or multi-valued fields
     * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`
     * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
     */
    mode(mode) {
        // TODO: Add a set in consts and validate input
        this._aggsDef.mode = mode;
        return this;
    }

    /**
     * The missing parameter defines how documents that are missing a value should
     * be treated. By default they will be ignored but it is also possible to treat
     * them as if they had a value.
     *
     * @example
     * const agg = esb.matrixStatsAggregation('matrixstats')
     *     .fields(['poverty', 'income'])
     *     .missing({ income: 50000 });
     *
     * @param {Object} missing Set of fieldname : value mappings to specify default
     * values per field
     * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
     */
    missing(missing) {
        this._aggsDef.missing = missing;
        return this;
    }
}

module.exports = MatrixStatsAggregation;
