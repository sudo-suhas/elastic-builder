import test from 'ava';
import { PipelineAggregationBase } from '../../src/aggregations/pipeline-aggregations';
import { validatedCorrectly, makeAggPropIsSetMacro } from '../_macros';

const getInstance = bucketsPath =>
    new PipelineAggregationBase('my_agg', 'my_type', '', bucketsPath);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'my_type');

test(validatedCorrectly, getInstance, 'gapPolicy', ['skip', 'insert_zeros']);
test(aggPropIsSet, 'bucketsPath', { param: 'my_buckets_path' });
test(aggPropIsSet, 'gapPolicy', { param: 'insert_zeros' });
test(aggPropIsSet, 'format', { param: 'my_format' });

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
