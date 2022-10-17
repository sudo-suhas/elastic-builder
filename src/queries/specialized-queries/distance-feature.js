const { GeoPoint } = require('../..');
const {
    Query,
    util: { checkType }
} = require('../../core');

class DistanceFeatureQuery extends Query {
    constructor(field) {
        super('distance_feature', field);
    }

    field(fieldName) {
        checkType(fieldName, String);
        this._queryOpts.field = fieldName;
        return this;
    }

    /**
     * Date or point of origin used to calculate distances
     * @param {GeoPoint|string} originPoint
     * @returns
     */
    origin(originPoint) {
        //  Date | GeoPoint | LatLonGeoLocation
        this._queryOpts.origin = originPoint;
        return this;
    }

    /**
     *
     * @param {string} pivotDistance Distance from the origin at which relevance
     * scores receive half of the boost value.
     */
    pivot(pivotDistance) {
        checkType(pivotDistance, String);
        this._queryOpts.pivot = pivotDistance;
        return this;
    }

    boost(factor) {
        checkType(factor, Number);
        this._queryOpts.boost = factor;
        return this;
    }
}

module.exports = DistanceFeatureQuery;
