import test from 'ava';
import { BucketSortAggregation, Sort } from '../../src';
import { setsAggType } from '../_macros';

const getInstance = () => new BucketSortAggregation('my_agg');

test(setsAggType, BucketSortAggregation, 'bucket_sort');

test('can be instantiated', t => {
    const value = getInstance().toJSON();
    const expected = {
        my_agg: {
            bucket_sort: {}
        }
    };
    t.deepEqual(value, expected);
});

test('sort from and size are set', t => {
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
    t.deepEqual(value, expected);
});
