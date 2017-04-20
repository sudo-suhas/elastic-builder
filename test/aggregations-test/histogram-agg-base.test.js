import test from 'ava';
import { HistogramAggregationBase } from '../../src/aggregations/bucket-aggregations';
import { makeAggPropIsSetMacro } from '../_macros';

const getInstance = (...args) => new HistogramAggregationBase('my_agg', 'my_type', ...args);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'my_type');

test(aggPropIsSet, 'interval', { param: 'year' });
test(aggPropIsSet, 'format', { param: '####.00' });
test(aggPropIsSet, 'offset', { param: 10 });
test(aggPropIsSet, 'minDocCount', { param: 1 });
test(aggPropIsSet, 'missing', { param: 0 });
test(aggPropIsSet, 'keyed', { param: true });
test(aggPropIsSet, 'extendedBounds', { param: [0, 500], propValue: { min: 0, max: 500 } });
test(aggPropIsSet, 'order', { param: 'my_field', propValue: { my_field: 'desc' } });
test(aggPropIsSet, 'order', { param: ['my_field', 'asc'], propValue: { my_field: 'asc' } });

test('constructor sets arguments', t => {
    const value = getInstance('my_field', 10).toJSON();
    const expected = {
        my_agg: {
            my_type: {
                field: 'my_field',
                interval: 10
            }
        }
    };
    t.deepEqual(value, expected);
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
