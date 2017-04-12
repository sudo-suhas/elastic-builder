'use strict';

const repl = require('repl');

const bob = require('./lib');

repl.start('elastic-builder > ').context.bob = bob;
