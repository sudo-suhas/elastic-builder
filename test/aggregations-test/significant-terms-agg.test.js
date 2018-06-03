import test from 'ava';
import { SignificantTermsAggregation } from '../../src';
import { illegalCall, setsAggType } from '../_macros';

test(setsAggType, SignificantTermsAggregation, 'significant_terms');

test('constructor sets field', t => {
    const value = new SignificantTermsAggregation(
        'my_agg',
        'my_field'
    ).toJSON();
    const expected = {
        my_agg: {
            significant_terms: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});

test(illegalCall, SignificantTermsAggregation, 'script', 'my_agg');
