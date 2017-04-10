'use strict';

const repl = require('repl');

const bob = require('.');

repl.start('bob > ').context.bob = bob;
