'use strict';

const isNil = require('lodash.isnil');

const { util: { invalidParam } } = require('../../core');

const TermsAggregationBase = require('./terms-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html';

const invalidDirectionParam = invalidParam(ES_REF_URL, 'direction', "'asc' or 'desc'");
const invalidCollectModeParam = invalidParam(
    ES_REF_URL,
    'mode',
    "'breadth_first' or 'depth_first'"
);

/**
 * A multi-bucket value source based aggregation where buckets are dynamically
 * built - one per unique value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends TermsAggregationBase
 */
class TermsAggregation extends TermsAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'terms', ES_REF_URL, field);
    }

    /**
     * When set to `true`, shows an error value for each term returned by the aggregation
     * which represents the _worst case error_ in the document count and can be useful
     * when deciding on a value for the shard_size parameter.
     *
     * @param {booleam} enable
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    showTermDocCountError(enable) {
        this._aggsDef.show_term_doc_count_error = enable;
        return this;
    }

    /**
     * Break the analysis up into multiple requests by grouping the field’s values
     * into a number of partitions at query-time and processing only one
     * partition in each request.
     *
     * Note that this method is a special case as the name doesn't map to the
     * elasticsearch parameter name. This is required because there is already
     * a method for `include` applicable for Terms aggregations. However, this
     * could change depending on community interest.
     *
     * @param {number} partition
     * @param {number} numPartitions
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    includePartition(partition, numPartitions) {
        // TODO: Print warning if include key is being overwritten
        this._aggsDef.include = {
            partition,
            num_partitions: numPartitions
        };
        return this;
    }

    /**
     * Can be used for deferring calculation of child aggregations by using
     * `breadth_first` mode. In `depth_first` mode all branches of the aggregation
     * tree are expanded in one depth-first pass and only then any pruning occurs.
     *
     * @param {string} mode The possible values are `breadth_first` and `depth_first`.
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    collectMode(mode) {
        if (isNil(mode)) invalidCollectModeParam(mode);

        const modeLower = mode.toLowerCase();
        if (modeLower !== 'breadth_first' && modeLower !== 'depth_first') {
            invalidCollectModeParam(mode);
        }

        this._aggsDef.collect_mode = modeLower;
        return this;
    }

    /**
     * Sets the ordering for buckets
     *
     * @param {string} key
     * @param {string} direction `asc` or `desc`
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    order(key, direction = 'desc') {
        if (isNil(direction)) invalidDirectionParam(direction);

        const directionLower = direction.toLowerCase();
        if (directionLower !== 'asc' && directionLower !== 'desc') {
            invalidDirectionParam(direction);
        }

        this._aggsDef.order = {
            [key]: directionLower
        };

        return this;
    }
}

module.exports = TermsAggregation;
