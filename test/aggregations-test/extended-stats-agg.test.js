import test from 'ava';
import { ExtendedStatsAggregation } from '../../src';
import { setsAggType, makeAggPropIsSetMacro } from '../_macros';

const getInstance = field => new ExtendedStatsAggregation('my_agg', field);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'extended_stats');

test(setsAggType, ExtendedStatsAggregation, 'extended_stats');
test(aggPropIsSet, 'sigma', { param: 3 });

test('constructor sets field', t => {
    const valueA = getInstance('my_field').toJSON();
    const valueB = getInstance().field('my_field').toJSON();
    t.deepEqual(valueA, valueB);

    const expected = {
        my_agg: {
            extended_stats: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(valueA, expected);
});
