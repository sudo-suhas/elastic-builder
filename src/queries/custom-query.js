'use strict';

const isNil = require('lodash.isnil');
const { Query } = require('../core');

class CustomQuery extends Query {
    // eslint-disable-next-line require-jsdoc
    constructor(queryType, field) {
        super(queryType, field);

        if (!isNil(field)) this._field = field;
    }

    field(field) {
        this._field = field;
        return this;
    }

    toJSON() {
        const repr = {
            [this.queryType]: {
                [this._field]: this._queryOpts
            }
        };
        return repr;
    }
}

module.exports = CustomQuery;
