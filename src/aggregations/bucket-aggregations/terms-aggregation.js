'use strict';

const TermsAggregationBase = require('./terms-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html';

/**
 * A multi-bucket value source based aggregation where buckets are dynamically
 * built - one per unique value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)
 *
 * @extends TermsAggregationBase
 */
class TermsAggregation extends TermsAggregationBase {

    /**
     * Creates an instance of TermsAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field) {
        super(name, 'terms', ES_REF_URL, field);
        return this;
    }

    /**
     * When set to `true`, shows an error value for each term returned by the aggregation
     * which represents the _worst case error_ in the document count and can be useful
     * when deciding on a value for the shard_size parameter.
     * @param {number} docCnt
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */
    showTermDocCountError(docCnt) {
        this._aggsDef.show_term_doc_count_error = docCnt;
        return this;
    }

    /**
     * Break the analysis up into multiple requests by grouping the field’s values
     * into a number of partitions at query-time and processing only one
     * partition in each request.
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
        const modeLower = mode.toLowerCase();
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
        const directionLower = direction.toLowerCase();

        if (directionLower !== 'asc' &&
            directionLower !== 'desc') {
            throw new Error('`direction` must be either `asc` or `desc`');
        }

        this._aggsDef.order = {
            [key]: directionLower
        };

        return this;
    }
}

module.exports = TermsAggregation;
