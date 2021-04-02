import test from 'ava';
import { RegexpQuery } from '../../src';
import {
    validatedCorrectly,
    nameFieldExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new RegexpQuery('my_field', 'my-value');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('regexp', { value: 'my-value' })
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
test(setsOption, 'flags', { param: 'PREFIX|PHRASE' });
test(setsOption, 'caseInsensitive', true);
test(setsOption, 'maxDeterminizedStates', { param: 10500 });
test(setsOption, 'rewrite', { param: 'constant_score' });
