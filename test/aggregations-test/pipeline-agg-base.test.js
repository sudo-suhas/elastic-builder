import test from 'ava';
import { PipelineAggregationBase } from '../../src/aggregations/pipeline-aggregations';
import {
    validatedCorrectly,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = bucketsPath =>
    new PipelineAggregationBase('my_agg', 'my_type', '', bucketsPath);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'my_type')
);

test(validatedCorrectly, getInstance, 'gapPolicy', ['skip', 'insert_zeros']);
test(setsOption, 'bucketsPath', { param: 'my_buckets_path' });
test(setsOption, 'gapPolicy', { param: 'insert_zeros' });
test(setsOption, 'format', { param: 'my_format' });

test('constructor sets buckets_path', t => {
    const value = getInstance('my_buckets_path').toJSON();
    const expected = {
        my_agg: {
            my_type: {
                buckets_path: 'my_buckets_path'
            }
        }
    };
    t.deepEqual(value, expected);
});
