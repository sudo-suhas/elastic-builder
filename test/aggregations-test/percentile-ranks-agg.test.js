import test from 'ava';
import { PercentileRanksAggregation } from '../../src';
import {
    setsAggType,
    illegalCall,
    illegalParamType,
    aggsExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = (field, values) => new PercentileRanksAggregation('my_agg', field, values);

const setsOption = makeSetsOptionMacro(
    getInstance,
    aggsExpectStrategy('my_agg', 'percentile_ranks')
);

test(setsAggType, PercentileRanksAggregation, 'percentile_ranks');
test(illegalCall, PercentileRanksAggregation, 'format');
test(illegalParamType, getInstance(), 'values', 'Array');
test(setsOption, 'keyed', { param: true });
test(setsOption, 'values', { param: [15, 30], spread: false });
test(setsOption, 'keyed', { param: true });
test(setsOption, 'tdigest', { param: 200, propValue: { compression: 200 } });
test(setsOption, 'hdr', { param: 3, propValue: { number_of_significant_value_digits: 3 } });

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
