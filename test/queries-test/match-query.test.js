import test from 'ava';
import { MatchQuery } from '../../src';
import { validatedCorrectly, nameFieldExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new MatchQuery('my_field', 'query str');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameFieldExpectStrategy('match', { query: 'query str' })
);

const validRewrites = [
    'constant_score',
    'scoring_boolean',
    'constant_score_boolean',
    'constant_score_filter',
    'top_terms_boost_23',
    'top_terms_15'
];

test(validatedCorrectly, getInstance, 'operator', ['and', 'or']);
test(validatedCorrectly, getInstance, 'zeroTermsQuery', ['all', 'none']);
test(validatedCorrectly, getInstance, 'rewrite', validRewrites, false);
test(validatedCorrectly, getInstance, 'fuzzyRewrite', validRewrites, false);
test(setsOption, 'operator', { param: 'and' });
test(setsOption, 'lenient', { param: true });
test(setsOption, 'fuzziness', { param: 'AUTO' });
test(setsOption, 'prefixLength', { param: 5 });
test(setsOption, 'maxExpansions', { param: 3 });
test(setsOption, 'rewrite', { param: 'constant_score' });
test(setsOption, 'fuzzyRewrite', { param: 'constant_score_boolean' });
test(setsOption, 'fuzzyTranspositions', { param: true });
test(setsOption, 'zeroTermsQuery', { param: 'all' });
test(setsOption, 'cutoffFrequency', { param: 10 });
