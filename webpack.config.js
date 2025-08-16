'use strict';

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        library: {
            name: 'esb',
            type: 'umd'
        }
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        beautify: false,
                        comments: false
                    },
                    mangle: {
                        toplevel: true,
                        keep_fnames: false
                    },
                    compress: {
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
                    }
                }
            })
        ]
    }
};
