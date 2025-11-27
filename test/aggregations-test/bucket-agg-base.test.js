import { describe, test, expect } from 'vitest';
import { Script } from '../../src';
import { BucketAggregationBase } from '../../src/aggregations/bucket-aggregations';

const getInstance = (...args) =>
    new BucketAggregationBase('my_agg', 'my_type', ...args);

describe('BucketAggregationBase', () => {
    describe('constructor', () => {
        test('can be instantiated', () => {
            expect(getInstance()).toBeTruthy();
        });

        test('sets arguments', () => {
            const value = getInstance('my_field').toJSON(),
                myOtherAgg = getInstance().field('my_field').toJSON();
            expect(value).toEqual(myOtherAgg);
        });
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
            const value = getInstance()
                .script(
                    new Script()
                        .lang('groovy')
                        .file('calculate-score')
                        .params({ my_modifier: 2 })
                )
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        script: {
                            lang: 'groovy',
                            file: 'calculate-score',
                            params: { my_modifier: 2 }
                        }
                    }
                }
            });
        });
    });
});
