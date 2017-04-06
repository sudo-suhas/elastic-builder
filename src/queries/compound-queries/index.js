'use strict';

exports.scoreFunctions = require('./score-functions');

exports.ConstantScoreQuery = require('./constant-score-query');
exports.BoolQuery = require('./bool-query');
exports.DisMaxQuery = require('./dis-max-query');
exports.FunctionScoreQuery = require('./function-score-query');
exports.BoostingQuery = require('./boosting-query');

// This was deprecated in 5.0, not implementing
// exports.IndicesQuery = require('./indices-query');
