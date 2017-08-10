import test from 'ava';
import { TermSuggester } from '../../src';
import {
    validatedCorrectly,
    nameTypeExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const getInstance = () => new TermSuggester('my_suggester');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_suggester', 'term')
);

test(validatedCorrectly, getInstance, 'sort', ['score', 'frequency']);
test(validatedCorrectly, getInstance, 'suggestMode', [
    'missing',
    'popular',
    'always'
]);
test(validatedCorrectly, getInstance, 'stringDistance', [
    'internal',
    'damerau_levenshtein',
    'levenstein',
    'jarowinkler',
    'ngram'
]);

test(setsOption, 'sort', { param: 'score' });
test(setsOption, 'suggestMode', { param: 'always' });
test(setsOption, 'maxEdits', { param: 3 });
test(setsOption, 'prefixLength', { param: 3 });
test(setsOption, 'minWordLength', { param: 5 });
test(setsOption, 'maxInspections', { param: 4 });
test(setsOption, 'minDocFreq', { param: 0.4 });
test(setsOption, 'maxTermFreq', { param: 1 });
test(setsOption, 'stringDistance', { param: 'damerau_levenshtein' });
