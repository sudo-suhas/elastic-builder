import test from 'ava';
import { SignificantTextAggregation } from '../../src';
import {
    setsAggType,
    nameTypeExpectStrategy,
    makeSetsOptionMacro,
    illegalCall
} from '../_macros';

const getInstance = (...args) =>
    new SignificantTextAggregation('my_agg', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'significant_text')
);

test(setsAggType, SignificantTextAggregation, 'significant_text');

test('constructor sets field', t => {
    const value = new SignificantTextAggregation('my_agg', 'my_field').toJSON();
    const expected = {
        my_agg: {
            significant_text: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});

test(setsOption, 'filterDuplicateText', { param: true });
test(setsOption, 'sourceFields', {
    param: ['content', 'title'],
    spread: false
});

test(illegalCall, SignificantTextAggregation, 'script', 'my_agg');
test(illegalCall, SignificantTextAggregation, 'missing', 'my_agg');
test(illegalCall, SignificantTextAggregation, 'executionHint', 'my_agg');
