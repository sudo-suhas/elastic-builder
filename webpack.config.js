'use strict';

const webpack = require('webpack');

module.exports = {
    output: {
        library: 'bob',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: false
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                // Drop console statements
                drop_console: true
            },
            comments: false
        })
    ]
};
