'use strict';

const repl = require('repl');

const esb = require('./lib');

repl.start('elastic-builder > ').context.esb = esb;
