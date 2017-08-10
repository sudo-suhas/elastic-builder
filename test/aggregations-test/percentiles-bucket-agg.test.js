import test from 'ava';
import { PercentilesBucketAggregation } from '../../src';
import {
    setsAggType,
    illegalParamType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = bucketsPath =>
    new PercentilesBucketAggregation('my_agg', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'percentiles_bucket')
);

test(setsAggType, PercentilesBucketAggregation, 'percentiles_bucket');
test(illegalParamType, getInstance(), 'percents', 'Array');
test(setsOption, 'percents', { param: [25.0, 50.0, 75.0], spread: false });

test('constructor sets buckets_path', t => {
    const value = getInstance('my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            percentiles_bucket: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
