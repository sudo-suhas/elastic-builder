import { describe, test, expect } from 'vitest';
import { RankFeatureQuery } from '../../src';

describe('RankFeatureQuery', () => {
    describe('constructor', () => {
        test('constructor sets field', () => {
            const value = new RankFeatureQuery('my_field').toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field'
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets field via method', () => {
            const value = new RankFeatureQuery().field('my_field').toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field'
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('scoring functions', () => {
        test('sets linear scoring function', () => {
            const value = new RankFeatureQuery('my_field').linear().toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field',
                    linear: {}
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets saturation scoring function', () => {
            const value = new RankFeatureQuery('my_field')
                .saturation()
                .toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field',
                    saturation: {}
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets saturation with pivot', () => {
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
            expect(value).toEqual(expected);
        });

        test('sets sigmoid scoring function', () => {
            const value = new RankFeatureQuery('my_field')
                .sigmoid(2, 0.6)
                .toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field',
                    sigmoid: {
                        pivot: 2,
                        exponent: 0.6
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets logarithmic scoring function', () => {
            const value = new RankFeatureQuery('my_field').log(2).toJSON();
            const expected = {
                rank_feature: {
                    field: 'my_field',
                    log: {
                        scaling_factor: 2
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
