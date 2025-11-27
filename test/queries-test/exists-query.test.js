import { describe, test, expect } from 'vitest';
import { ExistsQuery } from '../../src';

describe('ExistsQuery', () => {
    describe('constructor', () => {
        test('constructor sets arguments', () => {
            const valueA = new ExistsQuery('my_field').toJSON();
            const valueB = new ExistsQuery().field('my_field').toJSON();
            expect(valueA).toEqual(valueB);

            const expected = {
                exists: {
                    field: 'my_field'
                }
            };
            expect(valueA).toEqual(expected);
        });
    });
});
