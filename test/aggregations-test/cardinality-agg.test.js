import test from 'ava';
import { CardinalityAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = field => new CardinalityAggregation('my_agg', field);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'cardinality');

test(setsAggType, CardinalityAggregation, 'cardinality');
test(illegalCall, CardinalityAggregation, 'format');
test(aggPropIsSet, 'precisionThreshold', { param: 5000 });

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        my_agg: {
            cardinality: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
