import test from 'ava';
import { GeoBoundsAggregation } from '../../src';
import { setsAggType, illegalCall, makeAggPropIsSetMacro } from '../_macros';

const getInstance = field => new GeoBoundsAggregation('my_agg', field);

const aggPropIsSet = makeAggPropIsSetMacro(getInstance, 'my_agg', 'geo_bounds');

test(setsAggType, GeoBoundsAggregation, 'geo_bounds');
test(illegalCall, GeoBoundsAggregation, 'format');
test(illegalCall, GeoBoundsAggregation, 'script');
test(aggPropIsSet, 'wrapLongitude', { param: 'true' });

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        my_agg: {
            geo_bounds: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
