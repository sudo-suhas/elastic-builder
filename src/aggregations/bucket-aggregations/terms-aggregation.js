'use strict';

const has = require('lodash.has');
const isNil = require('lodash.isnil');

const {
    util: { invalidParam }
} = require('../../core');

const TermsAggregationBase = require('./terms-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html';

const invalidDirectionParam = invalidParam(
    ES_REF_URL,
    'direction',
    "'asc' or 'desc'"
);
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
 * @example
 * const agg = esb.termsAggregation('genres', 'genre');
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
     * @param {boolean} enable
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
     * @example
     * const agg = esb.termsAggregation('expired_sessions', 'account_id')
     *     .includePartition(0, 20)
     *     .size(10000)
     *     .order('last_access', 'asc')
     *     .agg(esb.maxAggregation('last_access', 'access_date'));
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
     * @example
     * const agg = esb.termsAggregation('actors', 'actors')
     *     .size(10)
     *     .collectMode('breadth_first')
     *     .agg(esb.termsAggregation('costars', 'actors').size(5));
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
     * @example
     * // Ordering the buckets by their doc `_count` in an ascending manner
     * const agg = esb.termsAggregation('genres', 'genre').order('_count', 'asc');
     *
     * @example
     * // Ordering the buckets alphabetically by their terms in an ascending manner
     * const agg = esb.termsAggregation('genres', 'genre').order('_term', 'asc');
     *
     * @example
     * // Ordering the buckets by single value metrics sub-aggregation
     * // (identified by the aggregation name)
     * const agg = esb.termsAggregation('genres', 'genre')
     *     .order('max_play_count', 'asc')
     *     .agg(esb.maxAggregation('max_play_count', 'play_count'));
     *
     * @example
     * // Ordering the buckets by multi value metrics sub-aggregation
     * // (identified by the aggregation name):
     * const agg = esb.termsAggregation('genres', 'genre')
     *     .order('playback_stats.max', 'desc')
     *     .agg(esb.statsAggregation('playback_stats', 'play_count'));
     *
     * @example
     * // Multiple order criteria
     * const agg = esb.termsAggregation('countries')
     *     .field('artist.country')
     *     .order('rock>playback_stats.avg', 'desc')
     *     .order('_count', 'desc')
     *     .agg(
     *         esb.filterAggregation('rock')
     *             .filter(esb.termQuery('genre', 'rock'))
     *             .agg(esb.statsAggregation('playback_stats', 'play_count'))
     *     );
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

        if (has(this._aggsDef, 'order')) {
            if (!Array.isArray(this._aggsDef.order)) {
                this._aggsDef.order = [this._aggsDef.order];
            }

            this._aggsDef.order.push({ [key]: directionLower });
        } else {
            this._aggsDef.order = { [key]: directionLower };
        }

        return this;
    }
}

module.exports = TermsAggregation;
