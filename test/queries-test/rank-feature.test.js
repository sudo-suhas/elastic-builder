import test from 'ava';
import { RankFeatureQuery } from '../../src';

test('Should test no args rank feature query', t => {
    const value = new RankFeatureQuery('my_field').toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field'
        }
    };
    t.deepEqual(value, expected);
});

test('Should test with fieldName', t => {
    const value = new RankFeatureQuery().field('my_field').toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field'
        }
    };
    t.deepEqual(value, expected);
});

test('Should test linear rank feature query', t => {
    const value = new RankFeatureQuery('my_field').linear().toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field',
            linear: {}
        }
    };
    t.deepEqual(value, expected);
});

test('Should test saturation rank feature query', t => {
    const value = new RankFeatureQuery('my_field').saturation().toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field',
            saturation: {}
        }
    };
    t.deepEqual(value, expected);
});

test('Should test saturation with pivot rank feature query', t => {
    const value = new RankFeatureQuery('my_field')
        .saturationPivot(123)
        .toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field',
            saturation: {
                pivot: 123
            }
        }
    };
    t.deepEqual(value, expected);
});

test('Should test sigmoid rank feature query', t => {
    const value = new RankFeatureQuery('my_field').sigmoid(2, 0.6).toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field',
            sigmoid: {
                pivot: 2,
                exponent: 0.6
            }
        }
    };
    t.deepEqual(value, expected);
});

test('Should test logarithmic rank feature query', t => {
    const value = new RankFeatureQuery('my_field').log(2).toJSON();
    const expected = {
        rank_feature: {
            field: 'my_field',
            log: {
                scaling_factor: 2
            }
        }
    };
    t.deepEqual(value, expected);
});
