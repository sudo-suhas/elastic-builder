import { describe, test, expect } from 'vitest';
import { GeoCentroidAggregation } from '../../src';

const getInstance = field => new GeoCentroidAggregation('my_agg', field);

describe('GeoCentroidAggregation', () => {
    test('sets type as geo_centroid', () => {
        const value = new GeoCentroidAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { geo_centroid: {} }
        });
    });

    test('format cannot be set', () => {
        expect(() => new GeoCentroidAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in GeoCentroidAggregation')
        );
    });

    describe('constructor', () => {
        test('sets field', () => {
            const value = getInstance('my_field').toJSON();
            const expected = {
                my_agg: {
                    geo_centroid: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
