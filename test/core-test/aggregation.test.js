import { describe, test, expect } from 'vitest';
import { Aggregation } from '../../src/core';
import {
    TermsAggregation,
    FilterAggregation,
    StatsAggregation,
    TermQuery
} from '../../src';

const getInstance = () => new Aggregation('my_agg', 'my_type');

describe('Aggregation', () => {
    describe('constructor', () => {
        test('can be instantiated', () => {
            const value = getInstance().toJSON();
            const expected = {
                my_agg: {
                    my_type: {}
                }
            };
            expect(value).toEqual(expected);
        });

        test('name cannot be empty', () => {
            expect(() => new Aggregation(null, 'my_agg').toJSON()).toThrow(
                new Error('Aggregation name could not be determined')
            );
        });

        test('aggType cannot be empty', () => {
            expect(() => new Aggregation('my_agg')).toThrow(
                new Error('Aggregation `aggType` cannot be empty')
            );
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
            test('aggregation()', () => {
                expect(() => getInstance().aggregation(value)).toThrow(
                    new TypeError('Argument must be an instance of Aggregation')
                );
            });

            test('agg()', () => {
                expect(() => getInstance().agg(value)).toThrow(
                    new TypeError('Argument must be an instance of Aggregation')
                );
            });
        });
    });

    describe('options', () => {
        test('sets name', () => {
            const value = new Aggregation(null, 'my_type')
                .name('my_agg')
                .toJSON();
            const expected = {
                my_agg: {
                    my_type: {}
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets meta', () => {
            const value = getInstance().meta({ color: 'blue' }).toJSON();
            const expected = {
                my_agg: {
                    my_type: {},
                    meta: { color: 'blue' }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe.each([
        {
            name: 'nested aggs',
            input: new TermsAggregation('users', 'user'),
            expected: {
                my_agg: {
                    my_type: {},
                    aggs: {
                        users: { terms: { field: 'user' } }
                    }
                }
            }
        },
        {
            name: 'deep nested aggs',
            input: new TermsAggregation('countries', 'artist.country')
                .order('rock>playback_stats.avg', 'desc')
                .agg(
                    new FilterAggregation(
                        'rock',
                        new TermQuery('genre', 'rock')
                    ).agg(new StatsAggregation('playback_stats', 'play_count'))
                ),
            expected: {
                my_agg: {
                    my_type: {},
                    aggs: {
                        countries: {
                            terms: {
                                field: 'artist.country',
                                order: { 'rock>playback_stats.avg': 'desc' }
                            },
                            aggs: {
                                rock: {
                                    filter: { term: { genre: 'rock' } },
                                    aggs: {
                                        playback_stats: {
                                            stats: { field: 'play_count' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ])('$name', ({ input, expected }) => {
        test('aggregation()', () => {
            const value = getInstance().aggregation(input).toJSON();
            expect(value).toEqual(expected);
        });

        test('agg()', () => {
            const value = getInstance().agg(input).toJSON();
            expect(value).toEqual(expected);
        });
    });

    describe('multiple nested aggs', () => {
        const input = [
            new TermsAggregation('countries', 'country'),
            new TermsAggregation('users', 'user')
        ];
        const expected = {
            my_agg: {
                my_type: {},
                aggs: {
                    countries: { terms: { field: 'country' } },
                    users: { terms: { field: 'user' } }
                }
            }
        };

        test('aggregations()', () => {
            const value = getInstance().aggregations(input).toJSON();
            expect(value).toEqual(expected);
        });

        test('aggs()', () => {
            const value = getInstance().aggs(input).toJSON();
            expect(value).toEqual(expected);
        });
    });

    describe('toJSON', () => {
        test('getDSL gets DSL', () => {
            const value = new TermsAggregation('countries', 'artist.country')
                .order('rock>playback_stats.avg', 'desc')
                .agg(
                    new FilterAggregation(
                        'rock',
                        new TermQuery('genre', 'rock')
                    ).agg(new StatsAggregation('playback_stats', 'play_count'))
                );
            expect(value.toJSON()).toEqual(value.getDSL());
        });
    });
});
