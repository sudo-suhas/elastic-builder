'use strict';

const webpack = require('webpack');

module.exports = {
    output: {
        library: 'bob',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
};
