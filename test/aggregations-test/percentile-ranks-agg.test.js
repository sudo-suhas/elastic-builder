import test from 'ava';
import { PercentileRanksAggregation } from '../../src';
import { setsAggType, illegalCall, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = (field, values) => new PercentileRanksAggregation('my_agg', field, values);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'percentile_ranks');

test(setsAggType, PercentileRanksAggregation, 'percentile_ranks');
test(illegalCall, PercentileRanksAggregation, 'format');
test(illegalParamType, getInstance(), 'values', 'Array');
test(aggPropIsSet, 'keyed', { param: true });
test(aggPropIsSet, 'values', { param: [15, 30], spread: false });
test(aggPropIsSet, 'keyed', { param: true });
test(aggPropIsSet, 'tdigest', { param: 200, propValue: { compression: 200 } });
test(aggPropIsSet, 'hdr', { param: 3, propValue: { number_of_significant_value_digits: 3 } });

test('compression same as tdigest', t => {
    t.deepEqual(getInstance().tdigest(3).toJSON(), getInstance().compression(3).toJSON());
});

test('constructor sets arguments', t => {
    const valueA = getInstance('my_field', [15, 30]).toJSON();
    const valueB = getInstance().field('my_field').values([15, 30]).toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            percentile_ranks: {
                field: 'my_field',
                values: [15, 30]
            }
        }
    };
    t.deepEqual(valueA, expected);
});
