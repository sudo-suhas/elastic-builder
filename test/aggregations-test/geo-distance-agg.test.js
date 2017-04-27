import test from 'ava';
import { GeoDistanceAggregation, geoPoint } from '../../src';
import {
    illegalCall,
    illegalParamType,
    aggsExpectStrategy,
    makeSetsOptionMacro,
    validatedCorrectly
} from '../_macros';

// eslint-disable-next-line arrow-body-style
const getInstance = () => new GeoDistanceAggregation('my_geo_agg').range({ to: 100 });

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_geo_agg', 'geo_distance', {
        ranges: [{ to: 100 }]
    })
);

test('sets type as geo_distance', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_geo_agg: {
            geo_distance: {
                ranges: [{ to: 100 }]
            }
        }
    };
    t.deepEqual(value, expected);
});

test(illegalCall, GeoDistanceAggregation, 'format', 'my_agg');
test(illegalCall, GeoDistanceAggregation, 'script', 'my_agg');
test(illegalParamType, getInstance(), 'origin', 'GeoPoint');
test(setsOption, 'origin', { param: geoPoint().object({ lat: 41.12, lon: -71.34 }) });
test(setsOption, 'unit', { param: 'km' });
test(setsOption, 'distanceType', { param: 'plane' });
// prettier-ignore
test(validatedCorrectly, getInstance, 'unit', [
    'in', 'inch',
    'yd', 'yards',
    'ft', 'feet',
    'km', 'kilometers',
    'NM', 'nmi', 'nauticalmiles',
    'mm', 'millimeters',
    'cm', 'centimeters',
    'mi', 'miles',
    'm', 'meters'
], false); // false for not doing toggle case checks
test(validatedCorrectly, getInstance, 'distanceType', ['plane', 'arc']);
