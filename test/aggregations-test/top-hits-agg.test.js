import { describe, test, expect } from 'vitest';
import { TopHitsAggregation, Sort, Highlight, Script } from '../../src';

const getInstance = () => new TopHitsAggregation('my_agg');

const sortChannel = new Sort('channel', 'desc');
const sortCategories = new Sort('categories', 'desc');

const scriptA = new Script('inline', "doc['my_field_name'].value * 2").lang(
    'painless'
);
const scriptB = new Script('inline', "doc['my_field_name'].value * factor")
    .lang('painless')
    .params({ factor: 2.0 });

describe('TopHitsAggregation', () => {
    test('sets type as top_hits', () => {
        const value = new TopHitsAggregation('my_agg').toJSON();
        expect(value).toEqual({
            my_agg: { top_hits: {} }
        });
    });

    test('field cannot be set', () => {
        expect(() => new TopHitsAggregation('my_agg').field()).toThrow(
            new Error('field is not supported in TopHitsAggregation')
        );
    });

    test('script cannot be set', () => {
        expect(() => new TopHitsAggregation('my_agg').script()).toThrow(
            new Error('script is not supported in TopHitsAggregation')
        );
    });

    test('missing cannot be set', () => {
        expect(() => new TopHitsAggregation('my_agg').missing()).toThrow(
            new Error('missing is not supported in TopHitsAggregation')
        );
    });

    test('format cannot be set', () => {
        expect(() => new TopHitsAggregation('my_agg').format()).toThrow(
            new Error('format is not supported in TopHitsAggregation')
        );
    });

    describe('parameter validation', () => {
        describe.each([
            { name: 'throw TypeError for null parameter', value: null },
            {
                name: 'throw TypeError for invalid parameter',
                value: Object.create(null)
            }
        ])('$name', ({ value }) => {
            test('sort()', () => {
                expect(() => getInstance().sort(value)).toThrow(
                    new TypeError('Argument must be an instance of Sort')
                );
            });

            test('highlight()', () => {
                expect(() => getInstance().highlight(value)).toThrow(
                    new TypeError('Argument must be an instance of Highlight')
                );
            });
        });
    });

    describe('options', () => {
        test('sets from', () => {
            const value = getInstance().from(10).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        from: 10
                    }
                }
            });
        });

        test('sets size', () => {
            const value = getInstance().size(10).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        size: 10
                    }
                }
            });
        });

        test('sets sort', () => {
            const value = getInstance().sort(sortChannel).toJSON();
            const expected = {
                my_agg: {
                    top_hits: {
                        sort: [sortChannel.toJSON()]
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets sorts', () => {
            const value = getInstance()
                .sorts([sortChannel, sortCategories])
                .toJSON();
            const expected = {
                my_agg: {
                    top_hits: {
                        sort: [sortChannel.toJSON(), sortCategories.toJSON()]
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets trackScores', () => {
            const value = getInstance().trackScores(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        track_scores: true
                    }
                }
            });
        });

        test('sets version', () => {
            const value = getInstance().version(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        version: true
                    }
                }
            });
        });

        test('sets explain', () => {
            const value = getInstance().explain(true).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        explain: true
                    }
                }
            });
        });

        test('sets highlight', () => {
            const highlightInstance = new Highlight(['content']).type(
                'plain',
                'content'
            );
            const value = getInstance().highlight(highlightInstance).toJSON();
            const expected = {
                my_agg: {
                    top_hits: {
                        highlight: highlightInstance.toJSON()
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets source with string', () => {
            const value = getInstance().source('obj.*').toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        _source: 'obj.*'
                    }
                }
            });
        });

        test('sets source with false', () => {
            const value = getInstance().source(false).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        _source: false
                    }
                }
            });
        });

        test('sets source with array', () => {
            const value = getInstance().source(['obj1.*', 'obj2.*']).toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        _source: ['obj1.*', 'obj2.*']
                    }
                }
            });
        });

        test('sets source with object', () => {
            const value = getInstance()
                .source({
                    includes: ['obj1.*', 'obj2.*'],
                    excludes: ['*.description']
                })
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        _source: {
                            includes: ['obj1.*', 'obj2.*'],
                            excludes: ['*.description']
                        }
                    }
                }
            });
        });

        test('sets stored_fields(str) option', () => {
            const value = getInstance().storedFields('_none_').toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        stored_fields: '_none_'
                    }
                }
            });
        });

        test('sets stored_fields(arr) option', () => {
            const value = getInstance()
                .storedFields(['user', 'postDate'])
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        stored_fields: ['user', 'postDate']
                    }
                }
            });
        });

        test('sets scriptField', () => {
            const value = getInstance().scriptField('test1', scriptA).toJSON();
            const expected = {
                my_agg: {
                    top_hits: {
                        script_fields: { test1: { script: scriptA.toJSON() } }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets scriptFields', () => {
            const value = getInstance()
                .scriptFields({
                    test1: scriptA,
                    test2: scriptB
                })
                .toJSON();
            const expected = {
                my_agg: {
                    top_hits: {
                        script_fields: {
                            test1: { script: scriptA.toJSON() },
                            test2: { script: scriptB.toJSON() }
                        }
                    }
                }
            };
            expect(value).toEqual(expected);
        });

        test('sets docvalueFields', () => {
            const value = getInstance()
                .docvalueFields(['test1', 'test2'])
                .toJSON();
            expect(value).toEqual({
                my_agg: {
                    top_hits: {
                        docvalue_fields: ['test1', 'test2']
                    }
                }
            });
        });
    });
});
