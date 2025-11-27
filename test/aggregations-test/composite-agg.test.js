import { describe, test, expect } from 'vitest';
import { CompositeAggregation } from '../../src';
import {
    DateHistogramValuesSource,
    TermsValuesSource
} from '../../src/aggregations/bucket-aggregations/composite-agg-values-sources';

const getInstance = () => new CompositeAggregation('my_cmpt_agg');

describe('CompositeAggregation', () => {
    test('sets type as composite', () => {
        const value = new CompositeAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: {
                composite: {
                    sources: []
                }
            }
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
            test('sources()', () => {
                expect(() => getInstance().sources(value)).toThrow(
                    new TypeError(
                        'Argument must be an instance of ValuesSourceBase'
                    )
                );
            });
        });
    });

    describe('options', () => {
        test('sets sources', () => {
            const dateHistoValSrc = new DateHistogramValuesSource(
                'date',
                'timestamp',
                '1d'
            );
            const termsValSrc = new TermsValuesSource('product', 'product');

            const value = getInstance()
                .sources(dateHistoValSrc, termsValSrc)
                .toJSON();
            const expected = {
                my_cmpt_agg: {
                    composite: {
                        sources: [
                            dateHistoValSrc.toJSON(),
                            termsValSrc.toJSON()
                        ]
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets size', () => {
            const value = getInstance().size(2).toJSON();
            expect(value).toEqual({
                my_cmpt_agg: {
                    composite: {
                        sources: [],
                        size: 2
                    }
                }
            });
        });

        test('sets after', () => {
            const value = getInstance()
                .after({ date: 1494288000000, product: 'mad max' })
                .toJSON();
            expect(value).toEqual({
                my_cmpt_agg: {
                    composite: {
                        sources: [],
                        after: { date: 1494288000000, product: 'mad max' }
                    }
                }
            });
        });
    });
});
