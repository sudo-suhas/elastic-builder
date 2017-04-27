import test from 'ava';
import { GeoBoundsAggregation } from '../../src';
import { setsAggType, illegalCall, aggsExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = field => new GeoBoundsAggregation('my_agg', field);

const setsOption = makeSetsOptionMacro(getInstance, aggsExpectStrategy('my_agg', 'geo_bounds'));

test(setsAggType, GeoBoundsAggregation, 'geo_bounds');
test(illegalCall, GeoBoundsAggregation, 'format', 'my_agg');
test(illegalCall, GeoBoundsAggregation, 'script', 'my_agg');
test(setsOption, 'wrapLongitude', { param: 'true' });

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
