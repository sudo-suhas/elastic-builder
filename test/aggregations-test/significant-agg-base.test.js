import { describe, test, expect } from 'vitest';
import { TermQuery, Script } from '../../src';
import { SignificantAggregationBase } from '../../src/aggregations/bucket-aggregations';

const getInstance = (...args) =>
    new SignificantAggregationBase('my_agg', 'my_type', '', ...args);

const script = new Script()
    .lang('groovy')
    .file('calculate-score')
    .params({ my_modifier: 2 });

describe('SignificantAggregationBase', () => {
    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('scriptHeuristic()', () => {
                expect(() => getInstance().scriptHeuristic(value)).toThrow(
                    new TypeError('Argument must be an instance of Script')
                );
            });

            test('backgroundFilter()', () => {
                expect(() => getInstance().backgroundFilter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('options', () => {
        test('sets jlh', () => {
            const value = getInstance().jlh().toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        jlh: {}
                    }
                }
            });
        });

        test('sets mutualInformation', () => {
            const value = getInstance().mutualInformation().toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        mutual_information: {
                            include_negatives: true,
                            background_is_superset: true
                        }
                    }
                }
            });
        });

        test('sets mutualInformation with parameters', () => {
            const value = getInstance().mutualInformation(true, false).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        mutual_information: {
                            include_negatives: true,
                            background_is_superset: false
                        }
                    }
                }
            });
        });

        test('sets chiSquare', () => {
            const value = getInstance().chiSquare().toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        chi_square: {
                            include_negatives: true,
                            background_is_superset: true
                        }
                    }
                }
            });
        });

        test('sets chiSquare with parameters', () => {
            const value = getInstance().chiSquare(true, false).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        chi_square: {
                            include_negatives: true,
                            background_is_superset: false
                        }
                    }
                }
            });
        });

        test('sets gnd', () => {
            const value = getInstance().gnd().toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        gnd: { background_is_superset: true }
                    }
                }
            });
        });

        test('sets gnd with parameter', () => {
            const value = getInstance().gnd(false).toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        gnd: { background_is_superset: false }
                    }
                }
            });
        });

        test('sets percentage', () => {
            const value = getInstance().percentage().toJSON();
            expect(value).toEqual({
                my_agg: {
                    my_type: {
                        percentage: {}
                    }
                }
            });
        });

        test('sets scriptHeuristic', () => {
            const value = getInstance().scriptHeuristic(script).toJSON();
            const expected = {
                my_agg: {
                    my_type: {
                        script_heuristic: { script: script.toJSON() }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets backgroundFilter', () => {
            const termQuery = new TermQuery('user', 'kimchy');
            const value = getInstance().backgroundFilter(termQuery).toJSON();
            const expected = {
                my_agg: {
                    my_type: {
                        background_filter: termQuery.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    test('script cannot be set', () => {
        expect(() =>
            new SignificantAggregationBase('my_agg', 'my_type').script()
        ).toThrow(
            new Error('script is not supported in SignificantAggregationBase')
        );
    });
});
