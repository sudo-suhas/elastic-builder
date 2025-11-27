import { describe, test, expect } from 'vitest';
import { BucketSortAggregation, Sort } from '../../src';

const getInstance = () => new BucketSortAggregation('my_agg');

describe('BucketSortAggregation', () => {
    test('sets type as bucket_sort', () => {
        const value = new BucketSortAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { bucket_sort: {} }
        });
    });

    describe('constructor', () => {
        test('can be instantiated', () => {
            const value = getInstance().toJSON();
            const expected = {
                my_agg: {
                    bucket_sort: {}
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sort from and size are set', () => {
            const value = getInstance()
                .sort([new Sort('myField', 'desc')])
                .from(5)
                .size(10)
                .toJSON();

            const expected = {
                my_agg: {
                    bucket_sort: {
                        sort: [
                            {
                                myField: 'desc'
                            }
                        ],
                        from: 5,
                        size: 10
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
