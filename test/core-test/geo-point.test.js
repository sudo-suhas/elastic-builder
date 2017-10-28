import test from 'ava';
import sinon from 'sinon';
import { GeoPoint } from '../../src';
import { illegalParamType } from '../_macros';

test(illegalParamType, new GeoPoint(), 'object', 'Object');
test(illegalParamType, new GeoPoint(), 'array', 'Array');

test('sets lat lon', t => {
    const value = new GeoPoint()
        .lat(41.12)
        .lon(-71.34)
        .toJSON();
    const expected = { lat: 41.12, lon: -71.34 };

    t.deepEqual(value, expected);
});

test('sets object', t => {
    const value = new GeoPoint().object({ lat: 41.12, lon: -71.34 }).toJSON();
    const expected = { lat: 41.12, lon: -71.34 };

    t.deepEqual(value, expected);
});

test('sets array', t => {
    const value = new GeoPoint().array([-71.34, 41.12]).toJSON();
    const expected = [-71.34, 41.12];

    t.deepEqual(value, expected);
});

test('sets string', t => {
    const value = new GeoPoint().string('41.12,-71.34').toJSON();
    const expected = '41.12,-71.34';

    t.is(value, expected);
});

test('mixed representation', t => {
    let value = new GeoPoint()
        .lat(41.12)
        .array([-71.34, 41.12])
        .toJSON();
    let expected = [-71.34, 41.12];
    t.deepEqual(value, expected);

    value = new GeoPoint()
        .string('41.12,-71.34')
        .lat(41.12)
        .lon(-71.34)
        .toJSON();
    expected = { lat: 41.12, lon: -71.34 };
    t.deepEqual(value, expected);

    value = new GeoPoint()
        .array([-71.34, 41.12])
        .object({ lat: 41.12, lon: -71.34 })
        .toJSON();
    expected = { lat: 41.12, lon: -71.34 };
    t.deepEqual(value, expected);

    value = new GeoPoint()
        .lat(41.12)
        .string('41.12,-71.34')
        .toJSON();
    expected = '41.12,-71.34';
    t.deepEqual(value, expected);
});

test.serial('mixed representation logs warnings', t => {
    const spy = sinon.spy(console, 'warn');

    const checkAndReset = () => {
        t.true(spy.calledTwice);
        t.true(
            spy.firstCall.calledWith(
                '[GeoPoint] Do not mix with other representation!'
            )
        );
        t.true(spy.secondCall.calledWith('[GeoPoint] Overwriting.'));
        spy.reset();
    };

    new GeoPoint()
        .lat(41.12)
        .array([-71.34, 41.12])
        .toJSON();
    checkAndReset();

    new GeoPoint()
        .array([-71.34, 41.12])
        .object({ lat: 41.12, lon: -71.34 })
        .toJSON();
    checkAndReset();

    new GeoPoint()
        .lat(41.12)
        .string('41.12,-71.34')
        .toJSON();
    checkAndReset();

    console.warn.restore();
});
