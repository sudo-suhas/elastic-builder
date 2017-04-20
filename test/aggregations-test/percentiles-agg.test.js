import test from 'ava';
import { PercentilesAggregation } from '../../src';
import { setsAggType, illegalParamType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = field => new PercentilesAggregation('my_agg', field);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'percentiles');

test(setsAggType, PercentilesAggregation, 'percentiles');
test(illegalParamType, getInstance(), 'percents', 'Array');
test(aggPropIsSet, 'keyed', { param: true });
test(aggPropIsSet, 'percents', { param: [95, 99, 99.9], spread: false });
test(aggPropIsSet, 'keyed', { param: true });
test(aggPropIsSet, 'tdigest', { param: 200, propValue: { compression: 200 } });
test(aggPropIsSet, 'hdr', { param: 3, propValue: { number_of_significant_value_digits: 3 } });

test('compression same as tdigest', t => {
    t.deepEqual(getInstance().tdigest(3).toJSON(), getInstance().compression(3).toJSON());
});

test('constructor sets field', t => {
    const valueA = getInstance('my_field').toJSON();
    const valueB = getInstance().field('my_field').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            percentiles: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(valueA, expected);
});
