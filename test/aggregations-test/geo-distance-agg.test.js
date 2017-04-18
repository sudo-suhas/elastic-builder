import test from 'ava';
import { GeoDistanceAggregation, geoPoint } from '../../src';
import {
    illegalCall,
    illegalParamType,
    makeAggPropIsSetMacro,
    validatedCorrectly
} from '../_macros';

// eslint-disable-next-line arrow-body-style
const getInstance = () => new GeoDistanceAggregation('my_geo_agg').range({ to: 100 });

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_geo_agg', 'geo_distance', {
    ranges: [{ to: 100 }]
});

test('sets type as geo_distance', t => {
    const myAgg = getInstance().toJSON();
    const expected = {
        my_geo_agg: {
            geo_distance: {
                ranges: [{ to: 100 }]
            }
        }
    };
    t.deepEqual(myAgg, expected);
});

test(illegalCall, GeoDistanceAggregation, 'format');
test(illegalCall, GeoDistanceAggregation, 'script');
test(illegalParamType, getInstance(), 'origin', 'GeoPoint');
test(aggPropIsSet, 'origin', geoPoint().object({ lat: 41.12, lon: -71.34 }));
test(aggPropIsSet, 'unit', 'km');
test(aggPropIsSet, 'distanceType', 'plane');
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
