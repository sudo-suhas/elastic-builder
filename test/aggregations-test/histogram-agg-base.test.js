import test from 'ava';
import { HistogramAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new HistogramAggregationBase('my_agg', 'my_type', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'my_type');

test(aggPropIsSet, 'interval', 'year');
test(aggPropIsSet, 'format', '####.00');
test(aggPropIsSet, 'offset', 10);
test(aggPropIsSet, 'minDocCount', 1);
test(aggPropIsSet, 'missing', 0);
test(aggPropIsSet, 'keyed', true);
test(aggPropIsSet, 'extendedBounds', [0, 500], { min: 0, max: 500 });
test(aggPropIsSet, 'order', 'my_field', { my_field: 'desc' });
test(aggPropIsSet, 'order', ['my_field', 'asc'], { my_field: 'asc' });

test('constructor sets arguments', t => {
    const myAgg = getInstance('my_field', 10).toJSON();
    const expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                interval: 10
            }
        }
    };
    t.deepEqual(myAgg, expected);
});

test('order direction is validated', t => {
    t.notThrows(() => getInstance().order('my_field'));
    t.notThrows(() => getInstance().order('my_field', 'asc'));
    t.notThrows(() => getInstance().order('my_field', 'ASC'));
    t.notThrows(() => getInstance().order('my_field', 'desc'));
    t.notThrows(() => getInstance().order('my_field', 'DESC'));

    let err = t.throws(() => getInstance().order('my_field', 'invalid_direction'), Error);
    t.is(err.message, "The 'direction' parameter should be one of 'asc' or 'desc'");

    err = t.throws(() => getInstance().order('my_field', null), Error);
    t.is(err.message, "The 'direction' parameter should be one of 'asc' or 'desc'");
});
