import test from 'ava';
import { AnalyzedSuggesterBase } from '../../src/suggesters';
import { nameTypeExpectStrategy, makeSetsOptionMacro } from '../_macros';

const getInstance = (...args) =>
    new AnalyzedSuggesterBase('my_type', 'my_suggester', ...args);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_suggester', 'my_type')
);

test('constructor sets txt', t => {
    const value = getInstance('my_field', 'my-text').toJSON();
    const expected = {
        my_suggester: {
            text: 'my-text',
            my_type: {
                field: 'my_field'
            }
        }
    };
    t.deepEqual(value, expected);
});

test('text can be set', t => {
    const value = getInstance()
        .text('my-text')
        .toJSON();
    const expected = {
        my_suggester: {
            text: 'my-text',
            my_type: {}
        }
    };
    t.deepEqual(value, expected);
});

test(setsOption, 'analyzer', { param: 'snowball' });
test(setsOption, 'shardSize', { param: 10 });
