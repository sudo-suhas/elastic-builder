import { describe, test, expect } from 'vitest';
import { AnalyzedSuggesterBase } from '../../src/suggesters';

const getInstance = (...args) =>
    new AnalyzedSuggesterBase('my_type', 'my_suggester', ...args);

describe('AnalyzedSuggesterBase', () => {
    describe('constructor', () => {
        test('sets txt', () => {
            const value = getInstance('my_field', 'my-text').toJSON();
            const expected = {
                my_suggester: {
                    text: 'my-text',
                    my_type: {
                        field: 'my_field'
                    }
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('text method', () => {
        test('text can be set', () => {
            const value = getInstance().text('my-text').toJSON();
            const expected = {
                my_suggester: {
                    text: 'my-text',
                    my_type: {}
                }
            };
            expect(value).toEqual(expected);
        });
    });

    describe('options', () => {
        test('sets analyzer', () => {
            const value = getInstance().analyzer('snowball').toJSON();
            expect(value).toEqual({
                my_suggester: {
                    my_type: {
                        analyzer: 'snowball'
                    }
                }
            });
        });

        test('sets shardSize', () => {
            const value = getInstance().shardSize(10).toJSON();
            expect(value).toEqual({
                my_suggester: {
                    my_type: {
                        shard_size: 10
                    }
                }
            });
        });
    });
});
