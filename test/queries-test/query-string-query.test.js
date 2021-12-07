import test from 'ava';
import { QueryStringQuery } from '../../src';
import {
    validatedCorrectly,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = queryStr => new QueryStringQuery(queryStr);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameExpectStrategy('query_string')
);

const validRewrites = [
    'constant_score',
    'scoring_boolean',
    'constant_score_boolean',
    'constant_score_filter',
    'top_terms_boost_23',
    'top_terms_15'
];
const validType = [
    'best_fields',
    'most_fields',
    'cross_fields',
    'phrase',
    'phrase_prefix',
    'bool_prefix'
];
test(validatedCorrectly, getInstance, 'type', validType, false);
test(validatedCorrectly, getInstance, 'rewrite', validRewrites, false);
test(validatedCorrectly, getInstance, 'fuzzyRewrite', validRewrites, false);
test(setsOption, 'defaultField', { param: 'my_field' });
test(setsOption, 'allowLeadingWildcard', { param: true });
test(setsOption, 'enablePositionIncrements', { param: true });
test(setsOption, 'fuzzyMaxExpansions', { param: 50 });
test(setsOption, 'fuzziness', { param: 'AUTO' });
test(setsOption, 'fuzzyPrefixLength', { param: 5 });
test(setsOption, 'rewrite', { param: 'constant_score' });
test(setsOption, 'fuzzyRewrite', { param: 'constant_score_boolean' });
test(setsOption, 'phraseSlop', { param: 2 });
test(setsOption, 'autoGeneratePhraseQueries', { param: true });
test(setsOption, 'maxDeterminizedStates', { param: 10500 });
test(setsOption, 'timeZone', { param: '+0530' });
test(setsOption, 'splitOnWhitespace', { param: true });
test(setsOption, 'useDisMax', { param: true });
test(setsOption, 'tieBreaker', { param: 0.3 });
test(setsOption, 'quoteAnalyzer', { param: 'my_analyzer' });
test(setsOption, 'escape', { param: true });
test(setsOption, 'type', { param: 'best_fields' });
