import { describe, test, expect } from 'vitest';
import { SimpleQueryStringQuery } from '../../src';

const getInstance = () => new SimpleQueryStringQuery();

describe('SimpleQueryStringQuery', () => {
    describe('options', () => {
        test('sets flags option', () => {
            const result = getInstance().flags('PREFIX|PHRASE').toJSON();
            const expected = {
                simple_query_string: {
                    flags: 'PREFIX|PHRASE'
                }
            };
            expect(result).toEqual(expected);
        });
    });
});
