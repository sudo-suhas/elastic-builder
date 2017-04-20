import test from 'ava';
import { GeoCentroidAggregation } from '../../src';
import { setsAggType, illegalCall } from '../_macros';

const getInstance = field => new GeoCentroidAggregation('my_agg', field);

test(setsAggType, GeoCentroidAggregation, 'geo_centroid');
test(illegalCall, GeoCentroidAggregation, 'format');

test('constructor sets field', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        my_agg: {
            geo_centroid: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});
