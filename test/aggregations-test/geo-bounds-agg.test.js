import { describe, test, expect } from 'vitest';
import { GeoBoundsAggregation } from '../../src';

const getInstance = field => new GeoBoundsAggregation('my_agg', field);

describe('GeoBoundsAggregation', () => {
    test('sets type as geo_bounds', () => {
        const value = new GeoBoundsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { geo_bounds: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new GeoBoundsAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoBoundsAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new GeoBoundsAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in GeoBoundsAggregation')
        );
    });

    describe('options', () => {
        test('sets wrapLongitude', () => {
            const value = getInstance('my_field')
                .wrapLongitude('true')
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    geo_bounds: {
                        field: 'my_field',
                        wrap_longitude: 'true'
                    }
                }
            });
        });
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = {
                my_agg: {
                    geo_bounds: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
