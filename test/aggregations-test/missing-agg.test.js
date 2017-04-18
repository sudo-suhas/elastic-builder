import test from 'ava';
import { MissingAggregation } from '../../src';
import { setsAggType, illegalCall } from '../_macros';

test(setsAggType, MissingAggregation, 'missing');
test(illegalCall, MissingAggregation, 'script');

test('constructor sets arguments', t => {
    const myAgg = new MissingAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            missing: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(myAgg, expected);
});
