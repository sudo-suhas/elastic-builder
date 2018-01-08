'use strict';

const isNil = require('lodash.isnil');

const { recursiveToJSON } = require('./util');

/**
 * Class supporting the Elasticsearch search template API.
 *
 * The `/_search/template` endpoint allows to use the mustache language to
 * pre render search requests, before they are executed and fill existing
 * templates with template parameters.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html)
 *
 * @param {string=} type One of `inline`, `id`, `file`. `id` is also
 * aliased as `indexed`
 * @param {string|Object=} source Source of the search template.
 * This needs to be specified if optional argument `type` is passed.
 *
 * @example
 * const templ = esb.searchTemplate('inline', {
 *     query: esb.matchQuery('{{my_field}}', '{{my_value}}'),
 *     size: '{{my_size}}'
 * }).params({
 *     my_field: 'message',
 *     my_value: 'some message',
 *     my_size: 5
 * });
 *
 * @example
 * const templ = new esb.SearchTemplate(
 *     'inline',
 *     '{ "query": { "terms": {{#toJson}}statuses{{/toJson}} }}'
 * ).params({
 *     statuses: {
 *         status: ['pending', 'published']
 *     }
 * });
 *
 * @example
 * const templ = new esb.SearchTemplate(
 *     'inline',
 *     '{ "query": { "bool": { "must": {{#toJson}}clauses{{/toJson}} } } }'
 * ).params({
 *     clauses: [
 *         esb.termQuery('user', 'boo'),
 *         esb.termQuery('user', 'bar'),
 *         esb.termQuery('user', 'baz')
 *     ]
 * });
 */
class SearchTemplate {
    // eslint-disable-next-line require-jsdoc
    constructor(type, source) {
        this._isTypeSet = false;
        this._body = {};

        if (!isNil(type) && !isNil(source)) {
            const typeLower = type.toLowerCase();

            if (
                typeLower !== 'inline' &&
                typeLower !== 'id' &&
                typeLower !== 'indexed' && // alias for id
                typeLower !== 'file'
            ) {
                throw new Error(
                    '`type` must be one of `inline`, `id`, `indexed`, `file`'
                );
            }

            this[typeLower](source);
        }
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */
    _warn(msg) {
        console.warn(`[SearchTemplate] ${msg}`);
    }

    /**
     * Print warning messages to not mix `SearchTemplate` source
     *
     * @private
     */
    _checkMixedRepr() {
        if (this._isTypeSet) {
            this._warn(
                'Search template source(`inline`/`id`/`file`) was already specified!'
            );
            this._warn('Overwriting.');

            delete this._body.file;
            delete this._body.id;
            delete this._body.file;
        }
    }

    /**
     * Helper method to set the type and source
     *
     * @param {string} type
     * @param {*} source
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     * @private
     */
    _setSource(type, source) {
        this._checkMixedRepr();

        this._body[type] = source;
        this._isTypeSet = true;
        return this;
    }

    /**
     * Sets the type of search template to be `inline` and specifies the
     * template with `query` and other optional fields such as `size`.
     *
     * @param {string|Object} templ Either an object or a string.
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     */
    inline(templ) {
        return this._setSource('inline', templ);
    }

    /**
     * Specify the indexed search template by `templateName` which will be
     * retrieved from cluster state.
     *
     * @param {string} templId The unique identifier for the indexed template.
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     */
    id(templId) {
        return this._setSource('id', templId);
    }

    /**
     * Specify the indexed search template by `templateName` which will be
     * retrieved from cluster state.
     *
     * Alias for `SearchTemplate.id`
     *
     * @param {string} templId The unique identifier for the indexed template.
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     */
    indexed(templId) {
        return this.id(templId);
    }

    /**
     * Specify the search template by filename stored in the scripts folder,
     * with `mustache` extension.
     *
     * @example
     * // `templId` - Name of the query template in config/scripts/, i.e.,
     * // storedTemplate.mustache.
     * const templ = new esb.SearchTemplate('file', 'storedTemplate').params({
     *     query_string: 'search for these words'
     * });
     *
     * @param {string} fileName The name of the search template stored as a file
     * in the scripts folder.
     * For file `config/scripts/storedTemplate.mustache`,
     * `fileName` should be `storedTemplate`
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     */
    file(fileName) {
        return this._setSource('file', fileName);
    }

    /**
     * Specifies any named parameters that are used to render the search template.
     *
     * @param {Object} params Named parameters to be used for rendering.
     * @returns {SearchTemplate} returns `this` so that calls can be chained.
     */
    params(params) {
        this._body.params = params;
        return this;
    }

    /**
     * Override default `toJSON` to return DSL representation for the Search Template.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._body);
    }
}

module.exports = SearchTemplate;
