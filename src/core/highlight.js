'use strict';

const _ = require('lodash');

const Query = require('./query'),
    { checkType } = require('./util');

/**
 * Allows to highlight search results on one or more fields. In order to
 * perform highlighting, the actual content of the field is required. If the
 * field in question is stored (has store set to yes in the mapping), it will
 * be used, otherwise, the actual _source will be loaded and the relevant
 * field will be extracted from it.
 *
 * If no term_vector information is provided (by setting it to
 * with_positions_offsets in the mapping), then the plain highlighter will be
 * used. If it is provided, then the fast vector highlighter will be used.
 * When term vectors are available, highlighting will be performed faster at
 * the cost of bigger index size.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html)
 */
class Highlight {

    /**
     * Creates an instance of Highlight to highlight search results on one or more fields.
     *
     * @param {String|Array} fields An optional field or array of fields to highlight.
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    constructor(fields) {
        this._fields = {};
        this._highlight = { fields: this._fields };

        if (_.isString(fields)) this.field(fields);
        else this.fields(fields);
        return this;
    }

    /**
     * Private function to set field option
     *
     * @param {string|null} field
     * @param {string} option
     * @param {string} val
     */
    _setFieldOption(field, option, val) {
        if (_.isNil(field)) {
            this._highlight[option] = val;
            return;
        }
        this.field(field);
        this._fields[field][option] = val;
    }

    /**
     * Allows you to set a field that will be highlighted. The field is
     * added to the current list of fields.
     *
     * @param {Array} field A field name.
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    field(field) {
        if (!_.isNil(field) && !_.has(this._fields, field)) this._fields[field] = {};
        return this;
    }

    /**
     * Allows you to set the fields that will be highlighted. All fields are
     * added to the current list of fields.
     *
     * @param {Array} fields Array of field names.
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    fields(fields) {
        checkType(fields, Array);
        for (const field of fields) this.field(field);
        return this;
    }

    /**
     * Sets the pre tags for highlighted fragments. You can apply the
     * tags to a specific field by passing the optional field name parameter.
     *
     * @param {string|Array} tags
     * @param {string=} field
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    preTags(tags, field) {
        this._setFieldOption(field, 'pre_tags', _.isString(field) ? [tags] : tags);
        return this;
    }

    /**
     * Sets the post tags for highlighted fragments. You can apply the
     * tags to a specific field by passing the optional field name parameter.
     *
     * @param {string|Array} tags
     * @param {string=} field
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    postTags(tags, field) {
        this._setFieldOption(field, 'post_tags', _.isString(field) ? [tags] : tags);
        return this;
    }

    /**
     * Sets the styled schema to be used for the tags.
     *
     * styled - 10 <em> pre tags with css class of hltN, where N is 1-10
     *
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    styledTagsSchema() {
        this._highlight.tags_schema = 'styled';
        return this;
    }

    /**
     * Sets the order of highlight fragments. You can apply the
     * score order to a specific field by passing the optional field name parameter.
     *
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    scoreOrder(field) {
        this._setFieldOption(field, 'order', 'score');
        return this;
    }

    /**
     * Sets the size of each highlight fragment in characters. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @param {number} size The fragment size in characters. Defaults to 100.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    fragmentSize(size, field) {
        this._setFieldOption(field, 'fragment_size', size);
        return this;
    }
    /**
     * Sets the maximum number of fragments to return. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @param {number} count The maximum number of fragments to return
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    numberOfFragments(count, field) {
        this._setFieldOption(field, 'number_of_fragments', count);
        return this;
    }

    /**
     * Highlight against a query other than the search query.
     * Useful if you use a rescore query because those
     * are not taken into account by highlighting by default.
     *
     * @param {Query} query
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    highlightQuery(query, field) {
        checkType(query, Query);
        this._setFieldOption(field, 'highlight_query', query);
        return this;
    }

    /**
     * Combine matches on multiple fields to highlight a single field.
     * Useful for multifields that analyze the same string in different ways.
     * Sets the highlight type to Fast Vector Highlighter(fvh).
     *
     * @param {Array} fields
     * @param {string} field Field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} field parameter should be valid field name
     */
    matchedFields(fields, field) {
        checkType(fields, Array);
        if (_.isEmpty(field)) throw new Error('`matched_fields` requires field name to be passed');

        this.type('fvh', field);
        this._setFieldOption(field, 'matched_fields', fields);

        return this;
    }

    // TODO: Figure out how to pass phrase_limit parameter
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html#phrase-limit

    /**
     * Can be used to define how highlighted text will be encoded.
     *
     * @param {string} encoder It can be either default (no encoding)
     * or html (will escape html, if you use html highlighting tags)
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Encoder can be either `default` or `html`
     */
    encoder(encoder) {
        const encoderLower = encoder.toLowerCase();
        if (encoderLower !== 'default' && encoderLower !== 'html') {
            throw new Error('Encoder can be either `default` or `html`');
        }
        this._highlight.encoder = encoder;
        return this;
    }

    /**
     * By default only fields that hold a query match will be highlighted.
     * This can be set to false to highlight the field regardless of whether
     * the query matched specifically on them. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @param {boolean} requireFieldMatch
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    requireFieldMatch(requireFieldMatch, field) {
        this._setFieldOption(field, 'require_field_match', requireFieldMatch);
        return this;
    }

    /**
     * Allows to control how far to look for boundary characters, and defaults to 20.
     * You can apply the option to a specific field by passing the optional field name parameter.
     *
     * @param {number} count The max characters to scan.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    boundaryMaxScan(count, field) {
        this._setFieldOption(field, 'boundary_max_scan', count);
        return this;
    }

    /**
     * Defines what constitutes a boundary for highlighting.
     * It is a single string with each boundary character defined in it.
     * It defaults to .,!? \t\n. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @param {string} charStr
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    boundaryChars(charStr, field) {
        this._setFieldOption(field, 'boundary_chars', charStr);
        return this;
    }

    /**
     * Allows to force a specific highlighter type.
     * This is useful for instance when needing to use
     * the plain highlighter on a field that has term_vectors enabled.
     * You can apply the option to a specific field by passing the optional field name parameter.
     *
     * @param {string} type The allowed values are: `plain`, `postings` and `fvh`.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Type can be one of `plain`, `postings` or `fvh`.
     */
    type(type, field) {
        const typeLower = type.toLowerCase();
        if (typeLower !== 'plain' &&
            typeLower !== 'postings' &&
            typeLower !== 'fvh') {
            throw new Error('Type can be one of `plain`, `postings` or `fvh`.');
        }
        this._setFieldOption(field, 'type', typeLower);
        return this;
    }

    /**
     * Forces the highlighting to highlight fields based on the source
     * even if fields are stored separately. Defaults to false.
     *
     * @param {boolean} forceSource
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    forceSourceHighlighting(forceSource, field) {
        this._setFieldOption(field, 'force_source', forceSource);
        return this;
    }

    /**
     * Sets the fragmenter type. You can apply the
     * option to a specific field by passing the optional field name parameter.
     * Valid values for order are:
     *  simple - breaks text up into same-size fragments with no concerns
     *      over spotting sentence boundaries.
     *  span - breaks text up into same-size fragments but does not split
     *      up Spans.
     *
     * @param {string} fragmenter The fragmenter.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Fragmenter can be either `simple` or `span`
     */
    fragmenter(fragmenter, field) {
        const fragmenterLower = fragmenter.toLowerCase();
        if (fragmenterLower !== 'simple' && fragmenterLower !== 'span') {
            throw new Error('Fragmenter can be either `simple` or `span`');
        }
        this._setFieldOption(field, 'fragmenter', fragmenterLower);
        return this;
    }

    // TODO: Support Explicit field order
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html#explicit-field-order

    /**
     * Override default `toJSON` to return DSL representation
     *
     * @override
     * @returns {Object}
     */
    toJSON() {
        return this._highlight;
    }
}

module.exports = Highlight;
