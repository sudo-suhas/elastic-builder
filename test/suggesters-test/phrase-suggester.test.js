import test from 'ava';
import { PhraseSuggester, DirectGenerator } from '../../src';
import { validatedCorrectly, nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = () => new PhraseSuggester('my_suggester');

const dirGenA = new DirectGenerator('title.trigram').suggestMode('always');
const dirGenB = new DirectGenerator('title.reverse')
    .suggestMode('always')
    .preFilter('reverse')
    .postFilter('reverse');

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_suggester', 'phrase')
);

test(validatedCorrectly, getInstance, 'smoothing', [
    'stupid_backoff',
    'laplace',
    'linear_interpolation'
]);

test(setsOption, 'gramSize', { param: 1 });
test(setsOption, 'realWordErrorLikelihood', { param: 0.9 });
test(setsOption, 'confidence', { param: 0 });
test(setsOption, 'maxErrors', { param: 10 });
test(setsOption, 'separator', { param: '|' });
test(setsOption, 'highlight', {
    param: ['<em>', '</em>'],
    propValue: {
        pre_tag: '<em>',
        post_tag: '</em>'
    }
});
test(setsOption, 'collate', {
    param: {
        query: {
            inline: {
                match: { '{{field_name}}': '{{suggestion}}' }
            }
        },
        params: { field_name: 'title' },
        prune: true
    }
});
test(setsOption, 'smoothing', { param: 'stupid_backoff' });

test(setsOption, 'directGenerator', { param: dirGenA, propValue: [dirGenA] });
test(setsOption, 'directGenerator', {
    param: [dirGenA, dirGenB],
    spread: false,
    propValue: [dirGenA, dirGenB]
});
