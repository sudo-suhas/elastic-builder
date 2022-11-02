import test from 'ava';
import { DistanceFeatureQuery } from '../../src';

test('Should set time for distance feature', t => {
    const value = new DistanceFeatureQuery('time')
        .origin('now')
        .pivot('1h')
        .toJSON();
    const expected = {
        distance_feature: {
            field: 'time',
            pivot: '1h',
            origin: 'now'
        }
    };
    t.deepEqual(value, expected);
});

test('Should set position for distance feature', t => {
    const value = new DistanceFeatureQuery('location')
        .origin([-71.3, 41.15])
        .pivot('1000m')
        .toJSON();
    const expected = {
        distance_feature: {
            field: 'location',
            pivot: '1000m',
            origin: [-71.3, 41.15]
        }
    };
    t.deepEqual(value, expected);
});

test('Should set field and time for distance feature', t => {
    const value = new DistanceFeatureQuery()
        .field('time')
        .origin('2016/02/01')
        .pivot('7d')
        .toJSON();
    const expected = {
        distance_feature: {
            field: 'time',
            pivot: '7d',
            origin: '2016/02/01'
        }
    };
    t.deepEqual(value, expected);
});

test('Should set position and field for distance feature', t => {
    const value = new DistanceFeatureQuery()
        .origin({
            lat: 41.12,
            lon: -71.34
        })
        .pivot('250m')
        .field('location')
        .toJSON();
    const expected = {
        distance_feature: {
            field: 'location',
            pivot: '250m',
            origin: {
                lat: 41.12,
                lon: -71.34
            }
        }
    };
    t.deepEqual(value, expected);
});
