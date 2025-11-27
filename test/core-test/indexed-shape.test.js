import { describe, test, expect } from 'vitest';
import { IndexedShape, indexedShape } from '../../src';

describe('IndexedShape', () => {
    describe('constructor', () => {
        test('sets options', () => {
            const value = new IndexedShape('DEU', 'countries').toJSON();
            const expected = {
                id: 'DEU',
                type: 'countries'
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets id option', () => {
            const result = indexedShape().id('DEU').toJSON();
            const expected = { id: 'DEU' };
            expect(result).toEqual(expected);
        });

        test('sets type option', () => {
            const result = indexedShape().type('countries').toJSON();
            const expected = { type: 'countries' };
            expect(result).toEqual(expected);
        });

        test('sets index option', () => {
            const result = indexedShape().index('shapes').toJSON();
            const expected = { index: 'shapes' };
            expect(result).toEqual(expected);
        });

        test('sets path option', () => {
            const result = indexedShape().path('location').toJSON();
            const expected = { path: 'location' };
            expect(result).toEqual(expected);
        });
    });
});
