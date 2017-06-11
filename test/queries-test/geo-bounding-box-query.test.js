import test from 'ava';
import { GeoBoundingBoxQuery, GeoPoint } from '../../src';
import {
    illegalParamType,
    validatedCorrectly,
    nameExpectStrategy,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoBoundingBoxQuery('my_field');

const setsQryOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('geo_bounding_box', { my_field: {} })
);

const setsFieldOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('geo_bounding_box')
);

const pt1 = new GeoPoint().lat(40.73).lon(-74.1);
const pt2 = new GeoPoint().lat(40.1).lon(-71.12);

const instance = getInstance();

test(illegalParamType, instance, 'topLeft', 'GeoPoint');
test(illegalParamType, instance, 'bottomRight', 'GeoPoint');
test(illegalParamType, instance, 'topRight', 'GeoPoint');
test(illegalParamType, instance, 'bottomLeft', 'GeoPoint');
test(validatedCorrectly, getInstance, 'type', ['memory', 'indexed']);
test(setsFieldOption, 'topLeft', { param: pt1 });
test(setsFieldOption, 'bottomRight', { param: pt2 });
test(setsFieldOption, 'topRight', { param: pt1 });
test(setsFieldOption, 'bottomLeft', { param: pt2 });
test(setsFieldOption, 'top', { param: 40.73 });
test(setsFieldOption, 'left', { param: -74.1 });
test(setsFieldOption, 'bottom', { param: 40.1 });
test(setsFieldOption, 'right', { param: -71.12 });
test(setsQryOption, 'type', { param: 'indexed' });
