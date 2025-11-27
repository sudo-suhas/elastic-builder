import { describe, test, expect } from 'vitest';
import { MissingAggregation } from '../../src';

describe('MissingAggregation', () => {
    test('sets type as missing', () => {
        const value = new MissingAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { missing: {} }
        });
    });

    test('script cannot be set', () => {
        expect(() => new MissingAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in MissingAggregation')
        );
    });

    describe('constructor', () => {
        test('sets arguments', () => {
            const value = new MissingAggregation('my_agg', 'my_field').toJSON();
            const expected = {
                my_agg: {
                    missing: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
