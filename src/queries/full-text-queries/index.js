'use strict';

exports.FullTextQueryBase = require('./full-text-query-base');
exports.MatchPhraseQueryBase = require('./match-phrase-query-base');
exports.MonoFieldQueryBase = require('./mono-field-query-base');
exports.QueryStringQueryBase = require('./query-string-query-base');

exports.MatchQuery = require('./match-query');
exports.MatchPhraseQuery = require('./match-phrase-query');
exports.MatchPhrasePrefixQuery = require('./match-phrase-prefix-query');
exports.MultiMatchQuery = require('./multi-match-query');
exports.CommonTermsQuery = require('./common-terms-query');
exports.QueryStringQuery = require('./query-string-query');
exports.SimpleQueryStringQuery = require('./simple-query-string-query');
