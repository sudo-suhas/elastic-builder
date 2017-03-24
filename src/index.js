'use strict';

const aggregations = require('./aggregations'),
    queries = require('./queries'),
    scriptTypes = require('./script-types'),
    { Highlight, util: { constructorWrapper } } = require('./core');

// The builder
const bob = {
    Highlight,
    highlight: constructorWrapper(Highlight)
};

Object.assign(bob, aggregations, queries, scriptTypes);

module.exports = bob;
