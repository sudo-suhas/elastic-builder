import test from 'ava';
import { StatsAggregation } from '../../src';
import { setsAggType } from '../_macros';

test(setsAggType, StatsAggregation, 'stats');

test('constructor sets field', t => {
    const value = new StatsAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            stats: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
