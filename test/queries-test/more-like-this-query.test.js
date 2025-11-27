import { describe, test, expect } from 'vitest';
import { MoreLikeThisQuery, moreLikeThisQuery } from '../../src';

const doc1 = { _index: 'imdb', _type: 'movies', _id: '1' };
const doc2 = { _index: 'imdb', _type: 'movies', _id: '2' };
const doc3 = 'and potentially some more text here as well';

describe('MoreLikeThisQuery', () => {
    describe('parameter type validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('fields()', () => {
                expect(() => new MoreLikeThisQuery().fields(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });

            test('ids()', () => {
                expect(() => new MoreLikeThisQuery().ids(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });

            test('docs()', () => {
                expect(() => new MoreLikeThisQuery().docs(value)).toThrow(
                    new TypeError('Argument must be an instance of Array')
                );
            });
        });
    });

    describe('options', () => {
        test('sets fields option', () => {
            const result = moreLikeThisQuery()
                .fields(['title', 'description'])
                .toJSON();
            const expected = {
                more_like_this: {
                    fields: ['title', 'description']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets like option', () => {
            const result = moreLikeThisQuery().like(doc1).toJSON();
            const expected = {
                more_like_this: {
                    like: doc1
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets like(arr) option', () => {
            const result = moreLikeThisQuery()
                .like([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    like: [doc1, doc2, doc3]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets unlike option', () => {
            const result = moreLikeThisQuery().unlike(doc1).toJSON();
            const expected = {
                more_like_this: {
                    unlike: doc1
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets unlike(arr) option', () => {
            const result = moreLikeThisQuery()
                .unlike([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    unlike: [doc1, doc2, doc3]
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets like_text option', () => {
            const result = moreLikeThisQuery().likeText('my text').toJSON();
            const expected = {
                more_like_this: {
                    like_text: 'my text'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets ids option', () => {
            const result = moreLikeThisQuery().ids(['1', '2']).toJSON();
            const expected = {
                more_like_this: {
                    ids: ['1', '2']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets docs option', () => {
            const docs = [
                { _type: 'type', _id: '1' },
                { _type: 'type', _id: '2' }
            ];
            const result = moreLikeThisQuery().docs(docs).toJSON();
            const expected = {
                more_like_this: {
                    docs: docs
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_query_terms option', () => {
            const result = moreLikeThisQuery().maxQueryTerms(12).toJSON();
            const expected = {
                more_like_this: {
                    max_query_terms: 12
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets min_term_freq option', () => {
            const result = moreLikeThisQuery().minTermFreq(1).toJSON();
            const expected = {
                more_like_this: {
                    min_term_freq: 1
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets min_doc_freq option', () => {
            const result = moreLikeThisQuery().minDocFreq(6).toJSON();
            const expected = {
                more_like_this: {
                    min_doc_freq: 6
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_doc_freq option', () => {
            const result = moreLikeThisQuery().maxDocFreq(30).toJSON();
            const expected = {
                more_like_this: {
                    max_doc_freq: 30
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets min_word_length option', () => {
            const result = moreLikeThisQuery().minWordLength(3).toJSON();
            const expected = {
                more_like_this: {
                    min_word_length: 3
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets max_word_length option', () => {
            const result = moreLikeThisQuery().maxWordLength(20).toJSON();
            const expected = {
                more_like_this: {
                    max_word_length: 20
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets stop_words option', () => {
            const result = moreLikeThisQuery()
                .stopWords(['the', 'a', 'trump'])
                .toJSON();
            const expected = {
                more_like_this: {
                    stop_words: ['the', 'a', 'trump']
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets analyzer option', () => {
            const result = moreLikeThisQuery().analyzer('snowball').toJSON();
            const expected = {
                more_like_this: {
                    analyzer: 'snowball'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets minimum_should_match option', () => {
            const result = moreLikeThisQuery()
                .minimumShouldMatch('30%')
                .toJSON();
            const expected = {
                more_like_this: {
                    minimum_should_match: '30%'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets boost_terms option', () => {
            const result = moreLikeThisQuery().boostTerms(1.4).toJSON();
            const expected = {
                more_like_this: {
                    boost_terms: 1.4
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets include option', () => {
            const result = moreLikeThisQuery().include(true).toJSON();
            const expected = {
                more_like_this: {
                    include: true
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('like/unlike clause behavior', () => {
        test('sets like with string', () => {
            const value = new MoreLikeThisQuery().like(doc3).toJSON();
            const expected = {
                more_like_this: {
                    like: doc3
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets like with object', () => {
            const value = new MoreLikeThisQuery().like(doc1).toJSON();
            const expected = {
                more_like_this: {
                    like: doc1
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets like with multiple calls', () => {
            const value = new MoreLikeThisQuery()
                .like(doc1)
                .like(doc2)
                .like(doc3)
                .toJSON();
            const expected = {
                more_like_this: {
                    like: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets like with array', () => {
            const value = new MoreLikeThisQuery()
                .like([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    like: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets like with mix of calls and arrays', () => {
            const value = new MoreLikeThisQuery()
                .like(doc1)
                .like([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    like: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets unlike with string', () => {
            const value = new MoreLikeThisQuery().unlike(doc3).toJSON();
            const expected = {
                more_like_this: {
                    unlike: doc3
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets unlike with object', () => {
            const value = new MoreLikeThisQuery().unlike(doc1).toJSON();
            const expected = {
                more_like_this: {
                    unlike: doc1
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets unlike with multiple calls', () => {
            const value = new MoreLikeThisQuery()
                .unlike(doc1)
                .unlike(doc2)
                .unlike(doc3)
                .toJSON();
            const expected = {
                more_like_this: {
                    unlike: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets unlike with array', () => {
            const value = new MoreLikeThisQuery()
                .unlike([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    unlike: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets unlike with mix of calls and arrays', () => {
            const value = new MoreLikeThisQuery()
                .unlike(doc1)
                .unlike([doc1, doc2, doc3])
                .toJSON();
            const expected = {
                more_like_this: {
                    unlike: [doc1, doc2, doc3]
                }
            };
            expect(value).toEqual(expected);
        });
    });
});
