import test from 'ava';
import { MoreLikeThisQuery, moreLikeThisQuery } from '../../src';
import {
    illegalParamType,
    nameExpectStrategy,
    makeSetsOptionMacro
} from '../_macros';

const setsOption = makeSetsOptionMacro(
    moreLikeThisQuery,
    nameExpectStrategy('more_like_this')
);

const doc1 = { _index: 'imdb', _type: 'movies', _id: '1' };
const doc2 = { _index: 'imdb', _type: 'movies', _id: '2' };
const doc3 = 'and potentially some more text here as well';

/**
 * Macro for testing sets `like`/`unlike`
 *
 * @param {*} t
 * @param {string} clause
 */
function setsClause(t, clause) {
    let value = new MoreLikeThisQuery()[clause](doc3).toJSON();
    let expected = {
        more_like_this: {
            [clause]: doc3
        }
    };
    t.deepEqual(value, expected);

    value = new MoreLikeThisQuery()[clause](doc1).toJSON();
    expected = {
        more_like_this: {
            [clause]: doc1
        }
    };
    t.deepEqual(value, expected);

    value = new MoreLikeThisQuery()
        [clause](doc1)
        [clause](doc2)
        [clause](doc3)
        .toJSON();
    expected = {
        more_like_this: {
            [clause]: [doc1, doc2, doc3]
        }
    };
    t.deepEqual(value, expected);

    value = new MoreLikeThisQuery()[clause]([doc1, doc2, doc3]).toJSON();
    expected = {
        more_like_this: {
            [clause]: [doc1, doc2, doc3]
        }
    };
    t.deepEqual(value, expected);

    value = new MoreLikeThisQuery()
        [clause](doc1)
        [clause]([doc1, doc2, doc3])
        .toJSON();
    expected = {
        more_like_this: {
            [clause]: [doc1, doc2, doc3]
        }
    };
    t.deepEqual(value, expected);
}

const instance = new MoreLikeThisQuery();

test(illegalParamType, instance, 'fields', 'Array');
test(illegalParamType, instance, 'ids', 'Array');
test(illegalParamType, instance, 'docs', 'Array');
test(setsOption, 'fields', { param: ['title', 'description'], spread: false });
test(setsOption, 'like', { param: doc1 });
test('sets like(arr) option', setsOption, 'like', {
    param: [doc1, doc2, doc3],
    spread: false
});
test(setsOption, 'unlike', { param: doc1 });
test('sets unlike(arr) option', setsOption, 'unlike', {
    param: [doc1, doc2, doc3],
    spread: false
});
test(setsOption, 'likeText', { param: 'my text' });
test(setsOption, 'ids', { param: ['1', '2'], spread: false });
test(setsOption, 'docs', {
    param: [{ _type: 'type', _id: '1' }, { _type: 'type', _id: '2' }],
    spread: false
});
test(setsOption, 'maxQueryTerms', { param: 12 });
test(setsOption, 'minTermFreq', { param: 1 });
test(setsOption, 'minDocFreq', { param: 6 });
test(setsOption, 'maxDocFreq', { param: 30 });
test(setsOption, 'minWordLength', { param: 3 });
test(setsOption, 'maxWordLength', { param: 20 });
test(setsOption, 'stopWords', { param: ['the', 'a', 'trump'], spread: false });
test(setsOption, 'analyzer', { param: 'snowball' });
test(setsOption, 'minimumShouldMatch', { param: '30%' });
test(setsOption, 'boostTerms', { param: 1.4 });
test(setsOption, 'include', { param: true });
test(setsClause, 'like');
test(setsClause, 'unlike');
