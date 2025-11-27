import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { CommonTermsQuery } from '../../src';

const getInstance = () => new CommonTermsQuery('my_field', 'query str');

describe('CommonTermsQuery', () => {
    describe('lowFreqOperator() validation', () => {
        test.each([
            { name: 'accepts valid value: and', value: 'and' },
            {
                name: 'accepts valid value: AND (case-insensitive)',
                value: 'AND'
            },
            { name: 'accepts valid value: or', value: 'or' },
            { name: 'accepts valid value: OR (case-insensitive)', value: 'OR' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().lowFreqOperator(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_low_freq_operator'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().lowFreqOperator(value)).toThrow(
                new Error(
                    "The 'low_freq_operator' parameter should be one of 'and' or 'or'"
                )
            );
        });
    });

    describe('highFreqOperator() validation', () => {
        test.each([
            { name: 'accepts valid value: and', value: 'and' },
            {
                name: 'accepts valid value: AND (case-insensitive)',
                value: 'AND'
            },
            { name: 'accepts valid value: or', value: 'or' },
            { name: 'accepts valid value: OR (case-insensitive)', value: 'OR' }
        ])('$name', ({ value }) => {
            expect(() => getInstance().highFreqOperator(value)).not.toThrow();
        });

        test.each([
            { name: 'throws for null value', value: null },
            {
                name: 'throws for invalid value',
                value: 'invalid_high_freq_operator'
            }
        ])('$name', ({ value }) => {
            expect(() => getInstance().highFreqOperator(value)).toThrow(
                new Error(
                    "The 'high_freq_operator' parameter should be one of 'and' or 'or'"
                )
            );
        });
    });

    describe('options', () => {
        test('sets cutoff_frequency option', () => {
            const result = getInstance().cutoffFrequency(10).toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        cutoff_frequency: 10
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets low_freq_operator option', () => {
            const result = getInstance().lowFreqOperator('and').toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        low_freq_operator: 'and'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets high_freq_operator option', () => {
            const result = getInstance().highFreqOperator('and').toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        high_freq_operator: 'and'
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets low_freq via minimum_should_match', () => {
            const result = getInstance().lowFreq('30%').toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        minimum_should_match: { low_freq: '30%' }
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets high_freq via minimum_should_match', () => {
            const result = getInstance().highFreq('30%').toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        minimum_should_match: { high_freq: '30%' }
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets disable_coord option', () => {
            const result = getInstance().disableCoord(true).toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        disable_coord: true
                    }
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = getInstance().toJSON();
            const valueB = new CommonTermsQuery()
                .field('my_field')
                .query('query str')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                common: {
                    my_field: 'query str'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });

    describe('mixed representation', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('mixed minimum_should_match repr', () => {
            const value = getInstance()
                .minimumShouldMatch('30%')
                .lowFreq('50%')
                .highFreq('10%')
                .toJSON();
            const expected = {
                common: {
                    my_field: {
                        query: 'query str',
                        minimum_should_match: {
                            low_freq: '50%',
                            high_freq: '10%'
                        }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('mixed representation logs warning', () => {
            getInstance()
                .minimumShouldMatch('30%')
                .lowFreq('50%')
                .highFreq('10%')
                .toJSON();

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[CommonTermsQuery] Do not mix with other representation!'
            );
            expect(spy).toHaveBeenNthCalledWith(
                2,
                '[CommonTermsQuery] Overwriting.'
            );
        });
    });
});
