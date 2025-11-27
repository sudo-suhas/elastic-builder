import { describe, test, expect } from 'vitest';
import { TermsAggregation } from '../../src';

const getInstance = field => new TermsAggregation('my_agg', field);

describe('TermsAggregation', () => {
    test('sets type as terms', () => {
        const value = new TermsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { terms: {} }
        });
    });

    describe('constructor', () => {
        test('tries to construct agg name if not given', () => {
            const value = new TermsAggregation(null, 'myfield').toJSON();
            const expected = {
                agg_terms_myfield: {
                    terms: {
                        field: 'myfield'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('collectMode() validation', () => {
        test.each([
            { name: 'accepts valid value: depth_first', value: 'depth_first' },
            {
                name: 'accepts valid value: DEPTH_FIRST (case-insensitive)',
                value: 'DEPTH_FIRST'
            },
            {
                name: 'accepts valid value: breadth_first',
                value: 'breadth_first'
            },
            {
                name: 'accepts valid value: BREADTH_FIRST (case-insensitive)',
                value: 'BREADTH_FIRST'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().collectMode(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            { name: 'throws for invalid value', value: 'invalid_collect_mode' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().collectMode(value)).toThrow(
                new Error(
                    "The 'mode' parameter should be one of 'breadth_first' or 'depth_first'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets showTermDocCountError', () => {
            const value = getInstance().showTermDocCountError(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    terms: {
                        show_term_doc_count_error: true
                    }
                }
            });
        });

        test('sets collectMode', () => {
            const value = getInstance().collectMode('breadth_first').toJSON();
            expect(value).toEqual({
                my_agg: {
                    terms: {
                        collect_mode: 'breadth_first'
                    }
                }
            });
        });

        test('sets order with field name', () => {
            const value = getInstance().order('my_field').toJSON();
            expect(value).toEqual({
                my_agg: {
                    terms: {
                        order: { my_field: 'desc' }
                    }
                }
            });
        });

        test('sets order with field name and direction', () => {
            const value = getInstance().order('my_field', 'asc').toJSON();
            expect(value).toEqual({
                my_agg: {
                    terms: {
                        order: { my_field: 'asc' }
                    }
                }
            });
        });

        test('include partition is set', () => {
            const value = getInstance('my_field')
                .includePartition(0, 20)
                .toJSON();
            const expected = {
                my_agg: {
                    terms: {
                        field: 'my_field',
                        include: { partition: 0, num_partitions: 20 }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('multiple order criteria can be set', () => {
            const value = getInstance('my_field').order('my_field_a', 'asc');
            let expected = {
                my_agg: {
                    terms: {
                        field: 'my_field',
                        order: { my_field_a: 'asc' }
                    }
                }
            };
            expect(value.toJSON()).toEqual(expected);

            value.order('my_field_b', 'desc');
            expected = {
                my_agg: {
                    terms: {
                        field: 'my_field',
                        order: [{ my_field_a: 'asc' }, { my_field_b: 'desc' }]
                    }
                }
            };
            expect(value.toJSON()).toEqual(expected);

            value.order('my_field_c', 'asc');
            expected = {
                my_agg: {
                    terms: {
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

    describe('order direction validation', () => {
        test.each([
            {
                name: 'accepts order with field only',
                value: 'my_field',
                direction: undefined
            },
            {
                name: 'accepts order with asc',
                value: 'my_field',
                direction: 'asc'
            },
            {
                name: 'accepts order with ASC',
                value: 'my_field',
                direction: 'ASC'
            },
            {
                name: 'accepts order with desc',
                value: 'my_field',
                direction: 'desc'
            },
            {
                name: 'accepts order with DESC',
                value: 'my_field',
                direction: 'DESC'
            }
        ])('$name', ({ value, direction }) => {
            expect(() => getInstance().order(value, direction)).not.toThrow();
        });

        test.each([
            {
                name: 'throws for invalid direction',
                direction: 'invalid_direction'
            },
            { name: 'throws for null direction', direction: null }
        ])('$name', ({ direction }) => {
            expect(() => getInstance().order('my_field', direction)).toThrow(
                new Error(
                    "The 'direction' parameter should be one of 'asc' or 'desc'"
                )
            );
        });
    });
});
