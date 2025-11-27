import { describe, test, expect } from 'vitest';
import { ParentIdQuery, parentIdQuery } from '../../src';

describe('ParentIdQuery', () => {
    describe('options', () => {
        test('sets type option', () => {
            const result = parentIdQuery().type('blog_tag').toJSON();
            const expected = {
                parent_id: {
                    type: 'blog_tag'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets id option', () => {
            const result = parentIdQuery().id('1').toJSON();
            const expected = {
                parent_id: {
                    id: '1'
                }
            };
            expect(result).toEqual(expected);
        });

        test('sets ignore_unmapped option', () => {
            const result = parentIdQuery().ignoreUnmapped(true).toJSON();
            const expected = {
                parent_id: {
                    ignore_unmapped: true
                }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new ParentIdQuery('blog_tag', '1').toJSON();
            const valueB = new ParentIdQuery()
                .type('blog_tag')
                .id('1')
                .toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                parent_id: {
                    type: 'blog_tag',
                    id: '1'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
