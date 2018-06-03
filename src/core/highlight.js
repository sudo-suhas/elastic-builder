'use strict';

const has = require('lodash.has'),
    isEmpty = require('lodash.isempty'),
    isNil = require('lodash.isnil'),
    isString = require('lodash.isstring');

const Query = require('./query');
const { checkType, invalidParam, recursiveToJSON } = require('./util');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html';

const invalidEncoderParam = invalidParam(
    ES_REF_URL,
    'encoder',
    "'default' or 'html'"
);
const invalidTypeParam = invalidParam(
    ES_REF_URL,
    'type',
    "'plain', 'postings' or 'fvh'"
);
const invalidFragmenterParam = invalidParam(
    ES_REF_URL,
    'fragmenter',
    "'simple' or 'span'"
);

/**
 * Allows to highlight search results on one or more fields. In order to
 * perform highlighting, the actual content of the field is required. If the
 * field in question is stored (has store set to yes in the mapping), it will
 * be used, otherwise, the actual _source will be loaded and the relevant
 * field will be extracted from it.
 *
 * If no term_vector information is provided (by setting it to
 * `with_positions_offsets` in the mapping), then the plain highlighter will be
 * used. If it is provided, then the fast vector highlighter will be used.
 * When term vectors are available, highlighting will be performed faster at
 * the cost of bigger index size.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchAllQuery())
 *     .highlight(esb.highlight('content'));
 *
 * @example
 * const highlight = esb.highlight()
 *     .numberOfFragments(3)
 *     .fragmentSize(150)
 *     .fields(['_all', 'bio.title', 'bio.author', 'bio.content'])
 *     .preTags('<em>', '_all')
 *     .postTags('</em>', '_all')
 *     .numberOfFragments(0, 'bio.title')
 *     .numberOfFragments(0, 'bio.author')
 *     .numberOfFragments(5, 'bio.content')
 *     .scoreOrder('bio.content');
 *
 * highlight.toJSON()
 * {
 *     "number_of_fragments" : 3,
 *     "fragment_size" : 150,
 *     "fields" : {
 *         "_all" : { "pre_tags" : ["<em>"], "post_tags" : ["</em>"] },
 *         "bio.title" : { "number_of_fragments" : 0 },
 *         "bio.author" : { "number_of_fragments" : 0 },
 *         "bio.content" : { "number_of_fragments" : 5, "order" : "score" }
 *     }
 *  }
 *
 * @param {string|Array=} fields An optional field or array of fields to highlight.
 */
class Highlight {
    // eslint-disable-next-line require-jsdoc
    constructor(fields) {
        this._fields = {};
        this._highlight = { fields: this._fields };

        // Does this smell?
        if (isNil(fields)) return;

        if (isString(fields)) this.field(fields);
        else this.fields(fields);
    }

    /**
     * Private function to set field option
     *
     * @param {string|null} field
     * @param {string} option
     * @param {string} val
     * @private
     */
    _setFieldOption(field, option, val) {
        if (isNil(field)) {
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
     * @param {string} field A field name.
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    field(field) {
        if (!isNil(field) && !has(this._fields, field)) {
            this._fields[field] = {};
        }

        return this;
    }

    /**
     * Allows you to set the fields that will be highlighted. All fields are
     * added to the current list of fields.
     *
     * @param {Array<string>} fields Array of field names.
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {TypeError} If `fields` is not an instance of Array
     */
    fields(fields) {
        checkType(fields, Array);

        fields.forEach(field => this.field(field));
        return this;
    }

    /**
     * Sets the pre tags for highlighted fragments. You can apply the
     * tags to a specific field by passing the optional field name parameter.
     *
     * @example
     * const highlight = esb.highlight('_all')
     *     .preTags('<tag1>')
     *     .postTags('</tag1>');
     *
     * @example
     * const highlight = esb.highlight('_all')
     *     .preTags(['<tag1>', '<tag2>'])
     *     .postTags(['</tag1>', '</tag2>']);
     *
     * @param {string|Array} tags
     * @param {string=} field
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    preTags(tags, field) {
        this._setFieldOption(field, 'pre_tags', isString(tags) ? [tags] : tags);
        return this;
    }

    /**
     * Sets the post tags for highlighted fragments. You can apply the
     * tags to a specific field by passing the optional field name parameter.
     *
     * @example
     * const highlight = esb.highlight('_all')
     *     .preTags('<tag1>')
     *     .postTags('</tag1>');
     *
     * @example
     * const highlight = esb.highlight('_all')
     *     .preTags(['<tag1>', '<tag2>'])
     *     .postTags(['</tag1>', '</tag2>']);
     *
     * @param {string|Array} tags
     * @param {string=} field
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    postTags(tags, field) {
        this._setFieldOption(
            field,
            'post_tags',
            isString(tags) ? [tags] : tags
        );
        return this;
    }

    /**
     * Sets the styled schema to be used for the tags.
     *
     * styled - 10 `<em>` pre tags with css class of hltN, where N is 1-10
     *
     * @example
     * const highlight = esb.highlight('content').styledTagsSchema();
     *
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    styledTagsSchema() {
        // This is a special case as it does not map directly to elasticsearch DSL
        // This is written this way for ease of use
        this._highlight.tags_schema = 'styled';
        return this;
    }

    /**
     * Sets the order of highlight fragments to be sorted by score. You can apply the
     * score order to a specific field by passing the optional field name parameter.
     *
     * @example
     * const highlight = esb.highlight('content').scoreOrder()
     *
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    scoreOrder(field) {
        // This is a special case as it does not map directly to elasticsearch DSL
        // It is written this way for ease of use
        this._setFieldOption(field, 'order', 'score');
        return this;
    }

    /**
     * Sets the size of each highlight fragment in characters. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @example
     * const highlight = esb.highlight('content')
     *     .fragmentSize(150, 'content')
     *     .numberOfFragments(3, 'content');
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
     * @example
     * const highlight = esb.highlight('content')
     *     .fragmentSize(150, 'content')
     *     .numberOfFragments(3, 'content');
     *
     * @example
     * const highlight = esb.highlight(['_all', 'bio.title'])
     *     .numberOfFragments(0, 'bio.title');
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
     * If `no_match_size` is set, in the case where there is no matching fragment
     * to highlight, a snippet of text, with the specified length, from the beginning
     * of the field will be returned.
     *
     * The actual length may be shorter than specified as it tries to break on a word boundary.
     *
     * Default is `0`.
     *
     * @example
     * const highlight = esb.highlight('content')
     *     .fragmentSize(150, 'content')
     *     .numberOfFragments(3, 'content')
     *     .noMatchSize(150, 'content');
     *
     * @param {number} size
     * @param {string} field
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    noMatchSize(size, field) {
        this._setFieldOption(field, 'no_match_size', size);
        return this;
    }

    /**
     * Highlight against a query other than the search query.
     * Useful if you use a rescore query because those
     * are not taken into account by highlighting by default.
     *
     * @example
     * const highlight = esb.highlight('content')
     *     .fragmentSize(150, 'content')
     *     .numberOfFragments(3, 'content')
     *     .highlightQuery(
     *         esb.boolQuery()
     *             .must(esb.matchQuery('content', 'foo bar'))
     *             .should(
     *                 esb.matchPhraseQuery('content', 'foo bar').slop(1).boost(10)
     *             )
     *             .minimumShouldMatch(0),
     *         'content'
     *     );
     *
     * @param {Query} query
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {TypeError} If `query` is not an instance of `Query`
     */
    highlightQuery(query, field) {
        checkType(query, Query);

        this._setFieldOption(field, 'highlight_query', query);
        return this;
    }

    /**
     * Combine matches on multiple fields to highlight a single field.
     * Useful for multifields that analyze the same string in different ways.
     * Sets the highlight type to Fast Vector Highlighter(`fvh`).
     *
     * @example
     * const highlight = esb.highlight('content')
     *     .scoreOrder('content')
     *     .matchedFields(['content', 'content.plain'], 'content');
     *
     * highlight.toJSON();
     * {
     *     "order": "score",
     *     "fields": {
     *         "content": {
     *             "matched_fields": ["content", "content.plain"],
     *             "type" : "fvh"
     *         }
     *     }
     * }
     *
     * @param {Array<string>} fields
     * @param {string} field Field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} field parameter should be valid field name
     * @throws {TypeError} If `fields` is not an instance of Array
     */
    matchedFields(fields, field) {
        checkType(fields, Array);
        if (isEmpty(field)) {
            throw new Error(
                '`matched_fields` requires field name to be passed'
            );
        }

        this.type('fvh', field);
        this._setFieldOption(field, 'matched_fields', fields);
        return this;
    }

    /**
     * The fast vector highlighter has a phrase_limit parameter that prevents
     * it from analyzing too many phrases and eating tons of memory. It defaults
     * to 256 so only the first 256 matching phrases in the document scored
     * considered. You can raise the limit with the phrase_limit parameter.
     *
     * If using `matched_fields`, `phrase_limit` phrases per matched field
     * are considered.
     *
     * @param {number} limit Defaults to 256.
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    phraseLimit(limit) {
        this._highlight.phrase_limit = limit;
        return this;
    }

    /**
     * Can be used to define how highlighted text will be encoded.
     *
     * @param {string} encoder It can be either default (no encoding)
     * or `html` (will escape `html`, if you use html highlighting tags)
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Encoder can be either `default` or `html`
     */
    encoder(encoder) {
        if (isNil(encoder)) invalidEncoderParam(encoder);

        const encoderLower = encoder.toLowerCase();
        if (encoderLower !== 'default' && encoderLower !== 'html') {
            invalidEncoderParam(encoder);
        }

        this._highlight.encoder = encoderLower;
        return this;
    }

    /**
     * By default only fields that hold a query match will be highlighted.
     * This can be set to false to highlight the field regardless of whether
     * the query matched specifically on them. You can apply the
     * option to a specific field by passing the optional field name parameter.
     *
     * @example
     * const highlight = esb.highlight('_all')
     *     .preTags('<em>', '_all')
     *     .postTags('</em>', '_all')
     *     .requireFieldMatch(false);
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
     * It defaults to `.,!? \t\n`. You can apply the
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
     * You can apply the option to a specific field by passing the optional
     * field name parameter.
     *
     * Note: The `postings` highlighter has been removed in elasticsearch 6.0.
     * The `unified` highlighter outputs the same highlighting when
     * `index_options` is set to `offsets`.
     *
     * @example
     * const highlight = esb.highlight('content').type('plain', 'content');
     *
     * @param {string} type The allowed values are: `plain`, `postings` and `fvh`.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Type can be one of `plain`, `postings` or `fvh`.
     */
    type(type, field) {
        if (isNil(type)) invalidTypeParam(type);

        const typeLower = type.toLowerCase();
        if (
            typeLower !== 'plain' &&
            typeLower !== 'postings' &&
            typeLower !== 'fvh'
        ) {
            invalidTypeParam(type);
        }

        this._setFieldOption(field, 'type', typeLower);
        return this;
    }

    /**
     * Forces the highlighting to highlight fields based on the source
     * even if fields are stored separately. Defaults to false.
     *
     * @example
     * const highlight = esb.highlight('content').forceSource(true, 'content');
     *
     * @param {boolean} forceSource
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     */
    forceSource(forceSource, field) {
        this._setFieldOption(field, 'force_source', forceSource);
        return this;
    }

    /**
     * Sets the fragmenter type. You can apply the
     * option to a specific field by passing the optional field name parameter.
     * Valid values for order are:
     *  - `simple` - breaks text up into same-size fragments with no concerns
     *      over spotting sentence boundaries.
     *  - `span` - breaks text up into same-size fragments but does not split
     *      up Spans.
     *
     * @example
     * const highlight = esb.highlight('message')
     *     .fragmentSize(15, 'message')
     *     .numberOfFragments(3, 'message')
     *     .fragmenter('simple', 'message');
     *
     * @param {string} fragmenter The fragmenter.
     * @param {string=} field An optional field name
     * @returns {Highlight} returns `this` so that calls can be chained
     * @throws {Error} Fragmenter can be either `simple` or `span`
     */
    fragmenter(fragmenter, field) {
        if (isNil(fragmenter)) invalidFragmenterParam(fragmenter);

        const fragmenterLower = fragmenter.toLowerCase();
        if (fragmenterLower !== 'simple' && fragmenterLower !== 'span') {
            invalidFragmenterParam(fragmenter);
        }

        this._setFieldOption(field, 'fragmenter', fragmenterLower);
        return this;
    }

    // TODO: Support Explicit field order
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html#explicit-field-order

    /**
     * Override default `toJSON` to return DSL representation for the `highlight` request
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */
    toJSON() {
        return recursiveToJSON(this._highlight);
    }
}

module.exports = Highlight;
