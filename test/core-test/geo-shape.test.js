import test from 'ava';
import { GeoShape, geoShape } from '../../src';
import { illegalParamType, validatedCorrectly } from '../_macros';

test(illegalParamType, new GeoShape(), 'coordinates', 'Array');
test(validatedCorrectly, geoShape, 'type', [
    'point',
    'linestring',
    'polygon',
    'multipoint',
    'multilinestring',
    'multipolygon',
    'geometrycollection',
    'envelope',
    'circle'
]);

test('constructor sets arguments', t => {
    let value = new GeoShape('multipoint', [
        [102.0, 2.0],
        [103.0, 2.0]
    ]).toJSON();
    const expected = {
        type: 'multipoint',
        coordinates: [
            [102.0, 2.0],
            [103.0, 2.0]
        ]
    };
    t.deepEqual(value, expected);

    value = new GeoShape('multipoint')
        .coordinates([
            [102.0, 2.0],
            [103.0, 2.0]
        ])
        .toJSON();
    t.deepEqual(value, expected);
});

test('sets type and coordinates', t => {
    const value = new GeoShape()
        .type('envelope')
        .coordinates([
            [-45.0, 45.0],
            [45.0, -45.0]
        ])
        .toJSON();
    const expected = {
        type: 'envelope',
        coordinates: [
            [-45.0, 45.0],
            [45.0, -45.0]
        ]
    };
    t.deepEqual(value, expected);
});

test('sets radius', t => {
    const value = new GeoShape()
        .type('circle')
        .coordinates([-45.0, 45.0])
        .radius('100m')
        .toJSON();
    const expected = {
        type: 'circle',
        coordinates: [-45.0, 45.0],
        radius: '100m'
    };
    t.deepEqual(value, expected);
});

test('toJSON checks required', t => {
    let err = t.throws(() => new GeoShape().toJSON(), Error);
    t.is(
        err.message,
        'For all types, both the inner `type` and `coordinates` fields are required.'
    );

    err = t.throws(() => new GeoShape().type('point').toJSON());
    t.is(
        err.message,
        'For all types, both the inner `type` and `coordinates` fields are required.'
    );

    err = t.throws(() => new GeoShape().coordinates([-45.0, 45.0]).toJSON());
    t.is(
        err.message,
        'For all types, both the inner `type` and `coordinates` fields are required.'
    );
});
