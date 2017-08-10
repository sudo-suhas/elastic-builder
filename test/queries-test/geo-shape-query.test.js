import test from 'ava';
import { GeoShapeQuery, GeoShape, IndexedShape } from '../../src';
import {
    illegalCall,
    illegalParamType,
    validatedCorrectly,
    nameExpectStrategy,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new GeoShapeQuery('my_field');

const setsQryOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('geo_shape', { my_field: {} })
);
const setsFieldOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('geo_shape')
);

test(illegalCall, GeoShapeQuery, 'validationMethod');
test(illegalParamType, getInstance(), 'shape', 'GeoShape');
test(illegalParamType, getInstance(), 'indexedShape', 'IndexedShape');
test(validatedCorrectly, getInstance, 'relation', [
    'WITHIN',
    'CONTAINS',
    'DISJOINT',
    'INTERSECTS'
]);
test(setsFieldOption, 'shape', {
    param: new GeoShape()
        .type('envelope')
        .coordinates([[13.0, 53.0], [14.0, 52.0]])
});
test(setsFieldOption, 'indexedShape', {
    param: new IndexedShape()
        .id('DEU')
        .type('countries')
        .index('shapes')
        .path('location')
});
test(setsFieldOption, 'relation', { param: 'WITHIN' });
test(setsQryOption, 'ignoreUnmapped', { param: true });
