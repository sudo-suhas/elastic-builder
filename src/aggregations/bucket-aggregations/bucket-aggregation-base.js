'use strict';

const isNil = require('lodash.isnil');

const {
    Aggregation,
    Script,
    util: { checkType }
} = require('../../core');

/**
 * The `BucketAggregationBase` provides support for common options used across
 * various bucket `Aggregation` implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name a valid aggregation name
 * @param {string} aggType type of aggregation
 * @param {string=} field The field to aggregate on
 *
 * @extends Aggregation
 */
class BucketAggregationBase extends Aggregation {
    // eslint-disable-next-line require-jsdoc
    constructor(name, aggType, field) {
        super(name, aggType);

        if (!isNil(field)) this._aggsDef.field = field;
    }

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {BucketAggregationBase} returns `this` so that calls can be chained
     */
    field(field) {
        this._aggsDef.field = field;
        return this;
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @example
     * // Generating the terms using a script
     * const agg = esb.termsAggregation('genres').script(
     *     esb.script('file', 'my_script').params({ field: 'genre' })
     * );
     *
     * @example
     * // Value script
     * const agg = esb.termsAggregation('genres', 'genre').script(
     *     esb.script('inline', "'Genre: ' +_value").lang('painless')
     * );
     *
     * @param {Script} script
     * @returns {BucketAggregationBase} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */
    script(script) {
        checkType(script, Script);
        this._aggsDef.script = script;
        return this;
    }
}

module.exports = BucketAggregationBase;
