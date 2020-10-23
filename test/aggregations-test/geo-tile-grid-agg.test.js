import test from 'ava';
import { GeoTileGridAggregation, GeoPoint } from '../../src';
import {
    illegalCall,
    illegalParamType,
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoTileGridAggregation('my_geo_agg');

const instance = getInstance();

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_geo_agg', 'geotile_grid')
);

const setsBoundOption = makeSetsOptionMacro(
    getInstance,
    (keyName, propValue) => ({
        my_geo_agg: {
            geotile_grid: {
                bounds: { [keyName]: propValue }
            }
        }
    })
);

const pt1 = new GeoPoint().lat(40.73).lon(-74.1);
const pt2 = new GeoPoint().lat(40.1).lon(-71.12);

test(setsAggType, GeoTileGridAggregation, 'geotile_grid');
test(illegalCall, GeoTileGridAggregation, 'format', 'my_agg');
test(illegalCall, GeoTileGridAggregation, 'script', 'my_agg');
test(setsOption, 'precision', { param: 8 });
test(setsOption, 'size', { param: 10000 });
test(setsOption, 'shardSize', { param: 3 });
test(illegalParamType, instance, 'topLeft', 'GeoPoint');
test(illegalParamType, instance, 'bottomRight', 'GeoPoint');
test(illegalParamType, instance, 'topRight', 'GeoPoint');
test(illegalParamType, instance, 'bottomLeft', 'GeoPoint');
test(setsBoundOption, 'topLeft', { param: pt1 });
test(setsBoundOption, 'bottomRight', { param: pt2 });
test(setsBoundOption, 'topRight', { param: pt1 });
test(setsBoundOption, 'bottomLeft', { param: pt2 });
test(setsBoundOption, 'top', { param: 40.73 });
test(setsBoundOption, 'left', { param: -74.1 });
test(setsBoundOption, 'bottom', { param: 40.1 });
test(setsBoundOption, 'right', { param: -71.12 });

test('precision correctly validated', t => {
    let err = t.throws(() => getInstance().precision(-1), Error);
    t.is(err.message, '`precision` can only be value from 0 to 29.');

    err = t.throws(() => getInstance().precision(30), Error);
    t.is(err.message, '`precision` can only be value from 0 to 29.');

    err = t.throws(() => getInstance().precision(null), Error);
    t.is(err.message, '`precision` can only be value from 0 to 29.');

    err = t.throws(() => getInstance().precision(undefined), Error);
    t.is(err.message, '`precision` can only be value from 0 to 29.');
});
