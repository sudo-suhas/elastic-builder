import { describe, test, expect } from 'vitest';
import { HistogramAggregationBase } from '../../src/aggregations/bucket-aggregations';

const getInstance = (...args) =>
    new HistogramAggregationBase('my_agg', 'my_type', ...args);

describe('HistogramAggregationBase', () => {
    describe('options', () => {
        test('sets interval', () => {
            const value = getInstance().interval('year').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        interval: 'year'
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

        test('sets offset', () => {
            const value = getInstance().offset(10).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        offset: 10
                    }
                }
            });
        });

        test('sets minDocCount', () => {
            const value = getInstance().minDocCount(1).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        min_doc_count: 1
                    }
                }
            });
        });

        test('sets missing', () => {
            const value = getInstance().missing(0).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        missing: 0
                    }
                }
            });
        });

        test('sets keyed', () => {
            const value = getInstance().keyed(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        keyed: true
                    }
                }
            });
        });

        test('sets extendedBounds', () => {
            const value = getInstance().extendedBounds(0, 500).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        extended_bounds: { min: 0, max: 500 }
                    }
                }
            });
        });

        test('sets hardBounds', () => {
            const value = getInstance().hardBounds(0, 500).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        hard_bounds: { min: 0, max: 500 }
                    }
                }
            });
        });

        test('sets order with string', () => {
            const value = getInstance().order('my_field').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        order: { my_field: 'desc' }
                    }
                }
            });
        });

        test('sets order with array', () => {
            const value = getInstance().order('my_field', 'asc').toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        order: { my_field: 'asc' }
                    }
                }
            });
        });
    });

    test('constructor sets arguments', () => {
        const value = getInstance('my_field', 10).toJSON();
        const expected = {
            my_agg: {
                my_type: {
                    field: 'my_field',
                    interval: 10
                }
            }
        };
        expect(value).toEqual(expected);
    });

    describe('order() validation', () => {
        test.each([
            {
                name: 'accepts default (no direction specified)',
                field: 'my_field',
                direction: undefined
            },
            {
                name: 'accepts direction: asc',
                field: 'my_field',
                direction: 'asc'
            },
            {
                name: 'accepts direction: ASC (case-insensitive)',
                field: 'my_field',
                direction: 'ASC'
            },
            {
                name: 'accepts direction: desc',
                field: 'my_field',
                direction: 'desc'
            },
            {
                name: 'accepts direction: DESC (case-insensitive)',
                field: 'my_field',
                direction: 'DESC'
            }
        ])('$name', ({ field, direction }) => {
            expect(() => getInstance().order(field, direction)).not.toThrow();
        });

        test.each([
            {
                name: 'throws for invalid direction',
                field: 'my_field',
                direction: 'invalid_direction'
            },
            {
                name: 'throws for null direction',
                field: 'my_field',
                direction: null
            }
        ])('$name', ({ field, direction }) => {
            expect(() => getInstance().order(field, direction)).toThrow(
                new Error(
                    "The 'direction' parameter should be one of 'asc' or 'desc'"
                )
            );
        });
    });

    test('multiple order criteria can be set', () => {
        const value = getInstance('my_field').order('my_field_a', 'asc');
        let expected = {
            my_agg: {
                my_type: {
                    field: 'my_field',
                    order: { my_field_a: 'asc' }
                }
            }
        };
        expect(value.toJSON()).toEqual(expected);

        value.order('my_field_b', 'desc');
        expected = {
            my_agg: {
                my_type: {
                    field: 'my_field',
                    order: [{ my_field_a: 'asc' }, { my_field_b: 'desc' }]
                }
            }
        };
        expect(value.toJSON()).toEqual(expected);

        value.order('my_field_c', 'asc');
        expected = {
            my_agg: {
                my_type: {
                    field: 'my_field',
                    order: [
                        { my_field_a: 'asc' },
                        { my_field_b: 'desc' },
                        { my_field_c: 'asc' }
                    ]
                }
            }
        };
        expect(value.toJSON()).toEqual(expected);
    });
});
