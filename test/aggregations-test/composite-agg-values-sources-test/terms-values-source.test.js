import test from 'ava';
import { Script } from '../../../src';
import {
    TermsValuesSource,
    ValuesSourceBase
} from '../../../src/aggregations/bucket-aggregations/composite-agg-values-sources';
import {
    setsAggType,
    validatedCorrectly,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../../_macros';

const getInstance = field => new TermsValuesSource('my_val_src', field);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_val_src', 'terms')
);

test('base class type cannot be empty', t => {
    const err = t.throws(() => new ValuesSourceBase());
    t.is(err.message, 'ValuesSourceBase `valueSrcType` cannot be empty');
});

test('constructor sets arguments', t => {
    const value = getInstance('my_field').toJSON();
    const expected = {
        my_val_src: {
            terms: { field: 'my_field' }
        }
    };
    t.deepEqual(value, expected);
});

test(setsAggType, TermsValuesSource, 'terms');
test(validatedCorrectly, getInstance, 'order', ['asc', 'desc']);
test(setsOption, 'missing', { param: 42 });
test(setsOption, 'missingBucket', { param: true });
test(setsOption, 'field', { param: 'my_field' });
test(setsOption, 'script', {
    param: new Script()
        .lang('groovy')
        .file('calculate-score')
        .params({ my_modifier: 2 })
});
test(setsOption, 'valueType', { param: 'date' });
