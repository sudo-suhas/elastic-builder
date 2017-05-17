'use strict';

const path = require('path');
const glob = require('glob');

const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: glob.sync('./test/**/*.js'),
    output: {
        path: path.resolve(__dirname, '_build'),
        filename: 'tests.js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    }
};
