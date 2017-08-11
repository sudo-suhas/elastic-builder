import test from 'ava';
import { GeoPolygonQuery } from '../../src';
import {
    illegalParamType,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoPolygonQuery('my_field');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('geo_polygon')
);

test(illegalParamType, getInstance(), 'points', 'Array');
test(setsOption, 'points', {
    param: [
        { lat: 40, lon: -70 },
        { lat: 30, lon: -80 },
        { lat: 20, lon: -90 }
    ],
    spread: false
});
