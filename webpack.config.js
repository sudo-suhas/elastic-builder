'use strict';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        library: 'esb',
        libraryTarget: 'umd'
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: false,
                uglifyOptions: {
                    beautify: false,
                    mangle: {
                        toplevel: true,
                        keep_fnames: false
                    },
                    compressor: {
                        warnings: false,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true,
                        negate_iife: false
                    },
                    comments: false
                }
            })
        ]
    }
};
