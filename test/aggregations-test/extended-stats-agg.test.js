import test from 'ava';
import { ExtendedStatsAggregation } from '../../src';
import {
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = field => new ExtendedStatsAggregation('my_agg', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'extended_stats')
);

test(setsAggType, ExtendedStatsAggregation, 'extended_stats');
test(setsOption, 'sigma', { param: 3 });

test('constructor sets field', t => {
    const valueA = getInstance('my_field').toJSON();
    const valueB = getInstance()
        .field('my_field')
        .toJSON();
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
