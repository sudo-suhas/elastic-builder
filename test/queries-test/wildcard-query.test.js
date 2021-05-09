import test from 'ava';
import { WildcardQuery } from '../../src';
import {
    validatedCorrectly,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new WildcardQuery('my_field', 'my-value');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('wildcard', { value: 'my-value' })
);

const validRewrites = [
    'constant_score',
    'scoring_boolean',
    'constant_score_boolean',
    'constant_score_filter',
    'top_terms_boost_23',
    'top_terms_15'
];

test(validatedCorrectly, getInstance, 'rewrite', validRewrites, false);
test(setsOption, 'rewrite', { param: 'constant_score' });
test(setsOption, 'caseInsensitive', true);
