import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { FiltersAggregation, termQuery } from '../../src';

const getInstance = (...args) =>
    new FiltersAggregation('my_filters_agg', ...args);

const filterQryA = termQuery('user', 'kimchy');
const filterQryB = termQuery('company', 'elastic');

describe('FiltersAggregation', () => {
    test('sets type as filters', () => {
        const value = new FiltersAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { filters: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new FiltersAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in FiltersAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new FiltersAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in FiltersAggregation')
        );
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('filter()', () => {
                expect(() => getInstance().filter(value)).toThrow(
                    new TypeError('Argument must be an instance of Query')
                );
            });
        });
    });

    describe('options', () => {
        test('sets otherBucket', () => {
            const value = getInstance().otherBucket(true).toJSON();
            expect(value).toEqual({
                my_filters_agg: {
                    filters: {
                        other_bucket: true
                    }
                }
            });
        });

        test('sets otherBucketKey', () => {
            const value = getInstance()
                .otherBucketKey('other_messages')
                .toJSON();
            expect(value).toEqual({
                my_filters_agg: {
                    filters: {
                        other_bucket_key: 'other_messages'
                    }
                }
            });
        });
    });

    describe('filter methods', () => {
        test('named filters are set', () => {
            let value = getInstance()
                .filter('user_kimchy', filterQryA)
                .filter('company_elastic', filterQryB)
                .toJSON();
            const expected = {
                my_filters_agg: {
                    filters: {
                        filters: {
                            user_kimchy: { term: { user: 'kimchy' } },
                            company_elastic: { term: { company: 'elastic' } }
                        }
                    }
                }
            };
            expect(value).toEqual(expected);

            value = getInstance()
                .filters({
                    user_kimchy: filterQryA,
                    company_elastic: filterQryB
                })
                .toJSON();
            expect(value).toEqual(expected);
        });

        test('anonymous filters are set', () => {
            let value = getInstance()
                .anonymousFilter(filterQryA)
                .anonymousFilter(filterQryB)
                .toJSON();
            const expected = {
                my_filters_agg: {
                    filters: {
                        filters: [
                            { term: { user: 'kimchy' } },
                            { term: { company: 'elastic' } }
                        ]
                    }
                }
            };
            expect(value).toEqual(expected);

            value = getInstance()
                .anonymousFilters([filterQryA, filterQryB])
                .toJSON();
            expect(value).toEqual(expected);
        });

        test('mixed representation', () => {
            let value = getInstance()
                .filter('user_kimchy', filterQryA)
                .anonymousFilter(filterQryB)
                .toJSON();
            let expected = {
                my_filters_agg: {
                    filters: {
                        filters: [{ term: { company: 'elastic' } }]
                    }
                }
            };
            expect(value).toEqual(expected);

            value = getInstance()
                .anonymousFilter(filterQryA)
                .filter('company_elastic', filterQryB)
                .toJSON();
            expected = {
                my_filters_agg: {
                    filters: {
                        filters: {
                            company_elastic: { term: { company: 'elastic' } }
                        }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('other bucket key is set', () => {
            const value = getInstance()
                .otherBucket(true, 'other_messages')
                .toJSON();
            const expected = {
                my_filters_agg: {
                    filters: {
                        other_bucket: true,
                        other_bucket_key: 'other_messages'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('mixed representation logs warning', () => {
        let spy;

        beforeEach(() => {
            spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        });

        afterEach(() => {
            spy.mockRestore();
        });

        test('logs warning for mixed representation', () => {
            getInstance()
                .filter('user_kimchy', filterQryA)
                .anonymousFilter(filterQryB)
                .toJSON();

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(
                1,
                '[FiltersAggregation] Do not mix named and anonymous filters!'
            );
            expect(spy).toHaveBeenNthCalledWith(
                2,
                '[FiltersAggregation] Overwriting named filters.'
            );
        });
    });
});
