import test from 'ava';
import { PrefixQuery } from '../../src';
import { validatedCorrectly, nameFieldExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new PrefixQuery('my_field', 'my-value');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('prefix', { value: 'my-value' })
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
