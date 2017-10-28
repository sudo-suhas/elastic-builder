import test from 'ava';
import { GeoDistanceQuery, GeoPoint } from '../../src';
import {
    illegalParamType,
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = pt => new GeoDistanceQuery('my_field', pt);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('geo_distance', { my_field: {} })
);

const pt = new GeoPoint().lat(40.73).lon(-74.1);

test(illegalParamType, getInstance(), 'geoPoint', 'GeoPoint');
test(validatedCorrectly, getInstance, 'distanceType', ['arc', 'plane']);
test(setsOption, 'distance', { param: '10m' });
test(setsOption, 'distanceType', { param: 'arc' });
test(setsOption, 'geoPoint', { param: pt, keyName: 'my_field' });

test('constructor sets point', t => {
    const valueA = getInstance(pt).toJSON();
    const valueB = getInstance()
        .geoPoint(pt)
        .toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        geo_distance: {
            my_field: { lat: 40.73, lon: -74.1 }
        }
    };
    t.deepEqual(valueA, expected);
});
