import { describe, test, expect } from 'vitest';
import { CompositeAggregation } from '../../../src';

const { HistogramValuesSource } = CompositeAggregation;

const getInstance = (...args) =>
    new HistogramValuesSource('my_val_src', ...args);

describe('HistogramValuesSource', () => {
    test('constructor sets arguments', () => {
        const value = getInstance('my_field', 10).toJSON();
        const expected = {
            my_val_src: {
                histogram: {
                    field: 'my_field',
                    interval: 10
                }
            }
        };
        expect(value).toEqual(expected);
    });

    test('sets type as histogram', () => {
        const value = new HistogramValuesSource('my_val_src').toJSON();
        expect(value).toEqual({
            my_val_src: { histogram: {} }
        });
    });

    describe('options', () => {
        test('sets interval', () => {
            const value = getInstance().interval(5).toJSON();
            expect(value).toEqual({
                my_val_src: {
                    histogram: {
                        interval: 5
                    }
                }
            });
        });
    });
});
