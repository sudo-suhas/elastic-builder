import { describe, test, expect } from 'vitest';
import { InnerHits, innerHits, Sort, Script, Highlight } from '../../src';

describe('InnerHits', () => {
    describe('constructor', () => {
        test('sets name', () => {
            const value = new InnerHits('my_inner_hits').toJSON();
            const expected = {
                name: 'my_inner_hits'
            };
            expect(value).toEqual(expected);
        });
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
                expect(() => new InnerHits().sort(value)).toThrow(
                    new TypeError('Argument must be an instance of Sort')
                );
            });

            test('highlight()', () => {
                expect(() => new InnerHits().highlight(value)).toThrow(
                    new TypeError('Argument must be an instance of Highlight')
                );
            });
        });
    });

    describe('options', () => {
        test('sets from option', () => {
            const result = innerHits().from(10).toJSON();
            const expected = { from: 10 };
            expect(result).toEqual(expected);
        });

        test('sets size option', () => {
            const result = innerHits().size(10).toJSON();
            const expected = { size: 10 };
            expect(result).toEqual(expected);
        });

        test('sets version option', () => {
            const result = innerHits().version(true).toJSON();
            const expected = { version: true };
            expect(result).toEqual(expected);
        });

        test('sets explain option', () => {
            const result = innerHits().explain(true).toJSON();
            const expected = { explain: true };
            expect(result).toEqual(expected);
        });

        test('sets sort option', () => {
            const sortChannel = new Sort('channel', 'desc');
            const result = innerHits().sort(sortChannel).toJSON();
            const expected = { sort: [sortChannel.toJSON()] };
            expect(result).toEqual(expected);
        });

        test('sets sorts option', () => {
            const sortChannel = new Sort('channel', 'desc');
            const sortCategories = new Sort('categories', 'desc');
            const result = innerHits()
                .sorts([sortChannel, sortCategories])
                .toJSON();
            const expected = {
                sort: [sortChannel.toJSON(), sortCategories.toJSON()]
            };
            expect(result).toEqual(expected);
        });

        test('sets highlight option', () => {
            const result = innerHits()
                .highlight(new Highlight(['content']).type('plain', 'content'))
                .toJSON();
            const expected = {
                highlight: {
                    fields: {
                        content: { type: 'plain' }
                    }
                }
            };
            expect(result).toEqual(expected);
        });

        describe('source option', () => {
            test.each([
                {
                    name: 'sets source(str) option',
                    value: 'obj.*',
                    expected: { _source: 'obj.*' }
                },
                {
                    name: 'sets source(bool) option',
                    value: false,
                    expected: { _source: false }
                },
                {
                    name: 'sets source(arr) option',
                    value: ['obj1.*', 'obj2.*'],
                    expected: { _source: ['obj1.*', 'obj2.*'] }
                },
                {
                    name: 'sets source(obj) option',
                    value: {
                        includes: ['obj1.*', 'obj2.*'],
                        excludes: ['*.description']
                    },
                    expected: {
                        _source: {
                            includes: ['obj1.*', 'obj2.*'],
                            excludes: ['*.description']
                        }
                    }
                }
            ])('$name', ({ value, expected }) => {
                const result = innerHits().source(value).toJSON();
                expect(result).toEqual(expected);
            });
        });

        test('sets storedFields option', () => {
            const result = innerHits().storedFields(['comments.text']).toJSON();
            const expected = { stored_fields: ['comments.text'] };
            expect(result).toEqual(expected);
        });

        test('sets scriptField option', () => {
            const scriptA = new Script(
                'inline',
                "doc['my_field_name'].value * 2"
            ).lang('painless');
            const result = innerHits().scriptField('test1', scriptA).toJSON();
            const expected = {
                script_fields: { test1: { script: scriptA.toJSON() } }
            };
            expect(result).toEqual(expected);
        });

        test('sets scriptFields option', () => {
            const scriptA = new Script(
                'inline',
                "doc['my_field_name'].value * 2"
            ).lang('painless');
            const scriptB = new Script(
                'inline',
                "doc['my_field_name'].value * factor"
            )
                .lang('painless')
                .params({ factor: 2.0 });
            const result = innerHits()
                .scriptFields({
                    test1: scriptA,
                    test2: scriptB
                })
                .toJSON();
            const expected = {
                script_fields: {
                    test1: { script: scriptA.toJSON() },
                    test2: { script: scriptB.toJSON() }
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets docvalueFields option', () => {
            const result = innerHits()
                .docvalueFields(['test1', 'test2'])
                .toJSON();
            const expected = { docvalue_fields: ['test1', 'test2'] };
            expect(result).toEqual(expected);
        });
    });
});
