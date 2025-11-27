import { describe, test, expect } from 'vitest';
import { Script } from '../../src';
import { MetricsAggregationBase } from '../../src/aggregations/metrics-aggregations';

const getInstance = field =>
    new MetricsAggregationBase('my_agg', 'my_type', field);

describe('MetricsAggregationBase', () => {
    test('can be instantiated', () => {
        expect(getInstance()).toBeTruthy();
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('script()', () => {
                expect(() => getInstance().script(value)).toThrow(
                    new TypeError('Argument must be an instance of Script')
                );
            });
        });
    });

    describe('options', () => {
        test('sets field', () => {
            const value = getInstance().field('my_field').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        field: 'my_field'
                    }
                }
            });
        });

        test('sets script', () => {
            const scriptInstance = new Script()
                .lang('groovy')
                .file('calculate-score')
                .params({ my_modifier: 2 });
            const value = getInstance().script(scriptInstance).toJSON();
            const expected = {
                my_agg: {
                    my_type: {
                        script: scriptInstance.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets missing', () => {
            const value = getInstance().missing(1).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        missing: 1
                    }
                }
            });
        });

        test('sets format', () => {
            const value = getInstance().format('####.00').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        format: '####.00'
                    }
                }
            });
        });
    });

    test('constructor sets field', () => {
        const valueA = getInstance('my_field').toJSON();
        const valueB = getInstance().field('my_field').toJSON();
        expect(valueA).toEqual(valueB);

        const expected = {
            my_agg: {
                my_type: {
                    field: 'my_field'
                }
            }
        };
        expect(valueA).toEqual(expected);
    });
});
